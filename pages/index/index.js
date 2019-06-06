//index.js
//获取应用实例
Page({
  data: {
    //首页横向滑动配置
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    //图片加载
    http:'http://www.zhyong.com:8088/'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'http://www.zhyong.com:8088',
      headers: { 'Content-Type': 'application/json' },
      success:function(res){
        console.log(res.data.list.recuit)
        if(res.data.code==200){
          that.setData({
            web:res.data.list.banner,
            list: res.data.list.recuit
          })
        }
      }
    })
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
