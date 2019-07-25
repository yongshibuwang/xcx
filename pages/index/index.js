//index.js
//获取应用实例
Page({
  data: {
    //首页横向滑动配置
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    uinfo: wx.getStorageSync('uinfo') // 用户信息
  },
  // 点击获取用户基本信息授权
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  // 点击获取用户电话号授权
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    
    if (e.detail.errMsg== 'ok'){
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    }
  },

  toMap: function (e) {
    // console.log(e.currentTarget.dataset.info, 'toMap')
    // var info = e.currentTarget.dataset.info
    wx.openLocation({
      // latitude: info.longitude,
      latitude: 22.5542080000,
      longitude: 113.8878770000,
      scale: 18,
      name: '宝安中心A地铁口',
      address: '宝安中心A地铁口'
    },  )
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
