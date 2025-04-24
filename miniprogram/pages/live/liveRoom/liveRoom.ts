// pages/userInf/live/live.ts
var aInter;
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    roomId:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    goods_list:[
     
    ],
    isLiveFlag:true,
    isTalkFlag:true,
    commentList:[],
    commentContent:'',
    roomName:'',
    liveRtmp:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow:function(){
      
      this.getRoomInformation();
      
    },
    onUnload:function(){
      clearTimeout(aInter);
      wx.closeSocket();
    },
    getRoomInformation(){
      wx.login({
        success:(res)=>{
         wx.request({
           url:'https://api.wepingon.cn:3000/bs/live/getLiveRoomInformation',
           method:"POST",
           data:{
             roomId:this.data.roomId
           },
           success:(res)=>{
            if(res.data.code == 200){
              console.log('result->',res.data);
              if(res.data.result.isLive){
                this.openWebSocket();
              }
              let b = `https://live.wepingon.cn/live/${res.data.result.liveRtmp}.m3u8`;
              this.setData({
                roomName:res.data.result.roomName,
                goods_list:res.data.result.goodsList,
                isLiveFlag:res.data.result.isLive,
                liveRtmp:b,
                roomName:res.data.result.roomName
              })
            }else{
              wx.showToast({
                title:'加载失败',
                icon:'error',
                duration:1000
              })
            }
           },
           fail:(res)=>{
            wx.showToast({
              title:'加载失败',
              icon:'error',
              duration:1000
            })
           }
         })
        },
        fail:(res)=>{
          wx.showToast({
            title:'加载失败',
            icon:'error',
            duration:1000
          })
        }
      })
    },
    orderButton(e){
      wx.navigateTo({
        url:`/pages/shopping/orderNow/orderNow?goodNum=${e.currentTarget.dataset.goodnum}&goodQuantity=1`
      })
    },
    openWebSocket(){
      wx.connectSocket({
        url:`wss://api.wepingon.cn:3002/?business=liveRoom&roomId=${this.data.roomId}`,
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
        this.getCommentList();
        this.webSocketStatus();
      })
    },
    getCommentList(){
      wx.login({
        success:(res)=>{
          wx.sendSocketMessage({
            data:`getCommentList&${res.code}&${this.data.roomId}`
          })
          
        }
      });
      aInter = setTimeout(() => {
       this.getCommentList();
      }, 2000);
    },
    webSocketStatus(){
      wx.onSocketMessage(async (res)=>{
        let a = JSON.parse(res.data)
        if(a.code == 200){
          this.setData({
            commentList:a.result.commentList
          })
        }else if(a.code == 201){
          this.setData({
            commentList:[]
          })
        }else{
          wx.showToast({
            title:'请先登录',
            icon:'error',
            duration:3000
          })
          clearTimeout(aInter);
        }
      })
    },
    addCartButton(e){
      let goodNum =  e.currentTarget.dataset.goodnum;
      wx.showToast({
        title:'添加中',
        icon:'loading',
        mask:true
      })
      wx.login({
        success:(res)=>{
         wx.request({
           url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPayAddCart',
           method:"POST",
           data:{
             code:res.code,
             goodNum:goodNum
           },
           success:(res)=>{
            if(res.data.code == 200){
              wx.showToast({
                title:'添加成功',
                icon:'success',
                duration:1000
              })
            }else if(res.data.code == 201){
              wx.showToast({
                title:'已在购物车中',
                icon:'success',
                duration:1000
              })
            }else{
              wx.showToast({
                title:'请先登录',
                icon:'error',
                duration:4000
              })
            }
           },
           fail:(res)=>{
            wx.showToast({
              title:'添加失败',
              icon:'error',
              duration:1000
            })
           }
         })
        },
        fail:(res)=>{
          wx.showToast({
            title:'添加失败',
            icon:'error',
            duration:1000
          })
        }
      })
    },
    changeTalk(e){
      let tFlag = e.currentTarget.dataset.tflag;
      if(tFlag == 1){
        this.setData({
          isTalkFlag:true
        })
      }else{
        this.setData({
          isTalkFlag:false
        })
      }
    },
    submitComment(){
      if(this.data.commentContent == ''){
        wx.showToast({
          title:'内容不能为空',
          icon:'error',
          mask:true,
          duration:1000
        })
        return false;
      }
      // wx.showToast({
      //   title:'发送中',
      //   icon:'loading',
      //   mask:true
      // })

      wx.login({
        success:(res)=>{
          wx.sendSocketMessage({
           data:`submitComment&${res.code}&${this.data.roomId}&${this.data.commentContent}`
          })
          wx.showToast({
            title:'评论已发送',
            icon:'success',
            duration:1000
          })
          this.setData({
            commentContent:''
          });
        //  wx.request({
        //    url:'https://api.wepingon.cn:3000/bs/live/submitComment',
        //    method:"POST",
        //    data:{
        //      code:res.code,
        //      roomId: this.data.roomId,
        //      commentContent:this.data.commentContent
        //     },
        //    success:(res)=>{
        //     if(res.data.code == 200){
        //       wx.showToast({
        //         title:'发送成功',
        //         icon:'success',
        //         duration:1000
        //       })
        //       this.setData({
        //         commentContent:''
        //       });
        //       clearTimeout(aInter);
        //       this.getCommentList();
        //     }else{
        //       wx.showToast({
        //         title:'请先登录',
        //         icon:'error',
        //         duration:4000
        //       })
        //     }
        //    },
        //    fail:(res)=>{
        //     wx.showToast({
        //       title:'发送失败',
        //       icon:'error',
        //       duration:1000
        //     })
        //    }
        //  })
        },
        fail:(res)=>{
          wx.showToast({
            title:'发送失败',
            icon:'error',
            duration:1000
          })
        }
      })
    }
  }
})