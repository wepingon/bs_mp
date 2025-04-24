// pages/shopping/orderNow/orderNow.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    goodNum:String,
    goodQuantity:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    addressId:0,
    addressList:{},
    address:{},
    goods:{},
    goodQuantity:1,
    crowdFlag:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow:function(){
      this.confirmOrder();
      console.log('goodNum->',this.properties.goodNum);
    },
    confirmOrder(){
      wx.showToast({
        title:'加载中',
        icon:'loading'
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPayConfirmOrder',
            method:'POST',
            data:{
              goodNum:this.data.goodNum,
              code:res.code,
            },
            success:(res)=>{
              if(res.data.code == 200){
                let a = res.data.result.addressList.filter(res=>{
                  return res.isDefault == 1;
                })
                console.log('a->',a);
                this.setData({
                  goods:res.data.result.goods,
                  address:a[0],
                  addressId:a[0].addressId
                })
                wx.showToast({
                  title:'加载成功',
                  icon:'success',
                  duration:1000
                })
                fail:(res)=>{
                  wx.showToast({
                    title:'加载失败',
                    icon:'error',
                    duration:1000
                })
                }
              }else if(res.data.code == 401){
                wx.showToast({
                  title:'请先选择地址',
                  icon:'error',
                  duration:1000
              })
              }
            },
            fail:(res)=>{
              wx.showToast({
                  title:'加载失败',
                  icon:'error',
                  duration:1500
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
              title:'加载失败',
              icon:'error',
              duration:1500
          })
        }
      })
    },
    goodQuantityChange(e){
      let tag = Number(e.currentTarget.dataset.tag);
      switch(tag){
        case 1: 
          let num = this.data.goodQuantity + 1;
          this.setData({
            goodQuantity:num
          })
          break;
        case 0:
          if(this.data.goodQuantity <= 1 ){
            wx.showToast({
              title:'数量不得少于1',
              icon:"error",
              duration:1500
            })
            this.setData({
              goodQuantity:1
            })
            break;
          }else{
            let num = this.data.goodQuantity - 1;
            this.setData({
              goodQuantity:num
            })
            break;
          }
      }
      
    },
    buyButton(){
      wx.showToast({
        title:'调起支付控件中',
        icon:'loading',
        duration:10000
      });
      if(this.data.goods.isBuy != 1){
        wx.showToast({
          title:'商品已下架或缺货，无法购买。',
          icon:'none',
          duration:1000,
          mask:true
        });
        return false
      }
      if(this.data.goods.inventory - this.data.goodQuantity < 0){
        wx.showToast({
          title:'购买的数量超过库存数量，无法购买。',
          icon:'none',
          duration:1000,
          mask:true
        });
        return false
      }
      // console.log('goodc->',goodContent);
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPayJsapiOrder',
            method:'POST',
            data:{
              goodsId:this.data.goodNum,
              code:res.code,
              quantity:this.data.goodQuantity,
              addressId:this.data.addressId
            },
            success:(res)=>{
              // console.log(res);
              if(res.data.code == 200){
                let orderNo = res.data.result.orderId;
                wx.requestPayment({
                  timeStamp: res.data.result.timeStamp,
                  nonceStr: res.data.result.nonceStr,
                  package: res.data.result.package,
                  signType: res.data.result.signType,
                  paySign: res.data.result.paySign,
                  success (res) {
                    wx.showToast({
                      title:'支付成功',
                      icon:'success'
                    })
                   },
                  fail (res) { 
                    wx.showToast({
                      title:'支付失败',
                      icon:'error'
                    })
                  },
                  complete:(res)=>{
                    wx.request({
                      url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPaySearchOrder',
                      method:"POST",
                      data:{
                        orderNo:orderNo
                      },
                      success:(res)=>{
                        // console.log('update order->',res.data);
                      }
                    });
                    wx.navigateTo({
                      url:'/pages/userInf/order/order'
                    })
                  }
                })
              }else if(res.data.code == 405){
                wx.hideToast({});
                this.setData({
                  crowdFlag:true
                })
                return false 
              }else{
                wx.showToast({
                  title:res.data.msg,
                  icon:'none'
                })
              }
            },
            fail (res) { 
              wx.showToast({
                title:'调用失败',
                icon:'error'
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'调起支付失败',
            icon:'error',
            duration:1500
          })
        }
      })
      
      // console.log('你点击了购买按钮');
      // console.log(this.data.choiceIndexFlag);
    },
    reptAddress(){
      wx.navigateTo({
        url:'/pages/userInf/address/address'
      })
    },
    crowdFlagFalse(){
      this.setData({
        crowdFlag:false
      })
    }
  }
})