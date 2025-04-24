// pages/live/live.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    liveRoomList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow:function(){
      this.getLiveRoomList();
    },
    reptLiveRoom(e){
      let roomId = e.currentTarget.dataset.roomid;
      wx.navigateTo({
        url:`./liveRoom/liveRoom?roomId=${roomId}`
      })
    },
    getLiveRoomList(){
      wx.request({
        url:'https://api.wepingon.cn:3000/bs/live/getLiveRoomList',
        method:'POST',
        success:(res)=>{
          if(res.data.code == 200){
            wx.showToast({
              title:'获取成功',
              icon:'success',
              duration:1000,
              mask:true
            })
            this.setData({
              liveRoomList:res.data.result.liveRoomList
            })
          }else{
            wx.showToast({
              title:'没有找到直播间',
              icon:'error',
              duration:1000,
              mask:true
            })
          }
        },
        fail:(res)=>{
          wx.showToast({
            title:'获取直播间失败',
            icon:'error',
            duration:1000,
            mask:true
          })
        }
      })
    }
  }
})