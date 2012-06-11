var AyeTunes=(function(){function a(){this.options={};this.timer=null;this.register={};this.active=1}a.prototype={init:function(b){var c,d=this;this.wrapper=document.getElementById(b.wrapper);if(typeof b.callbackfunc==="function"){this.callbackfunc=b.callbackfunc}this.active=b.activecell;this.smallloadlarge=false;c=function(f){this.register.first=f.sections[0].id;this.ulHolder=this.ulHolder();this.nextBtn=this.getBtn("at_nextbtn");if(f.pausebutton===true||f.mouseoverpause===true){this.pauseBtn=this.getBtn("at_pausebtn")}var h=this.ulHolder,e=this.wrapper.children[0],g=this;this.options=f;this.createCarouselUL(f.sections);this.ticker();if(f.mouseoverpause===true){this.addEvent(e,"mouseout",function(j){var i=g.pauseBtn;g.removeClass(i,"at_mousepause");if(!g.hasClass(g.pauseBtn,"at_pause")){if(!g.hasClass(i,"at_play")){g.addClass(i,"at_play")}g.ticker()}},g);this.addEvent(e,"mouseover",function(j){var i=g.pauseBtn;if(g.hasClass(i,"at_play")){g.removeClass(i,"at_play");if(!g.hasClass(i,"at_mousepause")){g.addClass(i,"at_mousepause");g.stop()}}},g)}if(f.smallloadlarge===true){this.addEvent(this.ulHolder,"click",function(p){var n,k,j,m,l,o;if(!p){p=window.event}if(p.target){o=p.target}else{if(p.srcElement){o=p.srcElement}}if(p.preventDefault){p.preventDefault()}else{p.returnValue=false}l=g.options.sections;k=g.ulHolder.getElementsByTagName("li");m=function(){g.fullOpacity(k,k[0]);g.nextDeux(k[1].getAttribute("type"))};for(n=0;n<l.length;n++){if(l[n].id===o.getAttribute("type")){if(o.parentNode.parentNode===k[2]&&g.active===0){g.fullOpacity(k,k[0],m)}else{g.next()}break}}},g)}if(f.pausebutton===true||f.mouseoverpause===true){this.addEvent(this.pauseBtn,"click",function(j){if(j.preventDefault){j.preventDefault()}else{j.returnValue=false}if(f.pausebutton===true){var i=g.pauseBtn;if(g.hasClass(i,"at_pause")){g.removeClass(i,"at_pause");if(!g.hasClass(i,"at_play")){g.addClass(i,"at_play")}g.ticker()}else{g.removeClass(i,"at_play");if(!g.hasClass(i,"at_pause")){g.addClass(i,"at_pause");g.stop()}}}},g)}this.addEvent(this.nextBtn,"click",function(i){if(i.preventDefault){i.preventDefault()}else{i.returnValue=false}g.stop();g.next();if(typeof g.pauseBtn==="undefined"||g.hasClass(g.pauseBtn,"at_play")){g.ticker()}},g);if(window.addEventListener){window.addEventListener("focus",function(){if(g.hasClass(g.pauseBtn,"at_play")){g.ticker()}},false);window.addEventListener("blur",function(){g.stop()},false)}};if(b.randomise===true){b.sections=b.sections.sort(function(){return 0.5-Math.random()})}if(this.wrapper!==null){this.setUp(this.wrapper,c,d,b)}},setUp:function(c,j,g,i){var k=document.createDocumentFragment(),f,l,h,m,e,d,b=document.createElement("div");g.addClass(b,"at_container");g.addClass(b,"shadowbox");l=document.createElement("div");g.addClass(l,"at_carousel");if(i.carousel==="left"){g.addClass(l,"at_carouselleft")}else{g.addClass(l,"at_carouselright")}h=document.createElement("ul");h.setAttribute("class","at_casebox");h.setAttribute("type","carouselscroll");h.setAttribute("style","top:0px");l.appendChild(h);b.appendChild(l);m=document.createElement("div");m.setAttribute("class","at_feature");f=document.createElement("a");f.setAttribute("href",i.sections[0].link);f.style.height="420px";f.style.width="699px";m.appendChild(f);b.appendChild(m);e=document.createElement("a");e.setAttribute("href","");g.addClass(e,"at_nextbtn");if(i.carousel==="left"){g.addClass(e,"at_nextbtnleft")}else{g.addClass(e,"at_nextbtnright")}b.appendChild(e);if(i.pausebutton===true||i.mouseoverpause===true){d=document.createElement("a");d.setAttribute("href","");g.addClass(d,"at_pausebtn");g.addClass(d,"at_play");b.appendChild(d)}k.appendChild(b);c.appendChild(k);j.apply(g,[i])},ticker:function(){if(this.timer===null){this.start()}},next:function(){var b=this.ulHolder.getElementsByTagName("li"),c=this;c.moveUp(b[0])},moveUp:function(c){var d,b=this.ulHolder.getElementsByTagName("li");d=b[this.active+1].getAttribute("type");this.nextDeux(d);this.fullOpacity(b,c)},fullOpacity:function(b,d,e){var c=0;while(c<b.length&&c<4){if(!this.hasClass(b[c].firstChild,"bloomActive")){this.addClass(b[c].firstChild,"bloomActive")}c++}this.animScroll(d,e)},animScroll:function(c,f){var d=this,e=d.ulHolder;function b(){var g=parseInt(e.style.top,10);g-=5;if(g>-140){g-=5;e.style.top=g+"px";setTimeout(b,20)}else{e.removeChild(c);e.style.top="0px";d.removeClass(e.children[0].firstChild,"bloomActive");d.removeClass(e.children[1].firstChild,"bloomActive");d.removeClass(e.children[2].firstChild,"bloomActive");d.removeClass(e.children[3].firstChild,"bloomActive");d.addClass(e.children[d.active].firstChild,"bloomActive");e.appendChild(c);if(typeof f==="function"){f()}}}setTimeout(b,20)},nextDeux:function(c){var d,b=this.wrapper.children[0].children[1].children[0].children[0];b.style.opacity=0.4;b.parentNode.parentNode.style.backgroundImage="url('"+this.options.sections[c].lg+"')";d=this.makeBind(this,function(){this.imgSwapAnim(c)});setTimeout(d,130)},imgSwapAnim:function(d){var c=this,b=this.wrapper.children[0].children[1].children[0].children[0];function e(){var f=b;f.style.opacity-=0.08;if(f.style.opacity>0.15){f.style.opacity-=0.05;setTimeout(e,100)}else{c.changeBigImage(d)}}setTimeout(e,15)},changeBigImage:function(c){var b=this.wrapper.children[0].children[1].children[0].children[0];b.src=this.options.sections[c].lg;b.parentNode.setAttribute("href",this.options.sections[c].link);if(typeof this.callbackfunc!=="undefined"){this.callbackfunc(this.options.sections[c].id)}},start:function(){var b;if(this.timer===null){b=this.makeBind(this,this.next);this.timer=setInterval(b,this.options.auto)}},stop:function(){var b=this.pauseBtn;if(this.timer!==null){clearInterval(this.timer);this.timer=null}},createCarouselUL:function(e){var d=false,b,c;for(b=0;b<e.length;b++){if(b===this.active){d=true;c=document.createElement("img");c.src=e[b].lg;this.wrapper.children[0].children[1].children[0].appendChild(c)}this.makeIl(e[b],d,b);d=false}},makeIl:function(g,f,i){var c=document.createDocumentFragment(),e=document.createElement("li"),d,h,b;e.setAttribute("class","at_case");e.setAttribute("type",i);h=document.createElement("a");h.setAttribute("href",g.link);b=new Image();b.src=g.lg;d=document.createElement("img");d.setAttribute("type",g.id);if(f===true&&this.hasClass(h,"bloomActive")===false){this.addClass(h,"bloomActive")}if(this.hasClass(h,"bloom")===false){this.addClass(h,"bloom")}d.src=g.sm;h.appendChild(d);e.appendChild(h);c.appendChild(e);this.ulHolder.appendChild(c)},loadLgImg:function(e){var b,d=this.options.sections,c=this.wrapper.children[0].children[1].children[0].children[0];for(b=0;b<d.length;b++){if(d[b].id===e){c.parentNode.parentNode.style.backgroundImage="url('"+this.options.sections[b].lg+"')";c.src=this.options.sections[b].lg}}},ulHolder:function(){var c=this.wrapper.children[0],d,b,e=c.getElementsByTagName("ul");for(d=0;d<e.length;d++){b=e[d].getAttribute("type");if(b==="carouselscroll"){return this.jedi(e[d])}}},getBtn:function(e){var c=this.wrapper.children[0],b,d;b=c.getElementsByTagName("a");for(d=0;d<b.length;d++){if(this.hasClass(b[d],e)===true){return this.jedi(b[d])}}},jedi:function(b){return(function(){return b}())},bindings:function(){this.makeBind(this,this.imgSwapAnim)},makeBind:function(c,b){return function(){return b.apply(c,Array.prototype.slice.call(arguments))}},addEvent:function(e,b,d,c){if(e!==this.nodeHandler(e)){return false}if(window.attachEvent){e.attachEvent("on"+b,d)}else{if(!c){c=false}e.addEventListener(b,d,c)}},nodeHandler:function(){var c,b,d=[];for(c=0;c<arguments.length;c++){b=arguments[c];if(typeof b==="string"){b=document.getElementById(b)}if(arguments.length===1){return b}d.push(b)}return d},hasClass:function(c,d){var e,b=c.className;if(!b){return false}e=new RegExp("(^|\\s)"+d+"(\\s|$)");return e.test(c.className)},removeClass:function(c,d){var b=c.className;if(!b){return}c.className=b.replace(new RegExp("(^|\\s+)"+d+"(\\s+|$)")," ")},addClass:function(c,d){var b=c.className;if(b){c.className+=" "+d}else{c.className=d}}};return a}());
