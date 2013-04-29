/*! jQuery UI - v1.10.0 - 2013-02-08
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.position.js, jquery.ui.autocomplete.js, jquery.ui.datepicker.js, jquery.ui.menu.js, jquery.ui.tooltip.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
* Copyright (c) 2013 jQuery Foundation and other contributors Licensed MIT */
(function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.10.0",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a={},f=t.split(".")[0];t=t.split(".")[1],i=f+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[f]=e[f]||{},s=e[f][t],o=e[f][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,r){if(!e.isFunction(r)){a[t]=r;return}a[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},i=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=i,s=r.apply(this,arguments),this._super=t,this._superApply=n,s}}()}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:t},a,{constructor:o,namespace:f,widgetName:t,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&e.effects.effect[u]?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}})})(jQuery);(function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}function d(t){var n=t[0];return n.nodeType===9?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(n)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:n.preventDefault?{width:0,height:0,offset:{top:n.pageY,left:n.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,v,m,g,y,b=e(t.of),w=e.position.getWithinInfo(t.within),E=e.position.getScrollInfo(w),S=(t.collision||"flip").split(" "),x={};return y=d(b),b[0].preventDefault&&(t.at="left top"),l=y.width,v=y.height,m=y.offset,g=e.extend({},m),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),x[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),S.length===1&&(S[1]=S[0]),t.at[0]==="right"?g.left+=l:t.at[0]==="center"&&(g.left+=l/2),t.at[1]==="bottom"?g.top+=v:t.at[1]==="center"&&(g.top+=v/2),n=h(x.at,l,v),g.left+=n[0],g.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),d=p(this,"marginLeft"),y=p(this,"marginTop"),T=f+d+p(this,"marginRight")+E.width,N=c+y+p(this,"marginBottom")+E.height,C=e.extend({},g),k=h(x.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:d,marginTop:y},e.each(["left","top"],function(r,i){e.ui.position[S[r]]&&e.ui.position[S[r]][i](C,{targetWidth:l,targetHeight:v,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:w,elem:a})}),t.using&&(u=function(e){var n=m.left-C.left,s=n+l-f,o=m.top-C.top,u=o+v-c,h={target:{element:b,left:m.left,top:m.top,width:l,height:v},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),v<c&&i(o+u)<v&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}()})(jQuery);(function(e,t){var n=0;e.widget("ui.autocomplete",{version:"1.10.0",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,n,r;this.isMultiLine=this._isMultiLine(),this.valueMethod=this.element[this.element.is("input,textarea")?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(i){if(this.element.prop("readOnly")){t=!0,r=!0,n=!0;return}t=!1,r=!1,n=!1;var s=e.ui.keyCode;switch(i.keyCode){case s.PAGE_UP:t=!0,this._move("previousPage",i);break;case s.PAGE_DOWN:t=!0,this._move("nextPage",i);break;case s.UP:t=!0,this._keyEvent("previous",i);break;case s.DOWN:t=!0,this._keyEvent("next",i);break;case s.ENTER:case s.NUMPAD_ENTER:this.menu.active&&(t=!0,i.preventDefault(),this.menu.select(i));break;case s.TAB:this.menu.active&&this.menu.select(i);break;case s.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(i),i.preventDefault());break;default:n=!0,this._searchTimeout(i)}},keypress:function(r){if(t){t=!1,r.preventDefault();return}if(n)return;var i=e.ui.keyCode;switch(r.keyCode){case i.PAGE_UP:this._move("previousPage",r);break;case i.PAGE_DOWN:this._move("nextPage",r);break;case i.UP:this._keyEvent("previous",r);break;case i.DOWN:this._keyEvent("next",r)}},input:function(e){if(r){r=!1,e.preventDefault();return}this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur){delete this.cancelBlur;return}clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete").appendTo(this._appendTo()).menu({input:e(),role:null}).zIndex(this.element.zIndex()+1).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var n=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(r){r.target!==t.element[0]&&r.target!==n&&!e.contains(n,r.target)&&t.close()})})},menufocus:function(t,n){if(this.isNewMenu){this.isNewMenu=!1;if(t.originalEvent&&/^mouse/.test(t.originalEvent.type)){this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});return}}var r=n.item.data("ui-autocomplete-item");!1!==this._trigger("focus",t,{item:r})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(r.value):this.liveRegion.text(r.value)},menuselect:function(e,t){var n=t.item.data("ui-autocomplete-item"),r=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=r,this._delay(function(){this.previous=r,this.selectedItem=n})),!1!==this._trigger("select",e,{item:n})&&this._value(n.value),this.term=this._value(),this.close(e),this.selectedItem=n}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),e==="source"&&this._initSource(),e==="appendTo"&&this.menu.element.appendTo(this._appendTo()),e==="disabled"&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_isMultiLine:function(){return this.element.is("textarea")?!0:this.element.is("input")?!1:this.element.prop("isContentEditable")},_initSource:function(){var t,n,r=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(n,r){r(e.ui.autocomplete.filter(t,n.term))}):typeof this.options.source=="string"?(n=this.options.source,this.source=function(t,i){r.xhr&&r.xhr.abort(),r.xhr=e.ajax({url:n,data:t,dataType:"json",success:function(e){i(e)},error:function(){i([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){e=e!=null?e:this._value(),this.term=this._value();if(e.length<this.options.minLength)return this.close(t);if(this._trigger("search",t)===!1)return;return this._search(e)},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,t=++n;return function(r){t===n&&e.__response(r),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return typeof t=="string"?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var n=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(n,t),this.menu.refresh(),n.show(),this._resizeMenu(),n.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,n){var r=this;e.each(n,function(e,n){r._renderItemData(t,n)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,n){return e("<li>").append(e("<a>").text(n.label)).appendTo(t)},_move:function(e,t){if(!this.menu.element.is(":visible")){this.search(null,t);return}if(this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)){this._value(this.term),this.menu.blur();return}this.menu[e](t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(e,t),t.preventDefault()}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,n){var r=new RegExp(e.ui.autocomplete.escapeRegex(n),"i");return e.grep(t,function(e){return r.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments);if(this.options.disabled||this.cancelSearch)return;e&&e.length?t=this.options.messages.results(e.length):t=this.options.messages.noResults,this.liveRegion.text(t)}})})(jQuery);(function(e,t){function s(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.dpDiv=o(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function o(t){var n="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(n,"mouseout",function(){e(this).removeClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!==-1&&e(this).removeClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!==-1&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(n,"mouseover",function(){e.datepicker._isDisabledDatepicker(i.inline?t.parent()[0]:i.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!==-1&&e(this).addClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!==-1&&e(this).addClass("ui-datepicker-next-hover"))})}function u(t,n){e.extend(t,n);for(var r in n)n[r]==null&&(t[r]=n[r]);return t}e.extend(e.ui,{datepicker:{version:"1.10.0"}});var n="datepicker",r=(new Date).getTime(),i;e.extend(s.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return u(this._defaults,e||{}),this},_attachDatepicker:function(t,n){var r,i,s;r=t.nodeName.toLowerCase(),i=r==="div"||r==="span",t.id||(this.uuid+=1,t.id="dp"+this.uuid),s=this._newInst(e(t),i),s.settings=e.extend({},n||{}),r==="input"?this._connectDatepicker(t,s):i&&this._inlineDatepicker(t,s)},_newInst:function(t,n){var r=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:r,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:n,dpDiv:n?o(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,r){var i=e(t);r.append=e([]),r.trigger=e([]);if(i.hasClass(this.markerClassName))return;this._attachments(i,r),i.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(r),e.data(t,n,r),r.settings.disabled&&this._disableDatepicker(t)},_attachments:function(t,n){var r,i,s,o=this._get(n,"appendText"),u=this._get(n,"isRTL");n.append&&n.append.remove(),o&&(n.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[u?"before":"after"](n.append)),t.unbind("focus",this._showDatepicker),n.trigger&&n.trigger.remove(),r=this._get(n,"showOn"),(r==="focus"||r==="both")&&t.focus(this._showDatepicker);if(r==="button"||r==="both")i=this._get(n,"buttonText"),s=this._get(n,"buttonImage"),n.trigger=e(this._get(n,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:s,alt:i,title:i}):e("<button type='button'></button>").addClass(this._triggerClass).html(s?e("<img/>").attr({src:s,alt:i,title:i}):i)),t[u?"before":"after"](n.trigger),n.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1})},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,n,r,i,s=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){n=0,r=0;for(i=0;i<e.length;i++)e[i].length>n&&(n=e[i].length,r=i);return r},s.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),s.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-s.getDay())),e.input.attr("size",this._formatDate(e,s).length)}},_inlineDatepicker:function(t,r){var i=e(t);if(i.hasClass(this.markerClassName))return;i.addClass(this.markerClassName).append(r.dpDiv),e.data(t,n,r),this._setDate(r,this._getDefaultDate(r),!0),this._updateDatepicker(r),this._updateAlternate(r),r.settings.disabled&&this._disableDatepicker(t),r.dpDiv.css("display","block")},_dialogDatepicker:function(t,r,i,s,o){var a,f,l,c,h,p=this._dialogInst;return p||(this.uuid+=1,a="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+a+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},e.data(this._dialogInput[0],n,p)),u(p.settings,s||{}),r=r&&r.constructor===Date?this._formatDate(p,r):r,this._dialogInput.val(r),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(f=document.documentElement.clientWidth,l=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,h=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[f/2-100+c,l/2-150+h]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=i,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],n,p),this},_destroyDatepicker:function(t){var r,i=e(t),s=e.data(t,n);if(!i.hasClass(this.markerClassName))return;r=t.nodeName.toLowerCase(),e.removeData(t,n),r==="input"?(s.append.remove(),s.trigger.remove(),i.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(r==="div"||r==="span")&&i.removeClass(this.markerClassName).empty()},_enableDatepicker:function(t){var r,i,s=e(t),o=e.data(t,n);if(!s.hasClass(this.markerClassName))return;r=t.nodeName.toLowerCase();if(r==="input")t.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(r==="div"||r==="span")i=s.children("."+this._inlineClass),i.children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1);this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e})},_disableDatepicker:function(t){var r,i,s=e(t),o=e.data(t,n);if(!s.hasClass(this.markerClassName))return;r=t.nodeName.toLowerCase();if(r==="input")t.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(r==="div"||r==="span")i=s.children("."+this._inlineClass),i.children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0);this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,n)}catch(r){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(n,r,i){var s,o,a,f,l=this._getInst(n);if(arguments.length===2&&typeof r=="string")return r==="defaults"?e.extend({},e.datepicker._defaults):l?r==="all"?e.extend({},l.settings):this._get(l,r):null;s=r||{},typeof r=="string"&&(s={},s[r]=i),l&&(this._curInst===l&&this._hideDatepicker(),o=this._getDateDatepicker(n,!0),a=this._getMinMaxDate(l,"min"),f=this._getMinMaxDate(l,"max"),u(l.settings,s),a!==null&&s.dateFormat!==t&&s.minDate===t&&(l.settings.minDate=this._formatDate(l,a)),f!==null&&s.dateFormat!==t&&s.maxDate===t&&(l.settings.maxDate=this._formatDate(l,f)),"disabled"in s&&(s.disabled?this._disableDatepicker(n):this._enableDatepicker(n)),this._attachments(e(n),l),this._autoSize(l),this._setDate(l,o),this._updateAlternate(l),this._updateDatepicker(l))},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(t){var n,r,i,s=e.datepicker._getInst(t.target),o=!0,u=s.dpDiv.is(".ui-datepicker-rtl");s._keyEvent=!0;if(e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return i=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",s.dpDiv),i[0]&&e.datepicker._selectDay(t.target,s.selectedMonth,s.selectedYear,i[0]),n=e.datepicker._get(s,"onSelect"),n?(r=e.datepicker._formatDate(s),n.apply(s.input?s.input[0]:null,[r,s])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(s,"stepBigMonths"):-e.datepicker._get(s,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(s,"stepBigMonths"):+e.datepicker._get(s,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,u?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(s,"stepBigMonths"):-e.datepicker._get(s,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,u?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(s,"stepBigMonths"):+e.datepicker._get(s,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else t.keyCode===36&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var n,r,i=e.datepicker._getInst(t.target);if(e.datepicker._get(i,"constrainInput"))return n=e.datepicker._possibleChars(e.datepicker._get(i,"dateFormat")),r=String.fromCharCode(t.charCode==null?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||r<" "||!n||n.indexOf(r)>-1},_doKeyUp:function(t){var n,r=e.datepicker._getInst(t.target);if(r.input.val()!==r.lastVal)try{n=e.datepicker.parseDate(e.datepicker._get(r,"dateFormat"),r.input?r.input.val():null,e.datepicker._getFormatConfig(r)),n&&(e.datepicker._setDateFromField(r),e.datepicker._updateAlternate(r),e.datepicker._updateDatepicker(r))}catch(i){}return!0},_showDatepicker:function(t){t=t.target||t,t.nodeName.toLowerCase()!=="input"&&(t=e("input",t.parentNode)[0]);if(e.datepicker._isDisabledDatepicker(t)||e.datepicker._lastInput===t)return;var n,r,i,s,o,a,f;n=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==n&&(e.datepicker._curInst.dpDiv.stop(!0,!0),n&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),r=e.datepicker._get(n,"beforeShow"),i=r?r.apply(t,[t,n]):{};if(i===!1)return;u(n.settings,i),n.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(n),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),s=!1,e(t).parents().each(function(){return s|=e(this).css("position")==="fixed",!s}),o={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,n.dpDiv.empty(),n.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(n),o=e.datepicker._checkOffset(n,o,s),n.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":s?"fixed":"absolute",display:"none",left:o.left+"px",top:o.top+"px"}),n.inline||(a=e.datepicker._get(n,"showAnim"),f=e.datepicker._get(n,"duration"),n.dpDiv.zIndex(e(t).zIndex()+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[a]?n.dpDiv.show(a,e.datepicker._get(n,"showOptions"),f):n.dpDiv[a||"show"](a?f:null),n.input.is(":visible")&&!n.input.is(":disabled")&&n.input.focus(),e.datepicker._curInst=n)},_updateDatepicker:function(t){this.maxRows=4,i=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t),t.dpDiv.find("."+this._dayOverClass+" a").mouseover();var n,r=this._getNumberOfMonths(t),s=r[1],o=17;t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),s>1&&t.dpDiv.addClass("ui-datepicker-multi-"+s).css("width",o*s+"em"),t.dpDiv[(r[0]!==1||r[1]!==1?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&t.input[0]!==document.activeElement&&t.input.focus(),t.yearshtml&&(n=t.yearshtml,setTimeout(function(){n===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),n=t.yearshtml=null},0))},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(t,n,r){var i=t.dpDiv.outerWidth(),s=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,u=t.input?t.input.outerHeight():0,a=document.documentElement.clientWidth+(r?0:e(document).scrollLeft()),f=document.documentElement.clientHeight+(r?0:e(document).scrollTop());return n.left-=this._get(t,"isRTL")?i-o:0,n.left-=r&&n.left===t.input.offset().left?e(document).scrollLeft():0,n.top-=r&&n.top===t.input.offset().top+u?e(document).scrollTop():0,n.left-=Math.min(n.left,n.left+i>a&&a>i?Math.abs(n.left+i-a):0),n.top-=Math.min(n.top,n.top+s>f&&f>s?Math.abs(s+u):0),n},_findPos:function(t){var n,r=this._getInst(t),i=this._get(r,"isRTL");while(t&&(t.type==="hidden"||t.nodeType!==1||e.expr.filters.hidden(t)))t=t[i?"previousSibling":"nextSibling"];return n=e(t).offset(),[n.left,n.top]},_hideDatepicker:function(t){var r,i,s,o,u=this._curInst;if(!u||t&&u!==e.data(t,n))return;this._datepickerShowing&&(r=this._get(u,"showAnim"),i=this._get(u,"duration"),s=function(){e.datepicker._tidyDialog(u)},e.effects&&(e.effects.effect[r]||e.effects[r])?u.dpDiv.hide(r,e.datepicker._get(u,"showOptions"),i,s):u.dpDiv[r==="slideDown"?"slideUp":r==="fadeIn"?"fadeOut":"hide"](r?i:null,s),r||s(),this._datepickerShowing=!1,o=this._get(u,"onClose"),o&&o.apply(u.input?u.input[0]:null,[u.input?u.input.val():"",u]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(!e.datepicker._curInst)return;var n=e(t.target),r=e.datepicker._getInst(n[0]);(n[0].id!==e.datepicker._mainDivId&&n.parents("#"+e.datepicker._mainDivId).length===0&&!n.hasClass(e.datepicker.markerClassName)&&!n.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||n.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==r)&&e.datepicker._hideDatepicker()},_adjustDate:function(t,n,r){var i=e(t),s=this._getInst(i[0]);if(this._isDisabledDatepicker(i[0]))return;this._adjustInstDate(s,n+(r==="M"?this._get(s,"showCurrentAtPos"):0),r),this._updateDatepicker(s)},_gotoToday:function(t){var n,r=e(t),i=this._getInst(r[0]);this._get(i,"gotoCurrent")&&i.currentDay?(i.selectedDay=i.currentDay,i.drawMonth=i.selectedMonth=i.currentMonth,i.drawYear=i.selectedYear=i.currentYear):(n=new Date,i.selectedDay=n.getDate(),i.drawMonth=i.selectedMonth=n.getMonth(),i.drawYear=i.selectedYear=n.getFullYear()),this._notifyChange(i),this._adjustDate(r)},_selectMonthYear:function(t,n,r){var i=e(t),s=this._getInst(i[0]);s["selected"+(r==="M"?"Month":"Year")]=s["draw"+(r==="M"?"Month":"Year")]=parseInt(n.options[n.selectedIndex].value,10),this._notifyChange(s),this._adjustDate(i)},_selectDay:function(t,n,r,i){var s,o=e(t);if(e(i).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0]))return;s=this._getInst(o[0]),s.selectedDay=s.currentDay=e("a",i).html(),s.selectedMonth=s.currentMonth=n,s.selectedYear=s.currentYear=r,this._selectDate(t,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear))},_clearDate:function(t){var n=e(t);this._selectDate(n,"")},_selectDate:function(t,n){var r,i=e(t),s=this._getInst(i[0]);n=n!=null?n:this._formatDate(s),s.input&&s.input.val(n),this._updateAlternate(s),r=this._get(s,"onSelect"),r?r.apply(s.input?s.input[0]:null,[n,s]):s.input&&s.input.trigger("change"),s.inline?this._updateDatepicker(s):(this._hideDatepicker(),this._lastInput=s.input[0],typeof s.input[0]!="object"&&s.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var n,r,i,s=this._get(t,"altField");s&&(n=this._get(t,"altFormat")||this._get(t,"dateFormat"),r=this._getDate(t),i=this.formatDate(n,r,this._getFormatConfig(t)),e(s).each(function(){e(this).val(i)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},iso8601Week:function(e){var t,n=new Date(e.getTime());return n.setDate(n.getDate()+4-(n.getDay()||7)),t=n.getTime(),n.setMonth(0),n.setDate(1),Math.floor(Math.round((t-n)/864e5)/7)+1},parseDate:function(t,n,r){if(t==null||n==null)throw"Invalid arguments";n=typeof n=="object"?n.toString():n+"";if(n==="")return null;var i,s,o,u=0,a=(r?r.shortYearCutoff:null)||this._defaults.shortYearCutoff,f=typeof a!="string"?a:(new Date).getFullYear()%100+parseInt(a,10),l=(r?r.dayNamesShort:null)||this._defaults.dayNamesShort,c=(r?r.dayNames:null)||this._defaults.dayNames,h=(r?r.monthNamesShort:null)||this._defaults.monthNamesShort,p=(r?r.monthNames:null)||this._defaults.monthNames,d=-1,v=-1,m=-1,g=-1,y=!1,b,w=function(e){var n=i+1<t.length&&t.charAt(i+1)===e;return n&&i++,n},E=function(e){var t=w(e),r=e==="@"?14:e==="!"?20:e==="y"&&t?4:e==="o"?3:2,i=new RegExp("^\\d{1,"+r+"}"),s=n.substring(u).match(i);if(!s)throw"Missing number at position "+u;return u+=s[0].length,parseInt(s[0],10)},S=function(t,r,i){var s=-1,o=e.map(w(t)?i:r,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});e.each(o,function(e,t){var r=t[1];if(n.substr(u,r.length).toLowerCase()===r.toLowerCase())return s=t[0],u+=r.length,!1});if(s!==-1)return s+1;throw"Unknown name at position "+u},x=function(){if(n.charAt(u)!==t.charAt(i))throw"Unexpected literal at position "+u;u++};for(i=0;i<t.length;i++)if(y)t.charAt(i)==="'"&&!w("'")?y=!1:x();else switch(t.charAt(i)){case"d":m=E("d");break;case"D":S("D",l,c);break;case"o":g=E("o");break;case"m":v=E("m");break;case"M":v=S("M",h,p);break;case"y":d=E("y");break;case"@":b=new Date(E("@")),d=b.getFullYear(),v=b.getMonth()+1,m=b.getDate();break;case"!":b=new Date((E("!")-this._ticksTo1970)/1e4),d=b.getFullYear(),v=b.getMonth()+1,m=b.getDate();break;case"'":w("'")?x():y=!0;break;default:x()}if(u<n.length){o=n.substr(u);if(!/^\s+/.test(o))throw"Extra/unparsed characters found in date: "+o}d===-1?d=(new Date).getFullYear():d<100&&(d+=(new Date).getFullYear()-(new Date).getFullYear()%100+(d<=f?0:-100));if(g>-1){v=1,m=g;do{s=this._getDaysInMonth(d,v-1);if(m<=s)break;v++,m-=s}while(!0)}b=this._daylightSavingAdjust(new Date(d,v-1,m));if(b.getFullYear()!==d||b.getMonth()+1!==v||b.getDate()!==m)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(e,t,n){if(!t)return"";var r,i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=function(t){var n=r+1<e.length&&e.charAt(r+1)===t;return n&&r++,n},f=function(e,t,n){var r=""+t;if(a(e))while(r.length<n)r="0"+r;return r},l=function(e,t,n,r){return a(e)?r[t]:n[t]},c="",h=!1;if(t)for(r=0;r<e.length;r++)if(h)e.charAt(r)==="'"&&!a("'")?h=!1:c+=e.charAt(r);else switch(e.charAt(r)){case"d":c+=f("d",t.getDate(),2);break;case"D":c+=l("D",t.getDay(),i,s);break;case"o":c+=f("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":c+=f("m",t.getMonth()+1,2);break;case"M":c+=l("M",t.getMonth(),o,u);break;case"y":c+=a("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":c+=t.getTime();break;case"!":c+=t.getTime()*1e4+this._ticksTo1970;break;case"'":a("'")?c+="'":h=!0;break;default:c+=e.charAt(r)}return c},_possibleChars:function(e){var t,n="",r=!1,i=function(n){var r=t+1<e.length&&e.charAt(t+1)===n;return r&&t++,r};for(t=0;t<e.length;t++)if(r)e.charAt(t)==="'"&&!i("'")?r=!1:n+=e.charAt(t);else switch(e.charAt(t)){case"d":case"m":case"y":case"@":n+="0123456789";break;case"D":case"M":return null;case"'":i("'")?n+="'":r=!0;break;default:n+=e.charAt(t)}return n},_get:function(e,n){return e.settings[n]!==t?e.settings[n]:this._defaults[n]},_setDateFromField:function(e,t){if(e.input.val()===e.lastVal)return;var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i=this._getDefaultDate(e),s=i,o=this._getFormatConfig(e);try{s=this.parseDate(n,r,o)||i}catch(u){r=t?"":r}e.selectedDay=s.getDate(),e.drawMonth=e.selectedMonth=s.getMonth(),e.drawYear=e.selectedYear=s.getFullYear(),e.currentDay=r?s.getDate():0,e.currentMonth=r?s.getMonth():0,e.currentYear=r?s.getFullYear():0,this._adjustInstDate(e)},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,n,r){var i=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},s=function(n){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),n,e.datepicker._getFormatConfig(t))}catch(r){}var i=(n.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,s=i.getFullYear(),o=i.getMonth(),u=i.getDate(),a=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,f=a.exec(n);while(f){switch(f[2]||"d"){case"d":case"D":u+=parseInt(f[1],10);break;case"w":case"W":u+=parseInt(f[1],10)*7;break;case"m":case"M":o+=parseInt(f[1],10),u=Math.min(u,e.datepicker._getDaysInMonth(s,o));break;case"y":case"Y":s+=parseInt(f[1],10),u=Math.min(u,e.datepicker._getDaysInMonth(s,o))}f=a.exec(n)}return new Date(s,o,u)},o=n==null||n===""?r:typeof n=="string"?s(n):typeof n=="number"?isNaN(n)?r:i(n):new Date(n.getTime());return o=o&&o.toString()==="Invalid Date"?r:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),(i!==e.selectedMonth||s!==e.selectedYear)&&!n&&this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&e.input.val()===""?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var n=this._get(t,"stepMonths"),i="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){window["DP_jQuery_"+r].datepicker._adjustDate(i,-n,"M")},next:function(){window["DP_jQuery_"+r].datepicker._adjustDate(i,+n,"M")},hide:function(){window["DP_jQuery_"+r].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+r].datepicker._gotoToday(i)},selectDay:function(){return window["DP_jQuery_"+r].datepicker._selectDay(i,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+r].datepicker._selectMonthYear(i,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+r].datepicker._selectMonthYear(i,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q=new Date,R=this._daylightSavingAdjust(new Date(q.getFullYear(),q.getMonth(),q.getDate())),U=this._get(e,"isRTL"),z=this._get(e,"showButtonPanel"),W=this._get(e,"hideIfNoPrevNext"),X=this._get(e,"navigationAsDateFormat"),V=this._getNumberOfMonths(e),$=this._get(e,"showCurrentAtPos"),J=this._get(e,"stepMonths"),K=V[0]!==1||V[1]!==1,Q=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(e,"min"),Y=this._getMinMaxDate(e,"max"),Z=e.drawMonth-$,et=e.drawYear;Z<0&&(Z+=12,et--);if(Y){t=this._daylightSavingAdjust(new Date(Y.getFullYear(),Y.getMonth()-V[0]*V[1]+1,Y.getDate())),t=G&&t<G?G:t;while(this._daylightSavingAdjust(new Date(et,Z,1))>t)Z--,Z<0&&(Z=11,et--)}e.drawMonth=Z,e.drawYear=et,n=this._get(e,"prevText"),n=X?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z-J,1)),this._getFormatConfig(e)):n,r=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"e":"w")+"'>"+n+"</span></a>":W?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"e":"w")+"'>"+n+"</span></a>",i=this._get(e,"nextText"),i=X?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z+J,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"w":"e")+"'>"+i+"</span></a>":W?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"w":"e")+"'>"+i+"</span></a>",o=this._get(e,"currentText"),u=this._get(e,"gotoCurrent")&&e.currentDay?Q:R,o=X?this.formatDate(o,u,this._getFormatConfig(e)):o,a=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",f=z?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(U?a:"")+(this._isInRange(e,u)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(U?"":a)+"</div>":"",l=parseInt(this._get(e,"firstDay"),10),l=isNaN(l)?0:l,c=this._get(e,"showWeek"),h=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),d=this._get(e,"monthNames"),v=this._get(e,"monthNamesShort"),m=this._get(e,"beforeShowDay"),g=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),w="",E;for(S=0;S<V[0];S++){x="",this.maxRows=4;for(T=0;T<V[1];T++){N=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),C=" ui-corner-all",k="";if(K){k+="<div class='ui-datepicker-group";if(V[1]>1)switch(T){case 0:k+=" ui-datepicker-group-first",C=" ui-corner-"+(U?"right":"left");break;case V[1]-1:k+=" ui-datepicker-group-last",C=" ui-corner-"+(U?"left":"right");break;default:k+=" ui-datepicker-group-middle",C=""}k+="'>"}k+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+C+"'>"+(/all|left/.test(C)&&S===0?U?s:r:"")+(/all|right/.test(C)&&S===0?U?r:s:"")+this._generateMonthYearHeader(e,Z,et,G,Y,S>0||T>0,d,v)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",L=c?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"";for(E=0;E<7;E++)A=(E+l)%7,L+="<th"+((E+l+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+h[A]+"'>"+p[A]+"</span></th>";k+=L+"</tr></thead><tbody>",O=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,O)),M=(this._getFirstDayOfMonth(et,Z)-l+7)%7,_=Math.ceil((M+O)/7),D=K?this.maxRows>_?this.maxRows:_:_,this.maxRows=D,P=this._daylightSavingAdjust(new Date(et,Z,1-M));for(H=0;H<D;H++){k+="<tr>",B=c?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(P)+"</td>":"";for(E=0;E<7;E++)j=m?m.apply(e.input?e.input[0]:null,[P]):[!0,""],F=P.getMonth()!==Z,I=F&&!y||!j[0]||G&&P<G||Y&&P>Y,B+="<td class='"+((E+l+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(P.getTime()===N.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===P.getTime()&&b.getTime()===N.getTime()?" "+this._dayOverClass:"")+(I?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!g?"":" "+j[1]+(P.getTime()===Q.getTime()?" "+this._currentClass:"")+(P.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+((!F||g)&&j[2]?" title='"+j[2]+"'":"")+(I?"":" data-handler='selectDay' data-event='click' data-month='"+P.getMonth()+"' data-year='"+P.getFullYear()+"'")+">"+(F&&!g?"&#xa0;":I?"<span class='ui-state-default'>"+P.getDate()+"</span>":"<a class='ui-state-default"+(P.getTime()===R.getTime()?" ui-state-highlight":"")+(P.getTime()===Q.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+P.getDate()+"</a>")+"</td>",P.setDate(P.getDate()+1),P=this._daylightSavingAdjust(P);k+=B+"</tr>"}Z++,Z>11&&(Z=0,et++),k+="</tbody></table>"+(K?"</div>"+(V[0]>0&&T===V[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=k}w+=x}return w+=f,e._keyEvent=!1,w},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a,f,l,c,h,p,d,v,m=this._get(e,"changeMonth"),g=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",w="";if(s||!m)w+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{a=r&&r.getFullYear()===n,f=i&&i.getFullYear()===n,w+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";for(l=0;l<12;l++)(!a||l>=r.getMonth())&&(!f||l<=i.getMonth())&&(w+="<option value='"+l+"'"+(l===t?" selected='selected'":"")+">"+u[l]+"</option>");w+="</select>"}y||(b+=w+(s||!m||!g?"&#xa0;":""));if(!e.yearshtml){e.yearshtml="";if(s||!g)b+="<span class='ui-datepicker-year'>"+n+"</span>";else{c=this._get(e,"yearRange").split(":"),h=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?n+parseInt(e.substring(1),10):e.match(/[+\-].*/)?h+parseInt(e,10):parseInt(e,10);return isNaN(t)?h:t},d=p(c[0]),v=Math.max(d,p(c[1]||"")),d=r?Math.max(d,r.getFullYear()):d,v=i?Math.min(v,i.getFullYear()):v,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";for(;d<=v;d++)e.yearshtml+="<option value='"+d+"'"+(d===n?" selected='selected'":"")+">"+d+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}}return b+=this._get(e,"yearSuffix"),y&&(b+=(s||!m||!g?"&#xa0;":"")+w),b+="</div>",b},_adjustInstDate:function(e,t,n){var r=e.drawYear+(n==="Y"?t:0),i=e.drawMonth+(n==="M"?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+(n==="D"?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),(n==="M"||n==="Y")&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&t<n?n:t;return r&&i>r?r:i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return t==null?[1,1]:typeof t=="number"?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(t<0?t:i[0]*i[1]),1));return t<0&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n,r,i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),o=null,u=null,a=this._get(e,"yearRange");return a&&(n=a.split(":"),r=(new Date).getFullYear(),o=parseInt(n[0],10)+r,u=parseInt(n[1],10)+r),(!i||t.getTime()>=i.getTime())&&(!s||t.getTime()<=s.getTime())&&(!o||t.getFullYear()>=o)&&(!u||t.getFullYear()<=u)},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t=typeof t!="string"?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?typeof t=="object"?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),e("#"+e.datepicker._mainDivId).length===0&&e("body").append(e.datepicker.dpDiv);var n=Array.prototype.slice.call(arguments,1);return typeof t!="string"||t!=="isDisabled"&&t!=="getDate"&&t!=="widget"?t==="option"&&arguments.length===2&&typeof arguments[1]=="string"?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(n)):this.each(function(){typeof t=="string"?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(n)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(n))},e.datepicker=new s,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.10.0",window["DP_jQuery_"+r]=e})(jQuery);(function(e,t){e.widget("ui.menu",{version:"1.10.0",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var n=e(t.target).closest(".ui-menu-item");!this.mouseHandled&&n.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(t),n.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&this.active.parents(".ui-menu").length===1&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var n=e(t.currentTarget);n.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var n,r,i,s,o,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,r=this.previousFilter||"",i=String.fromCharCode(t.keyCode),s=!1,clearTimeout(this.filterTimer),i===r?s=!0:i=r+i,o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):n,n.length||(i=String.fromCharCode(t.keyCode),o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),n.length?(this.focus(t,n),n.length>1?(this.previousFilter=i,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,n=this.options.icons.submenu,r=this.element.find(this.options.menus);r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),r=t.prev("a"),i=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);r.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",r.attr("id"))}),t=r.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-—–\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){e==="icons"&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),this._super(e,t)},focus:function(e,t){var n,r;this.blur(e,e&&e.type==="focus"),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&e.type==="keydown"?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},blur:function(e,t){t||clearTimeout(this.timer);if(!this.active)return;this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active})},_startOpening:function(e){clearTimeout(this.timer);if(e.attr("aria-hidden")!=="true")return;this.timer=this._delay(function(){this._close(),this._open(e)},this.delay)},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var r=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));r.length||(r=this.element),this._close(r),this.blur(t),this.activeMenu=r},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(e==="first"||e==="last"?r=this.active[e==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1):r=this.active[e+"All"](".ui-menu-item").eq(0));if(!r||!r.length||!this.active)r=this.activeMenu.children(".ui-menu-item")[t]();this.focus(n,r)},nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())},previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)}})})(jQuery);(function(e){function n(t,n){var r=(t.attr("aria-describedby")||"").split(/\s+/);r.push(n),t.data("ui-tooltip-id",n).attr("aria-describedby",e.trim(r.join(" ")))}function r(t){var n=t.data("ui-tooltip-id"),r=(t.attr("aria-describedby")||"").split(/\s+/),i=e.inArray(n,r);i!==-1&&r.splice(i,1),t.removeData("ui-tooltip-id"),r=e.trim(r.join(" ")),r?t.attr("aria-describedby",r):t.removeAttr("aria-describedby")}var t=0;e.widget("ui.tooltip",{version:"1.10.0",options:{content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,n){var r=this;if(t==="disabled"){this[n?"_disable":"_enable"](),this.options[t]=n;return}this._super(t,n),t==="content"&&e.each(this.tooltips,function(e,t){r._updateContent(t)})},_disable:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0)}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var n=this,r=e(t?t.target:this.element).closest(this.options.items);if(!r.length||r.data("ui-tooltip-id"))return;r.attr("title")&&r.data("ui-tooltip-title",r.attr("title")),r.data("ui-tooltip-open",!0),t&&t.type==="mouseover"&&r.parents().each(function(){var t=e(this),r;t.data("ui-tooltip-open")&&(r=e.Event("blur"),r.target=r.currentTarget=this,n.close(r,!0)),t.attr("title")&&(t.uniqueId(),n.parents[this.id]={element:this,title:t.attr("title")},t.attr("title",""))}),this._updateContent(r,t)},_updateContent:function(e,t){var n,r=this.options.content,i=this,s=t?t.type:null;if(typeof r=="string")return this._open(t,e,r);n=r.call(e[0],function(n){if(!e.data("ui-tooltip-open"))return;i._delay(function(){t&&(t.type=s),this._open(t,e,n)})}),n&&this._open(t,e,n)},_open:function(t,r,i){function f(e){a.of=e;if(s.is(":hidden"))return;s.position(a)}var s,o,u,a=e.extend({},this.options.position);if(!i)return;s=this._find(r);if(s.length){s.find(".ui-tooltip-content").html(i);return}r.is("[title]")&&(t&&t.type==="mouseover"?r.attr("title",""):r.removeAttr("title")),s=this._tooltip(r),n(r,s.attr("id")),s.find(".ui-tooltip-content").html(i),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:f}),f(t)):s.position(e.extend({of:r},this.options.position)),s.hide(),this._show(s,this.options.show),this.options.show&&this.options.show.delay&&(u=this.delayedShow=setInterval(function(){s.is(":visible")&&(f(a.of),clearInterval(u))},e.fx.interval)),this._trigger("open",t,{tooltip:s}),o={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var n=e.Event(t);n.currentTarget=r[0],this.close(n,!0)}},remove:function(){this._removeTooltip(s)}};if(!t||t.type==="mouseover")o.mouseleave="close";if(!t||t.type==="focusin")o.focusout="close";this._on(!0,r,o)},close:function(t){var n=this,i=e(t?t.currentTarget:this.element),s=this._find(i);if(this.closing)return;clearInterval(this.delayedShow),i.data("ui-tooltip-title")&&i.attr("title",i.data("ui-tooltip-title")),r(i),s.stop(!0),this._hide(s,this.options.hide,function(){n._removeTooltip(e(this))}),i.removeData("ui-tooltip-open"),this._off(i,"mouseleave focusout keyup"),i[0]!==this.element[0]&&this._off(i,"remove"),this._off(this.document,"mousemove"),t&&t.type==="mouseleave"&&e.each(this.parents,function(t,r){e(r.element).attr("title",r.title),delete n.parents[t]}),this.closing=!0,this._trigger("close",t,{tooltip:s}),this.closing=!1},_tooltip:function(n){var r="ui-tooltip-"+t++,i=e("<div>").attr({id:r,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[r]=n,i},_find:function(t){var n=t.data("ui-tooltip-id");return n?e("#"+n):e()},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(n,r){var i=e.Event("blur");i.target=i.currentTarget=r[0],t.close(i,!0),e("#"+n).remove(),r.data("ui-tooltip-title")&&(r.attr("title",r.data("ui-tooltip-title")),r.removeData("ui-tooltip-title"))})}})})(jQuery);jQuery.effects||function(e,t){var n="ui-effects-";e.effects={effect:{}},function(e,t){function h(e,t,n){var r=u[t.type]||{};return e==null?n||!t.def?null:t.def:(e=r.floor?~~e:parseFloat(e),isNaN(e)?t.def:r.mod?(e+r.mod)%r.mod:0>e?0:r.max<e?r.max:e)}function p(t){var n=s(),r=n._rgba=[];return t=t.toLowerCase(),c(i,function(e,i){var s,u=i.re.exec(t),a=u&&i.parse(u),f=i.space||"rgba";if(a)return s=n[f](a),n[o[f].cache]=s[o[f].cache],r=n._rgba=s._rgba,!1}),r.length?(r.join()==="0,0,0,0"&&e.extend(r,l.transparent),n):l[t]}function d(e,t,n){return n=(n+1)%1,n*6<1?e+(t-e)*n*6:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e}var n="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,i=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1]*2.55,e[2]*2.55,e[3]*2.55,e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],s=e.Color=function(t,n,r,i){return new e.Color.fn.parse(t,n,r,i)},o={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},a=s.support={},f=e("<p>")[0],l,c=e.each;f.style.cssText="background-color:rgba(1,1,1,.5)",a.rgba=f.style.backgroundColor.indexOf("rgba")>-1,c(o,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),s.fn=e.extend(s.prototype,{parse:function(n,r,i,u){if(n===t)return this._rgba=[null,null,null,null],this;if(n.jquery||n.nodeType)n=e(n).css(r),r=t;var a=this,f=e.type(n),d=this._rgba=[];r!==t&&(n=[n,r,i,u],f="array");if(f==="string")return this.parse(p(n)||l._default);if(f==="array")return c(o.rgba.props,function(e,t){d[t.idx]=h(n[t.idx],t)}),this;if(f==="object")return n instanceof s?c(o,function(e,t){n[t.cache]&&(a[t.cache]=n[t.cache].slice())}):c(o,function(t,r){var i=r.cache;c(r.props,function(e,t){if(!a[i]&&r.to){if(e==="alpha"||n[e]==null)return;a[i]=r.to(a._rgba)}a[i][t.idx]=h(n[e],t,!0)}),a[i]&&e.inArray(null,a[i].slice(0,3))<0&&(a[i][3]=1,r.from&&(a._rgba=r.from(a[i])))}),this},is:function(e){var t=s(e),n=!0,r=this;return c(o,function(e,i){var s,o=t[i.cache];return o&&(s=r[i.cache]||i.to&&i.to(r._rgba)||[],c(i.props,function(e,t){if(o[t.idx]!=null)return n=o[t.idx]===s[t.idx],n})),n}),n},_space:function(){var e=[],t=this;return c(o,function(n,r){t[r.cache]&&e.push(n)}),e.pop()},transition:function(e,t){var n=s(e),r=n._space(),i=o[r],a=this.alpha()===0?s("transparent"):this,f=a[i.cache]||i.to(a._rgba),l=f.slice();return n=n[i.cache],c(i.props,function(e,r){var i=r.idx,s=f[i],o=n[i],a=u[r.type]||{};if(o===null)return;s===null?l[i]=o:(a.mod&&(o-s>a.mod/2?s+=a.mod:s-o>a.mod/2&&(s-=a.mod)),l[i]=h((o-s)*t+s,r))}),this[r](l)},blend:function(t){if(this._rgba[3]===1)return this;var n=this._rgba.slice(),r=n.pop(),i=s(t)._rgba;return s(e.map(n,function(e,t){return(1-r)*i[t]+r*e}))},toRgbaString:function(){var t="rgba(",n=e.map(this._rgba,function(e,t){return e==null?t>2?1:0:e});return n[3]===1&&(n.pop(),t="rgb("),t+n.join()+")"},toHslaString:function(){var t="hsla(",n=e.map(this.hsla(),function(e,t){return e==null&&(e=t>2?1:0),t&&t<3&&(e=Math.round(e*100)+"%"),e});return n[3]===1&&(n.pop(),t="hsl("),t+n.join()+")"},toHexString:function(t){var n=this._rgba.slice(),r=n.pop();return t&&n.push(~~(r*255)),"#"+e.map(n,function(e){return e=(e||0).toString(16),e.length===1?"0"+e:e}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}}),s.fn.parse.prototype=s.fn,o.hsla.to=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/255,n=e[1]/255,r=e[2]/255,i=e[3],s=Math.max(t,n,r),o=Math.min(t,n,r),u=s-o,a=s+o,f=a*.5,l,c;return o===s?l=0:t===s?l=60*(n-r)/u+360:n===s?l=60*(r-t)/u+120:l=60*(t-n)/u+240,u===0?c=0:f<=.5?c=u/a:c=u/(2-a),[Math.round(l)%360,c,f,i==null?1:i]},o.hsla.from=function(e){if(e[0]==null||e[1]==null||e[2]==null)return[null,null,null,e[3]];var t=e[0]/360,n=e[1],r=e[2],i=e[3],s=r<=.5?r*(1+n):r+n-r*n,o=2*r-s;return[Math.round(d(o,s,t+1/3)*255),Math.round(d(o,s,t)*255),Math.round(d(o,s,t-1/3)*255),i]},c(o,function(n,i){var o=i.props,u=i.cache,a=i.to,f=i.from;s.fn[n]=function(n){a&&!this[u]&&(this[u]=a(this._rgba));if(n===t)return this[u].slice();var r,i=e.type(n),l=i==="array"||i==="object"?n:arguments,p=this[u].slice();return c(o,function(e,t){var n=l[i==="object"?e:t.idx];n==null&&(n=p[t.idx]),p[t.idx]=h(n,t)}),f?(r=s(f(p)),r[u]=p,r):s(p)},c(o,function(t,i){if(s.fn[t])return;s.fn[t]=function(s){var o=e.type(s),u=t==="alpha"?this._hsla?"hsla":"rgba":n,a=this[u](),f=a[i.idx],l;return o==="undefined"?f:(o==="function"&&(s=s.call(this,f),o=e.type(s)),s==null&&i.empty?this:(o==="string"&&(l=r.exec(s),l&&(s=f+parseFloat(l[2])*(l[1]==="+"?1:-1))),a[i.idx]=s,this[u](a)))}})}),s.hook=function(t){var n=t.split(" ");c(n,function(t,n){e.cssHooks[n]={set:function(t,r){var i,o,u="";if(r!=="transparent"&&(e.type(r)!=="string"||(i=p(r)))){r=s(i||r);if(!a.rgba&&r._rgba[3]!==1){o=n==="backgroundColor"?t.parentNode:t;while((u===""||u==="transparent")&&o&&o.style)try{u=e.css(o,"backgroundColor"),o=o.parentNode}catch(f){}r=r.blend(u&&u!=="transparent"?u:"_default")}r=r.toRgbaString()}try{t.style[n]=r}catch(f){}}},e.fx.step[n]=function(t){t.colorInit||(t.start=s(t.elem,n),t.end=s(t.end),t.colorInit=!0),e.cssHooks[n].set(t.elem,t.start.transition(t.end,t.pos))}})},s.hook(n),e.cssHooks.borderColor={expand:function(e){var t={};return c(["Top","Right","Bottom","Left"],function(n,r){t["border"+r+"Color"]=e}),t}},l=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(t){var n,r,i=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,s={};if(i&&i.length&&i[0]&&i[i[0]]){r=i.length;while(r--)n=i[r],typeof i[n]=="string"&&(s[e.camelCase(n)]=i[n])}else for(n in i)typeof i[n]=="string"&&(s[n]=i[n]);return s}function s(t,n){var i={},s,o;for(s in n)o=n[s],t[s]!==o&&!r[s]&&(e.fx.step[s]||!isNaN(parseFloat(o)))&&(i[s]=o);return i}var n=["add","remove","toggle"],r={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){e.fx.step[n]=function(e){if(e.end!=="none"&&!e.setAttr||e.pos===1&&!e.setAttr)jQuery.style(e.elem,n,e.end),e.setAttr=!0}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(t,r,o,u){var a=e.speed(r,o,u);return this.queue(function(){var r=e(this),o=r.attr("class")||"",u,f=a.children?r.find("*").addBack():r;f=f.map(function(){var t=e(this);return{el:t,start:i(this)}}),u=function(){e.each(n,function(e,n){t[n]&&r[n+"Class"](t[n])})},u(),f=f.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),r.attr("class",o),f=f.map(function(){var t=this,n=e.Deferred(),r=e.extend({},a,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,r),n.promise()}),e.when.apply(e,f.get()).done(function(){u(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),a.complete.call(r[0])})})},e.fn.extend({_addClass:e.fn.addClass,addClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{add:t},n,r,i):this._addClass(t)},_removeClass:e.fn.removeClass,removeClass:function(t,n,r,i){return n?e.effects.animateClass.call(this,{remove:t},n,r,i):this._removeClass(t)},_toggleClass:e.fn.toggleClass,toggleClass:function(n,r,i,s,o){return typeof r=="boolean"||r===t?i?e.effects.animateClass.call(this,r?{add:n}:{remove:n},i,s,o):this._toggleClass(n,r):e.effects.animateClass.call(this,{toggle:n},r,i,s)},switchClass:function(t,n,r,i,s){return e.effects.animateClass.call(this,{add:n,remove:t},r,i,s)}})}(),function(){function r(t,n,r,i){e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},n==null&&(n={}),e.isFunction(n)&&(i=n,r=null,n={});if(typeof n=="number"||e.fx.speeds[n])i=r,r=n,n={};return e.isFunction(r)&&(i=r,r=null),n&&e.extend(t,n),r=r||n.duration,t.duration=e.fx.off?0:typeof r=="number"?r:r in e.fx.speeds?e.fx.speeds[r]:e.fx.speeds._default,t.complete=i||n.complete,t}function i(t){return!t||typeof t=="number"||e.fx.speeds[t]?!0:typeof t=="string"&&!e.effects.effect[t]}e.extend(e.effects,{version:"1.10.0",save:function(e,t){for(var r=0;r<t.length;r++)t[r]!==null&&e.data(n+t[r],e[0].style[t[r]])},restore:function(e,r){var i,s;for(s=0;s<r.length;s++)r[s]!==null&&(i=e.data(n+r[s]),i===t&&(i=""),e.css(r[s],i))},setMode:function(e,t){return t==="toggle"&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var n,r;switch(e[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=e[0]/t.height}switch(e[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=e[1]/t.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),i={width:t.width(),height:t.height()},s=document.activeElement;try{s.id}catch(o){s=document.body}return t.wrap(r),(t[0]===s||e.contains(t[0],s))&&e(s).focus(),r=t.parent(),t.css("position")==="static"?(r.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,r){n[r]=t.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(i),r.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).focus()),t},setTransition:function(t,n,r,i){return i=i||{},e.each(n,function(e,n){var s=t.cssUnit(n);s[0]>0&&(i[n]=s[0]*r+s[1])}),i}}),e.fn.extend({effect:function(){function o(n){function u(){e.isFunction(i)&&i.call(r[0]),e.isFunction(n)&&n()}var r=e(this),i=t.complete,o=t.mode;(r.is(":hidden")?o==="hide":o==="show")?u():s.call(r[0],t,u)}var t=r.apply(this,arguments),n=t.mode,i=t.queue,s=e.effects.effect[t.effect];return e.fx.off||!s?n?this[n](t.duration,t.complete):this.each(function(){t.complete&&t.complete.call(this)}):i===!1?this.each(o):this.queue(i||"fx",o)},_show:e.fn.show,show:function(e){if(i(e))return this._show.apply(this,arguments);var t=r.apply(this,arguments);return t.mode="show",this.effect.call(this,t)},_hide:e.fn.hide,hide:function(e){if(i(e))return this._hide.apply(this,arguments);var t=r.apply(this,arguments);return t.mode="hide",this.effect.call(this,t)},__toggle:e.fn.toggle,toggle:function(t){if(i(t)||typeof t=="boolean"||e.isFunction(t))return this.__toggle.apply(this,arguments);var n=r.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)},cssUnit:function(t){var n=this.css(t),r=[];return e.each(["em","px","%","pt"],function(e,t){n.indexOf(t)>0&&(r=[parseFloat(n),t])}),r}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return e===0||e===1?e:-Math.pow(2,8*(e-1))*Math.sin(((e-1)*80-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){var t,n=4;while(e<((t=Math.pow(2,--n))-1)/11);return 1/Math.pow(4,3-n)-7.5625*Math.pow((t*3-2)/22-e,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(e){return 1-n(1-e)},e.easing["easeInOut"+t]=function(e){return e<.5?n(e*2)/2:1-n(e*-2+2)/2}})}()}(jQuery);(function(e,t){var n=/up|down|vertical/,r=/up|left|vertical|horizontal/;e.effects.effect.blind=function(t,i){var s=e(this),o=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(s,t.mode||"hide"),a=t.direction||"up",f=n.test(a),l=f?"height":"width",c=f?"top":"left",h=r.test(a),p={},d=u==="show",v,m,g;s.parent().is(".ui-effects-wrapper")?e.effects.save(s.parent(),o):e.effects.save(s,o),s.show(),v=e.effects.createWrapper(s).css({overflow:"hidden"}),m=v[l](),g=parseFloat(v.css(c))||0,p[l]=d?m:0,h||(s.css(f?"bottom":"right",0).css(f?"top":"left","auto").css({position:"absolute"}),p[c]=d?g:m+g),d&&(v.css(l,0),h||v.css(c,g+m)),v.animate(p,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){u==="hide"&&s.hide(),e.effects.restore(s,o),e.effects.removeWrapper(s),i()}})}})(jQuery);(function(e,t){e.effects.effect.bounce=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=s==="hide",u=s==="show",a=t.direction||"up",f=t.distance,l=t.times||5,c=l*2+(u||o?1:0),h=t.duration/c,p=t.easing,d=a==="up"||a==="down"?"top":"left",v=a==="up"||a==="left",m,g,y,b=r.queue(),w=b.length;(u||o)&&i.push("opacity"),e.effects.save(r,i),r.show(),e.effects.createWrapper(r),f||(f=r[d==="top"?"outerHeight":"outerWidth"]()/3),u&&(y={opacity:1},y[d]=0,r.css("opacity",0).css(d,v?-f*2:f*2).animate(y,h,p)),o&&(f/=Math.pow(2,l-1)),y={},y[d]=0;for(m=0;m<l;m++)g={},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p).animate(y,h,p),f=o?f*2:f/2;o&&(g={opacity:0},g[d]=(v?"-=":"+=")+f,r.animate(g,h,p)),r.queue(function(){o&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),w>1&&b.splice.apply(b,[1,0].concat(b.splice(w,c+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.clip=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"vertical",a=u==="vertical",f=a?"height":"width",l=a?"top":"left",c={},h,p,d;e.effects.save(r,i),r.show(),h=e.effects.createWrapper(r).css({overflow:"hidden"}),p=r[0].tagName==="IMG"?h:r,d=p[f](),o&&(p.css(f,0),p.css(l,d/2)),c[f]=o?d:0,c[l]=o?0:d/2,p.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o||r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.drop=function(t,n){var r=e(this),i=["position","top","bottom","left","right","opacity","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left"?"pos":"neg",l={opacity:o?1:0},c;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),c=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0)/2,o&&r.css("opacity",0).css(a,f==="pos"?-c:c),l[a]=(o?f==="pos"?"+=":"-=":f==="pos"?"-=":"+=")+c,r.animate(l,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.explode=function(t,n){function y(){c.push(this),c.length===r*i&&b()}function b(){s.css({visibility:"visible"}),e(c).remove(),u||s.hide(),n()}var r=t.pieces?Math.round(Math.sqrt(t.pieces)):3,i=r,s=e(this),o=e.effects.setMode(s,t.mode||"hide"),u=o==="show",a=s.show().css("visibility","hidden").offset(),f=Math.ceil(s.outerWidth()/i),l=Math.ceil(s.outerHeight()/r),c=[],h,p,d,v,m,g;for(h=0;h<r;h++){v=a.top+h*l,g=h-(r-1)/2;for(p=0;p<i;p++)d=a.left+p*f,m=p-(i-1)/2,s.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-p*f,top:-h*l}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:f,height:l,left:d+(u?m*f:0),top:v+(u?g*l:0),opacity:u?0:1}).animate({left:d+(u?0:m*f),top:v+(u?0:g*l),opacity:u?1:0},t.duration||500,t.easing,y)}}})(jQuery);(function(e,t){e.effects.effect.fade=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"toggle");r.animate({opacity:i},{queue:!1,duration:t.duration,easing:t.easing,complete:n})}})(jQuery);(function(e,t){e.effects.effect.fold=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"hide"),o=s==="show",u=s==="hide",a=t.size||15,f=/([0-9]+)%/.exec(a),l=!!t.horizFirst,c=o!==l,h=c?["width","height"]:["height","width"],p=t.duration/2,d,v,m={},g={};e.effects.save(r,i),r.show(),d=e.effects.createWrapper(r).css({overflow:"hidden"}),v=c?[d.width(),d.height()]:[d.height(),d.width()],f&&(a=parseInt(f[1],10)/100*v[u?0:1]),o&&d.css(l?{height:0,width:a}:{height:a,width:0}),m[h[0]]=o?v[0]:a,g[h[1]]=o?v[1]:0,d.animate(m,p,t.easing).animate(g,p,t.easing,function(){u&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()})}})(jQuery);(function(e,t){e.effects.effect.highlight=function(t,n){var r=e(this),i=["backgroundImage","backgroundColor","opacity"],s=e.effects.setMode(r,t.mode||"show"),o={backgroundColor:r.css("backgroundColor")};s==="hide"&&(o.opacity=0),e.effects.save(r,i),r.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),n()}})}})(jQuery);(function(e,t){e.effects.effect.pulsate=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"show"),s=i==="show",o=i==="hide",u=s||i==="hide",a=(t.times||5)*2+(u?1:0),f=t.duration/a,l=0,c=r.queue(),h=c.length,p;if(s||!r.is(":visible"))r.css("opacity",0).show(),l=1;for(p=1;p<a;p++)r.animate({opacity:l},f,t.easing),l=1-l;r.animate({opacity:l},f,t.easing),r.queue(function(){o&&r.hide(),n()}),h>1&&c.splice.apply(c,[1,0].concat(c.splice(h,a+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.puff=function(t,n){var r=e(this),i=e.effects.setMode(r,t.mode||"hide"),s=i==="hide",o=parseInt(t.percent,10)||150,u=o/100,a={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:i,complete:n,percent:s?o:100,from:s?a:{height:a.height*u,width:a.width*u,outerHeight:a.outerHeight*u,outerWidth:a.outerWidth*u}}),r.effect(t)},e.effects.effect.scale=function(t,n){var r=e(this),i=e.extend(!0,{},t),s=e.effects.setMode(r,t.mode||"effect"),o=parseInt(t.percent,10)||(parseInt(t.percent,10)===0?0:s==="hide"?0:100),u=t.direction||"both",a=t.origin,f={height:r.height(),width:r.width(),outerHeight:r.outerHeight(),outerWidth:r.outerWidth()},l={y:u!=="horizontal"?o/100:1,x:u!=="vertical"?o/100:1};i.effect="size",i.queue=!1,i.complete=n,s!=="effect"&&(i.origin=a||["middle","center"],i.restore=!0),i.from=t.from||(s==="show"?{height:0,width:0,outerHeight:0,outerWidth:0}:f),i.to={height:f.height*l.y,width:f.width*l.x,outerHeight:f.outerHeight*l.y,outerWidth:f.outerWidth*l.x},i.fade&&(s==="show"&&(i.from.opacity=0,i.to.opacity=1),s==="hide"&&(i.from.opacity=1,i.to.opacity=0)),r.effect(i)},e.effects.effect.size=function(t,n){var r,i,s,o=e(this),u=["position","top","bottom","left","right","width","height","overflow","opacity"],a=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],l=["fontSize"],c=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),d=t.restore||p!=="effect",v=t.scale||"both",m=t.origin||["middle","center"],g=o.css("position"),y=d?u:a,b={height:0,width:0,outerHeight:0,outerWidth:0};p==="show"&&o.show(),r={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},t.mode==="toggle"&&p==="show"?(o.from=t.to||b,o.to=t.from||r):(o.from=t.from||(p==="show"?b:r),o.to=t.to||(p==="hide"?b:r)),s={from:{y:o.from.height/r.height,x:o.from.width/r.width},to:{y:o.to.height/r.height,x:o.to.width/r.width}};if(v==="box"||v==="both")s.from.y!==s.to.y&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,s.from.y,o.from),o.to=e.effects.setTransition(o,c,s.to.y,o.to)),s.from.x!==s.to.x&&(y=y.concat(h),o.from=e.effects.setTransition(o,h,s.from.x,o.from),o.to=e.effects.setTransition(o,h,s.to.x,o.to));(v==="content"||v==="both")&&s.from.y!==s.to.y&&(y=y.concat(l).concat(f),o.from=e.effects.setTransition(o,l,s.from.y,o.from),o.to=e.effects.setTransition(o,l,s.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),m&&(i=e.effects.getBaseline(m,r),o.from.top=(r.outerHeight-o.outerHeight())*i.y,o.from.left=(r.outerWidth-o.outerWidth())*i.x,o.to.top=(r.outerHeight-o.to.outerHeight)*i.y,o.to.left=(r.outerWidth-o.to.outerWidth)*i.x),o.css(o.from);if(v==="content"||v==="both")c=c.concat(["marginTop","marginBottom"]).concat(l),h=h.concat(["marginLeft","marginRight"]),f=u.concat(c).concat(h),o.find("*[width]").each(function(){var n=e(this),r={height:n.height(),width:n.width(),outerHeight:n.outerHeight(),outerWidth:n.outerWidth()};d&&e.effects.save(n,f),n.from={height:r.height*s.from.y,width:r.width*s.from.x,outerHeight:r.outerHeight*s.from.y,outerWidth:r.outerWidth*s.from.x},n.to={height:r.height*s.to.y,width:r.width*s.to.x,outerHeight:r.height*s.to.y,outerWidth:r.width*s.to.x},s.from.y!==s.to.y&&(n.from=e.effects.setTransition(n,c,s.from.y,n.from),n.to=e.effects.setTransition(n,c,s.to.y,n.to)),s.from.x!==s.to.x&&(n.from=e.effects.setTransition(n,h,s.from.x,n.from),n.to=e.effects.setTransition(n,h,s.to.x,n.to)),n.css(n.from),n.animate(n.to,t.duration,t.easing,function(){d&&e.effects.restore(n,f)})});o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){o.to.opacity===0&&o.css("opacity",o.from.opacity),p==="hide"&&o.hide(),e.effects.restore(o,y),d||(g==="static"?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,n){var r=parseInt(n,10),i=e?o.to.left:o.to.top;return n==="auto"?i+"px":r+i+"px"})})),e.effects.removeWrapper(o),n()}})}})(jQuery);(function(e,t){e.effects.effect.shake=function(t,n){var r=e(this),i=["position","top","bottom","left","right","height","width"],s=e.effects.setMode(r,t.mode||"effect"),o=t.direction||"left",u=t.distance||20,a=t.times||3,f=a*2+1,l=Math.round(t.duration/f),c=o==="up"||o==="down"?"top":"left",h=o==="up"||o==="left",p={},d={},v={},m,g=r.queue(),y=g.length;e.effects.save(r,i),r.show(),e.effects.createWrapper(r),p[c]=(h?"-=":"+=")+u,d[c]=(h?"+=":"-=")+u*2,v[c]=(h?"-=":"+=")+u*2,r.animate(p,l,t.easing);for(m=1;m<a;m++)r.animate(d,l,t.easing).animate(v,l,t.easing);r.animate(d,l,t.easing).animate(p,l/2,t.easing).queue(function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}),y>1&&g.splice.apply(g,[1,0].concat(g.splice(y,f+1))),r.dequeue()}})(jQuery);(function(e,t){e.effects.effect.slide=function(t,n){var r=e(this),i=["position","top","bottom","left","right","width","height"],s=e.effects.setMode(r,t.mode||"show"),o=s==="show",u=t.direction||"left",a=u==="up"||u==="down"?"top":"left",f=u==="up"||u==="left",l,c={};e.effects.save(r,i),r.show(),l=t.distance||r[a==="top"?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(r).css({overflow:"hidden"}),o&&r.css(a,f?isNaN(l)?"-"+l:-l:l),c[a]=(o?f?"+=":"-=":f?"-=":"+=")+l,r.animate(c,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){s==="hide"&&r.hide(),e.effects.restore(r,i),e.effects.removeWrapper(r),n()}})}})(jQuery);(function(e,t){e.effects.effect.transfer=function(t,n){var r=e(this),i=e(t.to),s=i.css("position")==="fixed",o=e("body"),u=s?o.scrollTop():0,a=s?o.scrollLeft():0,f=i.offset(),l={top:f.top-u,left:f.left-a,height:i.innerHeight(),width:i.innerWidth()},c=r.offset(),h=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:c.top-u,left:c.left-a,height:r.innerHeight(),width:r.innerWidth(),position:s?"fixed":"absolute"}).animate(l,t.duration,t.easing,function(){h.remove(),n()})}})(jQuery);

/*jquery-mobile-events*/
(function(e){function h(){var e=i();if(e!==s){s=e;n.trigger("orientationchange")}}function b(t,n,r){var i=r.type;r.type=n;e.event.dispatch.call(t,r);r.type=i}e.attrFn=e.attrFn||{};var t={swipe_h_threshold:50,swipe_v_threshold:50,taphold_threshold:750,doubletap_int:500,touch_capable:"ontouchstart"in document.documentElement&&navigator.userAgent.toLowerCase().indexOf("chrome")==-1,orientation_support:"orientation"in window&&"onorientationchange"in window,startevent:"touchstart mousedown",endevent:"touchend mouseup",moveevent:"touchmove mousemove",tapevent:"tap click",scrollevent:"touchmove scroll",hold_timer:null,tap_timer:null};e.each("tapstart tapend tap singletap doubletap taphold swipe swipeup swiperight swipedown swipeleft scrollstart scrollend orientationchange".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)};e.attrFn[n]=true});e.event.special.tapstart={setup:function(){var n=this,r=e(n);r.bind(t.startevent,function(e){if(e.which&&e.which!==1){return false}else{b(n,t.startevent,e);return true}})}};e.event.special.tapend={setup:function(){var n=this,r=e(n);r.bind(t.endevent,function(e){b(n,t.endevent,e)})}};e.event.special.taphold={setup:function(){var n=this,r=e(n),i,s,o={x:0,y:0};r.bind(t.startevent,function(e){if(e.which&&e.which!==1){return false}else{r.data("tapheld",false);i=e.target;o.x=t.touch_capable?e.targetTouches[0].pageX:e.pageX;o.y=t.touch_capable?e.targetTouches[0].pageY:e.pageY;t.hold_timer=window.setTimeout(function(){var s=t.touch_capable?e.targetTouches[0].pageX:e.pageX,u=t.touch_capable?e.targetTouches[0].pageY:e.pageY;if(e.target==i&&o.x==s&&o.y==u){r.data("tapheld",true);b(n,"taphold",e)}},t.taphold_threshold);return true}}).bind(t.endevent,function(){window.clearTimeout(t.hold_timer)})}};e.event.special.doubletap={setup:function(){var n=this,r=e(n),i,s;r.bind(t.startevent,function(e){if(e.which&&e.which!==1){return false}else{r.data("doubletapped",false);i=e.target;return true}}).bind(t.endevent,function(e){var o=(new Date).getTime();var u=r.data("lastTouch")||o+1;var a=o-u;window.clearTimeout(s);if(a<t.doubletap_int&&a>0&&e.target==i&&a>100){r.data("doubletapped",true);window.clearTimeout(t.tap_timer);b(n,"doubletap",e)}else{r.data("lastTouch",o);s=window.setTimeout(function(e){window.clearTimeout(s)},t.doubletap_int,[e])}r.data("lastTouch",o)})}};e.event.special.singletap={setup:function(){var n=this,r=e(n),i=null,s=null;r.bind(t.startevent,function(e){if(e.which&&e.which!==1){return false}else{s=(new Date).getTime();i=e.target;return true}}).bind(t.endevent,function(e){if(e.target==i){t.tap_timer=window.setTimeout(function(){if(!r.data("doubletapped")&&!r.data("tapheld")){b(n,"singletap",e)}},t.doubletap_int)}})}};e.event.special.tap={setup:function(){var n=this,r=e(n),i=false,s=null,o,u={x:0,y:0};r.bind(t.startevent,function(e){if(e.which&&e.which!==1){return false}else{i=true;u.x=t.touch_capable?e.targetTouches[0].pageX:e.pageX;u.y=t.touch_capable?e.targetTouches[0].pageY:e.pageY;o=(new Date).getTime();s=e.target;return true}}).bind(t.endevent,function(e){var r=t.touch_capable?e.targetTouches[0].pageX:e.pageX,a=t.touch_capable?e.targetTouches[0].pageY:e.pageY;if(s==e.target&&i&&(new Date).getTime()-o<t.taphold_threshold&&u.x==r&&u.y==a){b(n,"tap",e)}})}};e.event.special.swipe={setup:function(){function u(e){s.x=t.touch_capable?e.targetTouches[0].pageX:e.pageX;s.y=t.touch_capable?e.targetTouches[0].pageY:e.pageY;o.x=s.x;o.y=s.y;i=true}function a(e){e.stopPropagation();o.x=t.touch_capable?e.targetTouches[0].pageX:e.pageX;o.y=t.touch_capable?e.targetTouches[0].pageY:e.pageY;window.clearTimeout(t.hold_timer);var n;var u=r.attr("data-xthreshold"),a=r.attr("data-ythreshold"),f=typeof u!=="undefined"&&u!==false&&parseInt(u)?parseInt(u):t.swipe_h_threshold,l=typeof a!=="undefined"&&a!==false&&parseInt(a)?parseInt(a):t.swipe_v_threshold;if(s.y>o.y&&s.y-o.y>l){n="swipeup"}if(s.x<o.x&&o.x-s.x>f){n="swiperight"}if(s.y<o.y&&o.y-s.y>l){n="swipedown"}if(s.x>o.x&&s.x-o.x>f){n="swipeleft"}if(n!=undefined&&i){s.x=0;s.y=0;o.x=0;o.y=0;r.trigger("swipe").trigger(n);i=false}}function f(e){i=false}var n=this,r=e(n),i=false,s={x:0,y:0},o={x:0,y:0};if(!n.addEventListener){n.attachEvent(t.startevent,u);n.attachEvent(t.moveevent,a);n.attachEvent(t.endevent,f)}else{n.addEventListener(t.startevent,u,false);n.addEventListener(t.moveevent,a,false);n.addEventListener(t.endevent,f,false)}}};e.event.special.scrollstart={setup:function(){function o(e,t){i=t;b(n,i?"scrollstart":"scrollend",e)}var n=this,r=e(n),i,s;r.bind(t.scrollevent,function(e){if(!i){o(e,true)}clearTimeout(s);s=setTimeout(function(){o(e,false)},50)})}};var n=e(window),r,i,s,o,u,a={0:true,180:true};if(t.orientation_support){var f=window.innerWidth||e(window).width(),l=window.innerHeight||e(window).height(),c=50;o=f>l&&f-l>c;u=a[window.orientation];if(o&&u||!o&&!u){a={"-90":true,90:true}}}e.event.special.orientationchange=r={setup:function(){if(t.orientation_support){return false}s=i();n.bind("throttledresize",h);return true},teardown:function(){if(t.orientation_support){return false}n.unbind("throttledresize",h);return true},add:function(e){var t=e.handler;e.handler=function(e){e.orientation=i();return t.apply(this,arguments)}}};e.event.special.orientationchange.orientation=i=function(){var e=true,n=document.documentElement;if(t.orientation_support){e=a[window.orientation]}else{e=n&&n.clientWidth/n.clientHeight<1.1}return e?"portrait":"landscape"};e.event.special.throttledresize={setup:function(){e(this).bind("resize",d)},teardown:function(){e(this).unbind("resize",d)}};var p=250,d=function(){g=(new Date).getTime();y=g-v;if(y>=p){v=g;e(this).trigger("throttledresize")}else{if(m){window.clearTimeout(m)}m=window.setTimeout(h,p-y)}},v=0,m,g,y;e.each({scrollend:"scrollstart",swipeup:"swipe",swiperight:"swipe",swipedown:"swipe",swipeleft:"swipe"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)}}})})(jQuery);
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.4
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator === undefined ?  " " : $l.wordSeparator;
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));

