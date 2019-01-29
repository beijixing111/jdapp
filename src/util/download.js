const downApp = () => {
  var Terminal = {
    //识别设备
    platform: function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        android: u.indexOf('android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        ipad: u.indexOf('iPad') > -1,
        wechat: u.indexOf('MicroMessenger') > -1
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  if (Terminal.platform.android) {
    if (!(Terminal.platform.wechat)) {
      //跳转到安卓下载地址
      window.location.href = "http://xxxx/app-debug.apk";
    } else {
      var writeinfo = '<div id="layer_down" style="display: block;">' +
        '<div class="pointer">☝</div>' +
        '<p><i>1</i>点击右上角的“<em style="font-size: 24px;"> ··· </em>”按钮</p>' +
        '<p><i>2</i>选择 “ 在浏览器里打开 ”</p></div>';
      document.write(writeinfo);
    }
  } else if (Terminal.platform.iPhone) {
    //跳转到appStore下载地址
    window.location.href = 'xxx';
  }
};

export default downApp;