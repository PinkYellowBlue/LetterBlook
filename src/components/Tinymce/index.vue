<template>
<div>  <div class='tinymce'>
    <!-- <h1>tinymce</h1>  -->
           <!-- <el-button type="primary" @click="chose" id="chose">选择文件 -->
   <div class="chose">
     <span>上传图片</span>
       <input type="file" @click="tirggerFile($event)" id="se" action="http://apitest.letterbook.cn:8082/letter-api/v1/personal/insertUserPhoto.shtml">            
    </div>
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
// import 'jquery'
export default {
  name: 'tinymce',
  data () {
    return {
      // ex:'',
      show:false,
      imgurl:'',
      imageUrl:'',
      tinymceHtml: '请输入内容',
      init: {
        images_upload_url: 'http://apitest.letterbook.cn:8082/letter-api/v1/personal/insertUserPhoto.shtml',
        upload_image_url: 'http://apitest.letterbook.cn:8082/letter-api/v1/personal/insertUserPhoto.shtml',
        language_url: '../../static/tinymce4.7.5/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '../../static/tinymce4.7.5/skins/lightgray',
        height: 300,
        // width:500,
        api_key: 'rzt07rxzmfyx8rctdyqmza1ueup1tdx0tg7twpv7lcm1kw7x',
        plugins: 'link lists code image table colorpicker textcolor wordcount contextmenu preview',
        toolbar:
          'mybutton preview bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code imageupload image| removeformat',
        autosave_interval: "20s",
        image_advtab: true,
        imageupload_url: 'http://apitest.letterbook.cn:8082/letter-api/v1/personal/insertUserPhoto.shtml', // 接收图片的后端地址
        // imageupload_converCb: (res) => { // 根据后端返回的数据，转换成符合插件要求的数据结构
        // console.log(res,'返回的图片地址');
        
        //     return {
        //         error: res.data.error,
        //         pathList: res.data.data.pathList
        //     }
        // },
        table_default_styles: {
            width: "100%",
            borderCollapse: "collapse"
        },
          setup: function (editor) {
    // 定义按钮，
    editor.addButton('mybutton', {
      // 按钮，名
      text: '',
      // 是否显示图标
      icon: 'image',
      //onclick事件
      onclick: function () {
        // 这里点击后会插入一句话
        editor.windowManager.open({
          // url: 'hello',
          title: '本地上传图片',
          width: 600,
          height: 400,
          html:`  <input type="file" @change="tirggerFile($event)" id="se"> `

        });
      }
    })
  }
      }
    }
  },
  methods:{
    tirggerFile : function (event) {
      // var file = event.target.files; // (利用console.log输出看结构就知道如何处理档案资料)
      // // do something...
      // this.imgurl=se.value;
      // 
      const file = event.srcElement.files[0];
       console.log(file); 
      this.imgurl = window.URL.createObjectURL(file);
      // document.getElementById("imgContent").src = "this.imgurl "; 
      console.log(this.imgurl); 
      // $("#imgContent").attr('src', imgurl);
        const _this = this;
           console.log(_this.imgurl);
    // window.tinymce.get(_this.tinymce).insertContent(`<img class="wscnph" src="${_this.imgurl}" >`)
       this.tinymceHtml+=`<img id='imgContent' src="${_this.imgurl}" alt="嘤嘤嘤" style="width:200px;height:200px;">`;
       console.log(this.tinymceHtml);
      // document.getElementById("#tinymce").tinymce
},
      // chose:function(){
      //     // this.tirggerFile();
      //     document.getElementById("#se").click();
      //     console.log('嘤嘤嘤');
      // },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      confirm(){
        let that = this
        console.log(that.tinymceHtml);
        var c1=that.tinymceHtml;
        that.$emit("cc",c1);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    //       imageSuccessCBK(arr) {
    //        const _this = this
    //       arr.forEach(v => {
    //         console.log(_this.tinymceHtml)
    //       window.tinymce.get(_this.tinymceHtml).insertContent(`<img class="wscnph" src="${v.url}" >`)
    //   } )
    // }

  },
  mounted () {
    tinymce.init({})
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-bottom: 60px;
  }

</style>
