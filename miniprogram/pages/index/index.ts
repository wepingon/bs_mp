
Component({
  data: {
    noneGoodsFlag:false,
    indexGoodsList:[]
  },
  methods: {
    onShow:function(){
      this.getIndexGoods();
    },
    // 事件处理函数
    uploadImg(){
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success:(res)=>{
          console.log('res.tempFiles->',res.tempFiles)
          wx.uploadFile({
          url: 'https://api.wepingon.cn:3000/bs/goods/uploadImg',
          filePath:res.tempFiles[0].path,
          name: 'image',
            header: {
              "content-type": "multipart/form-data"//注意
            },
            success(res) {console.log(res);},
            fail:function(err){console.log(err);}
          })
        }
      });
    },
    getIndexGoods(){
      wx.request({
        url:'https://api.wepingon.cn:3000/bs/index/getIndex',
        method:"POST",
        success:(res)=>{
          if(res.data.code == 200){
            this.setData({
              noneGoodsFlag:false,
              indexGoodsList:res.data.result.indexGoodsList
            })
          }else{
            this.setData({
              noneGoodsFlag:true
            })
          }
        },
        fail:(res)=>{
          wx.showToast({
            title:'请求失败',
            icon:'error',
            duration:1000
          })
        }
      })
    },
    enterLiveRoom(e){
      let roomId = e.currentTarget.dataset.roomid;
      wx.navigateTo({
        url:`/pages/live/liveRoom/liveRoom?roomId=${roomId}`
      })
    },
    wsTest(){
      wx.connectSocket({
        url:'wss://api.wepingon.cn:3002/?business=getLiveRoomComment&roomId=12345',
        header:{
          'content-type': 'application/json'
        },
        protocols: ['protocol1'],
        success:(res)=>{
        },
        fail:(res)=>{
          console.log('失败！',res);
        }
      });
      wx.onSocketOpen(()=>{
        console.log('WebSocket连接已打开');
        setInterval(()=>{this.wxSend();},3000);
      })
    },
    wxSend(){
      wx.login({
        success:(res)=>{
          wx.sendSocketMessage({
            data:`${res.code}&20001`
          })
          wx.onSocketMessage(function(res) {
            console.log(JSON.parse(res.data))
          })
        }
      })

    }
  },
})
