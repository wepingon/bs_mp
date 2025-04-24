// pages/shopping/order/order.ts
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
    orderList:[
      // {
      //   orderNo:'202411171658378333501663',
      //   goodNum:'10001',
      //   goodTitle:'第一件商品',
      //   amount:'9.00',
      //   quantity:1,
      //   isPay:1,
      //   isCancel:0,
      //   orderStatusCn:'已下单',
      // },
      // {
      //   orderNo:'202411171658378333501664',
      //   goodNum:'10002',
      //   goodTitle:'第二件商品',
      //   amount:'19.00',
      //   quantity:2,
      //   isPay:0,
      //   isCancel:1,
      //   orderStatusCn:'已取消',
      // },
      // {
      //   orderNo:'202411171658378333501665',
      //   goodNum:'10001',
      //   goodTitle:'第三件商品',
      //   amount:'29.00',
      //   quantity:3,
      //   isPay:1,
      //   isCancel:0,
      //   orderStatusCn:'已发货',
      // },
      // {
      //   orderNo:'202411171658378333501665',
      //   goodNum:'10001',
      //   goodTitle:'第三件商品',
      //   amount:'29.00',
      //   quantity:3,
      //   isPay:0,
      //   isCancel:0,
      //   orderStatusCn:'待付款',
      // },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow:function(){
      this.getMyOrder();
    },
    getMyOrder(){
      wx.showLoading({
        title:"获取数据中..."
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/pay/wechatMpPayMyOrder",
            method:"POST",
            data:{
              code:res.code,
              searchFlag:'waitPay'
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'获取成功',
                  icon:"success",
                  duration:1500
                });
                this.setData({
                  orderList:res.data.result.orderList
                })
              }else{
                wx.showToast({
                  title:'请求失败',
                  icon:"error",
                  duration:1500
                })
              }

            },
            fail:(res)=>{
              wx.showToast({
                title:'请求失败',
                icon:"error",
                duration:1500
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'请求失败',
            icon:"error",
            duration:1500
          })
        }
      })
    },
    closeOrder(e){
      wx.showModal({
        title:'取消订单',
        content:"你确定要取消订单吗",
        success:(res)=>{
          if(res.confirm){
            wx.showLoading({
              title:'取消订单中'
            })
            let orderNo = e.currentTarget.dataset.orderno;
            wx.login({
              success:(res)=>{
                wx.request({
                  url:"https://api.wepingon.cn:3000/bs/pay/wechatMpPayCloseOrder",
                  method:"POST",
                  data:{
                    code:res.code,
                    orderNo:orderNo
                  },
                  success:(res)=>{
                    if(res.data.code == 200){
                      wx.showToast({
                        title:"取消订单成功",
                        icon:"success",
                        duration:1500
                      });
                      setTimeout(()=>{this.getMyOrder()},2000);
                    }else{
                      wx.showToast({
                        title:"取消失败",
                        icon:"error",
                        duration:1500
                      })
                    }
                  },
                  fail:(res)=>{
                    wx.showToast({
                      title:"取消失败",
                      icon:"error",
                      duration:1500
                    })
                  }
                })
              },
              fail:(res)=>{
                wx.showToast({
                  title:"取消失败",
                  icon:"error",
                  duration:1500
                })
              }
            })
          }
        }
      })
    },
    deleteOrder(e){
      wx.showModal({
        title:'删除订单',
        content:"你确定要删除订单吗",
        success:(res)=>{
          if(res.confirm){
            wx.showLoading({
              title:'删除订单中'
            })
            let orderNo = e.currentTarget.dataset.orderno;
            wx.login({
              success:(res)=>{
                wx.request({
                  url:"https://api.wepingon.cn:3000/bs/pay/wechatMpPayDeleteOrder",
                  method:"POST",
                  data:{
                    code:res.code,
                    orderNo:orderNo
                  },
                  success:(res)=>{
                    if(res.data.code == 200){
                      wx.showToast({
                        title:"删除订单成功",
                        icon:"success",
                        duration:1500
                      });
                      setTimeout(()=>{this.getMyOrder()},2000);
                    }else{
                      wx.showToast({
                        title:"删除失败",
                        icon:"error",
                        duration:1500
                      })
                    }
                  },
                  fail:(res)=>{
                    wx.showToast({
                      title:"删除失败",
                      icon:"error",
                      duration:1500
                    })
                  }
                })
              },
              fail:(res)=>{
                wx.showToast({
                  title:"删除失败",
                  icon:"error",
                  duration:1500
                })
              }
            })
          }
        }
      })
    },
    payOrder(e){
      let orderNo = e.currentTarget.dataset.orderno;
      wx.showLoading({
        title:"请求支付中"
      });
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPayPayOrder',
            method:'POST',
            data:{
              code:res.code,
              orderNo:orderNo
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.requestPayment({
                  timeStamp: res.data.result.timeStamp,
                  nonceStr: res.data.result.nonceStr,
                  package: res.data.result.package,
                  signType: res.data.result.signType,
                  paySign: res.data.result.paySign,
                  success:(res)=>{
                    wx.showToast({
                      title:'支付成功',
                      icon:'success'
                    })
                    setTimeout(()=>{this.getMyOrder()},2000);
                  },
                  fail:(res)=>{ 
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
                        console.log('update order->',res.data);
                      }
                    })
                  }
                })               
              }else{
                wx.showToast({
                  title:"支付失败",
                  icon:'error',
                  duration:1500
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:"支付失败",
                icon:'error',
                duration:1500
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:"支付失败",
            icon:'error',
            duration:1500
          })
        }
      })
    },
    refundOrder(e){
      wx.showModal({
        title:'退款',
        content:'你确定要退款此订单吗？',
        success:(res)=>{
          let orderNo = e.currentTarget.dataset.orderno;
          if(res.confirm){
            wx.showLoading({
              title:'退款中'
            });
            wx.login({
              success:(res)=>{
                wx.request({
                  url:"https://api.wepingon.cn:3000/bs/pay/wechatMpPayRefundOrder",
                  method:"POST",
                  data:{
                    code:res.code,
                    orderNo:orderNo
                  },
                  success:(res)=>{
                    if(res.data.code == 200){
                      wx.showToast({
                        title:'退款成功',
                        icon:"success",
                        duration:1500
                      });
                      setTimeout(()=>{this.getMyOrder()},2000);
                    }else{
                      wx.showToast({
                        title:'退款失败',
                        icon:"error",
                        duration:1500
                      });
                        wx.request({
                          url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPaySearchOrder',
                          method:"POST",
                          data:{
                            orderNo:orderNo
                          },
                          success:(res)=>{
                            console.log('update order->',res.data);
                          }
                        })
                        setTimeout(()=>{this.getMyOrder()},2000);
                    }
                  },
                  fail:(res)=>{
                    wx.showToast({
                      title:'退款失败',
                      icon:"error",
                      duration:1500
                    });
                  }
                })
              },
              fail:(res)=>{
                wx.showToast({
                  title:'退款失败',
                  icon:"error",
                  duration:1500
                });
              }
            })
          }
        }
      })
    }
  }
})