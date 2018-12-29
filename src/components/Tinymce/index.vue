<template>
<div>  <div class='tinymce'>
    <!-- <h1>tinymce</h1>  -->
           <!-- <el-button type="primary" @click="chose" id="chose">选择文件 -->
   <!-- <div class="chose">
     <span>上传图片</span>
      <el-upload
              class="avatar-uploader"
              :action="imgUrlEx"
              ref="newuploadti"
              :show-file-list="false"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="file"
              :data="datadata"
              id="touxiang">
              <img v-if="false" :src="false" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
       <!-- <input type="file" @click="tirggerFile($event)" id="se" action="http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage">             -->
    <!-- </div> -->
             <!-- </el-button>  -->
           <!-- <img v-if="imgurl" :src="imgurl" alt="嘤嘤嘤" style="width:100px;height:100px;"> -->
    
    <editor v-model='tinymceHtml' :init='init' class="input_f">

    </editor>
    <el-button type="primary" style="margin-top:10px;" @click="confirm">确认</el-button>
    <!-- <div v-html='tinymceHtml'></div> -->
  </div>      
  <!-- <div class="tanchu" v-show="show">

    <div class="top"><span>本地图片上传</span><i class="el-icon-close" @click="show=fasle"></i></div>
    <div>
        <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>
    <el-button type="primary">确定</el-button>
    <el-button type="" @click="show=fasle">取消</el-button>
  </div> -->
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
  name: 'tinymce',
  data () {
    return {
      // props: {
      //     MessageId: {
      //       type: String,
      //       required:  true,
      //     }
      // },
      props: ["shitEx"],
      datadata:{
        id:"",
        typeid:"8"
      },
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
      // imgUrlEx: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
      tinymceHtml: '请输入内容',
      init: {
        images_upload_url: 'http://cms.letterbook.cn/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
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
                res.data.data[0].imgUrl = 'http://image.letterbook.cn/' + res.data.data[0].imgUrl
                success(res.data.data[0].imgUrl)
                // success("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2171717409,2602158110&fm=26&gp=0.jpg");
              })
            }
        }
      }
    },
  methods:{
      confirm(){
        let that = this
        console.log(that.tinymceHtml);
        var c1=that.tinymceHtml;
        that.$emit("cc",c1);
        // this.initContent1()
      },
      initContent1(){
        var that = this
        // that.tinymceHtml = that.remark;
        this.datadata.id = localStorage.getItem("sid")
        // console.log(that.tinymceHtml,"符文恩额额违法地方撒发生大发");
        
        // that.datadata.id = that.MessageId;
        console.log(this.datadata.id,'baba');
        
      },
  },
  created(){
    this.initContent1()
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
