

Page({
  data: {
     lunbotu : [
         "https://kwimg3.kuwo.cn/star/upload/8/72/1674490491242_.jpg",
         "https://kwimg3.kuwo.cn/star/upload/60/29/1677149062737_.jpg",
        "https://kwimg1.kuwo.cn/star/upload/73/44/1677749209264_.png",
        "https://kwimg1.kuwo.cn/star/upload/67/69/1675600985785_.jpg",
     ],
     //定义一个歌曲列表数组
     songList :[
         {
             "pic":"https://img1.kuwo.cn/star/albumcover/500/55/26/2419367180.jpg",
             "name":"有何不可",
             "artist":"许嵩",
             "album":"自定义",
             "rid":"455880"
         },
         {
            "pic":"https://img4.kuwo.cn/star/albumcover/500/43/81/1789455650.jpg",
            "name":"素颜",
            "artist":"许嵩&何曼婷",
            "album":"素颜",
            "rid":"857052"
        },
        {
            "pic":"https://img2.kuwo.cn/star/albumcover/500/44/79/2748377536.jpg",
            "name":"庐州月",
            "artist":"许嵩",
            "album":"寻雾启示",
            "rid":"624579"
        },
        {
            "pic":"https://img1.kuwo.cn/star/albumcover/500/55/26/2419367180.jpg",
            "name":"如果当时",
            "artist":"许嵩",
            "album":"自定义",
            "rid":"458663"
        }
     ],
     //定义一个变量用来接收搜索框中的关键词内容信息
     key : "",
     //定义一个歌曲列表数组，专门用来接收搜索产生的歌曲列表数据
     newSongs : []
  },

  //定义播放歌曲的方法
  playMusic(e){
    //获取到了我们的歌曲rid参数
    var rid= e.currentTarget.dataset.rid;
    //跳转到播放页面
    wx.navigateTo({
      url: '/pages/play/play?rid='+rid,
    })
  },

  //定义搜索歌曲的方法
  searchMusic(){
    //需要将关键词传递到后台
    var key = this.data.key;
    //在搜索歌曲的时候需要将原来的假数据歌曲先清空掉
    this.setData({
        songList : []
    })
    var that = this;
    //发送异步请求到后台
    wx.request({
      url: 'http://127.0.0.1:8080/searchMusic?key='+key,
      success(result){
           //回调函数的结果result其实就是由后台给你响应的数据----搜索歌曲的列表
           //将搜索产生的新结果赋值给newSongs数组
           that.setData({
               newSongs : result.data
           })
      }
    })
 },



  //定义getKeyWord方法，动态获取文本框中输入的关键词内容
  getKeyWord(e){
    var keyWord =  e.detail.value
    // console.log(keyWord);
    //将接收到的关键词赋值给data区域中的key
    this.setData({
        key : keyWord
    })
  },   

  //定义方法跳转到mv的页面
  playMV(e){
    //获取到了我们的歌曲rid参数
    var rid= e.currentTarget.dataset.rid;
    //跳转mv页面，并将歌曲rid参数携带过去
    wx.navigateTo({
      url: '/pages/mv/mv?rid='+rid,
    })
  },
 
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
