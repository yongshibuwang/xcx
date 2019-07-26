// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 点击获取用户基本信息授权
  onGotUserInfo: function (e) {
    var userInfo = e.detail.userInfo
    userInfo['id'] = wx.getStorageSync('uinfo')['id'];
   
    if (e.detail.errMsg == 'getUserInfo:ok') {
      console.log(userInfo);
      wx.request({
        url: 'https://www.zhyong.top/xcx/user/GetUserInfo', 
        method:'post',
        data: userInfo,
        success(res) {
          console.log(res.data);return;
          if (res.data.code == 200) {
            wx.setStorageSync('uinfo', res.data.list)
            console.log(wx.getStorageSync('uinfo'))
            if (wx.getStorageSync('uinfo')['wechat']) {
              wx.reLaunch({
                url: '/pages/user/uinfo/user'
              })
            } else {
              wx.reLaunch({
                url: '/pages/user/userinfo/edit'
              })
            }
          }
        }
      })
    }
  },
  // 点击获取用户电话号授权
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            var code = res.code;
            var iv = e.detail.iv;
            var en = e.detail.encryptedData
            wx.request({
              url: 'https://www.zhyong.top/xcx/user/GetUserPhone', 
              method: 'get',
              data: {
                code: code,
                iv:iv,
                encryptedData:en
              },
              success(res) {
                if (res.data.code == 200){
                  wx.setStorageSync('uinfo', res.data.list)
                  console.log(wx.getStorageSync('uinfo'))
                  if (wx.getStorageSync('uinfo')['wechat']) {
                    wx.reLaunch({
                      url: '/pages/index/index'
                    })
                  } else {
                    wx.reLaunch({
                      url: '/pages/user/userinfo/edit'
                    })
                  }
                }else{

                }
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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