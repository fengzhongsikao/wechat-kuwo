// pages/mv/mv.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //定义一个变量用来接收歌曲mv的播放地址
        mvUrl : "",
        //定义变量用来接收歌曲mv的最新评论内容
        newComments :[],
        hotComments:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //页面一加载就获取到歌曲的rid参数
        var rid = options.rid;
        var that = this;
        //往后台发送异步请求
        wx.request({
          url: 'http://127.0.0.1:8080/getMvUrl?rid='+rid,
          success(result){
                //回调函数result其实就是返回给页面的MV的播放地址
               that.setData({
                   mvUrl : result.data
               })
          }
        }) 
        //热门评论
        wx.request({
            url: 'http://127.0.0.1:8080/hotComment?rid='+rid,
            success(result){
                // console.log(result.data);
                  //回调函数result其实就是歌曲的最新评论内容
                  that.setData({
                      hotComments : result.data
                  })
            }
          })
        //继续往后台发送异步请求调用MV最新的评论
        wx.request({
          url: 'http://127.0.0.1:8080/normalComment?rid='+rid,
          success(result){
            //   console.log(result.data);
                //回调函数result其实就是歌曲的最新评论内容
                that.setData({
                    newComments : result.data
                })
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})