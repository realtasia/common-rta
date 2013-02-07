/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-dropdown.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){function d(){a(b).each(function(){e(a(this)).removeClass("open")})}function e(b){var c=b.attr("data-target"),d;return c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,"")),d=a(c),d.length||(d=b.parent()),d}var b="[data-toggle=dropdown]",c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),f,g;if(c.is(".disabled, :disabled"))return;return f=e(c),g=f.hasClass("open"),d(),g||f.toggleClass("open"),c.focus(),!1},keydown:function(b){var c,d,f,g,h,i;if(!/(38|40|27)/.test(b.keyCode))return;c=a(this),b.preventDefault(),b.stopPropagation();if(c.is(".disabled, :disabled"))return;g=e(c),h=g.hasClass("open");if(!h||h&&b.keyCode==27)return c.click();d=a("[role=menu] li:not(.divider):visible a",g);if(!d.length)return;i=d.index(d.filter(":focus")),b.keyCode==38&&i>0&&i--,b.keyCode==40&&i<d.length-1&&i++,~i||(i=0),d.eq(i).focus()}};var f=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=f,this},a(document).on("click.dropdown.data-api touchstart.dropdown.data-api",d).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("touchstart.dropdown.data-api",".dropdown-menu",function(a){a.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",b,c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",b+", [role=menu]",c.prototype.keydown)}(window.jQuery)
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
// Generated by CoffeeScript 1.4.0
/*
jQuery Waypoints - v2.0.1
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t,e,n,r,i,o,l,s,f,u,a,c,h,d,p,w,y=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},v=[].slice;t=window.jQuery;e=t(window);i={horizontal:{},vertical:{}};o=1;s={};l="waypoints-context-id";a="resize.waypoints";c="scroll.waypoints";h=1;d="waypoints-waypoint-ids";p="waypoint";w="waypoints";n=function(){function e(e){var n=this;this.$element=e;this.element=e[0];this.didResize=false;this.didScroll=false;this.id="context"+o++;this.oldScroll={x:e.scrollLeft(),y:e.scrollTop()};this.waypoints={horizontal:{},vertical:{}};e.data(l,this.id);s[this.id]=this;e.bind(c,function(){var e;if(!n.didScroll){n.didScroll=true;e=function(){n.doScroll();return n.didScroll=false};return window.setTimeout(e,t[w].settings.scrollThrottle)}});e.bind(a,function(){var e;if(!n.didResize){n.didResize=true;e=function(){t[w]("refresh");return n.didResize=false};return window.setTimeout(e,t[w].settings.resizeThrottle)}})}e.prototype.doScroll=function(){var e,n=this;e={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(y.call(window,"ontouchstart")>=0&&(!e.vertical.oldScroll||!e.vertical.newScroll)){t[w]("refresh")}t.each(e,function(e,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;t.each(n.waypoints[e],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return t.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}};e.prototype.refresh=function(){var e,n,r,i=this;r=t.isWindow(this.element);n=this.$element.offset();this.doScroll();e={horizontal:{contextOffset:r?0:n.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:n.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?t[w]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return t.each(e,function(e,n){return t.each(i.waypoints[e],function(e,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=t.isWindow(r.element)?0:r.$element.offset()[n.offsetProp];if(t.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(n.contextDimension*i/100)}}r.offset=o-n.contextOffset+n.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=n.oldScroll)&&s<=r.offset){return r.trigger([n.backward])}else if(l!==null&&l>(f=n.oldScroll)&&f>=r.offset){return r.trigger([n.forward])}else if(l===null&&n.oldScroll>=r.offset){return r.trigger([n.forward])}})})};e.prototype.checkEmpty=function(){if(t.isEmptyObject(this.waypoints.horizontal)&&t.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([a,c].join(" "));return delete s[this.id]}};return e}();r=function(){function e(e,n,r){var o,l;r=t.extend({},t.fn[p].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var e;e=t[w]("viewportHeight");if(!t.isWindow(n.element)){e=n.$element.height()}return e-t(this).outerHeight()}}this.$element=e;this.element=e[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=n;this.enabled=r.enabled;this.id="waypoints"+h++;this.offset=null;this.options=r;n.waypoints[this.axis][this.id]=this;i[this.axis][this.id]=this;o=(l=e.data(d))!=null?l:[];o.push(this.id);e.data(d,o)}e.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};e.prototype.disable=function(){return this.enabled=false};e.prototype.enable=function(){this.context.refresh();return this.enabled=true};e.prototype.destroy=function(){delete i[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};e.getWaypointsByElement=function(e){var n,r;r=t(e).data(d);if(!r){return[]}n=t.extend({},i.horizontal,i.vertical);return t.map(r,function(t){return n[t]})};return e}();u={init:function(e,i){var o;if(i==null){i={}}if((o=i.handler)==null){i.handler=e}this.each(function(){var e,o,f,u;e=t(this);f=(u=i.context)!=null?u:t.fn[p].defaults.context;if(!t.isWindow(f)){f=e.closest(f)}f=t(f);o=s[f.data(l)];if(!o){o=new n(f)}return new r(e,o,i)});t[w]("refresh");return this},disable:function(){return u._invoke(this,"disable")},enable:function(){return u._invoke(this,"enable")},destroy:function(){return u._invoke(this,"destroy")},prev:function(t,e){return u._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return u._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(e,n,r){var i,o;if(e==null){e="vertical"}if(n==null){n=window}o=f.aggregate(n);i=[];this.each(function(){var n;n=t.inArray(this,o[e]);return r(i,n,o[e])});return this.pushStack(i)},_invoke:function(e,n){e.each(function(){var e;e=r.getWaypointsByElement(this);return t.each(e,function(t,e){e[n]();return true})});return this}};t.fn[p]=function(){var e,n;n=arguments[0],e=2<=arguments.length?v.call(arguments,1):[];if(u[n]){return u[n].apply(this,e)}else if(t.isFunction(n)){return u.init.apply(this,arguments)}else if(t.isPlainObject(n)){return u.init.apply(this,[null,n])}else if(!n){return t.error("jQuery Waypoints needs a callback function or handler option.")}else{return t.error("The "+n+" method does not exist in jQuery Waypoints.")}};t.fn[p].defaults={context:window,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};f={refresh:function(){return t.each(s,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=window.innerHeight)!=null?t:e.height()},aggregate:function(e){var n,r,o;n=i;if(e){n=(o=s[t(e).data(l)])!=null?o.waypoints:void 0}if(!n){return[]}r={horizontal:[],vertical:[]};t.each(r,function(e,i){t.each(n[e],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[e]=t.map(i,function(t){return t.element});return r[e]=t.unique(r[e])});return r},above:function(t){if(t==null){t=window}return f._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=window}return f._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=window}return f._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=window}return f._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return f._invoke("enable")},disable:function(){return f._invoke("disable")},destroy:function(){return f._invoke("destroy")},extendFn:function(t,e){return u[t]=e},_invoke:function(e){var n;n=t.extend({},i.vertical,i.horizontal);return t.each(n,function(t,n){n[e]();return true})},_filter:function(e,n,r){var i,o;i=s[t(e).data(l)];if(!i){return[]}o=[];t.each(i.waypoints[n],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return t.map(o,function(t){return t.element})}};t[w]=function(){var t,e;e=arguments[0],t=2<=arguments.length?v.call(arguments,1):[];if(f[e]){return f[e].apply(null,t)}else{return f.aggregate.call(null,e)}};t[w].settings={resizeThrottle:100,scrollThrottle:30};e.load(function(){return t[w]("refresh")})}).call(this);
// Generated by CoffeeScript 1.4.0
/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.1
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t,n,r;t=window.jQuery;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck"};r=function(n,r){n.wrap(r.wrapper);n.each(function(){var n;n=t(this);n.parent().height(n.height());return true});return n.parent()};t.waypoints("extendFn","sticky",function(e){var i;e=t.extend({},t.fn.waypoint.defaults,n,e);i=r(this,e);e.handler=function(n){var r,i;r=t(this).children(":first");i=n==="down"||n==="right";return r.toggleClass(e.stuckClass,i)};i.waypoint(e);return this})}).call(this);
                                                /*!
 * AmplifyJS 1.1.0 - Core, Store, Request
 *
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
(function(a,b){var c=[].slice,d={},e=a.amplify={publish:function(a){var b=c.call(arguments,1),e,f,g,h=0,i;if(!d[a])return!0;e=d[a].slice();for(g=e.length;h<g;h++){f=e[h],i=f.callback.apply(f.context,b);if(i===!1)break}return i!==!1},subscribe:function(a,b,c,e){arguments.length===3&&typeof c=="number"&&(e=c,c=b,b=null),arguments.length===2&&(c=b,b=null),e=e||10;var f=0,g=a.split(/\s/),h=g.length,i;for(;f<h;f++){a=g[f],i=!1,d[a]||(d[a]=[]);var j=d[a].length-1,k={callback:c,context:b,priority:e};for(;j>=0;j--)if(d[a][j].priority<=e){d[a].splice(j+1,0,k),i=!0;break}i||d[a].unshift(k)}return c},unsubscribe:function(a,b){if(!!d[a]){var c=d[a].length,e=0;for(;e<c;e++)if(d[a][e].callback===b){d[a].splice(e,1);break}}}}})(this),function(a,b){function e(a,e){c.addType(a,function(f,g,h){var i,j,k,l,m=g,n=(new Date).getTime();if(!f){m={},l=[],k=0;try{f=e.length;while(f=e.key(k++))d.test(f)&&(j=JSON.parse(e.getItem(f)),j.expires&&j.expires<=n?l.push(f):m[f.replace(d,"")]=j.data);while(f=l.pop())e.removeItem(f)}catch(o){}return m}f="__amplify__"+f;if(g===b){i=e.getItem(f),j=i?JSON.parse(i):{expires:-1};if(j.expires&&j.expires<=n)e.removeItem(f);else return j.data}else if(g===null)e.removeItem(f);else{j=JSON.stringify({data:g,expires:h.expires?n+h.expires:null});try{e.setItem(f,j)}catch(o){c[a]();try{e.setItem(f,j)}catch(o){throw c.error()}}}return m})}var c=a.store=function(a,b,d,e){var e=c.type;d&&d.type&&d.type in c.types&&(e=d.type);return c.types[e](a,b,d||{})};c.types={},c.type=null,c.addType=function(a,b){c.type||(c.type=a),c.types[a]=b,c[a]=function(b,d,e){e=e||{},e.type=a;return c(b,d,e)}},c.error=function(){return"amplify.store quota exceeded"};var d=/^__amplify__/;for(var f in{localStorage:1,sessionStorage:1})try{window[f].getItem&&e(f,window[f])}catch(g){}if(window.globalStorage)try{e("globalStorage",window.globalStorage[window.location.hostname]),c.type==="sessionStorage"&&(c.type="globalStorage")}catch(g){}(function(){if(!c.types.localStorage){var a=document.createElement("div"),d="amplify";a.style.display="none",document.getElementsByTagName("head")[0].appendChild(a);try{a.addBehavior("#default#userdata"),a.load(d)}catch(e){a.parentNode.removeChild(a);return}c.addType("userData",function(e,f,g){a.load(d);var h,i,j,k,l,m=f,n=(new Date).getTime();if(!e){m={},l=[],k=0;while(h=a.XMLDocument.documentElement.attributes[k++])i=JSON.parse(h.value),i.expires&&i.expires<=n?l.push(h.name):m[h.name]=i.data;while(e=l.pop())a.removeAttribute(e);a.save(d);return m}e=e.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");if(f===b){h=a.getAttribute(e),i=h?JSON.parse(h):{expires:-1};if(i.expires&&i.expires<=n)a.removeAttribute(e);else return i.data}else f===null?a.removeAttribute(e):(j=a.getAttribute(e),i=JSON.stringify({data:f,expires:g.expires?n+g.expires:null}),a.setAttribute(e,i));try{a.save(d)}catch(o){j===null?a.removeAttribute(e):a.setAttribute(e,j),c.userData();try{a.setAttribute(e,i),a.save(d)}catch(o){j===null?a.removeAttribute(e):a.setAttribute(e,j);throw c.error()}}return m})}})(),function(){function e(a){return a===b?b:JSON.parse(JSON.stringify(a))}var a={},d={};c.addType("memory",function(c,f,g){if(!c)return e(a);if(f===b)return e(a[c]);d[c]&&(clearTimeout(d[c]),delete d[c]);if(f===null){delete a[c];return null}a[c]=f,g.expires&&(d[c]=setTimeout(function(){delete a[c],delete d[c]},g.expires));return f})}()}(this.amplify=this.amplify||{}),function(a,b){function e(a){var b=!1;setTimeout(function(){b=!0},1);return function(){var c=this,d=arguments;b?a.apply(c,d):setTimeout(function(){a.apply(c,d)},1)}}function d(a){return{}.toString.call(a)==="[object Function]"}function c(){}a.request=function(b,f,g){var h=b||{};typeof h=="string"&&(d(f)&&(g=f,f={}),h={resourceId:b,data:f||{},success:g});var i={abort:c},j=a.request.resources[h.resourceId],k=h.success||c,l=h.error||c;h.success=e(function(b,c){c=c||"success",a.publish("request.success",h,b,c),a.publish("request.complete",h,b,c),k(b,c)}),h.error=e(function(b,c){c=c||"error",a.publish("request.error",h,b,c),a.publish("request.complete",h,b,c),l(b,c)});if(!j){if(!h.resourceId)throw"amplify.request: no resourceId provided";throw"amplify.request: unknown resourceId: "+h.resourceId}if(!a.publish("request.before",h))h.error(null,"abort");else{a.request.resources[h.resourceId](h,i);return i}},a.request.types={},a.request.resources={},a.request.define=function(b,c,d){if(typeof c=="string"){if(!(c in a.request.types))throw"amplify.request.define: unknown type: "+c;d.resourceId=b,a.request.resources[b]=a.request.types[c](d)}else a.request.resources[b]=c}}(amplify),function(a,b,c){var d=["status","statusText","responseText","responseXML","readyState"],e=/\{([^\}]+)\}/g;a.request.types.ajax=function(e){e=b.extend({type:"GET"},e);return function(f,g){function n(a,e){b.each(d,function(a,b){try{m[b]=h[b]}catch(c){}}),/OK$/.test(m.statusText)&&(m.statusText="success"),a===c&&(a=null),l&&(e="abort"),/timeout|error|abort/.test(e)?m.error(a,e):m.success(a,e),n=b.noop}var h,i=e.url,j=g.abort,k=b.extend(!0,{},e,{data:f.data}),l=!1,m={readyState:0,setRequestHeader:function(a,b){return h.setRequestHeader(a,b)},getAllResponseHeaders:function(){return h.getAllResponseHeaders()},getResponseHeader:function(a){return h.getResponseHeader(a)},overrideMimeType:function(a){return h.overrideMideType(a)},abort:function(){l=!0;try{h.abort()}catch(a){}n(null,"abort")},success:function(a,b){f.success(a,b)},error:function(a,b){f.error(a,b)}};a.publish("request.ajax.preprocess",e,f,k,m),b.extend(k,{success:function(a,b){n(a,b)},error:function(a,b){n(null,b)},beforeSend:function(b,c){h=b,k=c;var d=e.beforeSend?e.beforeSend.call(this,m,k):!0;return d&&a.publish("request.before.ajax",e,f,k,m)}}),b.ajax(k),g.abort=function(){m.abort(),j.call(this)}}},a.subscribe("request.ajax.preprocess",function(a,c,d){var f=[],g=d.data;typeof g!="string"&&(g=b.extend(!0,{},a.data,g),d.url=d.url.replace(e,function(a,b){if(b in g){f.push(b);return g[b]}}),b.each(f,function(a,b){delete g[b]}),d.data=g)}),a.subscribe("request.ajax.preprocess",function(a,c,d){var e=d.data,f=a.dataMap;!!f&&typeof e!="string"&&(b.isFunction(f)?d.data=f(e):(b.each(a.dataMap,function(a,b){a in e&&(e[b]=e[a],delete e[a])}),d.data=e))});var f=a.request.cache={_key:function(a,b,c){function g(){return c.charCodeAt(e++)<<24|c.charCodeAt(e++)<<16|c.charCodeAt(e++)<<8|c.charCodeAt(e++)<<0}c=b+c;var d=c.length,e=0,f=g();while(e<d)f^=g();return"request-"+a+"-"+f},_default:function(){var a={};return function(b,c,d,e){var g=f._key(c.resourceId,d.url,d.data),h=b.cache;if(g in a){e.success(a[g]);return!1}var i=e.success;e.success=function(b){a[g]=b,typeof h=="number"&&setTimeout(function(){delete a[g]},h),i.apply(this,arguments)}}}()};a.store&&(b.each(a.store.types,function(b){f[b]=function(c,d,e,g){var h=f._key(d.resourceId,e.url,e.data),i=a.store[b](h);if(i){e.success(i);return!1}var j=g.success;g.success=function(d){a.store[b](h,d,{expires:c.cache.expires}),j.apply(this,arguments)}}}),f.persist=f[a.store.type]),a.subscribe("request.before.ajax",function(a){var b=a.cache;if(b){b=b.type||b;return f[b in f?b:"_default"].apply(this,arguments)}}),a.request.decoders={jsend:function(a,b,c,d,e){a.status==="success"?d(a.data):a.status==="fail"?e(a.data,"fail"):a.status==="error"&&(delete a.status,e(a,"error"))}},a.subscribe("request.before.ajax",function(c,d,e,f){function k(a,b){h(a,b)}function j(a,b){g(a,b)}var g=f.success,h=f.error,i=b.isFunction(c.decoder)?c.decoder:c.decoder in a.request.decoders?a.request.decoders[c.decoder]:a.request.decoders._default;!i||(f.success=function(a,b){i(a,b,f,j,k)},f.error=function(a,b){i(a,b,f,j,k)})})}(amplify,jQuery)
                                                /*!
 * Amplify Store - Persistent Client-Side Storage 1.1.0
 *
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
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