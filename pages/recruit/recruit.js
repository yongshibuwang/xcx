// pages/recruit/recruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "tabBar":[],
    //首页横向滑动配置
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      var id = options.id;
      wx.request({
        url: 'http://www.zhyong.com:8088/h5/Recruit/recruit_info?id='+id,
        headers: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data.list.list)
          if (res.data.code == 200) {
            that.setData({
              web: res.data.list.ps,
              list: res.data.list.list
            })
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    var id =2;
    wx.request({
      url: 'http://www.zhyong.com:8088/h5/Recruit/recruit_info?id=' + id,
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data.list.list)
        if (res.data.code == 200) {
          that.setData({
            web: res.data.list.ps,
            list: res.data.list.list
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})