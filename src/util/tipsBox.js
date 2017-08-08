;(function ($) {
  $.extend({
    tipsBox: function (options) {
      options = $.extend({
        obj: null, // jq对象，要在那个html标签上显示
        str: '+1', // 字符串，要显示的内容;也可以传一段html，如: '<b style='font-family:Microsoft YaHei;'>+1</b>'
        startSize: '.24rem', // 动画开始的文字大小
        endSize: '.48rem', // 动画结束的文字大小
        interval: 600, // 动画时间间隔
        color: 'block', // 文字颜色
        callback: function () {} // 回调函数
      }, options)
      $('body').append('<span class=\'num\'>' + options.str + '</span>')
      var box = $('.num')
      console.log(options.obj.offset().left, options.left)
      var left = options.left ? options.obj.offset().left + options.left : options.obj.offset().left + options.obj.width() / 2
      var top = options.top ? options.obj.offset().top - options.top : options.obj.offset().top - options.obj.height()
      console.log(left, top)
      box.css({
        'position': 'absolute',
        'left': left + 'px',
        'top': top + 'px',
        'z-index': 9999,
        'font-size': options.startSize,
        'line-height': options.endSize,
        'color': options.color
      })
      box.animate({
        'font-size': options.endSize,
        'opacity': '0',
        'top': (top - parseInt(options.endSize)) / 100 + 'rem'
      }, options.interval, function () {
        box.remove()
        options.callback()
      })
    }
  })
})(jQuery)
