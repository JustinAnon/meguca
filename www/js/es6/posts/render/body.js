'use strict';System.register(['../state','../../../vendor/underscore','./etc'],function(_export,_context){var config,escape,renderPostLink;return {setters:[function(_state){config=_state.config;},function(_vendorUnderscore){escape=_vendorUnderscore.escape;},function(_etc){renderPostLink=_etc.renderPostLink;}],execute:function(){var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i["return"])_i["return"]();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();function renderBody(data){if(!data.state){data.state=[0,0,0];}let html=renderFragment(data.body,data.state,data.dice);if(data.state[1]){html+='</em>';}if(data.state[2]){html+='</del>';}return html;}_export('renderBody',renderBody);function renderFragment(frag,data){const lines=frag.split('\n');const state=data.state;let html='';for(let i=0;i<lines.length;i++){if(state[0]&&i%2){if(state[1]%2){html+='</em>';state[1]++;}html+='<br>';state[0]=0;}const line=lines[i];if(!state[0]&&line.startsWith('>')){html+='<em>';state[1]++;}if(frag){for(let word of line.split(' ')){html+=parseWord(word,data);state[0]=1;}}}return html;}_export('renderFragment',renderFragment);function parseWord(word,data){const split=word.split(/\[\/?spoiler]/i);let html='';for(let i=0;i<split.length;i++){if(i%2){html+=`<${ data.state[2]++%2?'/':'' }del>`;}const bit=split[i];if(/^>>\d+$/.test(bit)){html+=parsePostLink(bit,data.links);}else if(/^>>>\/\w+\//.test(bit)){html+=parseReference(bit);}else if(/^https?:\/\/[^-A-Za-z0-9+&@#/%?=~_]$/.test(bit)){html+=parseURL(bit);}else if(/<strong>.+<\/strong>/.test(bit)){html+=bit;}else {html+=escape(bit);}}return html;}function parsePostLink(bit,links){if(!links){return bit;}const num=bit.match(/^>>\/(\d+)$/)[1],verified=links[num];if(!verified){return bit;}return renderPostLink(num,verified.board,verified.OP);}const refTargets={};const boards=config.boards;for(let board of boards.enabled){refTargets[board]=`../${ board }/`;}for(let _ref of boards.psuedo.concat(boards.links)){var _ref2=_slicedToArray(_ref,2);let name=_ref2[0];let link=_ref2[1];refTargets[name]=link;}function parseReference(bit){const name=bit.match(/^>>>\/(\w+)\/$/)[1],href=refTargets[name];if(!href){return bit;}return newTabLink(href,bit);}function newTabLink(href,text){return `<a href="${ href }" target="_blank">${ text }</a>`;}function parseURL(bit){return newTabLink(encodeURI(href),bit);}}};});
//# sourceMappingURL=../../maps/posts/render/body.js.map