/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-dropdown.js, bootstrap-alert.js, bootstrap-collapse.js, bootstrap-carousel.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){function d(){a(b).each(function(){e(a(this)).removeClass("open")})}function e(b){var c=b.attr("data-target"),d;c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,"")),d=c&&a(c);if(!d||!d.length)d=b.parent();return d}var b="[data-toggle=dropdown]",c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),f,g;if(c.is(".disabled, :disabled"))return;return f=e(c),g=f.hasClass("open"),d(),g||f.toggleClass("open"),c.focus(),!1},keydown:function(c){var d,f,g,h,i,j;if(!/(38|40|27)/.test(c.keyCode))return;d=a(this),c.preventDefault(),c.stopPropagation();if(d.is(".disabled, :disabled"))return;h=e(d),i=h.hasClass("open");if(!i||i&&c.keyCode==27)return c.which==27&&h.find(b).focus(),d.click();f=a("[role=menu] li:not(.divider):visible a",h);if(!f.length)return;j=f.index(f.filter(":focus")),c.keyCode==38&&j>0&&j--,c.keyCode==40&&j<f.length-1&&j++,~j||(j=0),f.eq(j).focus()}};var f=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=f,this},a(document).on("click.dropdown.data-api",d).on("click.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown-menu",function(a){a.stopPropagation()}).on("click.dropdown.data-api",b,c.prototype.toggle).on("keydown.dropdown.data-api",b+", [role=menu]",c.prototype.keydown)}(window.jQuery),!function(a){var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.alert.data-api",b,c.prototype.close)}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b,c,d,e;if(this.transitioning||this.$element.hasClass("in"))return;b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find("> .accordion-group > .in");if(d&&d.length){e=d.data("collapse");if(e&&e.transitioning)return;d.collapse("hide"),e||d.data("collapse",null)}this.$element[b](0),this.transition("addClass",a.Event("show"),"shown"),a.support.transition&&this.$element[b](this.$element[0][c])},hide:function(){var b;if(this.transitioning||!this.$element.hasClass("in"))return;b=this.dimension(),this.reset(this.$element[b]()),this.transition("removeClass",a.Event("hide"),"hidden"),this.$element[b](0)},reset:function(a){var b=this.dimension();return this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element[a!==null?"addClass":"removeClass"]("collapse"),this},transition:function(b,c,d){var e=this,f=function(){c.type=="show"&&e.reset(),e.transitioning=0,e.$element.trigger(d)};this.$element.trigger(c);if(c.isDefaultPrevented())return;this.transitioning=1,this.$element[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=a.extend({},a.fn.collapse.defaults,d.data(),typeof c=="object"&&c);e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();c[a(e).hasClass("in")?"addClass":"removeClass"]("collapsed"),a(e).collapse(f)})}(window.jQuery),!function(a){var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.prototype={cycle:function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(b){var c=this.getActiveIndex(),d=this;if(b>this.$items.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){d.to(b)}):c==b?this.pause().cycle():this.slide(b>c?"next":"prev",a(this.$items[b]))},pause:function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this,j;this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h](),j=a.Event("slide",{relatedTarget:e[0],direction:g});if(e.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")}));if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);if(j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})}else{this.$element.trigger(j);if(j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=a.extend({},a.fn.carousel.defaults,typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.defaults={interval:5e3,pause:"hover"},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),c.data()),g;e.carousel(f),(g=c.attr("data-slide-to"))&&e.data("carousel").pause().to(g).cycle(),b.preventDefault()})}(window.jQuery);

