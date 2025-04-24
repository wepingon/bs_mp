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
    addressList:[

    ],
    editFlag:false,
    editAddressId:'',
    editName:'',
    editNumber:'',
    editArea:[],
    editContent:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow:function(){
      this.getMyAddress();
    },
    bindPickerChange(e){
      console.log('e->',e.detail.value);
      this.setData({
        editArea: e.detail.value
      })
    },
    editAddress(e){
      let addressId = e.currentTarget.dataset.addressid;
      let a = this.data.addressList.filter(res=>{return res.addressId == addressId})
      this.setData({
        editFlag:true,
        editAddressId:a[0].addressId,
        editName:a[0].addressShipping,
        editNumber:a[0].addressPhoneNumber,
        editArea:[a[0].addressProvince,a[0].addressCity,a[0].addressDistrict],
        editContent:a[0].addressDetail
      })
    },
    cancelEditAddress(){
      this.setData({
        editFlag:false,
        editAddressId:'',
        editName:'',
        editNumber:'',
        editArea:[],
        editContent:''
      })
    },
    getMyAddress(){
      wx.showLoading({
        title:"获取数据中..."
      })
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/pay/wechatMpPayGetAddress",
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
                  addressList:res.data.result.address
                })
              }else if(res.data.code == 401){
                wx.showToast({
                  title:'地址为空',
                  icon:"success",
                  duration:1000
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
    reptAddAddress(){
      wx.navigateTo({
        url:'./addAddress/addAddress'
      })
    },
    setDefault(e){
      wx.showLoading({
        title:"修改中..."
      })
      let addressid = e.currentTarget.dataset.addressid
      wx.login({
        success:(res)=>{
          wx.request({
            url:"https://api.wepingon.cn:3000/bs/address/wechatSetDefaultAddress",
            method:"POST",
            data:{
              code:res.code,
              addressId:addressid
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'设置成功',
                  icon:"success",
                  duration:1500
                });
                setTimeout(() => {
                  this.getMyAddress();
                }, 1000);
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
    conAddress(e){
      wx.showLoading({
        title:"修改中..."
      })
      let addressid = e.currentTarget.dataset.addressid;
      let conFlag = e.currentTarget.dataset.conflag;
      let phoneReg = /^1[3456789]\d{9}$/;

      console.log(conFlag);
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/address/conAddress',
            method:"POST",
            data:{
              code:res.code,
              addressId:addressid,
              conFlag:conFlag
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'操作成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                })
                setTimeout(()=>{this.getMyAddress();},1000)
              }else{
                wx.showToast({
                  title:'操作失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res=>{
              wx.showToast({
                title:'操作失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            })
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
    editConAddress(){
      wx.showLoading({
        title:"修改中...",
        mask:true
      });
      let phoneReg = /^1[3456789]\d{9}$/;
      if(!phoneReg.test(this.data.editNumber)){
        wx.showToast({
          icon:'none',
          title:'请输入正确的手机号',
          mask:'true',
          duration:1000
        })
        return false
      }
      if(this.data.editName == '' || 
        this.data.editNumber == '' ||
        this.data.editArea == [] ||
        this.data.editContent == ''){
          wx.showToast({
            title:'请完善地址信息',
            icon:'error',
            duration:1000,
            mask:true
          })
          return false;
      }
      wx.login({
        success:(res)=>{
          wx.request({
            url:'https://api.wepingon.cn:3000/bs/address/conAddress',
            method:"POST",
            data:{
              code:res.code,
              editAddressId:this.data.editAddressId,
              editName:this.data.editName,
              editNumber:this.data.editNumber,
              editArea:this.data.editArea,
              editContent:this.data.editContent,
              conFlag:'edit'
            },
            success:(res)=>{
              if(res.data.code == 200){
                wx.showToast({
                  title:'操作成功',
                  icon:'success',
                  duration:1000,
                  mask:true
                })
                this.setData({
                  editFlag:false,
                  editAddressId:'',
                  editName:'',
                  editNumber:'',
                  editArea:[],
                  editContent:''
                  
                })
                setTimeout(()=>{this.getMyAddress();},1000)
              }else{
                wx.showToast({
                  title:'操作失败',
                  icon:'error',
                  duration:1000,
                  mask:true
                })
              }
            },
            fail:(res=>{
              wx.showToast({
                title:'操作失败',
                icon:'error',
                duration:1000,
                mask:true
              })
            })
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
    }
  }
})