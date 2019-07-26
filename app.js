//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'https://www.zhyong.top/xcx/user/index',
            method: 'get',
            data: { code: res.code },
            success(res) {
              if (res.data.code == 200) {
                wx.setStorageSync('uinfo', res.data.list)
                // Do something with return value
                if (wx.getStorageSync('uinfo')['wechat']) {
                  wx.reLaunch({
                    url: '/pages/user/uinfo/user'
                  })
                } else if (wx.getStorageSync('uinfo')['name']){
                  wx.reLaunch({
                    url: '/pages/user/userinfo/edit'
                  })
                }else{
                  wx.reLaunch({
                    url: '/pages/login/login'
                  })
                }
              } else if (res.data.code == 199){
                  wx.setStorageSync('uinfo', res.data.list)
                  wx.reLaunch({
                    url: '/pages/login/login'
                  })
              }
            }
          })
        }
      }
    })

    
    
    

  },
  globalData: {
    userInfo: null
  }


})