/**
 * AyeTunes (iTunes like carousel)
 * author: @Daith44
 *
 */
var AyeTunes = (function() {
  'use strict';
  /**
   * @constructor AyeTunes
   */
  function AyeTunes() {
    this.options = {};
    this.timer = null;
    this.register = {
    };
    this.active = 1;
  }

  AyeTunes.prototype = {
    /**
     * Initialiser method to get things going.
     * @method init
     * @param object initObj.
     */
    init: function(initObj) {
      var afterSetUp, that = this;
      this.wrapper = document.getElementById(initObj.wrapper);
      if (typeof initObj.callbackfunc === 'function') {
        this.callbackfunc = initObj.callbackfunc;
      }
      this.active = initObj.activecell;
      this.smallloadlarge = false;
      /**
       * Requires DOM elements so is called after setUp.
       * @method afterSetUp
       * @param object initObj.
       */
      afterSetUp = function(initObj) {
        this.register.first = initObj.sections[0].id;
        this.ulHolder = this.ulHolder();
        this.nextBtn = this.getBtn('at_nextbtn');
        if (initObj.pausebutton === true || initObj.mouseoverpause === true) {
          this.pauseBtn = this.getBtn('at_pausebtn');
        }
        var ulHolderEl = this.ulHolder,
            container = this.wrapper.children[0],
            that = this;
        this.options = initObj;
        this.createCarouselUL(initObj.sections);
        this.ticker();
        if (initObj.mouseoverpause === true) {
          this.addEvent(container, 'mouseout', function(e) {
            var target = that.pauseBtn;
            that.removeClass(target, 'at_mousepause');
            if (!that.hasClass(that.pauseBtn, 'at_pause')) {
              if (!that.hasClass(target, 'at_play')) {
                that.addClass(target, 'at_play');
              }
              that.ticker();
            }
          }, that);
          this.addEvent(container, 'mouseover', function(e) {
            var target = that.pauseBtn;
            if (that.hasClass(target, 'at_play')) {
              that.removeClass(target, 'at_play');
              if (!that.hasClass(target, 'at_mousepause')) {
                that.addClass(target, 'at_mousepause');
                that.stop();
              }
            }
          }, that);
        }
        if (initObj.smallloadlarge === true) {
          this.addEvent(this.ulHolder, 'click', function(e) {
            var i, li, inter, stFunc,
                sectionObj, target;
            if (!e) { e = window.event;}
	            if (e.target) {target = e.target;}
	            else if (e.srcElement) {target = e.srcElement;}
            if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
            sectionObj = that.options.sections;
            li = that.ulHolder.getElementsByTagName('li');
            stFunc = function() {
              that.fullOpacity(li, li[0]);
              that.nextDeux(li[1].getAttribute('type'));
            };
            for (i = 0; i < sectionObj.length; i++) {
              if (sectionObj[i].id === target.getAttribute('type')) {
                if (target.parentNode.parentNode === li[2] && that.active === 0) {
                  that.fullOpacity(li, li[0], stFunc);
                } else {
                  that.next();
                }
                break;
              }
            }
          }, that);
        }
        if (initObj.pausebutton === true || initObj.mouseoverpause === true) {
          this.addEvent(this.pauseBtn, 'click', function(e) {
            if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
            if (initObj.pausebutton === true) {
              var target = that.pauseBtn;
              if (that.hasClass(target, 'at_pause')) {
                that.removeClass(target, 'at_pause');
                if (!that.hasClass(target, 'at_play')) {
                  that.addClass(target, 'at_play');
                }
                that.ticker();
              } else {
                that.removeClass(target, 'at_play');
                if (!that.hasClass(target, 'at_pause')) {
                  that.addClass(target, 'at_pause');
                  that.stop();
                }
              }
            }
          }, that);
        }
        this.addEvent(this.nextBtn, 'click', function(e) {
          if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
          that.stop();
          that.next();
          if (typeof that.pauseBtn === 'undefined' || that.hasClass(that.pauseBtn, 'at_play')) {
            that.ticker();
          }
        }, that);

        /**
         * Stop all buffered events
         */
        if (window.addEventListener) {
          window.addEventListener('focus', function() {
            if (that.hasClass(that.pauseBtn, 'at_play')) {
              that.ticker();
            }
          },false);

          window.addEventListener('blur', function() {
            that.stop();
          },false);
        }
      };
      if (initObj.randomise === true) {
        initObj.sections = initObj.sections.sort(function() {
          return 0.5 - Math.random();
        });
      }
      if (this.wrapper !== null) {
        this.setUp(this.wrapper, afterSetUp, that, initObj);
      }
    },

    /**
     * Build DOM elements.
     * @method setUp
     * @param element wrapper.
     * @param function callback.
     * @param scope that.
     * @param object initObj.
     */
    setUp: function(wrapper, callback, that, initObj) {
      var docFrag = document.createDocumentFragment(),
          nextLnk, carousel, ul, feature, next, pauseplay,
          container = document.createElement('div');
      that.addClass(container, 'at_container');
      that.addClass(container, 'shadowbox');
      carousel = document.createElement('div');
      that.addClass(carousel, 'at_carousel');
      if (initObj.carousel === 'left') {
        that.addClass(carousel, 'at_carouselleft');
      } else {
        that.addClass(carousel, 'at_carouselright');
      }
      ul = document.createElement('ul');
      ul.setAttribute('class', 'at_casebox');
      ul.setAttribute('type', 'carouselscroll');
      ul.setAttribute('style', 'top:0px');
      carousel.appendChild(ul);
      container.appendChild(carousel);
      feature = document.createElement('div');
      feature.setAttribute('class', 'at_feature');
      nextLnk = document.createElement('a');
      nextLnk.setAttribute('href', initObj.sections[0].link);
      nextLnk.style.height = '420px';
      nextLnk.style.width = '699px';
      feature.appendChild(nextLnk);
      container.appendChild(feature);
      next = document.createElement('a');
      next.setAttribute('href', '');
      that.addClass(next, 'at_nextbtn');
      if (initObj.carousel === 'left') {
        that.addClass(next, 'at_nextbtnleft');
      } else {
        that.addClass(next, 'at_nextbtnright');
      }
      container.appendChild(next);
      if (initObj.pausebutton === true || initObj.mouseoverpause === true) {
        pauseplay = document.createElement('a');
        pauseplay.setAttribute('href', '');
        that.addClass(pauseplay, 'at_pausebtn');
        that.addClass(pauseplay, 'at_play');
        container.appendChild(pauseplay);
      }
      docFrag.appendChild(container);
      wrapper.appendChild(docFrag);
      callback.apply(that, [initObj]);
    },

    /**
     * Start the click.
     * @method ticker
     */
    ticker: function() {
      if (this.timer === null) {
        this.start();
      }
    },

    /**
     * Fired when its time for next part of carousel.
     * @method next
     */
    next: function() {
      var li = this.ulHolder.getElementsByTagName('li'), that = this;
      that.moveUp(li[0]);
    },

    /**
     * Sets the active Li and calls the animScroll method
     * @method moveUp
     */
    moveUp: function(el) {
      var sel, li = this.ulHolder.getElementsByTagName('li');
      sel = li[this.active + 1].getAttribute('type');//here+1
      this.nextDeux(sel);
      this.fullOpacity(li, el);
    },

    /*
     *
     */
    fullOpacity: function(lis, el, callback) {
      var i = 0;
      // if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
      while (i < lis.length && i < 4) {
        if (!this.hasClass(lis[i].firstChild, 'bloomActive')) {
          this.addClass(lis[i].firstChild, 'bloomActive');
        }
        i++;
      }
      /*  } else {
        this.addClass(lis[1].firstChild, 'bloomActive');
      }*/
      this.animScroll(el, callback);
    },

    /**
     * closure to scroll the ils elements and keep things in balance.
     * @method animScroll
     * @param DOM Element el.
     */
    animScroll: function(el, callback) {
      var that = this,
          ulHolderEl = that.ulHolder;

      function scroll() {
        var h = parseInt(ulHolderEl.style.top, 10);
        h -= 5;
        if (h > -140) {
          h -= 5;
          ulHolderEl.style.top = h + 'px';
          setTimeout(scroll, 20);
        } else {
          ulHolderEl.removeChild(el);
          ulHolderEl.style.top = '0px';
          //   if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
          that.removeClass(ulHolderEl.children[0].firstChild, 'bloomActive');
          that.removeClass(ulHolderEl.children[1].firstChild, 'bloomActive');
          that.removeClass(ulHolderEl.children[2].firstChild, 'bloomActive');
          that.removeClass(ulHolderEl.children[3].firstChild, 'bloomActive');
          that.addClass(ulHolderEl.children[that.active].firstChild, 'bloomActive');

          /* } else {
            that.removeClass(el.firstChild, 'bloomActive');
          }*/
          ulHolderEl.appendChild(el);
          if (typeof callback === 'function') {
            callback();
          }
        }
      }
      setTimeout(scroll, 20);
    },

    nextDeux: function(sel) {
      var closure, bImg = this.wrapper.children[0].children[1].children[0].children[0];
      bImg.style.opacity = 0.4;
      bImg.parentNode.parentNode.style.backgroundImage = "url('" + this.options.sections[sel].lg + "')";
      closure = this.makeBind(this, function() {this.imgSwapAnim(sel);});
      setTimeout(closure, 130);
    },

    /**
     * Fade out the big image.
     * @method imgSwapAnim
     */
    imgSwapAnim: function(sel) {

      var that = this, hh = this.wrapper.children[0].children[1].children[0].children[0];
      function fade() {
        var h = hh;
        h.style.opacity -= 0.08;
        if (h.style.opacity > 0.15) {
          h.style.opacity -= 0.05;
          setTimeout(fade, 100);
        } else {

          that.changeBigImage(sel);
        }
      }
      setTimeout(fade, 15);
    },

    /**
     * Change the big Image.
     * @method changeBigImage
     */
    changeBigImage: function(sel) {
      var elImg = this.wrapper.children[0].children[1].children[0].children[0];
      elImg.src = this.options.sections[sel].lg;
      elImg.parentNode.setAttribute('href', this.options.sections[sel].link);
      // this.order.splice(0,1);
      if (typeof this.callbackfunc !== 'undefined') {
        this.callbackfunc(this.options.sections[sel].id);
      }
    },

    /**
     * Start call the timer at intervals.
     * @method start
     */
    start: function() {
      var closure;
      if (this.timer === null) {
        closure = this.makeBind(this, this.next);
        this.timer = setInterval(closure, this.options.auto);
      }
    },

    /**
     * Stop the timer.
     * @method stop
     */
    stop: function() {
      var target = this.pauseBtn;
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    /**
     * create the UL iterate through section to create the lis
     * @method createCarouselUL
     * @param sections
     */
    createCarouselUL: function(sections) {
      var opac = false,
          i, elImg;
      for (i = 0; i < sections.length; i++) {
        if (i === this.active) {
          opac = true;
          elImg = document.createElement('img');
          elImg.src = sections[i].lg;
          this.wrapper.children[0].children[1].children[0].appendChild(elImg);
        }
        this.makeIl(sections[i], opac, i);
        opac = false;
      }
    },

    /**
     * create the lis focusing on the middle 2nd element
     * @method makeIl
     * @param section
     * @param opac
     */
    makeIl: function(section, opac,pos) {
      var docFrag = document.createDocumentFragment(),
          elIl = document.createElement('li'),
          elImg, elHf, preloadImg;
      elIl.setAttribute('class', 'at_case');
      elIl.setAttribute('type', pos);
      elHf = document.createElement('a');
      elHf.setAttribute('href', section.link);
      preloadImg = new Image();
      preloadImg.src = section.lg;
      elImg = document.createElement('img');
      elImg.setAttribute('type', section.id);
      if (opac === true && this.hasClass(elHf, 'bloomActive') === false) {
        this.addClass(elHf, 'bloomActive');
      }
      if (this.hasClass(elHf, 'bloom') === false) {
        this.addClass(elHf, 'bloom');
      }
      elImg.src = section.sm;
      elHf.appendChild(elImg);
      elIl.appendChild(elHf);
      docFrag.appendChild(elIl);
      this.ulHolder.appendChild(docFrag);
    },

    /**
     * Onclick event if href for small image isn't wanted lad the lgImg.
     *
     */
    loadLgImg: function(id) {
      var i, present = this.options.sections,
          elImg = this.wrapper.children[0].children[1].children[0].children[0];
      for (i = 0; i < present.length; i++) {
        if (present[i].id === id) {
          elImg.parentNode.parentNode.style.backgroundImage = "url('" + this.options.sections[i].lg + "')";
          elImg.src = this.options.sections[i].lg;
        }
      }
    },

    /**
     * this always returns the ul element for the carousel
     * @method ulHolder
     */
    ulHolder: function() {
      var container = this.wrapper.children[0],
          i, status, uls = container.getElementsByTagName('ul');
      for (i = 0; i < uls.length; i++) {
        status = uls[i].getAttribute('type');
        if (status === 'carouselscroll') {
          return this.jedi(uls[i]);
        }
      }
    },

    /**
     * closure in jedi and returns the button with the class
     * @method getBtn
     * @parma CSS classN
     */
    getBtn: function(classN) {
      var container = this.wrapper.children[0],
          as, i;
      as = container.getElementsByTagName('a');
      for (i = 0; i < as.length; i++) {
        if (this.hasClass(as[i], classN) === true) {
          return this.jedi(as[i]);
        }
      }
    },

    /**
     * JSLint means putting this in its own function called from gtnBtn.
     * @method jedi
     * @param DOM Element btn.
     */
    jedi: function(btn) {
      return (function() {
        return btn;
      }());
    },

    /**
   * Utilities
   * @methods bindings, makeBind, addEvent, nodeHandler, hasClass, removeClass, addCLass
   */
    bindings: function() {
      this.makeBind(this, this.imgSwapAnim);
    },

    makeBind: function(scope, fn) {
      return function() {
        return fn.apply(scope, Array.prototype.slice.call(arguments));
      };
    },

    addEvent: function(obj, evt, fn, capture) {
      if (obj !== this.nodeHandler(obj)) {
        return false;
      }
      if (window.attachEvent) {
        obj.attachEvent('on' + evt, fn);
      } else {
        if (!capture) {
          capture = false;
        } // capture
        obj.addEventListener(evt, fn, capture);
      }
    },

    nodeHandler: function() {
      var i, element, elements = [];
      for (i = 0; i < arguments.length; i++) {
        element = arguments[i];
        if (typeof element === 'string') {
          element = document.getElementById(element);
        }
        if (arguments.length === 1) {
          return element;
        }
        elements.push(element);
      }
      return elements;
    },

    hasClass: function(element, className) {
      var regex, elClassName = element.className;
      if (!elClassName) {
        return false;
      }
      regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
      return regex.test(element.className);
    },

    removeClass: function(element, className) {
      var elClassName = element.className;
      if (!elClassName) {
        return;
      }
      element.className = elClassName.replace(
          new RegExp('(^|\\s+)' + className + '(\\s+|$)'), ' ');
    },

    addClass: function(element, className) {
      var elClassName = element.className;
      if (elClassName) {
        element.className += ' ' + className;
      } else {
        element.className = className;
      }
    }
  };
  return AyeTunes;
}());
