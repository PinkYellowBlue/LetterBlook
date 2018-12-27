<template>
<div>  <div class='tinymce'>
    <editor v-model='tinymceHtml' :init='init' class="input_f">

    </editor>
    <el-button type="primary" style="margin-top:10px;" @click="confirm">确认</el-button>

  </div>      
</div>
  
</template>

<script>

import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
// import 'tinymce/plugins/uploadimage'
// import "tinymce-imageupload";
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import * as shopMany from "@/api/shop";
// import 'jquery'
export default {
  name: 'tinymce1',
  data () {
    return {
      datadata:{
        id:"39",
        typeid:"8"
      },
      props:['value'],
      show:false,
      imgurl:'',
      imageUrl:"",
      // props:{
      //   pinpai:{
      //     type: String,
      //     required: true
      //   },
      //   fuwu:{
      //     type: String,
      //     required: true
      //   }
      // },
      imgUrlEx: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
      
      init: {
        images_upload_url: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
        // upload_image_url: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
        language_url: '../../static/tinymce4.7.5/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '../../static/tinymce4.7.5/skins/lightgray',
        height: 300,
        // width:500,
        api_key: 'rzt07rxzmfyx8rctdyqmza1ueup1tdx0tg7twpv7lcm1kw7x',
        plugins: 'link lists code image table colorpicker textcolor wordcount contextmenu preview',
        toolbar:
          'preview bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code imageupload image| removeformat',
        autosave_interval: "20s",
        image_advtab: true,
        // imageupload_url: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage', // 接收图片的后端地址
        table_default_styles: {
            width: "100%",
            borderCollapse: "collapse"
        },
        

          images_upload_handler:(blobInfo, success, failure) => {
            let datadata = this.datadata;
             let fd = new FormData()
             console.log("$$$4");
             fd.append("id",datadata.id);
             fd.append("typeId",datadata.typeid);
             fd.append("file",blobInfo.blob())
            shopMany.handleImg(fd).then(res=>{
              console.log(res);
              res.data.data[0].imgUrl = 'http://apitest.letterbook.cn/letter' + res.data.data[0].imgUrl
              success(res.data.data[0].imgUrl)
              // success("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2171717409,2602158110&fm=26&gp=0.jpg");
            })
            //  fd.append('file',blobInfo.blob())
            //  uploadRichImg(fd).then(res => {
            //    let result = res.data[0]
            //    success(result.url)
            //    })
            //    .catch(err => {

            //    })

           }
      }
    }
  },
  computed:{
    tinymceHtml:{
      get:function () {
        return this.value;
      },
      set:function (value) {
        this.$emit('input',value);
      }
    }
  },
  methods:{
//     tirggerFile : function (event) {
//       const file = event.srcElement.files[0];
//        console.log(file); 
//       this.imgurl = window.URL.createObjectURL(file);
//       console.log(this.imgurl); 
//       // $("#imgContent").attr('src', imgurl);
//         const _this = this;
//            console.log(_this.imgurl);
//     // window.tinymce.get(_this.tinymce).insertContent(`<img class="wscnph" src="${_this.imgurl}" >`)
//        this.tinymceHtml+=`<img id='imgContent' src="${_this.imgurl}" alt="嘤嘤嘤" style="width:200px;height:200px;">`;
//        console.log(this.tinymceHtml);
//       // document.getElementById("#tinymce").tinymce
// },
//       // chose:function(){
//       //     // this.tirggerFile();
//       //     document.getElementById("#se").click();
//       //     console.log('嘤嘤嘤');
//       // },
//       handleAvatarSuccess(res, file) {
//         this.imageUrl = URL.createObjectURL(file.raw);
//         console.log(file,"shangchuan1111");
//       },
      confirm(){
        let that = this
        console.log(that.tinymceHtml);
        var c1=that.tinymceHtml;
        that.$emit("cc",c1);
      },
      // beforeAvatarUpload(file) {
      //   // const isJPG = file.type === 'image/jpeg';
      //   // const isLt2M = file.size / 1024 / 1024 < 2;

      //   // if (!isJPG) {
      //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
      //   // }
      //   // if (!isLt2M) {
      //   //   this.$message.error('上传头像图片大小不能超过 2MB!');
      //   // }
      //   // return isJPG && isLt2M;
      //     console.log(file,"shangchuan");
          
      //     // let that = this
      //     // log(that.MessageId,'sasasass')
      //     // that.tweData.id = that.MessageId
      // },
    //       imageSuccessCBK(arr) {
    //        const _this = this
    //       arr.forEach(v => {
    //         console.log(_this.tinymceHtml)
    //       window.tinymce.get(_this.tinymceHtml).insertContent(`<img class="wscnph" src="${v.url}" >`)
    //   } )
    // }
      // initContent1(){
      //   let that = this
      //   let pinpai = that.pinpai
      //   console.log(pinpai,"品牌品牌");
        
      //   that.tinymceHtml = pinpai
      // },
      // initContent2(){
      //   let that = this
      //   let fuwu = that.fuwu
      //   that.tinymceHtml = fuwu
      // }       
      
  },
  created(){
    // this.initContent1()
  },
  mounted () {
    tinymce.init({})

    // this.initContent2()
  },
  components: {Editor}
}
</script>
<style scoped>
  #tinymce{
    z-index:0;
    
  }
.chose{
   /* magin-right:600px; */
   margin-top:20px;
   margin-bottom: 10px;
   background: #409EFF;
   height: 50px;
   /* line-height: 50px; */
   width: 120px;
   border-radius: 8px;
   color: #fff;
  }
  .chose span{
    font-size: 18px;
    /* text-align: center; */
    position: relative;
    top: 14px;
    left:20px;
  }
#se{
    /* display: none; */
    opacity: 0;
    position: relative;
    top: -12px;
    left: 10px;
    /* margin-bottom: 10px; */
  }
  .tanchu{
    width: 500px;
    height:400px;
    border:1px solid red;
    z-index:999;
    position: absolute;
    top:300px;
    left: 400px;
   
  }
  .top{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-around;
    align-items: center;
     margin-bottom: 50px;
  }
  .top span{
    font-size: 18px;
    float: left;
    /* margin-top:10px; */
    margin-right: 330px;
    /*  */
  }
  .top i{
    float: right;
  }
</style>
