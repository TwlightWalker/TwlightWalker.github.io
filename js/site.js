var SITE={getScrollPos:function(c){var a,d;if(!c||$.isWindow(c)){if(!c){c=window}if("scrollTop" in c){a=c.scrollLeft;d=c.scrollTop}else{if("pageXOffset" in c){a=c.pageXOffset;d=c.pageYOffset}else{if("scrollX" in c){a=c.scrollX;d=c.scrollY}else{if(c.document&&c.document.documentElement&&("scrollLeft" in c.document.documentElement)){a=c.document.documentElement.scrollLeft;d=c.document.documentElement.scrollTop}else{if(c.document&&c.document.body){a=c.document.body.scrollLeft;d=c.document.body.scrollTop}else{a=0;d=0}}}}}}else{var b=$(c);a=b.scrollLeft();d=b.scrollTop()}return{left:a,top:d}},scrollPos:function(a,b){if(a===undefined&&b===undefined){return this.getScrollPos(window)}if(a===undefined){a=this.scrollPos().left}if(b===undefined){if(typeof(a)==="object"&&("left" in a)&&("top" in a)){b=a.top;a=a.left}else{b=this.scrollPos().top}}window.scrollTo(a,b)},blur:function(){var a=this;var b;if("activeElement" in document){b=document.activeElement;if(b){b.blur()}}else{if(document.querySelector){b=document.querySelector(":focus");if(b){b.blur()}}else{var c=this.scrollPos();$('<input type="text" />').css({position:"absolute",top:"-10000px",left:"-10000px"}).appendTo("body").focus().remove();setTimeout(function(){a.scrollPos(c)},1)}}},detectAnimationEvent:function(){var a,b=document.createElement("fakeelement");var c={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(a in c){if(b.style[a]!==undefined){return c[a]}}return null},modal:(function(){var b=null;var a=1;var c={};var d=null;$("body").keydown(function(g){if(g.which==27){if(c.length){var f=c[c.length-1];if(f.options.escHide){f.show(false)}f=undefined}}});return function(l,m,o){var j;if(!b){b=this;d=b.detectAnimationEvent()}if(typeof(l)==="function"){for(j in c){if(c.hasOwnProperty(j)){if(l(c[j])===false){break}}}return}if(typeof(l)==="string"&&/^_modal_/.test(l)){return l in c?c[l]:null}var f=$(l);var h=null;var g=null;function e(i){if(h||g){g();if(h){clearTimeout(h)}h=null;g=null}g=function(){f.off(d,g);if(h){clearTimeout(h)}h=null;g=null;i()};if(d){f.one(d,g)}h=setTimeout(g,1000)}function n(p,i){if(i===undefined){i=f}if("handler" in k.options){k.options.handler(p,i,f[0],k)}if(p=="hided"&&k.options.closeOnHide){k.close()}}var k={options:o?o:{},getDialog:function(){return f[0]},getUval:function(){return"uval" in k.options?k.options.uval:undefined},show:function(q,p){var i;if(q===undefined){return f.hasClass("show")}if(q){if(!this.show()){if(n("beforeShow")===false){return}if(!f.parent().size()){f.appendTo(k.options.container)}e(function(){n("showed");if(p){p(f[0],k)}});f.removeClass("hide").addClass("show");i=f.find("._focus_:first");if(i.size()){i.focus()}else{b.blur()}n("afterShow")}else{n("showed");if(p){p(f[0],k)}}}else{if(this.show()){if(n("beforeHide")===false){return}e(function(){if(k.options.removeOnHide){f.remove()}n("hided");if(p){p(f[0],k)}});f.removeClass("show").addClass("hide");b.blur();n("afterHide")}else{n("hided");if(p){p(f[0],k)}}}},close:function(){if(n("beforeClose")===false){return}function i(){n("closed");delete c[k.options.id]}n("afterClose");if(this.show()){this.show(false,i)}else{i()}},handler:n};o=undefined;if(!("container" in k.options)){k.options.container=document.body}if(!("clone" in k.options)){k.options.clone=false}if(!("removeOnHide" in k.options)){k.options.removeOnHide=true}if(!("mouseHide" in k.options)){k.options.mouseHide=true}if(!("escHide" in k.options)){k.options.escHide=true}if(!("closeOnHide" in k.options)){k.options.closeOnHide=true}if(!("id" in k.options)){k.options.id=a;a++}if(k.options.clone){f=f.clone()}f.addClass("modal");if(k.options.mouseHide){f.addClass("_hide_")}if(!/^_modal_/.test(k.options.id)){k.options.id="_modal_"+k.options.id}f.attr("id",k.options.id);c[k.options.id]=k;f.add(f.find("._hide_")).filter("._hide_").click(function(i){if($(i.target).hasClass("_hide_")){k.show(false)}});n("created");if(m===undefined){m=true}if(m===true||m===false){k.show(m)}return k}})(),password:function(b,c){var a=null;this.modal('<div class="modal password"><div class="block content"><div class="title">'+(c?c:"Введите пароль для доступа")+'</div><input type="password" class="_focus_" /><div class="controls"><div class="button ok">ок</div><div class="button close">отмена</div></div><div class="ct"></div><div class="cb"></div></div></div>',true,{handler:function(g,f,e,d){if(g=="created"){a=$(e);a.find("input:first").keyup(function(h){if(h.which==13){a.find(".ok:first").click()}});a.find(".ok:first").click(function(){var i=a.find("input:first");var h=$.trim(i.val());if(h){d.getUval()(h);d.close()}else{tipUpper.single(i,"введите пароль",true)}i=undefined});a.find(".close:first").click(function(){d.getUval()(null);d.close()})}},uval:b})},capcha:function(b,a){var c=null;this.modal('<div class="modal"><div class="block content"><div class="title">Введите символы с изображения</div><img src="" alt="capcha" /><input type="text" class="_focus_" /><div class="controls"><div class="button ok">ок</div><div class="button close">отмена</div></div><div class="ct"></div><div class="cb"></div></div></div>',true,{handler:function(g,f,e,d){if(g=="created"){c=$(e);c.find("img:first").prop("src",b);c.find("input:first").keyup(function(h){if(h.which==13){c.find(".ok:first").click()}});c.find(".ok:first").click(function(){var i=c.find("input:first");var h=$.trim(i.val());if(h){d.getUval()(h);d.close()}else{tipUpper.single(i,"введите символы с изображения",true)}i=undefined});c.find(".close:first").click(function(){d.getUval()(null);d.close()})}},uval:a})},msg:function(b,a){this.modal('<div class="modal"><div class="block content">'+(a?'<div class="title"></div>':"")+'<div class="text">'+b+'</div><div class="controls"><div class="button ok _hide_">ок</div></div><div class="ct"></div><div class="cb"></div></div></div>',true)},confirm:function(f,c,e,b,d,a){this.modal('<div class="modal confirm"><div class="block content">'+(e?'<div class="title">'+e+"</div>":"")+f+'<div class="controls"><div class="ok button">'+(b?b:"да")+"</div>"+(a?'<div class="middle button">'+a+"</div>":"")+'<div class="cancel button">'+(d?d:"отмена")+'</div></div><div class="ct"></div><div class="cb"></div></div></div>',true,{handler:function(k,j,h,g){if(k=="created"){var i=$(h);i.find(".controls:last > .button").click(function(){g.handler(this.className.replace(/^\s*(\S+).*$/,"$1"))})}if(c(k,j,h,g)===true){g.close()}}})},waiter:(function(){var a=null;var b=null;return function(c){if(!a){a=this}if(b){clearTimeout(b);b=null}if(c){b=setTimeout(function(){var e=a.modal("_modal__waiter_");if(e){e.show(true)}else{a.modal('<div class="modal"></div>',true,{id:"_modal__waiter_",closeOnHide:false,removeOnHide:false,mouseHide:false,escHide:false,handler:function(j,i,g,f){if(j=="created"||j=="beforeShow"){var h=$(g);h.css("background-image",h.css("background-image").replace(/url\(\s*"(.*?)(?:\?.*)?"\s*\)/g,'url("$1?r='+Math.random()+'")'))}}})}},300)}else{var d=a.modal("_modal__waiter_");if(d){d.show(false)}}}})(),download:function(f,g,e){var b=document.createElement("a");b.style.display="none";document.body.appendChild(b);var c=new Blob([f],{type:e?e:"octet/stream"});var d=window.URL.createObjectURL(c);b.href=d;b.download=g;b.click();setTimeout(function(){document.body.removeChild(b);window.URL.revokeObjectURL(d)},100)},id:function(){return Math.random().toString(16).slice(2)+(new Date()).getTime()},loadMakeButton:function(b,e,d,c){var f=this.id();var a=$('<label for="'+f+'" class="button file-input-label">'+e+'</label><input type="file" id="'+f+'" accept="'+(c?c:"text/plain")+'" style="position: absolute; left: -10000px;" />');a.appendTo(b);a.filter("input:first").change(function(){if(this.files.length>0){var h=this.files[0];var g=new FileReader();g.addEventListener("load",function(i){d(i.target.result,true)});g.addEventListener("error",function(){d(undefined,false)});g.readAsText(h)}})}};