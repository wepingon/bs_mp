// pages/userInf/register/register.ts
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
    isSaler:false,
    userName:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reptLoginPage(){
      wx.navigateBack({
        delta:-1
      })
    },
    registerUser(){
      wx.showToast({
        title:'注册中',
        icon:'loading',
        mask:true
      })
      if(this.data.userName == ''){
        wx.showToast({
          title:'用户名为空',
          icon:'error',
          mask:true,
          duration:1000
        })
        return false;
      }
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/login/registerUser',
            method:"POST",
            data:{
              code:res.code,
              userName:this.data.userName,
              isSaler:this.data.isSaler
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'注册成功',
                  mask:true,
                  icon:'success',
                  duration:1000
                })
                setTimeout(()=>{
                  wx.navigateBack({
                    delta:-1
                  })
                },1000);
              }else{
                wx.showToast({
                  title:'注册失败',
                  mask:true,
                  icon:'error',
                  duration:1000
                })
              }
            },
            fail:(res)=>{
              wx.showToast({
                title:'注册失败',
                mask:true,
                icon:'error',
                duration:1000
              })
            }
          })
        },
        fail:(res)=>{
          
        }
      })

    }
  }
})