/*QTIP*/
(function (a) {
    function d(b, d, e) {
        var j = this;
        j.id = e;
        j.options = d;
        j.status = {
            animated: !1,
            rendered: !1,
            disabled: !1,
            focused: !1
        };
        j.elements = {
            target: b.addClass(j.options.style.classes.target),
            tooltip: null,
            wrapper: null,
            content: null,
            contentWrapper: null,
            title: null,
            button: null,
            tip: null,
            bgiframe: null
        };
        j.cache = {
            mouse: {},
            position: {},
            toggle: 0
        };
        j.timers = {};
        a.extend(j, j.options.api, {
            show: function (b) {
                function c() {
                    "static" !== j.options.position.type && j.focus();
                    j.onShow.call(j, b);
                    a.browser.msie && j.elements.tooltip.get(0).style.removeAttribute("filter")
                }
                var d;
                if (!j.status.rendered) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "show");
                if ("none" !== j.elements.tooltip.css("display")) return j;
                j.elements.tooltip.stop(!0, !1);
                if (!1 === j.beforeShow.call(j, b)) return j;
                j.cache.toggle = 1;
                "static" !== j.options.position.type && j.updatePosition(b, 0 < j.options.show.effect.length);
                "object" == typeof j.options.show.solo ? d = a(j.options.show.solo) : !0 === j.options.show.solo && (d = a("div.qtip").not(j.elements.tooltip));
                d && d.each(function () {
                    !0 === a(this).qtip("api").status.rendered && a(this).qtip("api").hide()
                });
                if ("function" == typeof j.options.show.effect.type) j.options.show.effect.type.call(j.elements.tooltip, j.options.show.effect.length), j.elements.tooltip.queue(function () {
                    c();
                    a(this).dequeue()
                });
                else {
                    switch (j.options.show.effect.type.toLowerCase()) {
                        case "fade":
                            j.elements.tooltip.fadeIn(j.options.show.effect.length, c);
                            break;
                        case "slide":
                            j.elements.tooltip.slideDown(j.options.show.effect.length, function () {
                                c();
                                "static" !== j.options.position.type && j.updatePosition(b, !0)
                            });
                            break;
                        case "grow":
                            j.elements.tooltip.show(j.options.show.effect.length, c);
                            break;
                        default:
                            j.elements.tooltip.show(null, c)
                    }
                    j.elements.tooltip.addClass(j.options.style.classes.active)
                }
                return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_SHOWN, "show")
            },
            hide: function (b) {
                function c() {
                    j.onHide.call(j, b)
                }
                if (j.status.rendered) {
                    if ("none" === j.elements.tooltip.css("display")) return j
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "hide");
                clearTimeout(j.timers.show);
                j.elements.tooltip.stop(!0, !1);
                if (!1 === j.beforeHide.call(j, b)) return j;
                j.cache.toggle = 0;
                if ("function" == typeof j.options.hide.effect.type) j.options.hide.effect.type.call(j.elements.tooltip, j.options.hide.effect.length), j.elements.tooltip.queue(function () {
                    c();
                    a(this).dequeue()
                });
                else {
                    switch (j.options.hide.effect.type.toLowerCase()) {
                        case "fade":
                            j.elements.tooltip.fadeOut(j.options.hide.effect.length, c);
                            break;
                        case "slide":
                            j.elements.tooltip.slideUp(j.options.hide.effect.length, c);
                            break;
                        case "grow":
                            j.elements.tooltip.hide(j.options.hide.effect.length, c);
                            break;
                        default:
                            j.elements.tooltip.hide(null, c)
                    }
                    j.elements.tooltip.removeClass(j.options.style.classes.active)
                }
                return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_HIDDEN, "hide")
            },
            updatePosition: function (b, c) {
                var d, e, g, h, n, k, l;
                if (j.status.rendered) {
                    if ("static" == j.options.position.type) return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.CANNOT_POSITION_STATIC, "updatePosition")
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updatePosition");
                e = {
                    position: {
                        left: 0,
                        top: 0
                    },
                    dimensions: {
                        height: 0,
                        width: 0
                    },
                    corner: j.options.position.corner.target
                };
                g = {
                    position: j.getPosition(),
                    dimensions: j.getDimensions(),
                    corner: j.options.position.corner.tooltip
                };
                if ("mouse" !== j.options.position.target) {
                    if ("area" == j.options.position.target.get(0).nodeName.toLowerCase()) {
                        h = j.options.position.target.attr("coords").split(",");
                        for (d = 0; d < h.length; d++) h[d] = parseInt(h[d]);
                        d = j.options.position.target.parent("map").attr("name");
                        n = a('img[usemap="#' + d + '"]:first').offset();
                        e.position = {
                            left: Math.floor(n.left + h[0]),
                            top: Math.floor(n.top + h[1])
                        };
                        switch (j.options.position.target.attr("shape").toLowerCase()) {
                            case "rect":
                                e.dimensions = {
                                    width: Math.ceil(Math.abs(h[2] - h[0])),
                                    height: Math.ceil(Math.abs(h[3] - h[1]))
                                };
                                break;
                            case "circle":
                                e.dimensions = {
                                    width: h[2] + 1,
                                    height: h[2] + 1
                                };
                                break;
                            case "poly":
                                e.dimensions = {
                                    width: h[0],
                                    height: h[1]
                                };
                                for (d = 0; d < h.length; d++) 0 == d % 2 ? (h[d] > e.dimensions.width && (e.dimensions.width = h[d]), h[d] < h[0] && (e.position.left = Math.floor(n.left + h[d]))) : (h[d] > e.dimensions.height && (e.dimensions.height = h[d]), h[d] < h[1] && (e.position.top = Math.floor(n.top + h[d])));
                                e.dimensions.width -= e.position.left - n.left;
                                e.dimensions.height -= e.position.top - n.top;
                                break;
                            default:
                                return a.fn.qtip.log.error.call(j, 4, a.fn.qtip.constants.INVALID_AREA_SHAPE, "updatePosition")
                        }
                        e.dimensions.width -= 2;
                        e.dimensions.height -= 2
                    } else 1 === j.options.position.target.add(document.body).length ? (e.position = {
                        left: a(document).scrollLeft(),
                        top: a(document).scrollTop()
                    }, e.dimensions = {
                        height: a(window).height(),
                        width: a(window).width()
                    }) : (e.position = "undefined" !== typeof j.options.position.target.attr("qtip") ? j.options.position.target.qtip("api").cache.position : j.options.position.target.offset(), e.dimensions = {
                        height: j.options.position.target.outerHeight(),
                        width: j.options.position.target.outerWidth()
                    });
                    k = a.extend({}, e.position); - 1 !== e.corner.search(/right/i) && (k.left += e.dimensions.width); - 1 !== e.corner.search(/bottom/i) && (k.top += e.dimensions.height); - 1 !== e.corner.search(/((top|bottom)Middle)|center/) && (k.left += e.dimensions.width / 2); - 1 !== e.corner.search(/((left|right)Middle)|center/) && (k.top += e.dimensions.height / 2)
                } else e.position = k = {
                    left: j.cache.mouse.x,
                    top: j.cache.mouse.y
                }, e.dimensions = {
                    height: 1,
                    width: 1
                }; - 1 !== g.corner.search(/right/i) && (k.left -= g.dimensions.width); - 1 !== g.corner.search(/bottom/i) && (k.top -= g.dimensions.height); - 1 !== g.corner.search(/((top|bottom)Middle)|center/) && (k.left -= g.dimensions.width / 2); - 1 !== g.corner.search(/((left|right)Middle)|center/) && (k.top -= g.dimensions.height / 2);
                h = a.browser.msie ? 1 : 0;
                a.browser.msie && parseInt(a.browser.version.charAt(0));
                0 < j.options.style.border.radius && (-1 !== g.corner.search(/Left/) ? k.left -= j.options.style.border.radius : -1 !== g.corner.search(/Right/) && (k.left += j.options.style.border.radius), -1 !== g.corner.search(/Top/) ? k.top -= j.options.style.border.radius : -1 !== g.corner.search(/Bottom/) && (k.top += j.options.style.border.radius));
                h && (-1 !== g.corner.search(/top/) ? k.top -= h : -1 !== g.corner.search(/bottom/) && (k.top += h), -1 !== g.corner.search(/left/) ? k.left -= h : -1 !== g.corner.search(/right/) && (k.left += h), -1 !== g.corner.search(/leftMiddle|rightMiddle/) && (k.top -= 1));
                !0 === j.options.position.adjust.screen && (k = f.call(j, k, e, g));
                "mouse" === j.options.position.target && !0 === j.options.position.adjust.mouse && (e = !0 === j.options.position.adjust.screen && j.elements.tip ? j.elements.tip.attr("rel") : j.options.position.corner.tooltip, k.left += -1 !== e.search(/right/i) ? -6 : 6, k.top += -1 !== e.search(/bottom/i) ? -6 : 6);
                !j.elements.bgiframe && (a.browser.msie && 6 == parseInt(a.browser.version.charAt(0))) && a("select, object").each(function () {
                    l = a(this).offset();
                    l.bottom = l.top + a(this).height();
                    l.right = l.left + a(this).width();
                    k.top + g.dimensions.height >= l.top && k.left + g.dimensions.width >= l.left && p.call(j)
                });
                k.left += j.options.position.adjust.x;
                k.top += j.options.position.adjust.y;
                e = j.getPosition();
                if (k.left != e.left || k.top != e.top) {
                    e = j.beforePositionUpdate.call(j, b);
                    if (!1 === e) return j;
                    j.cache.position = k;
                    !0 === c ? (j.status.animated = !0, j.elements.tooltip.animate(k, 200, "swing", function () {
                        j.status.animated = !1
                    })) : j.elements.tooltip.css(k);
                    j.onPositionUpdate.call(j, b);
                    "undefined" !== typeof b && (b.type && "mousemove" !== b.type) && a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_POSITION_UPDATED, "updatePosition")
                }
                return j
            },
            updateWidth: function (b) {
                var c;
                if (j.status.rendered) {
                    if (b && "number" !== typeof b) return a.fn.qtip.log.error.call(j, 2, "newWidth must be of type number", "updateWidth")
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateWidth");
                c = j.elements.contentWrapper.siblings().add(j.elements.tip).add(j.elements.button);
                b || ("number" == typeof j.options.style.width.value ? b = j.options.style.width.value : (j.elements.tooltip.css({
                    width: "auto"
                }), c.hide(), a.browser.msie && j.elements.wrapper.add(j.elements.contentWrapper.children()).css({
                    zoom: "normal"
                }), b = j.getDimensions().width + 1, j.options.style.width.value || (b > j.options.style.width.max && (b = j.options.style.width.max), b < j.options.style.width.min && (b = j.options.style.width.min))));
                0 !== b % 2 && (b -= 1);
                j.elements.tooltip.width(b);
                c.show();
                j.options.style.border.radius && j.elements.tooltip.find(".qtip-betweenCorners").each(function () {
                    a(this).width(b - 2 * j.options.style.border.radius)
                });
                a.browser.msie && (j.elements.wrapper.add(j.elements.contentWrapper.children()).css({
                    zoom: "1"
                }), j.elements.wrapper.width(b), j.elements.bgiframe && j.elements.bgiframe.width(b).height(j.getDimensions.height));
                return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_WIDTH_UPDATED, "updateWidth")
            },
            updateStyle: function (b) {
                var d, e, f, h;
                if (j.status.rendered) {
                    if ("string" !== typeof b || !a.fn.qtip.styles[b]) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.STYLE_NOT_DEFINED, "updateStyle")
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateStyle");
                j.options.style = m.call(j, a.fn.qtip.styles[b], j.options.user.style);
                j.elements.content.css(k(j.options.style));
                !1 !== j.options.content.title.text && j.elements.title.css(k(j.options.style.title, !0));
                j.elements.contentWrapper.css({
                    borderColor: j.options.style.border.color
                });
                !1 !== j.options.style.tip.corner && (a("<canvas>").get(0).getContext ? (b = j.elements.tooltip.find(".qtip-tip canvas:first"), e = b.get(0).getContext("2d"), e.clearRect(0, 0, 300, 300), f = b.parent("div[rel]:first").attr("rel"), h = r(f, j.options.style.tip.size.width, j.options.style.tip.size.height), g.call(j, b, h, j.options.style.tip.color || j.options.style.border.color)) : a.browser.msie && (b = j.elements.tooltip.find('.qtip-tip [nodeName="shape"]'), b.attr("fillcolor", j.options.style.tip.color || j.options.style.border.color)));
                0 < j.options.style.border.radius && (j.elements.tooltip.find(".qtip-betweenCorners").css({
                    backgroundColor: j.options.style.border.color
                }), a("<canvas>").get(0).getContext ? (d = s(j.options.style.border.radius), j.elements.tooltip.find(".qtip-wrapper canvas").each(function () {
                    e = a(this).get(0).getContext("2d");
                    e.clearRect(0, 0, 300, 300);
                    f = a(this).parent("div[rel]:first").attr("rel");
                    c.call(j, a(this), d[f], j.options.style.border.radius, j.options.style.border.color)
                })) : a.browser.msie && j.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function () {
                    a(this).attr("fillcolor", j.options.style.border.color)
                }));
                return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_STYLE_UPDATED, "updateStyle")
            },
            updateContent: function (b, c) {
                function d() {
                    j.updateWidth();
                    !1 !== c && ("static" !== j.options.position.type && j.updatePosition(j.elements.tooltip.is(":visible"), !0), !1 !== j.options.style.tip.corner && h.call(j))
                }
                var e, f, g;
                if (j.status.rendered) {
                    if (!b) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.NO_CONTENT_PROVIDED, "updateContent")
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateContent");
                e = j.beforeContentUpdate.call(j, b);
                if ("string" == typeof e) b = e;
                else if (!1 === e) return;
                a.browser.msie && j.elements.contentWrapper.children().css({
                    zoom: "normal"
                });
                b.jquery && 0 < b.length ? b.clone(!0).appendTo(j.elements.content).show() : j.elements.content.html(b);
                f = j.elements.content.find("img[complete=false]");
                0 < f.length ? (g = 0, f.each(function () {
                    a('<img src="' + a(this).attr("src") + '" />').load(function () {
                        ++g == f.length && d()
                    })
                })) : d();
                j.onContentUpdate.call(j);
                return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_CONTENT_UPDATED, "loadContent")
            },
            loadContent: function (b, c, d) {
                function e(b) {
                    j.onContentLoad.call(j);
                    a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_CONTENT_LOADED, "loadContent");
                    j.updateContent(b)
                }
                if (!j.status.rendered) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "loadContent");
                if (!1 === j.beforeContentLoad.call(j)) return j;
                "post" == d ? a.post(b, c, e) : a.get(b, c, e);
                return j
            },
            updateTitle: function (b) {
                if (j.status.rendered) {
                    if (!b) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.NO_CONTENT_PROVIDED, "updateTitle")
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateTitle");
                returned = j.beforeTitleUpdate.call(j);
                if (!1 === returned) return j;
                j.elements.button && (j.elements.button = j.elements.button.clone(!0));
                j.elements.title.html(b);
                j.elements.button && j.elements.title.prepend(j.elements.button);
                j.onTitleUpdate.call(j);
                return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_TITLE_UPDATED, "updateTitle")
            },
            focus: function (b) {
                var c, d, e;
                if (j.status.rendered) {
                    if ("static" == j.options.position.type) return a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.CANNOT_FOCUS_STATIC, "focus")
                } else return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "focus");
                c = parseInt(j.elements.tooltip.css("z-index"));
                d = 6E3 + a("div.qtip[qtip]").length - 1;
                if (!j.status.focused && c !== d) {
                    c = j.beforeFocus.call(j, b);
                    if (!1 === c) return j;
                    a("div.qtip[qtip]").not(j.elements.tooltip).each(function () {
                        !0 === a(this).qtip("api").status.rendered && (e = parseInt(a(this).css("z-index")), "number" == typeof e && -1 < e && a(this).css({
                            zIndex: parseInt(a(this).css("z-index")) - 1
                        }), a(this).qtip("api").status.focused = !1)
                    });
                    j.elements.tooltip.css({
                        zIndex: d
                    });
                    j.status.focused = !0;
                    j.onFocus.call(j, b);
                    a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_FOCUSED, "focus")
                }
                return j
            },
            disable: function (b) {
                if (!j.status.rendered) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "disable");
                b ? j.status.disabled ? a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED, "disable") : (j.status.disabled = !0, a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_DISABLED, "disable")) : j.status.disabled ? (j.status.disabled = !1, a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_ENABLED, "disable")) : a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED, "disable");
                return j
            },
            destroy: function () {
                var b, c;
                if (!1 === j.beforeDestroy.call(j)) return j;
                j.status.rendered ? (j.options.show.when.target.unbind("mousemove.qtip", j.updatePosition), j.options.show.when.target.unbind("mouseout.qtip", j.hide), j.options.show.when.target.unbind(j.options.show.when.event + ".qtip"), j.options.hide.when.target.unbind(j.options.hide.when.event + ".qtip"), j.elements.tooltip.unbind(j.options.hide.when.event + ".qtip"), j.elements.tooltip.unbind("mouseover.qtip", j.focus), j.elements.tooltip.remove()) : j.options.show.when.target.unbind(j.options.show.when.event + ".qtip-create");
                if ("object" == typeof j.elements.target.data("qtip") && (c = j.elements.target.data("qtip").interfaces, "object" == typeof c && 0 < c.length)) for (b = 0; b < c.length - 1; b++) c[b].id == j.id && c.splice(b, 1);
                delete a.fn.qtip.interfaces[j.id];
                "object" == typeof c && 0 < c.length ? j.elements.target.data("qtip").current = c.length - 1 : j.elements.target.removeData("qtip");
                j.onDestroy.call(j);
                a.fn.qtip.log.error.call(j, 1, a.fn.qtip.constants.EVENT_DESTROYED, "destroy");
                return j.elements.target
            },
            getPosition: function () {
                var b, c;
                if (!j.status.rendered) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "getPosition");
                (b = "none" !== j.elements.tooltip.css("display") ? !1 : !0) && j.elements.tooltip.css({
                    visiblity: "hidden"
                }).show();
                c = j.elements.tooltip.offset();
                b && j.elements.tooltip.css({
                    visiblity: "visible"
                }).hide();
                return c
            },
            getDimensions: function () {
                var b, c;
                if (!j.status.rendered) return a.fn.qtip.log.error.call(j, 2, a.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "getDimensions");
                (b = !j.elements.tooltip.is(":visible") ? !0 : !1) && j.elements.tooltip.css({
                    visiblity: "hidden"
                }).show();
                c = {
                    height: j.elements.tooltip.outerHeight(),
                    width: j.elements.tooltip.outerWidth()
                };
                b && j.elements.tooltip.css({
                    visiblity: "visible"
                }).hide();
                return c
            }
        })
    }

    function b() {
        var b, d, f;
        this.beforeRender.call(this);
        this.status.rendered = !0;
        this.elements.tooltip = '<div qtip="' + this.id + '" class="qtip ' + (this.options.style.classes.tooltip || this.options.style) + '"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:' + this.options.position.type + ';"> <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;"> <div class="qtip-contentWrapper" style="overflow:hidden;"> <div class="qtip-content ' + this.options.style.classes.content + '"></div></div></div></div>';
        this.elements.tooltip = a(this.elements.tooltip);
        this.elements.tooltip.appendTo(this.options.position.container);
        this.elements.tooltip.data("qtip", {
            current: 0,
            interfaces: [this]
        });
        this.elements.wrapper = this.elements.tooltip.children("div:first");
        this.elements.contentWrapper = this.elements.wrapper.children("div:first").css({
            background: this.options.style.background
        });
        this.elements.content = this.elements.contentWrapper.children("div:first").css(k(this.options.style));
        a.browser.msie && this.elements.wrapper.add(this.elements.content).css({
            zoom: 1
        });
        "unfocus" == this.options.hide.when.event && this.elements.tooltip.attr("unfocus", !0);
        "number" == typeof this.options.style.width.value && this.updateWidth();
        if (a("<canvas>").get(0).getContext || a.browser.msie) {
            if (0 < this.options.style.border.radius) {
                var g, h, l, m, r, p;
                g = this;
                g.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove();
                b = g.options.style.border.width;
                h = g.options.style.border.radius;
                l = g.options.style.border.color || g.options.style.tip.color;
                m = s(h);
                d = {};
                for (f in m) d[f] = '<div rel="' + f + '" style="' + (-1 !== f.search(/Left/) ? "left" : "right") + ":0; position:absolute; height:" + h + "px; width:" + h + 'px; overflow:hidden; line-height:0.1px; font-size:1px">', a("<canvas>").get(0).getContext ? d[f] += '<canvas height="' + h + '" width="' + h + '" style="vertical-align: top"></canvas>' : a.browser.msie && (r = 2 * h + 3, d[f] += '<v:arc stroked="false" fillcolor="' + l + '" startangle="' + m[f][0] + '" endangle="' + m[f][1] + '" style="width:' + r + "px; height:" + r + "px; margin-top:" + (-1 !== f.search(/bottom/) ? -2 : -1) + "px; margin-left:" + (-1 !== f.search(/Right/) ? m[f][2] - 3.5 : -1) + 'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'), d[f] += "</div>";
                f = g.getDimensions().width - 2 * Math.max(b, h);
                f = '<div class="qtip-betweenCorners" style="height:' + h + "px; width:" + f + "px; overflow:hidden; background-color:" + l + '; line-height:0.1px; font-size:1px;">';
                g.elements.wrapper.prepend('<div class="qtip-borderTop" dir="ltr" style="height:' + h + "px; margin-left:" + h + 'px; line-height:0.1px; font-size:1px; padding:0;">' + d.topLeft + d.topRight + f);
                g.elements.wrapper.append('<div class="qtip-borderBottom" dir="ltr" style="height:' + h + "px; margin-left:" + h + 'px; line-height:0.1px; font-size:1px; padding:0;">' + d.bottomLeft + d.bottomRight + f);
                a("<canvas>").get(0).getContext ? g.elements.wrapper.find("canvas").each(function () {
                    p = m[a(this).parent("[rel]:first").attr("rel")];
                    c.call(g, a(this), p, h, l)
                }) : a.browser.msie && g.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>');
                d = Math.max(h, h + (b - h));
                b = Math.max(b - h, 0);
                g.elements.contentWrapper.css({
                    border: "0px solid " + l,
                    borderWidth: b + "px " + d + "px"
                })
            } else this.elements.contentWrapper.css({
                border: this.options.style.border.width + "px solid " + this.options.style.border.color
            });
            !1 !== this.options.style.tip.corner && e.call(this)
        } else this.elements.contentWrapper.css({
            border: this.options.style.border.width + "px solid " + this.options.style.border.color
        }), this.options.style.border.radius = 0, this.options.style.tip.corner = !1, a.fn.qtip.log.error.call(this, 2, a.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED, "render");
        "string" == typeof this.options.content.text && 0 < this.options.content.text.length || this.options.content.text.jquery && 0 < this.options.content.text.length ? b = this.options.content.text : "string" == typeof this.elements.target.attr("title") && 0 < this.elements.target.attr("title").length ? (b = this.elements.target.attr("title").replace("\\n", "<br />"), this.elements.target.attr("title", "")) : "string" == typeof this.elements.target.attr("alt") && 0 < this.elements.target.attr("alt").length ? (b = this.elements.target.attr("alt").replace("\\n", "<br />"), this.elements.target.attr("alt", "")) : (b = " ", a.fn.qtip.log.error.call(this, 1, a.fn.qtip.constants.NO_VALID_CONTENT, "render"));
        if (!1 !== this.options.content.title.text) {
            var x = this;
            null !== x.elements.title && x.elements.title.remove();
            x.elements.title = a('<div class="' + x.options.style.classes.title + '">').css(k(x.options.style.title, !0)).css({
                zoom: a.browser.msie ? 1 : 0
            }).prependTo(x.elements.contentWrapper);
            x.options.content.title.text && x.updateTitle.call(x, x.options.content.title.text);
            !1 !== x.options.content.title.button && "string" == typeof x.options.content.title.button && (x.elements.button = a('<a class="' + x.options.style.classes.button + '" style="float:right; position: relative"></a>').css(k(x.options.style.button, !0)).html(x.options.content.title.button).prependTo(x.elements.title).click(function (a) {
                x.status.disabled || x.hide(a)
            }))
        }
        this.updateContent(b);
        var G = function (b) {
            !0 !== u.status.disabled && ("inactive" == u.options.hide.when.event && (a(M).each(function () {
                J.bind(this + ".qtip-inactive", K);
                u.elements.content.bind(this + ".qtip-inactive", K)
            }), K()), clearTimeout(u.timers.show), clearTimeout(u.timers.hide), u.timers.show = setTimeout(function () {
                u.show(b)
            }, u.options.show.delay))
        }, F = function (b) {
            if (!0 !== u.status.disabled) {
                if (!0 === u.options.hide.fixed && -1 !== u.options.hide.when.event.search(/mouse(out|leave)/i) && 0 < a(b.relatedTarget).parents("div.qtip[qtip]").length) return b.stopPropagation(), b.preventDefault(), clearTimeout(u.timers.hide), !1;
                clearTimeout(u.timers.show);
                clearTimeout(u.timers.hide);
                u.elements.tooltip.stop(!0, !0);
                u.timers.hide = setTimeout(function () {
                    u.hide(b)
                }, u.options.hide.delay)
            }
        }, u, J, M;
        u = this;
        b = u.options.show.when.target;
        J = u.options.hide.when.target;
        u.options.hide.fixed && (J = J.add(u.elements.tooltip));
        if ("inactive" == u.options.hide.when.event) {
            M = "click dblclick mousedown mouseup mousemove mouseout mouseenter mouseleave mouseover".split(" ");
            var K = function (b) {
                !0 !== u.status.disabled && (clearTimeout(u.timers.inactive), u.timers.inactive = setTimeout(function () {
                    a(M).each(function () {
                        J.unbind(this + ".qtip-inactive");
                        u.elements.content.unbind(this + ".qtip-inactive")
                    });
                    u.hide(b)
                }, u.options.hide.delay))
            }
        } else !0 === u.options.hide.fixed && u.elements.tooltip.bind("mouseover.qtip", function () {
            !0 !== u.status.disabled && clearTimeout(u.timers.hide)
        });
        1 === u.options.show.when.target.add(u.options.hide.when.target).length && u.options.show.when.event == u.options.hide.when.event && "inactive" !== u.options.hide.when.event || "unfocus" == u.options.hide.when.event ? (u.cache.toggle = 0, b.bind(u.options.show.when.event + ".qtip", function (a) {
            0 == u.cache.toggle ? G(a) : F(a)
        })) : (b.bind(u.options.show.when.event + ".qtip", G), "inactive" !== u.options.hide.when.event && J.bind(u.options.hide.when.event + ".qtip", F)); - 1 !== u.options.position.type.search(/(fixed|absolute)/) && u.elements.tooltip.bind("mouseover.qtip", u.focus);
        "mouse" === u.options.position.target && "static" !== u.options.position.type && b.bind("mousemove.qtip", function (a) {
            u.cache.mouse = {
                x: a.pageX,
                y: a.pageY
            };
            !1 === u.status.disabled && (!0 === u.options.position.adjust.mouse && "static" !== u.options.position.type && "none" !== u.elements.tooltip.css("display")) && u.updatePosition(a)
        });
        !0 === this.options.show.ready && this.show();
        !1 !== this.options.content.url && (b = this.options.content.url, d = this.options.content.data, f = this.options.content.method || "get", this.loadContent(b, d, f));
        this.onRender.call(this);
        a.fn.qtip.log.error.call(this, 1, a.fn.qtip.constants.EVENT_RENDERED, "render")
    }

    function c(a, b, c, d) {
        a = a.get(0).getContext("2d");
        a.fillStyle = d;
        a.beginPath();
        a.arc(b[0], b[1], c, 0, 2 * Math.PI, !1);
        a.fill()
    }

    function e(b) {
        var c, d, e, f;
        null !== this.elements.tip && this.elements.tip.remove();
        c = this.options.style.tip.color || this.options.style.border.color;
        !1 !== this.options.style.tip.corner && (b || (b = this.options.style.tip.corner), d = r(b, this.options.style.tip.size.width, this.options.style.tip.size.height), this.elements.tip = '<div class="' + this.options.style.classes.tip + '" dir="ltr" rel="' + b + '" style="position:absolute; height:' + this.options.style.tip.size.height + "px; width:" + this.options.style.tip.size.width + 'px; margin:0 auto; line-height:0.1px; font-size:1px;">', a("<canvas>").get(0).getContext ? this.elements.tip += '<canvas height="' + this.options.style.tip.size.height + '" width="' + this.options.style.tip.size.width + '"></canvas>' : a.browser.msie && (e = this.options.style.tip.size.width + "," + this.options.style.tip.size.height, f = "m" + d[0][0] + "," + d[0][1], f += " l" + d[1][0] + "," + d[1][1], f += " " + d[2][0] + "," + d[2][1], this.elements.tip += '<v:shape fillcolor="' + c + '" stroked="false" filled="true" path="' + (f + " xe") + '" coordsize="' + e + '" style="width:' + this.options.style.tip.size.width + "px; height:" + this.options.style.tip.size.height + "px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:" + (-1 !== b.search(/top/) ? "bottom" : "top") + '"></v:shape>', this.elements.tip += '<v:image style="behavior:url(#default#VML);"></v:image>', this.elements.contentWrapper.css("position", "relative")), this.elements.tooltip.prepend(this.elements.tip + "</div>"), this.elements.tip = this.elements.tooltip.find("." + this.options.style.classes.tip).eq(0), a("<canvas>").get(0).getContext && g.call(this, this.elements.tip.find("canvas:first"), d, c), -1 !== b.search(/top/) && (a.browser.msie && 6 === parseInt(a.browser.version.charAt(0))) && this.elements.tip.css({
            marginTop: -4
        }), h.call(this, b))
    }

    function g(a, b, c) {
        a = a.get(0).getContext("2d");
        a.fillStyle = c;
        a.beginPath();
        a.moveTo(b[0][0], b[0][1]);
        a.lineTo(b[1][0], b[1][1]);
        a.lineTo(b[2][0], b[2][1]);
        a.fill()
    }

    function h(b) {
        var c;
        !1 !== this.options.style.tip.corner && this.elements.tip && (b || (b = this.elements.tip.attr("rel")), c = positionAdjust = a.browser.msie ? 1 : 0, this.elements.tip.css(b.match(/left|right|top|bottom/)[0], 0), -1 !== b.search(/top|bottom/) ? (a.browser.msie && (positionAdjust = 6 === parseInt(a.browser.version.charAt(0)) ? -1 !== b.search(/top/) ? -3 : 1 : -1 !== b.search(/top/) ? 1 : 2), -1 !== b.search(/Middle/) ? this.elements.tip.css({
            left: "50%",
            marginLeft: -(this.options.style.tip.size.width / 2)
        }) : -1 !== b.search(/Left/) ? this.elements.tip.css({
            left: this.options.style.border.radius - c
        }) : -1 !== b.search(/Right/) && this.elements.tip.css({
            right: this.options.style.border.radius + c
        }), -1 !== b.search(/top/) ? this.elements.tip.css({
            top: -positionAdjust
        }) : this.elements.tip.css({
            bottom: positionAdjust
        })) : -1 !== b.search(/left|right/) && (a.browser.msie && (positionAdjust = 6 === parseInt(a.browser.version.charAt(0)) ? 1 : -1 !== b.search(/left/) ? 1 : 2), -1 !== b.search(/Middle/) ? this.elements.tip.css({
            top: "50%",
            marginTop: -(this.options.style.tip.size.height / 2)
        }) : -1 !== b.search(/Top/) ? this.elements.tip.css({
            top: this.options.style.border.radius - c
        }) : -1 !== b.search(/Bottom/) && this.elements.tip.css({
            bottom: this.options.style.border.radius + c
        }), -1 !== b.search(/left/) ? this.elements.tip.css({
            left: -positionAdjust
        }) : this.elements.tip.css({
            right: positionAdjust
        })), b = "padding-" + b.match(/left|right|top|bottom/)[0], c = this.options.style.tip.size[-1 !== b.search(/left|right/) ? "width" : "height"], this.elements.tooltip.css("padding", 0), this.elements.tooltip.css(b, c), a.browser.msie && 6 == parseInt(a.browser.version.charAt(0)) && (b = parseInt(this.elements.tip.css("margin-top")) || 0, b += parseInt(this.elements.content.css("margin-top")) || 0, this.elements.tip.css({
            marginTop: b
        })))
    }

    function f(b, c, d) {
        var f, g, h, k, l, m, r, p;
        if ("center" == d.corner) return c.position;
        p = a.extend({}, b);
        m = l = !1;
        f = p.left < a.fn.qtip.cache.screen.scroll.left;
        g = p.left + d.dimensions.width + 2 >= a.fn.qtip.cache.screen.width + a.fn.qtip.cache.screen.scroll.left;
        h = p.top < a.fn.qtip.cache.screen.scroll.top;
        k = p.top + d.dimensions.height + 2 >= a.fn.qtip.cache.screen.height + a.fn.qtip.cache.screen.scroll.top;
        r = f && (-1 != d.corner.search(/right/i) || -1 == d.corner.search(/right/i) && !g);
        f = g && (-1 != d.corner.search(/left/i) || -1 == d.corner.search(/left/i) && !f);
        h = h && -1 == d.corner.search(/top/i);
        k = k && -1 == d.corner.search(/bottom/i);
        r ? (p.left = "mouse" !== this.options.position.target ? c.position.left + c.dimensions.width : this.cache.mouse.x, l = "Left") : f && (p.left = "mouse" !== this.options.position.target ? c.position.left - d.dimensions.width : this.cache.mouse.x - d.dimensions.width, l = "Right");
        h ? (p.top = "mouse" !== this.options.position.target ? c.position.top + c.dimensions.height : this.cache.mouse.y, m = "top") : k && (p.top = "mouse" !== this.options.position.target ? c.position.top - d.dimensions.height : this.cache.mouse.y - d.dimensions.height, m = "bottom");
        0 > p.left && (p.left = b.left, l = !1);
        0 > p.top && (p.top = b.top, m = !1);
        !1 !== this.options.style.tip.corner && (p.corner = new String(d.corner), !1 !== l && (p.corner = p.corner.replace(/Left|Right|Middle/, l)), !1 !== m && (p.corner = p.corner.replace(/top|bottom/, m)), p.corner !== this.elements.tip.attr("rel") && e.call(this, p.corner));
        return p
    }

    function k(b, c) {
        var d, e;
        d = a.extend(!0, {}, b);
        for (e in d)!0 === c && -1 !== e.search(/(tip|classes)/i) ? delete d[e] : !c && -1 !== e.search(/(width|border|tip|title|classes|user)/i) && delete d[e];
        return d
    }

    function l(a) {
        "object" !== typeof a.tip && (a.tip = {
            corner: a.tip
        });
        "object" !== typeof a.tip.size && (a.tip.size = {
            width: a.tip.size,
            height: a.tip.size
        });
        "object" !== typeof a.border && (a.border = {
            width: a.border
        });
        "object" !== typeof a.width && (a.width = {
            value: a.width
        });
        "string" == typeof a.width.max && (a.width.max = parseInt(a.width.max.replace(/([0-9]+)/i, "$1")));
        "string" == typeof a.width.min && (a.width.min = parseInt(a.width.min.replace(/([0-9]+)/i, "$1")));
        "number" == typeof a.tip.size.x && (a.tip.size.width = a.tip.size.x, delete a.tip.size.x);
        "number" == typeof a.tip.size.y && (a.tip.size.height = a.tip.size.y, delete a.tip.size.y);
        return a
    }

    function m() {
        var b, c;
        c = [!0, {}];
        for (b = 0; b < arguments.length; b++) c.push(arguments[b]);
        for (b = [a.extend.apply(a, c)];
        "string" == typeof b[0].name;) b.unshift(l(a.fn.qtip.styles[b[0].name]));
        b.unshift(!0, {
            classes: {
                tooltip: "qtip-" + (arguments[0].name || "defaults")
            }
        }, a.fn.qtip.styles.defaults);
        b = a.extend.apply(a, b);
        c = a.browser.msie ? 1 : 0;
        b.tip.size.width += c;
        b.tip.size.height += c;
        0 < b.tip.size.width % 2 && (b.tip.size.width += 1);
        0 < b.tip.size.height % 2 && (b.tip.size.height += 1);
        !0 === b.tip.corner && (b.tip.corner = "center" === this.options.position.corner.tooltip ? !1 : this.options.position.corner.tooltip);
        return b
    }

    function r(a, b, c) {
        b = {
            bottomRight: [
                [0, 0],
                [b, c],
                [b, 0]
            ],
            bottomLeft: [
                [0, 0],
                [b, 0],
                [0, c]
            ],
            topRight: [
                [0, c],
                [b, 0],
                [b, c]
            ],
            topLeft: [
                [0, 0],
                [0, c],
                [b, c]
            ],
            topMiddle: [
                [0, c],
                [b / 2, 0],
                [b, c]
            ],
            bottomMiddle: [
                [0, 0],
                [b, 0],
                [b / 2, c]
            ],
            rightMiddle: [
                [0, 0],
                [b, c / 2],
                [0, c]
            ],
            leftMiddle: [
                [b, 0],
                [b, c],
                [0, c / 2]
            ]
        };
        b.leftTop = b.bottomRight;
        b.rightTop = b.bottomLeft;
        b.leftBottom = b.topRight;
        b.rightBottom = b.topLeft;
        return b[a]
    }

    function s(b) {
        var c;
        a("<canvas>").get(0).getContext ? c = {
            topLeft: [b, b],
            topRight: [0, b],
            bottomLeft: [b, 0],
            bottomRight: [0, 0]
        } : a.browser.msie && (c = {
            topLeft: [-90, 90, 0],
            topRight: [-90, 90, -b],
            bottomLeft: [90, 270, 0],
            bottomRight: [90, 270, -b]
        });
        return c
    }

    function p() {
        var a;
        a = this.getDimensions();
        this.elements.bgiframe = this.elements.wrapper.prepend('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:' + a.height + "px; width:" + a.width + 'px" />').children(".qtip-bgiframe:first")
    }
    a.fn.qtip = function (c, e) {
        var f, g, h, k, p, r, s, x;
        if ("string" == typeof c) {
            "object" !== typeof a(this).data("qtip") && a.fn.qtip.log.error.call(self, 1, a.fn.qtip.constants.NO_TOOLTIP_PRESENT, !1);
            if ("api" == c) return a(this).data("qtip").interfaces[a(this).data("qtip").current];
            if ("interfaces" == c) return a(this).data("qtip").interfaces
        } else {
            c || (c = {});
            if ("object" !== typeof c.content || c.content.jquery && 0 < c.content.length) c.content = {
                text: c.content
            };
            "object" !== typeof c.content.title && (c.content.title = {
                text: c.content.title
            });
            "object" !== typeof c.position && (c.position = {
                corner: c.position
            });
            "object" !== typeof c.position.corner && (c.position.corner = {
                target: c.position.corner,
                tooltip: c.position.corner
            });
            "object" !== typeof c.show && (c.show = {
                when: c.show
            });
            "object" !== typeof c.show.when && (c.show.when = {
                event: c.show.when
            });
            "object" !== typeof c.show.effect && (c.show.effect = {
                type: c.show.effect
            });
            "object" !== typeof c.hide && (c.hide = {
                when: c.hide
            });
            "object" !== typeof c.hide.when && (c.hide.when = {
                event: c.hide.when
            });
            "object" !== typeof c.hide.effect && (c.hide.effect = {
                type: c.hide.effect
            });
            "object" !== typeof c.style && (c.style = {
                name: c.style
            });
            c.style = l(c.style);
            k = a.extend(!0, {}, a.fn.qtip.defaults, c);
            k.style = m.call({
                options: k
            }, k.style);
            k.user = a.extend(!0, {}, c)
        }
        return a(this).each(function () {
            if ("string" == typeof c) {
                if (r = c.toLowerCase(), h = a(this).qtip("interfaces"), "object" == typeof h) if (!0 === e && "destroy" == r) for (; 0 < h.length;) h[h.length - 1].destroy();
                else {
                    !0 !== e && (h = [a(this).qtip("api")]);
                    for (f = 0; f < h.length; f++) "destroy" == r ? h[f].destroy() : !0 === h[f].status.rendered && ("show" == r ? h[f].show() : "hide" == r ? h[f].hide() : "focus" == r ? h[f].focus() : "disable" == r ? h[f].disable(!0) : "enable" == r && h[f].disable(!1))
                }
            } else {
                s = a.extend(!0, {}, k);
                s.hide.effect.length = k.hide.effect.length;
                s.show.effect.length = k.show.effect.length;
                !1 === s.position.container && (s.position.container = a(document.body));
                !1 === s.position.target && (s.position.target = a(this));
                !1 === s.show.when.target && (s.show.when.target = a(this));
                !1 === s.hide.when.target && (s.hide.when.target = a(this));
                g = a.fn.qtip.interfaces.length;
                for (f = 0; f < g; f++) if ("undefined" == typeof a.fn.qtip.interfaces[f]) {
                    g = f;
                    break
                }
                p = new d(a(this), s, g);
                a.fn.qtip.interfaces[g] = p;
                "object" == typeof a(this).data("qtip") ? ("undefined" === typeof a(this).attr("qtip") && (a(this).data("qtip").current = a(this).data("qtip").interfaces.length), a(this).data("qtip").interfaces.push(p)) : a(this).data("qtip", {
                    current: 0,
                    interfaces: [p]
                });
                !1 === s.content.prerender && !1 !== s.show.when.event && !0 !== s.show.ready ? s.show.when.target.bind(s.show.when.event + ".qtip-" + g + "-create", {
                    qtip: g
                }, function (c) {
                    x = a.fn.qtip.interfaces[c.data.qtip];
                    x.options.show.when.target.unbind(x.options.show.when.event + ".qtip-" + c.data.qtip + "-create");
                    x.cache.mouse = {
                        x: c.pageX,
                        y: c.pageY
                    };
                    b.call(x);
                    x.options.show.when.target.trigger(x.options.show.when.event)
                }) : (p.cache.mouse = {
                    x: s.show.when.target.offset().left,
                    y: s.show.when.target.offset().top
                }, b.call(p))
            }
        })
    };
    a(document).ready(function () {
        a.fn.qtip.cache = {
            screen: {
                scroll: {
                    left: a(window).scrollLeft(),
                    top: a(window).scrollTop()
                },
                width: a(window).width(),
                height: a(window).height()
            }
        };
        var b;
        a(window).bind("resize scroll", function (c) {
            clearTimeout(b);
            b = setTimeout(function () {
                "scroll" === c.type ? a.fn.qtip.cache.screen.scroll = {
                    left: a(window).scrollLeft(),
                    top: a(window).scrollTop()
                } : (a.fn.qtip.cache.screen.width = a(window).width(), a.fn.qtip.cache.screen.height = a(window).height());
                for (i = 0; i < a.fn.qtip.interfaces.length; i++) {
                    var b = a.fn.qtip.interfaces[i];
                    !0 === b.status.rendered && ("static" !== b.options.position.type || b.options.position.adjust.scroll && "scroll" === c.type || b.options.position.adjust.resize && "resize" === c.type) && b.updatePosition(c, !0)
                }
            }, 100)
        });
        a(document).bind("mousedown.qtip", function (b) {
            0 === a(b.target).parents("div.qtip").length && a(".qtip[unfocus]").each(function () {
                var c = a(this).qtip("api");
                a(this).is(":visible") && (!c.status.disabled && 1 < a(b.target).add(c.elements.target).length) && c.hide(b)
            })
        })
    });
    a.fn.qtip.interfaces = [];
    a.fn.qtip.log = {
        error: function () {
            return this
        }
    };
    a.fn.qtip.constants = {};
    a.fn.qtip.defaults = {
        content: {
            prerender: !1,
            text: !1,
            url: !1,
            data: null,
            title: {
                text: !1,
                button: !1
            }
        },
        position: {
            target: !1,
            corner: {
                target: "bottomRight",
                tooltip: "topLeft"
            },
            adjust: {
                x: 0,
                y: 0,
                mouse: !0,
                screen: !1,
                scroll: !0,
                resize: !0
            },
            type: "absolute",
            container: !1
        },
        show: {
            when: {
                target: !1,
                event: "mouseover"
            },
            effect: {
                type: "fade",
                length: 100
            },
            delay: 140,
            solo: !1,
            ready: !1
        },
        hide: {
            when: {
                target: !1,
                event: "mouseout"
            },
            effect: {
                type: "fade",
                length: 100
            },
            delay: 0,
            fixed: !1
        },
        api: {
            beforeRender: function () {},
            onRender: function () {},
            beforePositionUpdate: function () {},
            onPositionUpdate: function () {},
            beforeShow: function () {},
            onShow: function () {},
            beforeHide: function () {},
            onHide: function () {},
            beforeContentUpdate: function () {},
            onContentUpdate: function () {},
            beforeContentLoad: function () {},
            onContentLoad: function () {},
            beforeTitleUpdate: function () {},
            onTitleUpdate: function () {},
            beforeDestroy: function () {},
            onDestroy: function () {},
            beforeFocus: function () {},
            onFocus: function () {}
        }
    };
    a.fn.qtip.styles = {
        defaults: {
            background: "white",
            color: "#111",
            overflow: "hidden",
            textAlign: "left",
            width: {
                min: 0,
                max: 250
            },
            padding: "5px 9px",
            border: {
                width: 1,
                radius: 0,
                color: "#d3d3d3"
            },
            tip: {
                corner: !1,
                color: !1,
                size: {
                    width: 13,
                    height: 13
                },
                opacity: 1
            },
            title: {
                background: "#e1e1e1",
                fontWeight: "bold",
                padding: "7px 12px"
            },
            button: {
                cursor: "pointer"
            },
            classes: {
                target: "",
                tip: "qtip-tip",
                title: "qtip-title",
                button: "qtip-button",
                content: "qtip-content",
                active: "qtip-active"
            }
        },
        cream: {
            border: {
                width: 3,
                radius: 0,
                color: "#F9E98E"
            },
            title: {
                background: "#F0DE7D",
                color: "#A27D35"
            },
            background: "#FBF7AA",
            color: "#A27D35",
            classes: {
                tooltip: "qtip-cream"
            }
        },
        light: {
            border: {
                width: 3,
                radius: 0,
                color: "#E2E2E2"
            },
            title: {
                background: "#f1f1f1",
                color: "#454545"
            },
            background: "white",
            color: "#454545",
            classes: {
                tooltip: "qtip-light"
            }
        },
        dark: {
            border: {
                width: 3,
                radius: 0,
                color: "#303030"
            },
            title: {
                background: "#404040",
                color: "#f3f3f3"
            },
            background: "#505050",
            color: "#f3f3f3",
            classes: {
                tooltip: "qtip-dark"
            }
        },
        red: {
            border: {
                width: 3,
                radius: 0,
                color: "#CE6F6F"
            },
            title: {
                background: "#f28279",
                color: "#9C2F2F"
            },
            background: "#F79992",
            color: "#9C2F2F",
            classes: {
                tooltip: "qtip-red"
            }
        },
        green: {
            border: {
                width: 3,
                radius: 0,
                color: "#A9DB66"
            },
            title: {
                background: "#b9db8c",
                color: "#58792E"
            },
            background: "#CDE6AC",
            color: "#58792E",
            classes: {
                tooltip: "qtip-green"
            }
        },
        blue: {
            border: {
                width: 3,
                radius: 0,
                color: "#ADD9ED"
            },
            title: {
                background: "#D0E9F5",
                color: "#5E99BD"
            },
            background: "#E5F6FE",
            color: "#4D9FBF",
            classes: {
                tooltip: "qtip-blue"
            }
        }
    }
})(jQuery);

