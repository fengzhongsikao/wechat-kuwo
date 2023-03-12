// pages/play/play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //定义歌曲播放地址的变量
        mp3url : "",
        //定义歌曲播放的属性值
        music : {
            method : "play"   //play表示自动播放   pause 表示暂停
        },
        //定义一个变量用来接收歌曲的详细信息
        detailInfo : "",
        //定义变量用来表示歌曲的播放状态
        status : "play",
        //定义歌词数组用来接收歌词信息
        lyrics : [],
        //定义两个变量用来表示歌曲的播放时间  以及 总时长
        playTime : "",
        endTime : "",
        //定义两个变量用来表示slider中的max和value
        max : "",
        value : "",
        //定义变量用来表示播放的歌词行数以及top值
        lineIndex : 0,
        top : 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //options参数其实就是我们从页面带过来的的参数
        var rid = options.rid;
        //根据rid来获取到歌曲的播放地址
        this.getMp3Url(rid);
        //获取歌曲的详细信息
        this.getDetailInfo(rid);
        //获取歌曲的歌词信息
        this.getLyric(rid);
    },
    //根据rid来获取到歌词信息
    getLyric(rid){
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:8080/getLyric?rid='+rid,
          success(result){
              //回调函数result就是我们的歌词内容
              that.setData({
                  lyrics : result.data
              })
          }
        })
    },

    //根据rid来获取歌曲的详细信
    getDetailInfo(rid){
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:8080/musicInfo?rid='+rid,
          success(result){
                that.setData({
                    detailInfo : result.data
                })
          }
        })
    },

    //根据rid来获取歌曲的播放地址
    getMp3Url(rid){
        var that = this;
        wx.request({
          url: 'http://127.0.0.1:8080/playMusic?rid='+rid,
          success(result){
                //回调函数rsult的值其实就是歌曲播放地址
                that.setData({
                    mp3url :result.data
                })
          }
        })
    },

    // 定义方法实现歌曲的暂停和播放
    playAndStop(){
        //获取歌曲的播放状态
        var status = this.data.status;
        if(status == "play"){
            //说明该歌曲正在播放
            this.setData({
                music:{
                    method : "pause"
                },
                status :"pause"
            })
        }
        if(status == "pause"){
            //说明该歌曲处于暂停状态
            this.setData({
                music:{
                    method : "play"
                },
                status : "play"
            })
        }
    },

    //定义changeMusic方法，会根据歌曲播放进度来实时触发
    changeMusic(options){
        //当前歌曲播放进度的时间    8.89433
        var currentTime = options.detail.currentTime;
        //歌曲的总时长   269.98322
        var duration = options.detail.duration;
        //处理我们的时间为分钟 和 秒
        var currentTime_minute = Math.floor(currentTime / 60);
        var currentTime_second = Math.floor(currentTime % 60);
        if(currentTime_minute < 10){
            currentTime_minute = "0"+currentTime_minute;
        }
        if(currentTime_second < 10){
            currentTime_second = "0"+currentTime_second;
        }
        //处理总时长
        var duration_minute = Math.floor(duration / 60);
        var duration_second = Math.floor(duration % 60);
        if(duration_minute < 10){
            duration_minute = "0"+duration_minute;
        }
        if(duration_second < 10){
            duration_second = "0"+duration_second;
        }

        // 给data区域中的playTime 和 endTime进行赋值
        this.setData({
             playTime : currentTime_minute+":"+currentTime_second,
             endTime : duration_minute+":"+duration_second,
             max : duration,
             value : currentTime
        })

        //处理动态歌词
        var lyrics = this.data.lyrics;
        for(var i = 0;i<lyrics.length;i++){  // "100" --- 100
            if(currentTime >= +(lyrics[i].time) && currentTime <= +(lyrics[i+1].time)){
                this.setData({
                    lineIndex : i+1
                })
            }
        }
        if(this.data.lineIndex > 11){
            this.setData({
                top : (this.data.lineIndex - 11) * 50
            })
        }
        // console.log(this.data.lineIndex+"~~~~")
        // console.log(this.data.top)
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