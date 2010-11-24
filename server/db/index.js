var config = require('../config'),
    flow = require('flow'),
    fs = require('fs'),
    pix = require('../pix'),
    postgres = require('../../../node-postgres/lib'),
    Template = require('../lib/json-template').Template,
    util = require('util');

var db = new postgres.Client(config.DB_CONFIG);
db.connect();
db.on('error', function (err) {
	if (err.code == 23505)
		return;
	console.log(err);
	process.exit(1);
});

exports.insert_image = function (image, callback) {
	var dims = image.dims;
	var values = [image.time, image.MD5, image.size,
			pix.IMAGE_EXTS.indexOf(image.ext), dims[0], dims[1]];
	if (image.pinky)
		values.push(null, null, dims[2], dims[3]);
	else
		values.push(dims[2], dims[3], null, null);
	var query = db.query({
		name: 'insert image',
		text: "INSERT INTO " + config.DB_IMAGE_TABLE +
		" (created, md5, filesize, ext, width, height, thumb_width," +
		" thumb_height, pinky_width, pinky_height) VALUES (" +
		"TIMESTAMP 'epoch' AT TIME ZONE 'UTC' + $1 * INTERVAL '1ms'," +
		" $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
		values: values
	});
	query.on('row', function (row) {
		callback(null, row.fields[0]);
	});
	query.on('error', function (err) {
		if (err.code == 23505) /* UNIQUE constraint */
			callback("Duplicate image detected.", null);
		else
			callback(err, null);
	});
};

exports.check_duplicate_image = function (MD5, callback) {
	var query = db.query({
		name: 'lookup image by md5',
		text: "SELECT id, filesize, ext, width, height, " +
		"thumb_width, thumb_height, pinky_width, pinky_height, " +
		"EXTRACT(epoch FROM created) * 1000 FROM " +
		config.DB_IMAGE_TABLE + " WHERE md5 = $1",
		values: [MD5]
	});
	var done = false;
	query.on('row', function (row) {
		var f = row.fields;
		var found = {id: f[0], MD5: MD5, size: f[1],
				ext: pix.IMAGE_EXTS[f[2]], dims: f.slice(3, 9),
				time: f[9]};
		done = true;
		callback(null, found);
	});
	query.on('end', function () {
		if (!done)
			callback(null, null);
	});
	query.on('error', function (err) {
		callback(err, null);
	});
};

exports.update_thumbnail_dimensions = function (id, pinky, w, h, callback) {
	var thumb = pinky ? 'pinky' : 'thumb';
	var query = db.query({
		name: "update " + thumb + " dimensions",
		text: "UPDATE " + config.DB_IMAGE_TABLE +
		" SET "+thumb+"_width = $1, "+thumb+"_height = $2" +
		" WHERE id = $3",
		values: [w, h, id]
	});
	query.on('error', callback);
	query.on('end', function () { callback(); });
};

exports.insert_post = function(msg, ip, callback) {
	var query = db.query({
		name: 'insert post',
		text: "INSERT INTO " + config.DB_POST_TABLE +
		" (name, trip, email, body, parent, created, ip," +
		" image, image_filename) VALUES" +
		" ($1, $2, $3, $4, $5," +
		" TIMESTAMP 'epoch' AT TIME ZONE 'UTC' + $6 * INTERVAL '1ms',"+
		" $7, $8, $9) RETURNING num",
		values: [msg.name, msg.trip || '', msg.email || '',
			msg.body, msg.op || null, msg.time, ip,
			msg.image ? msg.image.id : null,
			msg.image ? msg.image.name.substr(0, 256) : null]
	});
	query.on('row', function (row) {
		callback(null, row.fields[0]);
	});
	query.on('error', function (err) {
		callback(err, null);
	});
}

exports.update_post = function(num, body, callback) {
	var query = db.query({
		name: 'update post',
		text: "UPDATE " + config.DB_POST_TABLE +
		" SET body = $1 WHERE num = $2",
		values: [body, num]
	});
	var done = false;
	query.on('error', function (err) {
		done = true;
		callback(false);
	});
	query.on('end', function () {
		if (!done)
			callback(true);
	});
}

var posts_sql;
exports.get_posts = function(get_threads, callback) {
	if (!posts_sql)
		posts_sql = fs.readFileSync('db/get_posts.sql', 'UTF-8');
	var vals = {DB_POST_TABLE: config.DB_POST_TABLE,
		DB_IMAGE_TABLE: config.DB_IMAGE_TABLE};
	vals.thumb = get_threads ? 'thumb' : 'pinky';
	if (!get_threads)
		vals.posts_only = true;

	var query = db.query(Template(posts_sql).expand(vals));
	query.on('row', function (row) {
		var f = row.fields;
		var post = {num: f[0], name: f[1], trip: f[2], email: f[3],
				body: f[4], time: f[6]};
		if (f[5])
			post.op = f[5];
		if (f[7]) {
			var time = f[16];
			var ext = pix.IMAGE_EXTS[f[10]];
			var src = time + ext;
			var thumb = time + (post.op ? '.jpg' : 'l.jpg');
			post.image = {
				src: src, thumb: thumb, id: f[7], MD5: f[8],
				size: pix.readable_filesize(f[9]), ext: ext,
				dims: [f[11], f[12], f[13], f[14]],
				name: f[15], created: time
			};
		}
		callback(null, post);
	});
	query.on('error', function (error) {
		callback(error, null);
	});
	query.on('end', function () {
		callback(null, null);
	});
};

function create_table(table, sql_file, done) {
	console.log("Creating " + table + "...");
	var sql = fs.readFileSync(sql_file, 'UTF-8');
	var query = db.query(Template(sql).expand(config));
	query.on('end', done);
}

exports.check_tables = function (done) {
	var post = config.DB_POST_TABLE, image = config.DB_IMAGE_TABLE;
	var exist = [];
	var query = db.query({
		text: "SELECT relname FROM pg_class WHERE relname IN ($1, $2)",
		values: [post, image]
	});
	query.on('row', function (row) {
		exist.push(row.fields[0]);
	});
	flow.exec(function () {
		query.on('end', this);
	}, function () {
		if (exist.indexOf(image) < 0)
			create_table(image, 'db/image_table.sql', this);
		else
			this();
	}, function () {
		if (exist.indexOf(post) < 0)
			create_table(post, 'db/post_table.sql', done);
		else
			done();
	});
	query.on('error', function (err) {
		util.error(err);
	});
};
