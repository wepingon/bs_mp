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
    ],
    expressTargetList:[ {
      "Action" : "301",
      "AcceptStation" : "您的快件已由本人签收，快递员：黄天生，联系电话：16603024895，营业部电话：17328916360，感谢您使用京东物流，期待再次为您服务。",
      "AcceptTime" : "2025-04-12 14:23:11",
      "Location" : "佛山市"
    }, {
      "Action" : "202",
      "AcceptStation" : "您的快件正在派送中，请您准备签收（快递员：黄天生，联系电话：16603024895，营业部电话：17328916360）。京东已开启“号码保护”，您的电话隐私不会被泄露，请放心接听！",
      "AcceptTime" : "2025-04-12 14:22:47",
      "Location" : "佛山市"
    }, {
      "Action" : "205",
      "AcceptStation" : "您的快件已到达【佛山狮城营业部】",
      "AcceptTime" : "2025-04-12 07:30:08",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件在【佛山狮城营业部】收货完成",
      "AcceptTime" : "2025-04-12 07:30:07",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已发车",
      "AcceptTime" : "2025-04-12 06:28:34",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件由【佛山狮山分拣中心】完成分拣，正在发往【佛山狮城营业部】",
      "AcceptTime" : "2025-04-12 05:23:18",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "佛山狮山分拣中心分拣中心已收箱，箱号WJ1002250412270025311329",
      "AcceptTime" : "2025-04-12 05:22:57",
      "Location" : "佛山市"
    }, {
      "Action" : "204",
      "AcceptStation" : "您的快件在【佛山狮山分拣中心】分拣完成",
      "AcceptTime" : "2025-04-12 04:00:07",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已到达【佛山狮山分拣中心】",
      "AcceptTime" : "2025-04-12 04:00:01",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已发车",
      "AcceptTime" : "2025-04-12 01:02:40",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件由【佛山南海散货分拣中心】完成分拣，正在发往【佛山狮山分拣中心】",
      "AcceptTime" : "2025-04-12 00:07:01",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "佛山南海散货分拣中心分拣中心已收箱，箱号WJ1002250411250098999611",
      "AcceptTime" : "2025-04-12 00:05:02",
      "Location" : "佛山市"
    }, {
      "Action" : "204",
      "AcceptStation" : "您的快件在【佛山南海散货分拣中心】分拣完成",
      "AcceptTime" : "2025-04-11 22:44:10",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已到达【佛山南海散货分拣中心】",
      "AcceptTime" : "2025-04-11 22:44:06",
      "Location" : "佛山市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件正在长途运输中，距离下一站约554Km，预计在【4月11日24点前】到达下一站，请您放心。",
      "AcceptTime" : "2025-04-11 13:26:28",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已发车",
      "AcceptTime" : "2025-04-11 02:50:44",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件由【合肥集货分拣中心】完成分拣，正在发往【佛山南海散货分拣中心】",
      "AcceptTime" : "2025-04-11 01:46:44",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "合肥集货分拣中心分拣中心已收箱，箱号WJ1002250410260086131713",
      "AcceptTime" : "2025-04-11 01:46:39",
      "Location" : "合肥市"
    }, {
      "Action" : "204",
      "AcceptStation" : "您的快件在【合肥集货分拣中心】分拣完成",
      "AcceptTime" : "2025-04-10 20:20:44",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已到达【合肥集货分拣中心】",
      "AcceptTime" : "2025-04-10 20:20:42",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已发车",
      "AcceptTime" : "2025-04-10 10:15:55",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已发车",
      "AcceptTime" : "2025-04-09 22:31:53",
      "Location" : "合肥市"
    }, {
      "Action" : "1",
      "AcceptStation" : "您的快件已由【合肥双凤营业部】揽收完成",
      "AcceptTime" : "2025-04-09 22:16:20",
      "Location" : "合肥市"
    }, {
      "Action" : "2",
      "AcceptStation" : "您的快件已到达【合肥双凤营业部】，准备装车",
      "AcceptTime" : "2025-04-09 22:16:19",
      "Location" : "合肥市"
    }, {
      "Action" : "1",
      "AcceptStation" : "京东快递 已收取快件",
      "AcceptTime" : "2025-04-09 22:16:14",
      "Location" : "合肥市"
    }, {
      "Action" : "10",
      "AcceptStation" : "揽收任务已分配给刘欢。",
      "AcceptTime" : "2025-04-09 21:15:06",
      "Location" : "合肥市"
    } ]
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
              code:res.code
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