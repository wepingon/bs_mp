// pages/userInf/userInf.ts
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
    token:'',
    notpayNumber:0,
    successNumber:0,
    tokenScanFlag:false,
    isBuyerFlag:true,
    dbIsSaler:false,
    loginFlag:getApp().globalData.loginFlag,
    versionText:getApp().globalData.versionText,
    userInfo:{
      username:'',
      imageUrl:'',
      sf:'',
      member:''
    },
    scanFlag:false,
    bookNum:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow: function(res){
      let loginCallbackFlag = wx.getStorageSync('loginCallbackFlag');
      if(loginCallbackFlag == '1'){
        wx.setStorageSync('loginCallbackFlag','0');
        wx.getStorage({
          key: 'token',
          success:(res)=>{
            wx.showLoading({
              title: '登录中',
            })
            this.setData({
              token:res.data
            })
            this.tokenStatuscheck();
          }
        });
      };
      this.getMyOrderIndex();
      // this.getBookData();
    },
    onLoad:function(){
      let token = wx.getStorageSync('token');
      console.log('onload->',token);
      if (token != ''){
        this.setData({
          token:token
        })
        this.tokenStatuscheck();
      }
    },
    getMyOrderIndex(){
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/pay/wechatMpPayMyOrder",
            method:"POST",
            data:{
              code:res.code,
              searchFlag:'indexOrder'
            },
            success:(res)=>{
              if(res.data.code == 200){
                let notpayNumber = 0;
                let successNumber = 0;
                res.data.result.orderNumberIndex.forEach(res=>{
                  if(res.orderStatusEn == 'NOTPAY'){
                    notpayNumber = res.orderNumberIndex;
                    return;
                  }
                  if(res.orderStatusEn == 'SUCCESS')
                  successNumber = res.orderNumberIndex;
                  return;
                })
                this.setData({
                  notpayNumber:notpayNumber,
                  successNumber:successNumber
                })
              }

            },
            fail:(res)=>{
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

    onekeyButton(){
      wx.navigateTo({
        url:'./onekeyOffinePage/onekeyOffinePage'
      })
    },
    changeIdentify(e){
      let bFlag = e.currentTarget.dataset.bflag;
      if(bFlag == 1){
        this.setData({
          isBuyerFlag:true
        })
      }else{
        this.setData({
          isBuyerFlag:false
        })
      }
    },
    reptManaLiveRoom(){
      wx.navigateTo({
        url:'./saler/liveManagement/liveManagement'
      })
    },
    reptLive(){
      wx.navigateTo({
        url:'./live/live'
      })
    },

    loginButton(){
      wx.navigateTo({
        url:'./loginPage/loginPage'
      })
      // wx.showLoading({
      //   title: '登录中',
      // })
      // wx.getStorage({
      //   key: 'token',
      //   success:(res)=>{
      //     this.setData({
      //       token:res.data
      //     })
      //     this.tokenStatuscheck();
      //   },
      //   fail: (res) =>{
      //     this.getLogin();
      //   }
      // });
    },
    tokenStatuscheck(){
      wx.request({
        url:'https://api.wepingon.cn:3000/bs/login/wechatMpTokenStatusCheck',
        method:"POST",
        data:{
          token:this.data.token,
          browser_code:this.data.token
        },
        success:(res)=>{
          if(res.data.code == 200){
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000//持续的时间
            });
            getApp().globalData.loginFlag = true
            let bbb;
            if(res.data.result.isSaler == 0){
              bbb = false;
            }else{
              bbb = true;
            }
            this.setData({
              ['userInfo.username']:res.data.result.name,
              ['userInfo.imageUrl']:res.data.result.tximg,
              ['userInfo.sf']:res.data.result.sf,
              ['userInfo.member']:res.data.result.member,
              loginFlag:getApp().globalData.loginFlag,
              dbIsSaler:bbb
              
            });
            wx.setStorageSync('user',res.data.result.name);
            // console.log('globalData->',getApp().globalData.loginFlag)
          }else{
            this.setData({
              token:''
            });
            wx.removeStorage({
              key:'token',
              complete:(res)=>{
                
              }
            })
          }
        },
        fail:(res)=>{
          this.setData({
            token:''
          });
        }
      })
    },
    reptAddress(){
      wx.navigateTo({
        url:'./address/address'
      })
    },

    exitLoginButton(){
      let token = '';
      let code = '';
      let user = wx.getStorageSync('user');
      wx.getStorage({
        key: 'token',
        success (res) {
          token = res.data
        }
      });
      
 
      wx.showModal({
        title:'退出登录吗',
        content:'你确定要退出登录吗？',
        success:(res)=>{
          if(res.confirm){
            wx.login({
              success:(res)=>{
                wx.request({
                  url:'https://api.wepingon.cn:3000/bs/login/wechatMpExitLogin',
                  method:'POST',
                  data:{
                    token:token,
                    code:res.code,
                    user:user
                  },
                  success:(res)=>{
                    if(res.data.code == 200){
                      wx.removeStorage({
                        key:'token',
                        success:(res)=>{
                          getApp().globalData.loginFlag = false;
                          this.setData({
                            ['userInfo.username']:'',
                            ['userInfo.imageUrl']:'',
                            loginFlag : getApp().globalData.loginFlag
                          });
                          wx.showToast({
                            title:'已退出登录',
                            icon:'success',
                            duration:3000
                          })
                        }
                      })
                    }else{
                      wx.showToast({
                        title:'退出登录失败',
                        icon:'error',
                        duration:3000
                      })
                    }
                  },
                  fail:(res)=>{
                    wx.showToast({
                      title:'退出登录失败',
                      icon:'error',
                      duration:3000
                    })
                  }
                })
              }
            });
            

          } 
        }
      })
    },
    reptAllOrder(){
      wx.navigateTo({
        url:'./order/order'
      })
    },
    reptPhoneLogin(){
      wx.navigateTo({
        url:'./loginPage/loginPage'
      })
    },
    reptAuthPage(){
      wx.navigateTo({
        url:'./authPage/authPage'
      })
    },
    testPage(){
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/blog/myArticleList',
            method:"POST",
            data:{
              code:res.code
            },
            success:(res)=>{
             if(res.data.code == 200){
              wx.showToast({
                title: '请求成功',
                icon: 'success',
                duration: 2000//持续的时间
              });        
             }else{
              wx.showToast({
                title: '请求成功',
                icon: 'error',
                duration: 2000//持续的时间
              });
             }
            },
            fail:(res)=>{
              wx.showToast({
                title: '登录失败',
                icon: 'error',
                duration: 2000//持续的时间
              });
            }
          })
        }
      })
    },
    getBookData(){
      this.setData({
        bookNum:'加载中'
      })
      wx.request({
        url:'https://api.wepingon.cn:3000/overwatch/book',
        method:'GET',
        success:(res)=>{
          if(res.data.code == 200){
            this.setData({
              bookNum:res.data.result.bookNum
            })
          }else{
            this.setData({
              bookNum:'加载失败'
            })
          }
        },
        fail:(res)=>{
          this.setData({
            bookNum:'加载失败'
          })
        }
      })
    },
    reptManaOrder(){
      wx.navigateTo({
        url:'./saler/orderManagement/orderManagement'
      })
    },
    reptWaitPay(){
      wx.navigateTo({
        url:'./order/waitPay/waitPay'
      })
    },
    reptWaitShip(){
      wx.navigateTo({
        url:'./order/waitShip/waitShip'
      })
    }
  }
})