/*JCROP*/
(function (a) {
    a.Jcrop = function (b, c) {
        function h(a) {
            return a + "px"
        }

        function i(a) {
            return d.baseClass + "-" + a
        }

        function j() {
            return a.fx.step.hasOwnProperty("backgroundColor")
        }

        function k(b) {
            var c = a(b).offset();
            return [c.left, c.top]
        }

        function l(a) {
            return [a.pageX - e[0], a.pageY - e[1]]
        }

        function m(b) {
            typeof b != "object" && (b = {}), d = a.extend(d, b), a.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (a, b) {
                typeof d[b] != "function" && (d[b] = function () {})
            })
        }

        function n(a, b) {
            e = k(E), bd.setCursor(a === "move" ? a : a + "-resize");
            if (a === "move") return bd.activateHandlers(p(b), u);
            var c = ba.getFixed(),
                d = q(a),
                f = ba.getCorner(q(d));
            ba.setPressed(ba.getCorner(d)), ba.setCurrent(f), bd.activateHandlers(o(a, c), u)
        }

        function o(a, b) {
            return function (c) {
                if (!d.aspectRatio) switch (a) {
                    case "e":
                        c[1] = b.y2;
                        break;
                    case "w":
                        c[1] = b.y2;
                        break;
                    case "n":
                        c[0] = b.x2;
                        break;
                    case "s":
                        c[0] = b.x2
                } else switch (a) {
                    case "e":
                        c[1] = b.y + 1;
                        break;
                    case "w":
                        c[1] = b.y + 1;
                        break;
                    case "n":
                        c[0] = b.x + 1;
                        break;
                    case "s":
                        c[0] = b.x + 1
                }
                ba.setCurrent(c), bc.update()
            }
        }

        function p(a) {
            var b = a;
            return be.watchKeys(),

            function (
            a) {
                ba.moveOffset([a[0] - b[0], a[1] - b[1]]), b = a, bc.update()
            }
        }

        function q(a) {
            switch (a) {
                case "n":
                    return "sw";
                case "s":
                    return "nw";
                case "e":
                    return "nw";
                case "w":
                    return "ne";
                case "ne":
                    return "sw";
                case "nw":
                    return "se";
                case "se":
                    return "nw";
                case "sw":
                    return "ne"
            }
        }

        function r(a) {
            return function (b) {
                return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = k(E), X = !0, n(a, l(b)), b.stopPropagation(), b.preventDefault(), !1)
            }
        }

        function s(a, b, c) {
            var d = a.width(),
                e = a.height();
            d > b && b > 0 && (d = b, e = b / a.width() * a.height()), e > c && c > 0 && (e = c, d = c / a.height() * a.width()), U = a.width() / d, V = a.height() / e, a.width(d).height(e)
        }

        function t(a) {
            return {
                x: a.x * U,
                y: a.y * V,
                x2: a.x2 * U,
                y2: a.y2 * V,
                w: a.w * U,
                h: a.h * V
            }
        }

        function u(a) {
            var b = ba.getFixed();
            b.w > d.minSelect[0] && b.h > d.minSelect[1] ? (bc.enableHandles(), bc.done()) : bc.release(), bd.setCursor(d.allowSelect ? "crosshair" : "default")
        }

        function v(a) {
            if (d.disabled) return !1;
            if (!d.allowSelect) return !1;
            X = !0, e = k(E), bc.disableHandles(), bd.setCursor("crosshair");
            var b = l(a);
            return ba.setPressed(b), bc.update(), bd.activateHandlers(w, u), be.watchKeys(), a.stopPropagation(), a.preventDefault(), !1
        }

        function w(a) {
            ba.setCurrent(a), bc.update()
        }

        function z() {
            var b = a("<div></div>").addClass(i("tracker"));
            return a.browser.msie && b.css({
                opacity: 0,
                backgroundColor: "white"
            }), b
        }

        function bf(a) {
            H.removeClass().addClass(i("holder")).addClass(a)
        }

        function bg(a, b) {
            function t() {
                window.setTimeout(u, l)
            }
            var c = a[0] / U,
                e = a[1] / V,
                f = a[2] / U,
                g = a[3] / V;
            if (Y) return;
            var h = ba.flipCoords(c, e, f, g),
                i = ba.getFixed(),
                j = [i.x, i.y, i.x2, i.y2],
                k = j,
                l = d.animationDelay,
                m = h[0] - j[0],
                n = h[1] - j[1],
                o = h[2] - j[2],
                p = h[3] - j[3],
                q = 0,
                r = d.swingSpeed;
            x = k[0], y = k[1], f = k[2], g = k[3], bc.animMode(!0);
            var s, u = function () {
                return function () {
                    q += (100 - q) / r, k[0] = x + q / 100 * m, k[1] = y + q / 100 * n, k[2] = f + q / 100 * o, k[3] = g + q / 100 * p, q >= 99.8 && (q = 100), q < 100 ? (bi(k), t()) : (bc.done(), typeof b == "function" && b.call(bt))
                }
            }();
            t()
        }

        function bh(a) {
            bi([a[0] / U, a[1] / V, a[2] / U, a[3] / V]), d.onSelect.call(bt, t(ba.getFixed())), bc.enableHandles()
        }

        function bi(a) {
            ba.setPressed([a[0], a[1]]), ba.setCurrent([a[2], a[3]]), bc.update()
        }

        function bj() {
            return t(ba.getFixed())
        }

        function bk() {
            return ba.getFixed()
        }

        function bl(a) {
            m(a), bs()
        }

        function bm() {
            d.disabled = !0, bc.disableHandles(), bc.setCursor("default"), bd.setCursor("default")
        }

        function bn() {
            d.disabled = !1, bs()
        }

        function bo() {
            bc.done(), bd.activateHandlers(null, null)
        }

        function bp() {
            H.remove(), B.show(), a(b).removeData("Jcrop")
        }

        function bq(a, b) {
            bc.release(), bm();
            var c = new Image;
            c.onload = function () {
                var e = c.width,
                    f = c.height,
                    g = d.boxWidth,
                    h = d.boxHeight;
                E.width(e).height(f), E.attr("src", a), I.attr("src", a), s(E, g, h), F = E.width(), G = E.height(), I.width(F).height(G), N.width(F + M * 2).height(G + M * 2), H.width(F).height(G), bb.resize(F, G), bn(), typeof b == "function" && b.call(bt)
            }, c.src = a
        }

        function br(a, b, c) {
            var e = b || d.bgColor;
            d.bgFade && j() && d.fadeTime && !c ? a.animate({
                backgroundColor: e
            }, {
                queue: !1,
                duration: d.fadeTime
            }) : a.css("backgroundColor", e)
        }

        function bs(a) {
            d.allowResize ? a ? bc.enableOnly() : bc.enableHandles() : bc.disableHandles(), bd.setCursor(d.allowSelect ? "crosshair" : "default"), bc.setCursor(d.allowMove ? "move" : "default"), d.hasOwnProperty("trueSize") && (U = d.trueSize[0] / F, V = d.trueSize[1] / G), d.hasOwnProperty("setSelect") && (bh(d.setSelect), bc.done(), delete d.setSelect), bb.refresh(), d.bgColor != O && (br(d.shade ? bb.getShades() : H, d.shade ? d.shadeColor || d.bgColor : d.bgColor), O = d.bgColor), P != d.bgOpacity && (P = d.bgOpacity, d.shade ? bb.refresh() : bc.setBgOpacity(P)), Q = d.maxSize[0] || 0, R = d.maxSize[1] || 0, S = d.minSize[0] || 0, T = d.minSize[1] || 0, d.hasOwnProperty("outerImage") && (E.attr("src", d.outerImage), delete d.outerImage), bc.refresh()
        }
        var d = a.extend({}, a.Jcrop.defaults),
            e, f, g = !1;
        a.browser.msie && a.browser.version.split(".")[0] === "6" && (g = !0), typeof b != "object" && (b = a(b)[0]), typeof c != "object" && (c = {}), m(c);
        var A = {
            border: "none",
            visibility: "visible",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0
        }, B = a(b),
            C = !0;
        if (b.tagName == "IMG") {
            if (B[0].width != 0 && B[0].height != 0) B.width(B[0].width), B.height(B[0].height);
            else {
                var D = new Image;
                D.src = B[0].src, B.width(D.width), B.height(D.height)
            }
            var E = B.clone().removeAttr("id").css(A).show();
            E.width(B.width()), E.height(B.height()), B.after(E).hide()
        } else E = B.css(A).show(), C = !1, d.shade === null && (d.shade = !0);
        s(E, d.boxWidth, d.
        boxHeight);
        var F = E.width(),
            G = E.height(),
            H = a("<div />").width(F).height(G).addClass(i("holder")).css({
                position: "relative",
                backgroundColor: d.bgColor
            }).insertAfter(B).append(E);
        d.addClass && H.addClass(d.addClass);
        var I = a("<div />"),
            J = a("<div />").width("100%").height("100%").css({
                zIndex: 310,
                position: "absolute",
                overflow: "hidden"
            }),
            K = a("<div />").width("100%").height("100%").css("zIndex", 320),
            L = a("<div />").css({
                position: "absolute",
                zIndex: 600
            }).dblclick(function () {
                var a = ba.getFixed();
                d.onDblClick.call(bt, a)
            }).insertBefore(E).append(J, K);
        C && (I = a("<img />").attr("src", E.attr("src")).css(A).width(F).height(G), J.append(I)), g && L.css({
            overflowY: "hidden"
        });
        var M = d.boundary,
            N = z().width(F + M * 2).height(G + M * 2).css({
                position: "absolute",
                top: h(-M),
                left: h(-M),
                zIndex: 290
            }).mousedown(v),
            O = d.bgColor,
            P = d.bgOpacity,
            Q, R, S, T, U, V, W = !0,
            X, Y, Z;
        e = k(E);
        var _ = function () {
            function a() {
                var a = {}, b = ["touchstart", "touchmove", "touchend"],
                    c = document.createElement("div"),
                    d;
                try {
                    for (d = 0; d < b.length; d++) {
                        var e = b[d];
                        e = "on" + e;
                        var f = e in c;
                        f || (c.setAttribute(e, "return;"), f = typeof c[e] == "function"), a[b[d]] = f
                    }
                    return a.touchstart && a.touchend && a.touchmove
                } catch (g) {
                    return !1
                }
            }

            function b() {
                return d.touchSupport === !0 || d.touchSupport === !1 ? d.touchSupport : a()
            }
            return {
                createDragger: function (a) {
                    return function (b) {
                        return b.pageX = b.originalEvent.changedTouches[0].pageX, b.pageY = b.originalEvent.changedTouches[0].pageY, d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (X = !0, n(a, l(b)), b.stopPropagation(), b.preventDefault(), !1)
                    }
                },
                newSelection: function (a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, v(a)
                },
                isSupported: a,
                support: b()
            }
        }(),
            ba = function () {
                function h(d) {
                    d = n(d), c = a = d[0], e = b = d[1]
                }

                function i(a) {
                    a = n(a), f = a[0] - c, g = a[1] - e, c = a[0], e = a[1]
                }

                function j() {
                    return [f, g]
                }

                function k(d) {
                    var f = d[0],
                        g = d[1];
                    0 > a + f && (f -= f + a), 0 > b + g && (g -= g + b), G < e + g && (g += G - (e + g)), F < c + f && (f += F - (c + f)), a += f, c += f, b += g, e += g
                }

                function l(a) {
                    var b = m();
                    switch (a) {
                        case "ne":
                            return [b.x2, b.y];
                        case "nw":
                            return [b.x, b.y];
                        case "se":
                            return [b.x2, b.y2];
                        case "sw":
                            return [b.x, b.y2]
                    }
                }

                function m() {
                    if (!d.aspectRatio) return p();
                    var f = d.aspectRatio,
                        g = d.minSize[0] / U,
                        h = d.maxSize[0] / U,
                        i = d.maxSize[1] / V,
                        j = c - a,
                        k = e - b,
                        l = Math.abs(j),
                        m = Math.abs(k),
                        n = l / m,
                        r, s, t, u;
                    return h === 0 && (h = F * 10), i === 0 && (i = G * 10), n < f ? (s = e, t = m * f, r = j < 0 ? a - t : t + a, r < 0 ? (r = 0, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b) : r > F && (r = F, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b)) : (r = c, u = l / f, s = k < 0 ? b - u : b + u, s < 0 ? (s = 0, t = Math.abs((s - b) * f), r = j < 0 ? a - t : t + a) : s > G && (s = G, t = Math.abs(s - b) * f, r = j < 0 ? a - t : t + a)), r > a ? (r - a < g ? r = a + g : r - a > h && (r = a + h), s > b ? s = b + (r - a) / f : s = b - (r - a) / f) : r < a && (a - r < g ? r = a - g : a - r > h && (r = a - h), s > b ? s = b + (a - r) / f : s = b - (a - r) / f), r < 0 ? (a -= r, r = 0) : r > F && (a -= r - F, r = F), s < 0 ? (b -= s, s = 0) : s > G && (b -= s - G, s = G), q(o(a, b, r, s))
                }

                function n(a) {
                    return a[0] < 0 && (a[0] = 0), a[1] < 0 && (a[1] = 0), a[0] > F && (a[0] = F), a[1] > G && (a[1] = G), [a[0], a[1]]
                }

                function o(a, b, c, d) {
                    var e = a,
                        f = c,
                        g = b,
                        h = d;
                    return c < a && (e = c, f = a), d < b && (g = d, h = b), [e, g, f, h]
                }

                function p() {
                    var d = c - a,
                        f = e - b,
                        g;
                    return Q && Math.abs(d) > Q && (c = d > 0 ? a + Q : a - Q), R && Math.abs(f) > R && (e = f > 0 ? b + R : b - R), T / V && Math.abs(f) < T / V && (e = f > 0 ? b + T / V : b - T / V), S / U && Math.abs(d) < S / U && (c = d > 0 ? a + S / U : a - S / U), a < 0 && (c -= a, a -= a), b < 0 && (e -= b, b -= b), c < 0 && (a -= c, c -= c), e < 0 && (b -= e, e -= e), c > F && (g = c - F, a -= g, c -= g), e > G && (g = e - G, b -= g, e -= g), a > F && (g = a - G, e -= g, b -= g), b > G && (g = b - G, e -= g, b -= g), q(o(a, b, c, e))
                }

                function q(a) {
                    return {
                        x: a[0],
                        y: a[1],
                        x2: a[2],
                        y2: a[3],
                        w: a[2] - a[0],
                        h: a[3] - a[1]
                    }
                }
                var a = 0,
                    b = 0,
                    c = 0,
                    e = 0,
                    f, g;
                return {
                    flipCoords: o,
                    setPressed: h,
                    setCurrent: i,
                    getOffset: j,
                    moveOffset: k,
                    getCorner: l,
                    getFixed: m
                }
            }(),
            bb = function () {
                function f(a, b) {
                    e.left.css({
                        height: h(b)
                    }), e.right.css({
                        height: h(b)
                    })
                }

                function g() {
                    return i(ba.getFixed())
                }

                function i(a) {
                    e.top.css({
                        left: h(a.x),
                        width: h(a.w),
                        height: h(a.y)
                    }), e.bottom.css({
                        top: h(a.y2),
                        left: h(a.x),
                        width: h(a.w),
                        height: h(G - a.y2)
                    }), e.right.css({
                        left: h(a.x2),
                        width: h(F - a.x2)
                    }), e.left.css({
                        width: h(a.x)
                    })
                }

                function j() {
                    return a("<div />").css({
                        position: "absolute",
                        backgroundColor: d.shadeColor || d.bgColor
                    }).appendTo(c)
                }

                function k() {
                    b || (b = !0, c.insertBefore(E), g(), bc.setBgOpacity(1, 0, 1), I.hide(), l(d.shadeColor || d.bgColor, 1), bc.isAwake() ? n(d.bgOpacity, 1) : n(1, 1))
                }

                function l(a, b) {
                    br(p(), a, b)
                }

                function m() {
                    b && (c.remove(), I.show(), b = !1, bc.isAwake() ? bc.setBgOpacity(d.bgOpacity, 1, 1) : (bc.setBgOpacity(1, 1, 1), bc.disableHandles()), br(H, 0, 1))
                }

                function n(a, e) {
                    b && (d.bgFade && !e ? c.animate({
                        opacity: 1 - a
                    }, {
                        queue: !1,
                        duration: d.fadeTime
                    }) : c.css({
                        opacity: 1 - a
                    }))
                }

                function o() {
                    d.shade ? k() : m(), bc.isAwake() && n(d.bgOpacity)
                }

                function p() {
                    return c.children()
                }
                var b = !1,
                    c = a("<div />").css({
                        position: "absolute",
                        zIndex: 240,
                        opacity: 0
                    }),
                    e = {
                        top: j(),
                        left: j().height(G),
                        right: j().height(G),
                        bottom: j()
                    };
                return {
                    update: g,
                    updateRaw: i,
                    getShades: p,
                    setBgColor: l,
                    enable: k,
                    disable: m,
                    resize: f,
                    refresh: o,
                    opacity: n
                }
            }(),
            bc = function () {
                function k(b) {
                    var c = a("<div />").css({
                        position: "absolute",
                        opacity: d.borderOpacity
                    }).addClass(i(b));
                    return J.append(c), c
                }

                function l(b, c) {
                    var d = a("<div />").mousedown(r(b)).css({
                        cursor: b + "-resize",
                        position: "absolute",
                        zIndex: c
                    }).addClass("ord-" + b);
                    return _.support && d.bind("touchstart.jcrop", _.createDragger(b)), K.append(d), d
                }

                function m(a) {
                    var b = d.handleSize;
                    return l(a, c++).css({
                        opacity: d.handleOpacity
                    }).width(b).height(b).addClass(i("handle"))
                }

                function n(a) {
                    return l(a, c++).addClass("jcrop-dragbar")
                }

                function o(a) {
                    var b;
                    for (b = 0; b < a.length; b++) g[a[b]] = n(a[b])
                }

                function p(a) {
                    var b, c;
                    for (c = 0; c < a.length; c++) {
                        switch (a[c]) {
                            case "n":
                                b = "hline";
                                break;
                            case "s":
                                b = "hline bottom";
                                break;
                            case "e":
                                b = "vline right";
                                break;
                            case "w":
                                b = "vline"
                        }
                        e[a[c]] = k(b)
                    }
                }

                function q(a) {
                    var b;
                    for (b = 0; b < a.length; b++) f[a[b]] = m(a[b])
                }

                function s(a, b) {
                    d.shade || I.css({
                        top: h(-b),
                        left: h(-a)
                    }), L.css({
                        top: h(b),
                        left: h(a)
                    })
                }

                function u(a, b) {
                    L.width(a).height(b)
                }

                function v() {
                    var a = ba.getFixed();
                    ba.setPressed([a.x, a.y]), ba.setCurrent([a.x2, a.y2]), w()
                }

                function w(a) {
                    if (b) return x(a)
                }

                function x(a) {
                    var c = ba.getFixed();
                    u(c.w, c.h), s(c.x, c.y), d.shade && bb.updateRaw(c), b || A(), a ? d.onSelect.call(bt, t(c)) : d.onChange.call(bt, t(c))
                }

                function y(a, c, e) {
                    if (!b && !c) return;
                    d.bgFade && !e ? E.animate({
                        opacity: a
                    }, {
                        queue: !1,
                        duration: d.fadeTime
                    }) : E.css("opacity", a)
                }

                function A() {
                    L.show(), d.shade ? bb.opacity(P) : y(P, !0), b = !0
                }

                function B() {
                    F(), L.hide(), d.shade ? bb.opacity(1) : y(1), b = !1, d.onRelease.call(bt)
                }

                function C() {
                    j && K.show()
                }

                function D() {
                    j = !0;
                    if (d.allowResize) return K.show(), !0
                }

                function F() {
                    j = !1, K.hide()
                }

                function G(a) {
                    Y === a ? F() : D()
                }

                function H() {
                    G(!1), v()
                }
                var b, c = 370,
                    e = {}, f = {}, g = {}, j = !1;
                d.dragEdges && a.isArray(d.createDragbars) && o(d.createDragbars), a.isArray(d.createHandles) && q(d.createHandles), d.drawBorders && a.isArray(d.createBorders) && p(d.createBorders), a(document).bind("touchstart.jcrop-ios", function (b) {
                    a(b.currentTarget).hasClass("jcrop-tracker") && b.stopPropagation()
                });
                var M = z().mousedown(r("move")).css({
                    cursor: "move",
                    position: "absolute",
                    zIndex: 360
                });
                return _.support && M.bind("touchstart.jcrop", _.createDragger("move")), J.append(M), F(), {
                    updateVisible: w,
                    update: x,
                    release: B,
                    refresh: v,
                    isAwake: function () {
                        return b
                    },
                    setCursor: function (a) {
                        M.css("cursor", a)
                    },
                    enableHandles: D,
                    enableOnly: function () {
                        j = !0
                    },
                    showHandles: C,
                    disableHandles: F,
                    animMode: G,
                    setBgOpacity: y,
                    done: H
                }
            }(),
            bd = function () {
                function f() {
                    N.css({
                        zIndex: 450
                    }), _.support && a(document).bind("touchmove.jcrop", k).bind("touchend.jcrop", m), e && a(document).bind("mousemove.jcrop", h).bind("mouseup.jcrop", i)
                }

                function g() {
                    N.css({
                        zIndex: 290
                    }), a(document).unbind(".jcrop")
                }

                function h(a) {
                    return b(l(a)), !1
                }

                function i(a) {
                    return a.preventDefault(), a.stopPropagation(), X && (X = !1, c(l(a)), bc.isAwake() && d.onSelect.call(bt, t(ba.getFixed())), g(), b = function () {}, c = function () {}), !1
                }

                function j(a, d) {
                    return X = !0, b = a, c = d, f(), !1
                }

                function k(a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, h(a)
                }

                function m(a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, i(a)
                }

                function n(a) {
                    N.css("cursor", a)
                }
                var b = function () {}, c = function () {}, e = d.trackDocument;
                return e || N.mousemove(h).mouseup(i).mouseout(i), E.before(N), {
                    activateHandlers: j,
                    setCursor: n
                }
            }(),
            be = function () {
                function e() {
                    d.keySupport && (b.show(), b.focus())
                }

                function f(a) {
                    b.hide()
                }

                function h(a, b, c) {
                    d.allowMove && (ba.moveOffset([b, c]), bc.updateVisible(!0)), a.preventDefault(), a.stopPropagation()
                }

                function i(a) {
                    if (a.ctrlKey || a.metaKey) return !0;
                    Z = a.shiftKey ? !0 : !1;
                    var b = Z ? 10 : 1;
                    switch (a.keyCode) {
                        case 37:
                            h(a, -b, 0);
                            break;
                        case 39:
                            h(a, b, 0);
                            break;
                        case 38:
                            h(a, 0, -b);
                            break;
                        case 40:
                            h(a, 0, b);
                            break;
                        case 27:
                            d.allowSelect && bc.release();
                            break;
                        case 9:
                            return !0
                    }
                    return !1
                }
                var b = a('<input type="radio" />').css({
                    position: "fixed",
                    left: "-120px",
                    width: "12px"
                }),
                    c = a("<div />").css({
                        position: "absolute",
                        overflow: "hidden"
                    }).append(b);
                return d.keySupport && (b.keydown(i).blur(f), g || !d.fixedSupport ? (b.css({
                    position: "absolute",
                    left: "-20px"
                }), c.append(b).insertBefore(E)) : b.insertBefore(E)), {
                    watchKeys: e
                }
            }();
        _.support && N.bind("touchstart.jcrop", _.newSelection), K.hide(), bs(!0);
        var bt = {
            setImage: bq,
            animateTo: bg,
            setSelect: bh,
            setOptions: bl,
            tellSelect: bj,
            tellScaled: bk,
            setClass: bf,
            disable: bm,
            enable: bn,
            cancel: bo,
            release: bc.release,
            destroy: bp,
            focus: be.watchKeys,
            getBounds: function () {
                return [F * U, G * V]
            },
            getWidgetSize: function () {
                return [F, G]
            },
            getScaleFactor: function () {
                return [U, V]
            },
            getOptions: function () {
                return d
            },
            ui: {
                holder: H,
                selection: L
            }
        };
        return a.browser.msie && H.bind("selectstart", function () {
            return !1
        }), B.data("Jcrop", bt), bt
    }, a.fn.Jcrop = function (b, c) {
        var d;
        return this.each(function () {
            if (a(this).data("Jcrop")) {
                if (b === "api") return a(this).data("Jcrop");
                a(this).data("Jcrop").setOptions(b)
            } else this.tagName == "IMG" ? a.Jcrop.Loader(this, function () {
                a(this).css({
                    display: "block",
                    visibility: "hidden"
                }), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d)
            }) : (a(this).css({
                display: "block",
                visibility: "hidden"
            }), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d))
        }), this
    }, a.Jcrop.Loader = function (b, c, d) {
        function g() {
            f.complete ? (e.unbind(".jcloader"), a.isFunction(c) && c.call(f)) : window.setTimeout(g, 50)
        }
        var e = a(b),
            f = e[0];
        e.bind("load.jcloader", g).bind("error.jcloader", function (b) {
            e.unbind(".jcloader"), a.isFunction(d) && d.call(f)
        }), f.complete && a.isFunction(c) && (e.unbind(".jcloader"), c.call(f))
    }, a.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: 7,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {},
        onSelect: function () {},
        onDblClick: function () {},
        onRelease: function () {}
    }
})(jQuery);

