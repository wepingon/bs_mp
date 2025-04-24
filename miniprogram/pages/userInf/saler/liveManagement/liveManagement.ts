// pages/userInf/saler/liveManagement/liveManagement.ts
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
    roomId:'',
    isLive:false,
    editRoomNameFlag:false,
    editBusinessNameFlag:false,
    editGoodsFlag:false,
    editGoodsNum:'',
    editGoodsImgUrl:'',
    editGoodsImgId:'',
    editGoodsName:'',
    editGoodsPrice:'',
    editGoodsInventory:0,
    shareQrcodeUrl:'',
    liveRtmpLink:'',
    roomName:'加载中',
    redisRoomName:'',
    businessName:'加载中',
    redisBusinessName:'',
    saleAmount:0,
    saleOrder:0,
    sellingGoodsList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(){
      this.manLiveRoom();
    },
    manLiveRoom(){
      wx.showToast({
        title:'获取中',
        icon:'loading',
        mask:true
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/live/manLiveRoom",
            method:"POST",
            data:{
              code:res.code
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'获取成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                });
                this.setData({
                  isLive:res.data.result.isLive,
                  liveRtmpLink:res.data.result.liveRtmpLink,
                  shareQrcodeUrl:res.data.result.liveRtmp,
                  roomName:res.data.result.roomName,
                  businessName:res.data.result.businessName,
                  redisRoomName:res.data.result.roomName,
                  redisBusinessName:res.data.result.businessName,
                  roomId:res.data.result.roomId,
                  saleAmount:res.data.result.saleAmount,
                  saleOrder:res.data.result.saleOrder,
                  sellingGoodsList:res.data.result.goodsList
                })
              }else{
                wx.showToast({
                  title:'获取失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:'获取失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'获取失败',
            icon:'error',
            duration:1000,
            mask:true
          })
        }
      })
    },
    reptLiveRoom(){
      wx.navigateTo({
        url:`/pages/live/liveRoom/liveRoom?roomId=${this.data.roomId}`
      })
    },
    conLive(){  
      let a = !this.data.isLive;
      wx.showToast({
        title:'操作中',
        icon:'loading',
        mask:true
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/live/conLiveRoom",
            method:"POST",
            data:{
              code:res.code,
              roomId:this.data.roomId,
              conLiveFlag:a
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'操作成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                });
                this.setData({
                  isLive:a
                })
              }else{
                wx.showToast({
                  title:'操作失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:'操作失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'操作失败',
            icon:'error',
            duration:1000,
            mask:true
          })
        }
      })
    },
    callEdit(){
      this.setData({
        editBusinessNameFlag:true,
        editRoomNameFlag:true
      })
    },
    cancelEdit(){
      this.setData({
        roomName:this.data.redisRoomName,
        businessName:this.data.redisBusinessName,
        editBusinessNameFlag:false,
        editRoomNameFlag:false
      })
    },
    cancelGoodsEdit(){
      this.setData({
        editGoodsFlag:false,
        editGoodsImgUrl:'',
        editGoodsNum:'',
        editGoodsImgId:'',
        editGoodsName:'',
        editGoodsPrice:'',
        editGoodsInventory:0,
      })
    },
    editGoods(e){
      let goodNum = e.currentTarget.dataset.goodnum;
      let a = this.data.sellingGoodsList.filter(res=>{
        return res.goodNum == goodNum;
      })
      this.setData({
        editGoodsFlag:true,
        editGoodsNum:a[0].goodNum,
        editGoodsImgUrl:a[0].imgUrl,
        editGoodsImgId:a[0].imgId,
        editGoodsName:a[0].goodTitle,
        editGoodsPrice:a[0].amount,
        editGoodsInventory:a[0].inventory,
      })
    },
    addGoods(){
      this.setData({
        editGoodsFlag:true
      })
    },
    submitGoods(){
      wx.showToast({
        title:'操作中',
        icon:'loading',
        mask:true
      })
      let amountReg = /^(\-)*(\d+)\.(\d\d){0,2}$/;
      let inventoryReg = /^[0-9]*$/;

      if(!amountReg.test(this.data.editGoodsPrice)){
        wx.showToast({
          title:'请输入正确的价格，价格格式例子：9.99',
          icon:'none',
          duration:1000,
          mask:true
        })
        return false;
      }
      if(!inventoryReg.test(this.data.editGoodsInventory)){
        wx.showToast({
          title:'请输入正确的库存数量。',
          icon:'none',
          duration:1000,
          mask:true
        })
        return false;
      }
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/live/conLiveRoom",
            method:"POST",
            data:{
              code:res.code,
              roomId:this.data.roomId,
              conLiveRoomFlag:'editGoods',
              goodNum:this.data.editGoodsNum,
              editGoodsImgId:this.data.editGoodsImgId,
              editGoodsPrice:this.data.editGoodsPrice,
              editGoodsInventory:this.data.editGoodsInventory,
              editGoodsName:this.data.editGoodsName,
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'修改成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                });
                setTimeout(() => {
                  this.cancelGoodsEdit();
                  this.manLiveRoom();
                }, 1000);
              }else{
                wx.showToast({
                  title:'修改失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:'修改失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'修改失败',
            icon:'error',
            duration:1000,
            mask:true
          })
        }
      })
    },
    submitEdit(){  
      this.setData({
        editBusinessNameFlag:false,
        editRoomNameFlag:false
      })
      wx.showToast({
        title:'修改中',
        icon:'loading',
        mask:true
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/live/conLiveRoom",
            method:"POST",
            data:{
              code:res.code,
              roomId:this.data.roomId,
              conLiveRoomFlag:'edit',
              roomName:this.data.roomName,
              businessName:this.data.businessName
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'修改成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                });
                setTimeout(() => {
                  
                  this.manLiveRoom();
                }, 1000);
              }else{
                wx.showToast({
                  title:'修改失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:'修改失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'修改失败',
            icon:'error',
            duration:1000,
            mask:true
          })
        }
      })
    },
    conGoods(e){  
      let a = e.currentTarget.dataset.isbuy == 1 ? 0:1;
      let goodNum = e.currentTarget.dataset.goodnum;
      wx.showToast({
        title:'操作中',
        icon:'loading',
        mask:true
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/live/conLiveRoom",
            method:"POST",
            data:{
              code:res.code,
              goodNum:goodNum,
              roomId:this.data.roomId,
              conLiveRoomFlag:'conGoods',
              goodConFlag:a
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'操作成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                });
                setTimeout(()=>{
                  this.manLiveRoom();
                },1000)
              }else{
                wx.showToast({
                  title:'操作失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:'操作失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'操作失败',
            icon:'error',
            duration:1000,
            mask:true
          })
        }
      })
    },
    uploadImg(){
      wx.chooseMedia({
        mediaType: ['image'],
        sourceType: ['album'],
        sizeType: ['original'],
        success:(res)=>{
          wx.uploadFile({
          url: 'https://api.wepingon.cn:3000/bs/goods/uploadImg',
          name:'image',
          filePath:res.tempFiles[0].tempFilePath,
            header: {
              "content-type": "multipart/form-data"
            },
            success:(res)=>{
              let b = JSON.parse(res.data);
              if(b.code == 200){
                wx.showToast({
                  title:'图片上传成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                })
                this.setData({
                  editGoodsImgId:b.result.imgId,
                  editGoodsImgUrl:b.result.filePath
                })
              }else{
                wx.showToast({
                  title:'图片上传失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(err)=>{
              wx.showToast({
                title:'图片上传失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        }
      });
      // wx.chooseMessageFile({
      //   count: 1,
      //   type: 'file',
      //   success:(res)=>{
      //     wx.uploadFile({
      //     url: 'https://api.wepingon.cn:3000/bs/goods/uploadImg',
      //     name:'image',
      //     filePath:res.tempFiles[0].path,
      //       header: {
      //         "content-type": "multipart/form-data"
      //       },
      //       success:(res)=>{
      //         let b = JSON.parse(res.data);
      //         if(b.code == 200){
      //           wx.showToast({
      //             title:'图片上传成功',
      //             icon:'success',
      //             duration:1000,
      //             mask:true
      //           })
      //           this.setData({
      //             editGoodsImgId:b.result.imgId,
      //             editGoodsImgUrl:b.result.filePath
      //           })
      //         }else{
      //           wx.showToast({
      //             title:'图片上传失败',
      //             icon:'error',
      //             duration:1000,
      //             mask:true
      //           })
      //         }
      //       },
      //       fail:(err)=>{
      //         wx.showToast({
      //           title:'图片上传失败',
      //           icon:'error',
      //           duration:1000,
      //           mask:true
      //         })
      //       }
      //     })
      //   }
      // });
    },
    copyLinkButton(){
      wx.setClipboardData({
        data:this.data.liveRtmpLink,
        success:(res)=>{
        }
      })
    },  
  }
})