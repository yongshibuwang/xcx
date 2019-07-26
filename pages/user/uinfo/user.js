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

    if (e.detail.errMsg == 'ok') {
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    }
  },
  skip:function(){
    wx.navigateTo({
      url: '/pages/user/userinfo/edit'
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let imgs = that.data.pics
    that.setData({
      uinfo: wx.getStorageSync('uinfo'),
      pics: wx.getStorageSync('uinfo')['pic'],
      l_img: wx.getStorageSync('uinfo')['pic']
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
