Event.observe(window, 'load', function() {
  Show.and('p', {duration: 5}).go();
});

// Singleton to get instance of Showcase class.
var Show = function () {
  var showcase = null;
  return {
    and: function() {
      if (showcase != null) {
        return showcase;
      }
      else {
        showcase = new Showcase(arguments[0]);
        return showcase;
      }
    }
  }
}();

var Showcase = Class.create({
  initialize: function(el) {
    this.options = Object.extend({
      duration: 2 // in seconds
    }, arguments[0] || {});
    this.el = el;
  },

  go: function() {
    $(this.el).fade({
      duration: this.options.duration * 2,
      transition: 'bounce'
    }).appear({
      duration: this.options.duration * 3,
      after: (function() {
        Show.and('p').go();
      }).bind(this)
    });
    $$('body').first().morph('background-color: #999', {
      duration: this.options.duration / 2,
      transition: 'blink'
    }).morph('background-color: #000', {
      duration: this.options.duration * 5,
      transition: 'easeTo'
    });
  }
});
