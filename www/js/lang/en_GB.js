"use strict";System.register([],function(e,o){var t;return{setters:[],execute:function(){t={anon:"Anonymous",search:"Search",show:"Show",hide:"Hide",report:"Report",focus:"Focus",expand:"Expand",last:"Last",see_all:"See all",bottom:"Bottom",expand_images:"Expand Images",live:"live",catalog:"Catalog","return":"Return",top:"Top",reply:"Reply",newThread:"New thread",locked_to_bottom:"Locked to bottom",you:"(You)",OP:"(OP)",done:"Done",send:"Send",locked:"locked",thread_locked:"This thread is locked.",langApplied:"Language settings applied. The page will now reload.",googleSong:"Click to google song",quoted:"You have been quoted",syncwatchStarting:"Syncwatch starting in 10 seconds",finished:"Finished",expander:["Expand Images","Contract Images"],uploading:"Uploading...",subject:"Subject",cancel:"Cancel",unknownUpload:"Unknown upload error",unknownResult:"Unknown result",rescan:"Rescan",catalog_omit:"Replies/Images",showSeconds:"Click to show seconds",worksBestWith:"works best with",name:"Name:",email:"Email:",options:"Options",identity:"Identity",faq:"FAQ",schedule:"Schedule",feedback:"Feedback",onlineCounter:"Online Counter",importConfigs:{done:"Import successfull. The page will now reload.",corrupt:"Import failed. File corrupt"},reports:{post:"Reporting post",reporting:"Reporting...",submitted:"Report submitted!",setup:"Obtaining reCAPTCHA...",loadError:"Couldn't load reCATPCHA"},time:{week:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],year:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],just_now:"just now",minute:"minute",hour:"hour",day:"day",month:"month",year:"year"},sync:{notSynced:"Not synced",connecting:"Connecting",syncing:"Syncing",synced:"Synced",dropped:"Dropped",reconnecting:"Reconnecting"},opts:{tabs:["General","Style","ImageSearch","Fun","Shortcuts"],modes:{small:"small",sharp:"sharp",hide:"hide",none:"none",full:"full-size",width:"fit to width",height:"fit to height",both:"fit to both"},labels:{"export":["Export","Export options to file"],"import":["Import","Import options from file"],hidden:["Hidden: 0","Clear hidden posts"],lang:["Language","Change interface language"],inlinefit:["Expansion","Expand images inside the parent post and resize according to setting"],thumbs:["Thumbnails","Set thumbnail style:\nSmall: 125x125, small file size;\nSharp: 125x125, more detailed;\nHide: hide all images;"],imageHover:["Image Hover Expansion","Display image previews on hover"],webmHover:["WebM Hover Expansion","Display WebM previews on hoverRequires Image Hover Expansion enabled."],autogif:["Animated GIF Thumbnails","Animate GIF thumbnails"],spoilers:["Image Spoilers","Don't spoiler images"],linkify:["Linkify text URLs","Convert in-post text URLs to clickable links"],notification:["Desktop Notifications","Get desktop notifications when quoted or a syncwatch is about to start"],anonymise:["Anonymise","Display all posters as anonymous"],relativeTime:["Relative Timestamps",'Relative post timestamps. Ex.: "1 hour ago"'],nowPlaying:["Now Playing Banner","Currently playing song on r/a/dio and other stream informationin the top banner."],illyaBGToggle:["Illya Dance","Dancing loli in the background"],illyaMuteToggle:["Mute Illya","Mute dancing loli"],horizontalPosting:["Horizontal Posting","38chan nostalgia"],replyright:["[Reply] at Right","Move Reply button to the right side of the page"],theme:["Theme","Select CSS theme"],userBG:["Custom Background","Toggle custom page background"],userBGimage:["","Image to use as the background"],lastn:["[Last #]",'Number of posts to display with the "Last N" thread expansion link'],postUnloading:["Dynamic Post Unloading","Improves thread responsiveness by unloading posts from the topof the thread, so that post count stays within the Last # value. Only applies to Last # enabled threads"],alwaysLock:["Always Lock to Bottom","Lock scrolling to page bottom even when tab is hidden"],"new":["New Post","Open new post"],togglespoiler:["Image Spoiler","Toggle spoiler in the open post"],textSpoiler:["Text Spoiler","Insert text spoiler tag"],done:["Finish Post","Close open post"],expandAll:["Expand All Images","Expand all images. Webm, PDF and MP3 and your own post aren'taffected. New post images are also expanded."],workMode:["Work mode","Hides images, defaults theme and disables user background"],workModeTOG:["Work mode","Hides images, defaults theme and disables user background"],google:["Google","Google image search"],iqdb:["IQDB","iqdb.org image search"],saucenao:["SauceNao","saucenao.com imagesearch"],desustorage:["DesuStorage","desustorage.org imagesearch"],exhentai:["Exhentai","exhentai.org image search"]}},mod:{title:["Title","Display staff title on new posts"],clearSelection:["Clear","Clear selected posts"],spoilerImages:["Spoiler","Spoiler selected post images"],deleteImages:["Del Img","Delete selected post images"],deletePosts:["Del Post","Delete selected posts"],lockThreads:["Lock","Lock/unlock selected threads"],toggleMnemonics:["Mnemonics","Toggle mnemonic display"],sendNotification:["Notification","Send notifaction message to all clients"],ban:["Ban","Ban poster(s) for the selected post(s)"],renderPanel:["Panel","Toggle administrator panel display"],modLog:["Log","Show moderation log"],djPanel:["DJ","DJ tool panel"],displayBan:["Display","Append a public 'USER WAS BANNED FOR THIS POST' message"],unban:"Unban",banMessage:"USER WAS BANNED FOR THIS POST",placeholders:{msg:"Message",days:"d",hours:"h",minutes:"min",reason:"Reason"},needReason:"Must specify reason",7:"Image spoilered",8:"Image deleted",9:"Post deleted",10:"Thread locked",11:"Thread unlocked",12:"User banned",53:"User unbanned",formatLog:function(e){var o=t.mod[e.kind]+" by "+e.ident;return e.reason&&(o+=" for "+e.reason),o}},pluralize:function(e,o){return 1!=e&&"y"==o.slice(-1)&&["a","e","i","o","u"].indexOf(o.slice(-2,-1).toLowerCase())<0&&(o=o.slice(0,-1)+"ie"),e+" "+o+(1==e?"":"s")},capitalize:function(e){return e[0].toUpperCase()+e.slice(1)},ago:function(e,o,n){var a=t.pluralize(e,o);return n?a="in "+a:a+=" ago",a},abbrev_msg:function(e,o,n){var a=t.pluralize(e,"reply");return o&&(a+=" and "+t.pluralize(o,"image")),a+=" omitted",n&&(a+=' <span class="act"><a href="'+n+'" class="history">'+t.see_all+"</a></span>"),a}},e("default",t)}}});
//# sourceMappingURL=maps/en_GB.js.map
