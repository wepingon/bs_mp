
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
    privacyCheckedFlag:false,
    loadCaptcha: false, 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(options){

    },
    onekeyLogin(){
      wx.showLoading({
        title: '登录中',
      })
      wx.getStorage({
        key: 'token',
        success:(res)=>{
          this.setData({
            token:res.data
          })
          this.tokenStatuscheck();
        },
        fail: (res) =>{
          this.getLogin();
        }
      });
    },
    phoneNumberLogin(e) {

      wx.showLoading({
        title:'登录中'
      })
      wx.request({
        url:'https://api.wepingon.cn:3000/xcx/phoneNumberLogin',
        method:"POST",
        data:{
          code:e.detail.code
        },
        success:(res)=>{
          console.log('sc->',res);
          if(res.data.code == 200){
            wx.showToast({
              title:'登录成功',
              icon:'success',
              duration:1500
            });
            wx.setStorageSync('token',res.data.result.token);
            wx.setStorageSync('user',res.data.result.user);
            setTimeout(()=>{
              this.callbackLoginSuccess();
            },1500);
          }else{
            wx.showToast({
              title:'登录失败',
              icon:'error',
              duration:1500
            })
          }
        },
        fail:(res)=>{
          wx.showToast({
            title:'登录失败',
            icon:'error',
            duration:1500
          })
        }
      })
    },
    tokenStatuscheck(){
      let code = '';
      wx.login({
        success:(res)=>{
          code = res.code;
        }
      });
      wx.request({
        url:'https://api.wepingon.cn:3000/bs/login/wechatMpTokenStatusCheck',
        method:"POST",
        data:{
          token:this.data.token,
          browser_code:this.data.token,
          code:code
        },
        success:(res)=>{
          if(res.data.code == 200){
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000//持续的时间
            });
            getApp().globalData.loginFlag = true
            this.setData({
              ['userInfo.username']:res.data.result.name,
              ['userInfo.imageUrl']:res.data.result.tximg,
              ['userInfo.sf']:res.data.result.sf,
              ['userInfo.member']:res.data.result.member,
              loginFlag:getApp().globalData.loginFlag
            });
            wx.setStorage({
              key:"user",
              data:res.data.result.name
            });
            setTimeout(()=>{
              this.callbackLoginSuccess();
            },1500);
            // console.log('globalData->',getApp().globalData.loginFlag)
          }else{
            this.setData({
              token:''
            });
            wx.removeStorage({
              key:'token',
              complete:(res)=>{
                this.getLogin();
              }
            })
          }
        },
        fail:(res)=>{
          this.setData({
            token:''
          });
          this.getLogin();
        }
      })
    },
    getLogin(){
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/login/loginWechatMp',
            method:"POST",
            data:{
              code:res.code
            },
            header:{
              authorization:'lwm'
            },
            success:(res)=>{
             if(res.data.code == 200){
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000//持续的时间
              });
              wx.setStorage({
                key:"token",
                data:res.data.result.token
              });
              wx.setStorage({
                key:"user",
                data:res.data.result.name
              });

              this.setData({
                ['userInfo.username']:res.data.result.user,
                ['userInfo.imageUrl']:res.data.result.tximg,
                ['userInfo.sf']:res.data.result.sf,
                ['userInfo.member']:res.data.result.member,
                loginFlag:true
              });
              getApp().globalData.loginFlag = true;
              setTimeout(()=>{
                this.callbackLoginSuccess();
              },1500);
             }else if(res.data.code == 201){
              wx.showToast({
                title: '继续注册',
                icon:'loading',
                duration: 1000//持续的时间
              });
              wx.navigateTo({
                url:'/pages/userInf/register/register'
              })
             }else{
              wx.showToast({
                title: '登录失败',
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
    checkboxChange(){
      this.setData({
        privacyCheckedFlag:!this.data.privacyCheckedFlag
      })
    },
    readPrivacy(){
      console.log('go!');
      wx.navigateTo({
        url:'./privacyPage/privacyPage'
      })
    },
    callbackLoginSuccess(){
      wx.setStorageSync('loginCallbackFlag','1');
      wx.setStorageSync('loginTokenFlag',false);
      wx.navigateBack({
        delta:1
      })
    }
  }
})