/*
jQuery Waypoints - v2.0.1
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t,e,n,r,i,o,l,s,f,u,a,c,h,d,p,w,y=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},v=[].slice;t=window.jQuery;e=t(window);i={horizontal:{},vertical:{}};o=1;s={};l="waypoints-context-id";a="resize.waypoints";c="scroll.waypoints";h=1;d="waypoints-waypoint-ids";p="waypoint";w="waypoints";n=function(){function e(e){var n=this;this.$element=e;this.element=e[0];this.didResize=false;this.didScroll=false;this.id="context"+o++;this.oldScroll={x:e.scrollLeft(),y:e.scrollTop()};this.waypoints={horizontal:{},vertical:{}};e.data(l,this.id);s[this.id]=this;e.bind(c,function(){var e;if(!n.didScroll){n.didScroll=true;e=function(){n.doScroll();return n.didScroll=false};return window.setTimeout(e,t[w].settings.scrollThrottle)}});e.bind(a,function(){var e;if(!n.didResize){n.didResize=true;e=function(){t[w]("refresh");return n.didResize=false};return window.setTimeout(e,t[w].settings.resizeThrottle)}})}e.prototype.doScroll=function(){var e,n=this;e={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(y.call(window,"ontouchstart")>=0&&(!e.vertical.oldScroll||!e.vertical.newScroll)){t[w]("refresh")}t.each(e,function(e,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;t.each(n.waypoints[e],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return t.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}};e.prototype.refresh=function(){var e,n,r,i=this;r=t.isWindow(this.element);n=this.$element.offset();this.doScroll();e={horizontal:{contextOffset:r?0:n.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:n.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?t[w]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return t.each(e,function(e,n){return t.each(i.waypoints[e],function(e,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=t.isWindow(r.element)?0:r.$element.offset()[n.offsetProp];if(t.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(n.contextDimension*i/100)}}r.offset=o-n.contextOffset+n.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=n.oldScroll)&&s<=r.offset){return r.trigger([n.backward])}else if(l!==null&&l>(f=n.oldScroll)&&f>=r.offset){return r.trigger([n.forward])}else if(l===null&&n.oldScroll>=r.offset){return r.trigger([n.forward])}})})};e.prototype.checkEmpty=function(){if(t.isEmptyObject(this.waypoints.horizontal)&&t.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([a,c].join(" "));return delete s[this.id]}};return e}();r=function(){function e(e,n,r){var o,l;r=t.extend({},t.fn[p].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var e;e=t[w]("viewportHeight");if(!t.isWindow(n.element)){e=n.$element.height()}return e-t(this).outerHeight()}}this.$element=e;this.element=e[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=n;this.enabled=r.enabled;this.id="waypoints"+h++;this.offset=null;this.options=r;n.waypoints[this.axis][this.id]=this;i[this.axis][this.id]=this;o=(l=e.data(d))!=null?l:[];o.push(this.id);e.data(d,o)}e.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};e.prototype.disable=function(){return this.enabled=false};e.prototype.enable=function(){this.context.refresh();return this.enabled=true};e.prototype.destroy=function(){delete i[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};e.getWaypointsByElement=function(e){var n,r;r=t(e).data(d);if(!r){return[]}n=t.extend({},i.horizontal,i.vertical);return t.map(r,function(t){return n[t]})};return e}();u={init:function(e,i){var o;if(i==null){i={}}if((o=i.handler)==null){i.handler=e}this.each(function(){var e,o,f,u;e=t(this);f=(u=i.context)!=null?u:t.fn[p].defaults.context;if(!t.isWindow(f)){f=e.closest(f)}f=t(f);o=s[f.data(l)];if(!o){o=new n(f)}return new r(e,o,i)});t[w]("refresh");return this},disable:function(){return u._invoke(this,"disable")},enable:function(){return u._invoke(this,"enable")},destroy:function(){return u._invoke(this,"destroy")},prev:function(t,e){return u._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return u._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(e,n,r){var i,o;if(e==null){e="vertical"}if(n==null){n=window}o=f.aggregate(n);i=[];this.each(function(){var n;n=t.inArray(this,o[e]);return r(i,n,o[e])});return this.pushStack(i)},_invoke:function(e,n){e.each(function(){var e;e=r.getWaypointsByElement(this);return t.each(e,function(t,e){e[n]();return true})});return this}};t.fn[p]=function(){var e,n;n=arguments[0],e=2<=arguments.length?v.call(arguments,1):[];if(u[n]){return u[n].apply(this,e)}else if(t.isFunction(n)){return u.init.apply(this,arguments)}else if(t.isPlainObject(n)){return u.init.apply(this,[null,n])}else if(!n){return t.error("jQuery Waypoints needs a callback function or handler option.")}else{return t.error("The "+n+" method does not exist in jQuery Waypoints.")}};t.fn[p].defaults={context:window,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};f={refresh:function(){return t.each(s,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=window.innerHeight)!=null?t:e.height()},aggregate:function(e){var n,r,o;n=i;if(e){n=(o=s[t(e).data(l)])!=null?o.waypoints:void 0}if(!n){return[]}r={horizontal:[],vertical:[]};t.each(r,function(e,i){t.each(n[e],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[e]=t.map(i,function(t){return t.element});return r[e]=t.unique(r[e])});return r},above:function(t){if(t==null){t=window}return f._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=window}return f._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=window}return f._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=window}return f._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return f._invoke("enable")},disable:function(){return f._invoke("disable")},destroy:function(){return f._invoke("destroy")},extendFn:function(t,e){return u[t]=e},_invoke:function(e){var n;n=t.extend({},i.vertical,i.horizontal);return t.each(n,function(t,n){n[e]();return true})},_filter:function(e,n,r){var i,o;i=s[t(e).data(l)];if(!i){return[]}o=[];t.each(i.waypoints[n],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return t.map(o,function(t){return t.element})}};t[w]=function(){var t,e;e=arguments[0],t=2<=arguments.length?v.call(arguments,1):[];if(f[e]){return f[e].apply(null,t)}else{return f.aggregate.call(null,e)}};t[w].settings={resizeThrottle:100,scrollThrottle:30};e.load(function(){return t[w]("refresh")})}).call(this);

/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.1
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t,n,r;t=window.jQuery;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck"};r=function(n,r){n.wrap(r.wrapper);n.each(function(){var n;n=t(this);n.parent().height(n.height());return true});return n.parent()};t.waypoints("extendFn","sticky",function(e){var i;e=t.extend({},t.fn.waypoint.defaults,n,e);i=r(this,e);e.handler=function(n){var r,i;r=t(this).children(":first");i=n==="down"||n==="right";return r.toggleClass(e.stuckClass,i)};i.waypoint(e);return this})}).call(this);

/*
jQuery ColorBox v1.3.31
(c) 2013 Jack Moore - jacklmoore.com/colorbox
updated: 2013-01-28
license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		transition: "elastic",
		speed: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		inline: false,
		html: false,
		iframe: false,
		fastIframe: true,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 0.9,
		preloading: true,
		className: false,

		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		open: false,
		returnFocus: true,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined
	},

	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',

	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',

	// Special Handling for IE
	isIE = !$.support.leadingWhitespace, // IE6 to IE8
	isIE6 = isIE && !window.XMLHttpRequest, // IE6
	event_ie6 = prefix + '_IE6',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,

	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	element,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	className,
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************

	// Convience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;

		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : $window.height()) / 100) : 1) * parseInt(size, 10));
	}

	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo || /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(url);
	}

	// Assigns function results to their respective properties
	function makeSettings() {
		var i,
			data = $.data(element, colorbox);

		if (data == null) {
			settings = $.extend({}, defaults);
			if (console && console.log) {
				console.log('Error: cboxElement missing settings object');
			}
		} else {
			settings = $.extend({}, data);
		}

		for (i in settings) {
			if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
				settings[i] = settings[i].call(element);
			}
		}

		settings.rel = settings.rel || element.rel || $(element).data('rel') || 'nofollow';
		settings.href = settings.href || $(element).attr('href');
		settings.title = settings.title || element.title;

		if (typeof settings.href === "string") {
			settings.href = $.trim(settings.href);
		}
	}

	function trigger(event, callback) {
		$(document).trigger(event);
		$('*', $box).trigger(event);
		if (callback) {
			callback.call(element);
		}
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		start,
		stop;

		if (settings.slideshow && $related[1]) {
			start = function () {
				$slideshow
					.html(settings.slideshowStop)
					.unbind(click)
					.bind(event_complete, function () {
						if (settings.loop || $related[index + 1]) {
							timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
						}
					})
					.bind(event_load, function () {
						clearTimeout(timeOut);
					})
					.one(click + ' ' + event_cleanup, stop);
				$box.removeClass(className + "off").addClass(className + "on");
				timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
			};

			stop = function () {
				clearTimeout(timeOut);
				$slideshow
					.html(settings.slideshowStart)
					.unbind([event_complete, event_load, event_cleanup, click].join(' '))
					.one(click, function () {
						publicMethod.next();
						start();
					});
				$box.removeClass(className + "on").addClass(className + "off");
			};

			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		} else {
			$box.removeClass(className + "off " + className + "on");
		}
	}

	function launch(target) {
		if (!closing) {

			element = target;

			makeSettings();

			$related = $(element);

			index = 0;

			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var data = $.data(this, colorbox),
						relRelated;

					if (data) {
						relRelated =  $(this).data('rel') || data.rel || this.rel;
					}

					return (relRelated === settings.rel);
				});
				index = $related.index(element);

				// Check direct calls to ColorBox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}

			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

				// Show colorbox so the sizes can be calculated in older versions of jQuery
				$box.css({visibility:'hidden', display:'block'});

				$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden').appendTo($content);

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);

				if (settings.returnFocus) {
					$(element).blur();
					$(document).one(event_closed, function () {
						$(element).focus();
					});
				}

				$overlay.css({
					opacity: parseFloat(settings.opacity),
					cursor: settings.overlayClose ? "pointer" : "auto",
					visibility: 'visible'
				}).show();

				// Opens inital empty ColorBox prior to content being loaded.
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position();

				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}

				trigger(event_open, settings.onOpen);

				$groupControls.add($title).hide();

				$close.html(settings.close).show();
			}

			publicMethod.load(true);
		}
	}

	// ColorBox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box && document.body) {
			init = false;

			$window = $(window);
			$box = $tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
			$overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
			$loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic"));
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$next = $tag(div, "Next"),
				$prev = $tag(div, "Previous"),
				$slideshow = $tag(div, "Slideshow").bind(event_open, slideshow),
				$close = $tag(div, "Close")
			);

			$wrap.append( // The 3x3 Grid that makes up ColorBox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});

			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');

			$groupControls = $next.add($prev).add($current).add($slideshow);

			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add ColorBox's event bindings
	function addBindings() {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
				e.preventDefault();
				launch(this);
			}
		}

		if ($box) {
			if (!init) {
				init = true;

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.overlayClose) {
						publicMethod.close();
					}
				});

				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.escKey && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.arrowKey && $related[1]) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				if ($.isFunction($.fn.on)) {
					$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
				} else { // For jQuery 1.3.x -> 1.6.x
					$('.'+boxElement).live('click.'+prefix, clickHandler);
				}
			}
			return true;
		}
		return false;
	}

	// Don't do anything if ColorBox already exists.
	if ($.colorbox) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.fn.colorbox.close();
	// Usage from within an iframe: parent.$.fn.colorbox.close();
	// ****************

	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this;

		options = options || {};

		appendHTML();

		if (addBindings()) {
			if ($.isFunction($this)) { // assume a call to $.colorbox
				$this = $('<a/>');
				options.open = true;
			} else if (!$this[0]) { // colorbox being applied to empty collection
				return $this;
			}

			if (callback) {
				options.onComplete = callback;
			}

			$this.each(function () {
				$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			}).addClass(boxElement);

			if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
				launch($this[0]);
			}
		}

		return $this;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;

		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.fixed && !isIE6) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.right !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
		} else if (settings.left !== false) {
			left += setSize(settings.left, 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}

		if (settings.bottom !== false) {
			top += Math.max($window.height() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
		} else if (settings.top !== false) {
			top += setSize(settings.top, 'y');
		} else {
			top += Math.round(Math.max($window.height() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left, visibility:'visible'});

		// setting the speed to 0 to reduce the delay between same-sized content.
		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;

		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";

		function modalDimensions(that) {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt(that.style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt(that.style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		if(speed===0){ // temporary workaround to side-step jQuery-UI 1.8 bug (http://bugs.jquery.com/ticket/12273)
			$box.css(css);
		}
		$box.dequeue().animate(css, {
			duration: speed,
			complete: function () {
				modalDimensions(this);

				active = false;

				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";

				if (settings.reposition) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if (loadedCallback) {
					loadedCallback();
				}
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};

			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});

			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}
			$loaded.css({height: settings.h});

			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}

		var callback, speed = settings.transition === "none" ? 0 : settings.speed;

		$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.

		$loaded = $tag(div, 'LoadedContent').append(object);

		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}

		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);

		$loadingBay.hide();

		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});

		$(photo).css({'float': 'none'});


		callback = function () {
			var total = $related.length,
				iframe,
				frameBorder = 'frameBorder',
				allowTransparency = 'allowTransparency',
				complete;

			if (!open) {
				return;
			}

			function removeFilter() {
				if (isIE) {
					$box[0].style.removeAttribute('filter');
				}
			}

			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.remove();
				trigger(event_complete, settings.onComplete);
			};

			if (isIE) {
				//This fadeIn helps the bicubic resampling to kick-in.
				if (photo) {
					$loaded.fadeIn(100);
				}
			}

			$title.html(settings.title).add($loaded).show();

			if (total > 1) { // handle grouping
				if (typeof settings.current === "string") {
					$current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
				}

				$next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
				$prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);

				if (settings.slideshow) {
					$slideshow.show();
				}

				// Preloads images within a rel group
				if (settings.preloading) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var src,
							img,
							i = $related[this],
							data = $.data(i, colorbox);

						if (data && data.href) {
							src = data.href;
							if ($.isFunction(src)) {
								src = src.call(i);
							}
						} else {
							src = i.href;
						}

						if (isImage(src)) {
							img = new Image();
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}

			if (settings.iframe) {
				iframe = $tag('iframe')[0];

				if (frameBorder in iframe) {
					iframe[frameBorder] = 0;
				}

				if (allowTransparency in iframe) {
					iframe[allowTransparency] = "true";
				}

				if (!settings.scrolling) {
					iframe.scrolling = "no";
				}

				$(iframe)
					.attr({
						src: settings.href,
						name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
						'class': prefix + 'Iframe',
						allowFullScreen : true, // allow HTML5 video to go fullscreen
						webkitAllowFullScreen : true,
						mozallowfullscreen : true
					})
					.one('load', complete)
					.appendTo($loaded);

				$(document).one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.fastIframe) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}

			if (settings.transition === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};

		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	publicMethod.load = function (launched) {
		var href, setResize, prep = publicMethod.prep, $inline;

		active = true;

		photo = false;

		element = $related[index];

		if (!launched) {
			makeSettings();
		}

		if (className) {
			$box.add($overlay).removeClass(className);
		}
		if (settings.className) {
			$box.add($overlay).addClass(settings.className);
		}
		className = settings.className;

		trigger(event_purge);

		trigger(event_load, settings.onLoad);

		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');

		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');

		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;

		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}

		href = settings.href;

		loadingTimer = setTimeout(function () {
			$loadingOverlay.appendTo($content);
		}, 100);

		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when ColorBox closes or loads new content.
			$inline = $tag(div).hide().insertBefore($(href)[0]);

			$(document).one(event_purge, function () {
				$inline.replaceWith($loaded.children());
			});

			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(href)) {
			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.bind('error',function () {
				settings.title = false;
				prep($tag(div, 'Error').html(settings.imgError));
			})
			.one('load', function () {
				var percent;

				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}

				if (settings.h) {
					photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
				}

				if ($related[1] && (settings.loop || $related[index + 1])) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
						publicMethod.next();
					};
				}

				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}

				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});

			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.data, function (data, status) {
				prep(status === 'error' ? $tag(div, 'Error').html(settings.xhrError) : $(this).contents());
			});
		}
	};

	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.loop || $related[index + 1])) {
			index = getIndex(1);
			publicMethod.load();
		}
	};

	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.loop || index)) {
			index = getIndex(-1);
			publicMethod.load();
		}
	};

	// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {

			closing = true;

			open = false;

			trigger(event_cleanup, settings.onCleanup);

			$window.unbind('.' + prefix + ' .' + event_ie6);

			$overlay.fadeTo(200, 0);

			$box.stop().fadeTo(300, 0, function () {

				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();

				trigger(event_purge);

				$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.

				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// Removes changes ColorBox made to the document, but does not remove the plugin
	// from jQuery.
	publicMethod.remove = function () {
		$([]).add($box).add($overlay).remove();
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).unbind('click.'+prefix);
	};

	// A method for fetching the current element ColorBox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));

/**
 * TextAreaExpander plugin for jQuery
 * v1.0
 * Expands or contracts a textarea height depending on the
 * quatity of content entered by the user in the box.
 *
 * By Craig Buckler, Optimalworks.net
 * With some modification by Taufik
 * As featured on SitePoint.com:
 * http://www.sitepoint.com/blogs/2009/07/29/build-auto-expanding-textarea-1/
 *
 * Please use as you wish at your own risk.
 */

