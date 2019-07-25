// pages/user/userinfo/edit.js
//获取应用实例
var tcity = require("../../../utils/citys.js");

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uinfo: wx.getStorageSync('uinfo'),
    pics: wx.getStorageSync('uinfo')['pic'],
    isShow: true,
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },
  // 三级联动显示
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  // 三级联动
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
// 表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var uinfo = e.detail.value;
    let {company, is_c, link_people, link_phone, wechat, x_name, address, name} = e.detail.value;
    if (!x_name || !company || !name || !link_phone || !wechat || !address) {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整'
      })
      return;
    };
    console.log(uinfo)
    wx.request({
      url: 'https://www.zhyong.top/xcx/user/GetUserSub',
      method: 'post',
      data: uinfo,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post提交，查看相关文档
      },
      success(res) {
        if (res.data.code==200){
          wx.setStorageSync('uinfo', res.data.list)
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 2000,
            mask: true,
            success:function(){
              
              wx.reLaunch({
                url: '/pages/user/index/index'
              })
            }
          })
        }
      }
    })
  },
  // 图片上传
  /**上传图片 */
  uploadImage: function () {
    let that = this;
    let pic = that.data.pics.join(",");
    console.log(pic);
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.uploadFile({
          url: 'https://www.zhyong.top/xcx/user/GetUserImg',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var img = res.data;
            console.log(img);
            console.log(res.data);
            pic = pic + ',' + img;
            var imgs = pic.split(",");
            console.log(imgs);
            that.setData({
              pics: imgs
            })
          }
        })
      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': '上海市',
      'city': '上海市',
      'county': '浦东新区'
    })
    console.log('初始化完成');
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