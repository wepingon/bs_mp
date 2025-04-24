// pages/shopping/mall/mall.ts
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
    choiceIndexFlag :'-1',
    currentFlag : '-1',
    cart_list:[],
    goodQuantity:1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow:function(){
      this.getGoodList();
    },
    getGoodList(){
      this.setData({
        cart_list:[]
      })
      wx.showToast({
        title:'获取数据中',
        icon:'loading',
        duration:5000
      });
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/pay/wechatMpGetCart',
            method:"POST",
            header:{
              authorization :'wmpgg'
            },
            data:{
              code:res.code
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'获取成功',
                  icon:"success",
                  duration:1500
                })
                this.setData({
                  cart_list:res.data.result.cartList
                })
              }else if(res.data.code == 201){
                wx.showToast({
                  title:'购物车为空',
                  icon:"success",
                  duration:1000
                })
              }else{
                wx.showToast({
                  title:'获取失败',
                  icon:"error",
                  duration:1500
                })
              }
              
            },
            fail:(res)=>{
              wx.showToast({
                title:'获取失败',
                icon:"error",
                duration:1500
              })
            }
          })
        },
        fail:(res)=>{
          wx.showToast({
            title:'获取失败',
            icon:"error",
            duration:1500
          })
        }
      })
    },
    clickGoods(e){
      let isBuyFlag = e.currentTarget.dataset.isbuy;
      let inventory = e.currentTarget.dataset.inventory;
      if(isBuyFlag != '1' || inventory <= 0){
        this.setData({
          choiceIndexFlag:'-1',
          currentFlag:'-1',
        })
        return
      }
      this.setData({
        choiceIndexFlag:e.currentTarget.dataset.goodnum,
        currentFlag:e.currentTarget.dataset.goodnum,
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
      if(this.data.choiceIndexFlag == -1){
        wx.showToast({
          title:'请选择商品',
          icon:'error'
        })
        return false
      }
      wx.showToast({
        title:'调起支付控件中',
        icon:'loading',
        duration:10000
      });
      let goodContent = this.data.goods_list.filter(item=>{return item.goodNum == this.data.choiceIndexFlag});
      // console.log('goodc->',goodContent);
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/pay/wechatMpPayJsapiOrder',
            method:'POST',
            data:{
              goodsId:goodContent[0].goodNum,
              code:res.code,
              quantity:this.data.goodQuantity
            },
            success (res){
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
                    })
                  }
                })
              }else{
                wx.showToast({
                  title:'支付失败',
                  icon:'error'
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
    goBuy(){
      if(this.data.choiceIndexFlag == -1){
        wx.showToast({
          title:'请选择商品',
          icon:'error'
        })
        return false
      };
      wx.navigateTo({
        url:`/pages/shopping/orderNow/orderNow?goodNum=${this.data.choiceIndexFlag}&goodQuantity=${this.data.goodQuantity}`
      })
    },

    reptOrderButton(){
      wx.navigateTo({
        url:'/pages/shopping/order/order'
      })
    },
    fancha(){
      // console.log(this.data.choiceIndexFlag);
      // console.log();
    }
  }
})