/**
 * Usage:
 *
 * From JavaScript, use:
 *     $(<node>).TextAreaExpander(<minHeight>, <maxHeight>);
 *     where:
 *       <node> is the DOM node selector, e.g. "textarea"
 *       <minHeight> is the minimum textarea height in pixels (optional)
 *       <maxHeight> is the maximum textarea height in pixels (optional)
 *
 * Alternatively, in you HTML:
 *     Assign a class of "expand" to any <textarea> tag.
 *     e.g. <textarea name="textarea1" rows="3" cols="40" class="expand"></textarea>
 *
 *     Or assign a class of "expandMIN-MAX" to set the <textarea> minimum and maximum height.
 *     e.g. <textarea name="textarea1" rows="3" cols="40" class="expand50-200"></textarea>
 *     The textarea will use an appropriate height between 50 and 200 pixels.
 */
(function($) {
    // jQuery plugin definition
    $.fn.TextAreaExpander = function(minHeight, maxHeight) {
        var hCheck = !($.browser.msie || $.browser.opera);
        // resize a textarea
        function ResizeTextarea(e) {
            // event or initialize element?
            e = e.target || e;
            // find content length and box width
            var vlen = e.value.length,
                    ewidth = e.offsetWidth, cb = jQuery('#colorbox');
            if (vlen !== e.valLength || ewidth !== e.boxWidth) {
                if (hCheck && (vlen < e.valLength || ewidth !== e.boxWidth))
                    e.style.height = "0px";
                var h = Math.max(e.expandMin, Math.min(e.scrollHeight, e.expandMax));
                e.style.overflow = (e.scrollHeight > h ? "auto" : "hidden");
                e.style.height = h + "px";
                e.valLength = vlen;
                e.boxWidth = ewidth;
                cb && cb.css('display') !== "none" && $.colorbox.resize();
            }
            return true;
        }
        ;

        // initialize
        this.each(function() {
            // is a textarea?
            if (this.nodeName.toLowerCase() !== "textarea")
                return;
            // set height restrictions
            var p = this.className.match(/expand(\d+)\-*(\d+)*/i);
            this.expandMin = minHeight || (p ? parseInt('0' + p[1], 10) : 0);
            this.expandMax = maxHeight || (p ? parseInt('0' + p[2], 10) : 99999);
            // initial resize
            ResizeTextarea(this);
            // zero vertical padding and add events
            if (!this.Initialized) {
                this.Initialized = true;
                $(this).bind("keyup", ResizeTextarea).bind("focus", ResizeTextarea);
            }
        });
        return this;
    };
})(jQuery);

