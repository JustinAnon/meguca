"use strict";System.register(["../view","../state"],function(e,t){function n(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var r,s,l,u,d,g,c;return{setters:[function(e){r=e["default"]},function(e){s=e.$threads}],execute:function(){l=n(["<"," ",">"],["<"," ",">"]),u=n(['<audio src="','"\n				width="300"\n				height="3em"\n				autoplay loop controls\n			>\n			</audio>'],['<audio src="','"\n				width="300"\n				height="3em"\n				autoplay loop controls\n			>\n			</audio>']),d=function(e){function t(e){return i(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return a(t,e),t}(r),exports.Hidamari=Backbone.View.extend({renderImage:function(e,t,n){var i=e===!0,o=this.model,a=this.el;t&&t.src||(t=o.get("image"));var r=a.query("figure");r&&r.remove(),t&&(a.query("blockquote").before(util.parseDOM(oneeSama.image(t,i))),n&&o.get("tallImage")&&(window.scrollTop=a.getBoundingClientRect().top+document.body.scrollTop-document.query("#banner").height),o.set({thumbnailRevealed:i,imageExpanded:!1,tallImage:!1}))},autoExpandImage:function(){var e=this.model.get("image");return!e||!c.get("expand")||[".webm",".pdf",".mp3"].indexOf(e.ext)>-1?this:(this.toggleImageExpansion(!0,e),this)},toggleImageExpansion:function(e,t,n){var i=options.get("inlinefit");t&&"none"!==i&&(e?this.fitImage(t,i):this.renderImage(null,t,n))},fitImage:function(e,t){if(".pdf"===e.ext)return window.open(oneeSama.imagePaths().src+e.src,"_blank");if(".mp3"===e.ext)return this.renderAudio(e);var n=void 0,i=void 0,o=n=e.dims[0],a=i=e.dims[1];if("full"===t)return this.expandImage(e,{width:o,height:a});var r="both"===t,s=r||"width"===t,l=r||"height"===t,u=o/a,d=void 0,g=void 0;if(s){var c=this.imageMaxWidth();n>c&&(n=c,i=n/u,d=!0)}if(l){var m=window.innerHeight-document.query("#banner").offsetHeight;i>m&&(i=m,n=i*u,g=!0)}n>50&&i>50&&(o=n,a=i),this.expandImage(e,o,a,g&&!d)},imageMaxWidth:function(){var e=this.el,t=this.model;return window.innerWidth-2*parseInt(e.closest("section").getBoundingClientRect().left)-util.outerWidth(t.get("op")?e:e.query(".background"))},expandImage:function(e,t,n,i){var o=".webm"===e.ext,a={src:oneeSama.imagePaths().src+e.src,width:t,height:n},r="expanded";i&&(r+=" noMargin"),a["class"]=r,o&&(a.autoplay=a.loop=a.controls=!0),this.el.query("figure").lastChild.innerHTML=common.parseHTML(l,o?"video":"img",a),this.model.set({imageExpanded:!0,tallImage:n>window.innerHeight})},renderAudio:function(e){this.el.query("figure").append(util.parseDOM(common.parseHTML(u,oneeSama.imagePaths().src+e.src))),this.model.set("imageExpanded",!0)}}),g=Backbone.Model.extend({initialize:function(){var e=this;s.on("click","#expandImages",function(t){t.preventDefault(),e.toggle()})},toggle:function(){var e=!this.get("expand");this.set("expand",e).massToggle(e),s.find("#expandImages").text(main.lang.expander[+e])},massToggle:function(e){var t=options.get("inlinefit");if("none"!==t)for(var n=state.posts.models,i=0,o=n.length;o>i;i++){var a=n[i],r=a.get("image");r&&(e?a.dispatch("fitImage",r,t):a.dispatch("renderImage",null,r))}}}),c=exports.massExpander=new g,main.reply("massExpander:unset",function(){return c.unset()}),s.on("click","img, video",function(e){if("none"!=options.get("inlinefit")&&1===e.which){var t=util.getModel(e.target);t&&(e.preventDefault(),main.request("imager:clicked"),t.dispatch("toggleImageExpansion",!t.get("imageExpanded"),t.get("image"),!0))}}),s.on("click",".imageToggle",function(e){e.preventDefault();var t=util.getModel(e.target);t&&main.follow(function(){return t.dispatch("renderImage",!t.get("thumbnailRevealed"))})})}}});
//# sourceMappingURL=../maps/posts/imager.js.map
