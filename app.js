//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // console.log(wx.getStorageSync('uid'))
    // 登录
    if (wx.getStorageSync('uinfo')) {
      // Do something with return value
      console.log(wx.getStorageSync('uinfo'))
      if (wx.getStorageSync('uinfo')['openid']){
        wx.reLaunch({
          url: 'pages/index/index'
        })
      }else{
        wx.reLaunch({
          url: 'pages/user/userinfo/edit'
        })
      }
      
      
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
        }
      }
      // success: res => {
      //   console.log(res.code);
      //   // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
    })
    

  },
  globalData: {
    userInfo: null
  }



})