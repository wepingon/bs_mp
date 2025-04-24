// pages/userInf/address/addAddress/addAddress.ts
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
    buyer:'',
    phoneNumber:'',
    area:'请选择地区',
    detail:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e){
      console.log('e->',e.detail.value);
      this.setData({
        area: e.detail.value
      })
    },
    clearAddress(){
      this.setData({
        buyer:'',
        phoneNumber:'',
        area:'请选择地区',
        detail:''
      })
    },
    submitAddress(){
      wx.showToast({
        title:'添加中',
        icon:'loading',
        mask:true
      })
      let phoneReg = /^1[3456789]\d{9}$/;
      if(!phoneReg.test(this.data.phoneNumber)){
        wx.showToast({
          icon:'none',
          title:'请输入正确的手机号',
          mask:'true',
          duration:1000
        })
        return false
      }
        if(this.data.buyer == '' || 
        this.data.phoneNumber == '' ||
        this.data.area == '请选择地区' ||
        this.data.detail == ''){
          wx.showToast({
            title:'请完善地址信息',
            icon:'error',
            duration:1000,
            mask:true
          })
        }else{
          wx.login({
            success:(res)=>{
              wx.request({
                url:'https://api.wepingon.cn:3000/bs/address/submitAddress',
                method:'POST',
                data:{
                  code:res.code,
                  buyer:this.data.buyer,
                  phoneNumber:this.data.phoneNumber,
                  area:this.data.area,
                  addressDetail:this.data.detail
                },
                success:(res)=>{
                  if(res.data.code == 200){
                    wx.showToast({
                      title:'添加成功',
                      icon:'success',
                      duration:1000,
                      mask:true
                    })
                    this.clearAddress();
                    setTimeout(()=>{
                      wx.navigateBack({
                        delta:-1
                      })
                    },2000)
                  }else if(res.data.code == 401){
                    wx.showToast({
                      title:'请先登录',
                      icon:'error',
                      duration:4000,
                      mask:true
                    })
                  }else{
                      wx.showToast({
                        title:'添加失败',
                        icon:'error',
                        duration:1000,
                        mask:true
                      })
                  }
                },
                fail:(res)=>{
                  wx.showToast({
                    title:'添加失败',
                    icon:'error',
                    duration:1000,
                    mask:true
                  })
                }
              })
            },
            fail:(res)=>{
              wx.showToast({
                title:'添加失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            }
          })
        }
    }
  }
})