/**
 * jQuery Form Params
 */
(function($) {
    var radioCheck = /radio|checkbox/i,
            keyBreaker = /[^\[\]]+/g,
            numberMatcher = /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/;

    var isNumber = function(value) {
        if (typeof value === 'number') {
            return true;
        }

        if (typeof value !== 'string') {
            return false;
        }

        return value.match(numberMatcher);
    };

    $.fn.extend({
        /**
         * @parent dom
         * @download http://jmvcsite.heroku.com/pluginify?plugins[]=jquery/dom/form_params/form_params.js
         * @plugin jquery/dom/form_params
         * @test jquery/dom/form_params/qunit.html
         * <p>Returns an object of name-value pairs that represents values in a form.
         * It is able to nest values whose element's name has square brackets. </p>
         * Example html:
         * @codestart html
         * &lt;form>
         *   &lt;input name="foo[bar]" value='2'/>
         *   &lt;input name="foo[ced]" value='4'/>
         * &lt;form/>
         * @codeend
         * Example code:
         * @codestart
         * $('form').formParams() //-> { foo:{bar:2, ced: 4} }
         * @codeend
         *
         * @demo jquery/dom/form_params/form_params.html
         *
         * @param {Boolean} [convert] True if strings that look like numbers and booleans should be converted.  Defaults to true.
         * @return {Object} An object of name-value pairs.
         */
        formParams: function(convert) {
            if (this[0].nodeName.toLowerCase() === 'form' && this[0].elements) {

                return jQuery(jQuery.makeArray(this[0].elements)).getParams(convert);
            }
            return jQuery("input[name], textarea[name], select[name]", this[0]).getParams(convert);
        },
        getParams: function(convert) {
            var data = {},
                    current;

            convert = convert === undefined ? true : convert;

            this.each(function() {
                var el = this,
                        type = el.type && el.type.toLowerCase();
                //if we are submit, ignore
                if ((type === 'submit') || !el.name) {
                    return;
                }

                var key = el.name,
                        value = jQuery.data(el, "value") || jQuery.fn.val.call([el]),
                        isRadioCheck = radioCheck.test(el.type),
                        parts = key.match(keyBreaker),
                        write = !isRadioCheck || !!el.checked,
                        //make an array of values
                        lastPart;

                if (convert) {
                    if (isNumber(value)) {
                        value = parseFloat(value);
                    } else if (value === 'true' || value === 'false') {
                        value = Boolean(value);
                    }
                }

                // go through and create nested objects
                current = data;
                for (var i = 0; i < parts.length - 1; i++) {
                    if (!current[parts[i]]) {
                        current[parts[i]] = {};
                    }
                    current = current[parts[i]];
                }
                lastPart = parts[parts.length - 1];

                //now we are on the last part, set the value
                if (lastPart in current && type === "checkbox") {
                    if (!jQuery.isArray(current[lastPart])) {
                        current[lastPart] = current[lastPart] === undefined ? [] : [current[lastPart]];
                    }
                    if (write) {
                        current[lastPart].push(value);
                    }
                } else if (write || !current[lastPart]) {
                    current[lastPart] = write ? value : undefined;
                }

            });
            return data;
        }
    });

})(jQuery);

