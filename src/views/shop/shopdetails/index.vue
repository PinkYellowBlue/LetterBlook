<template>
 <div class="shop_details">
      <div class="shop_info">
        <div class="shop_naph">
          <el-input placeholder="请输入店名" v-model="info.name" :rules="[{ required: true, message: '商家店名不能为空',trigger: 'blur'}]">
            <template slot="prepend">商家店名</template>
          </el-input>
          <div class="chose">
            <!-- <el-button type="primary">上传商家头像<i class="el-icon-upload el-icon--right"></i></el-button>
             <input type="file" @click="tirggerFile($event)" id="se">             -->
            <!-- <img :src="imageUrl" alt=""> -->
            <!-- <img v-if="imageUrl" :src="imageUrl" alt="嘤嘤嘤" style="width:100px;height:100px;"> -->
            <label for="touxiang">上传商家头像:</label><el-upload
              class="avatar-uploader"
              action="imgUrlEx"
              ref="newupload"
              :show-file-list="false"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUploadOne"
              name="file"
              id="touxiang">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>
        </div>
        <!-- <el-input placeholder="请输入分店名（没有可不填）" v-model="input3">
          <template slot="prepend">商家分店名</template>
        </el-input> -->
        <el-input placeholder="请输入商家描述（一句话）" v-model="info.remark">
          <template slot="prepend">商家描述</template>
        </el-input>  
        <!-- <el-input placeholder="请输入商家详细地址" v-model="input3">
          <template slot="prepend">详细地址</template>
        </el-input>  -->
        <el-button type="primary" @click="send" v-show="isex">确定</el-button>   
      </div>
    <div v-show="newuser">
      <div class="shop_infode">
          <!-- <label for="date">请选择成立日期：</label><el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期" id="date">
          </el-date-picker>
          <label for="count">请输入员工数量：</label><el-input v-model="input3" placeholder="请输入员工数量" id="count" style="width:200px;"></el-input>  
           <label for="area">请输入门店面积：</label><el-input v-model="input3" placeholder="请输入门店面积" id="area" style="width:200px;"></el-input>   -->
        <div><el-input placeholder="(例)员工数量" style="width:200px;" v-model="nameinfo" label="操作"></el-input>
        <el-input placeholder="100" style="width:200px;" v-model="remarkinfo"></el-input>
        <el-button type="primary" @click="addinfo" >确定</el-button></div>
              <el-table
              stripe
              :data="shopinfo.attributeExtensions"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="具体信息"
                width="180">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="信息详细"
                width="180">
              </el-table-column>
                <el-table-column
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, shopinfo.attributeExtensions)"
                  type="danger" icon="el-icon-delete"
                  size="small">
                  删除
                </el-button>
              </template>
              </el-table-column>
            </el-table>
      </div>     
      <div class="shop_photo">
        <div>
          <label for="ting">请上传门面照片：</label><el-upload
            class="upload-demo"
            :action="imgUrlExO"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList1"
            :limit=6
            :data="tweData"
            :on-exceed="warn"
            :before-upload="beforeAvatarUploadTwe"
            list-type="picture"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div style="margin-left:20px; margin-bottom:20px;">
          <label for="ting">请上传大厅环境照片：</label><el-upload
            class="upload-demo"
            :action="imgUrlExO"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUploadThree"
            :file-list="fileList2"
            :limit=5
            :data="threeData"
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div class="pro_photo">
          <label for="ting">请上传产品照片：</label><el-upload
            class="upload-demo"
            :action="imgUrlExO"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUploadFour"
            :file-list="fileList3"
            :data="fourData"
            :limit=6
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div>
          <label for="ting">请上传室内照片：</label><el-upload
            class="upload-demo"
            :action="imgUrlExO"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUploadFive"
            :file-list="fileList4"
            :limit=6
            :data="fiveData"
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </div>
      <div class="shop_story">
        <div><label for="story">品牌故事：</label><tinymce id="story"  @cc="con" style="margin-top:20px" ></tinymce></div>
        <div><label for="serve">服务理念：</label><tinymce1 id="serve" @input="con1" style="margin-top:20px"   v-model="this.fuwu.remark"></tinymce1></div>
      </div>
            <el-button type="primary"  @click="shit"> 确定提交 </el-button>
    </div>

 </div>
</template>

<script>
   import Tinymce from '@/components/Tinymce'
   import Tinymce1 from '@/components/Tinymce1'
   const log = console.log.bind(console)
import * as shopMany from "@/api/shop";
import { getToken} from '@/utils/auth'
import Qs from 'qs'
import Vue from "vue";
export default {
  components: { Tinymce,Tinymce1},
 data() {
 return {
     dateW: {
        
     },
     shitE: '',
    isex:true,
   largefieldAttributes:[],
//    content:"",
    imgUrlEx: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/addMerchantInformation',
    newuser:false,
    imgUrlExO: 'http://apitest.letterbook.cn:8081/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
    code:"",
   remarkinfo:"",
   nameinfo:"",
   MessageId: '',
   tweData: {
      id: '',
      typeId: 5,
   },
   threeData: {
      id: '',
      typeId: 6,
   },
   fourData: {
      id: '',
      typeId: 7,
   },
   fiveData: {
      id: '',
      typeId: 8,
   },
   fileData: '',
   info:{
     name:"",
     remark:"",
     token:""
    },
    file:"",
   imageUrl:"",
   value1:"",
   str:"",
   str1:"",
   f1:"",
   f2:"",
   f3:"",
   f4:"",
   shopinfo: {
      id : "",
      attributeExtensions:[],
     }
  ,
  pinpai:{
    id:"",
    code:"",
    businessId:"",
    remark:""
  },
    fuwu:{
    id:"",
    code:"",
    businessId:"",
    remark:""
  },
   dialogImageUrl: '',
   dialogVisible: false,
   fileList1: [],
   fileList2: [],
   fileList3: [],
  fileList4: []
 }
 },
  created() {
    this.hasInfo();
    
  },
  methods: {
    shit() { 
      let that = this
      that.shopinfo.id = that.MessageId;
       console.log(typeof that.shopinfo.id,"$$$$qweqeqeqwe");
        let shopinfo = that.shopinfo
        console.log(shopinfo,"$$qweqweqewqeqw%%%");
        // 商家信息
      shopMany.shopInfo(shopinfo.attributeExtensions,shopinfo.id).then(response => {
        console.log(response.data, "返回介绍");
          if (response.data.result == "0") {
            console.log("成功","介绍成功%%%%%%");
            // that.MessageId = response.data.data.id
            // that.newuser = true
          }
        });
        let pinpai = that.pinpai;
        // console.log(pinpai,"312231@@@@@@  ");
        // that.pinpai.businessId = that.MessageId;
      // 富文本品牌
      shopMany.uploadFu(pinpai).then(response =>{
        console.log(response);
        
      })
      let fuwu = that.fuwu;

      // console.log(fuwu,"312231@@@@@@  ");
      // 富文本服务
      shopMany.uploadFu(fuwu).then(response =>{
        console.log(response);
        
      })
      that.$refs.newupload.submit()

    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        let id = file.id
        console.log(id,"图片id嘤嘤嘤");
        
        shopMany.delPhoto(id).then(response=>{
            console.log("删除成功yes");
            
        })
      },
      handlePreview(fileList) {
        // var fileList1
        console.log(fileList);
      },
      warn(files, fileList){
        alert("图片数量超出最大上传个数！");
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
        var attributeExtensions=this.shopinfo.attributeExtensions;
        console.log(attributeExtensions);
        
 },
    con(c1){
      const that = this
      that.pinpai.businessId = that.MessageId;
      that.pinpai.code = "brand_story";
      that.pinpai.remark = c1;
      // var code=brand_story;

      //  let largefieldAttributes = that.largefieldAttributes;
      //   // largefieldAttributes.forEach(e=>{
      //   //     console.log(e.code);
      //   // })
      //    Vue.set(largefieldAttributes,'remark', remark)
      //  largefieldAttributes.push({code:code,remark:remark});  
    },
    con1(c1){
      const that = this
      that.fuwu.businessId = that.MessageId;
      that.fuwu.code = "service_idea";
      that.fuwu.remark = c1;
    },
    beforeAvatarUpload() {},
      beforeAvatarUploadOne(file) {
        console.log(file,"上传文件")
        var that = this;
        this.fileData = file;
        console.log(this.fileData.raw,"wenjianwejnwe")
        let info = that.info;
        var token=getToken();
        that.info.token = token;
        console.log(info,"33414");
        let fd = new FormData()
        // fd.append("file",file)
        fd.append("name", info.name)
         fd.append("remark", info.remark)
          fd.append("token", token)
          fd.append('file', that.fileData)
        shopMany.addShop(fd).then(response => {
           console.log(response.data, "返回数据");
          if (response.data.result == "0") {
            console.log("成功","%%%%%%");
            console.log(response.data.data.merchantInformation.userId,"龙致远");
            that.imageUrl = 'http://apitest.letterbook.cn/letter' + response.data.data.merchantInformation.headPortrait;
            console.log(that.imageUrl,"劳动改造");
            
            that.MessageId = response.data.data.id
            that.newuser = true
          }
        });
        let  upfd = new FormData()
        upfd.append("name",info.name)
        upfd.append("remark",info.remark)
        upfd.append("id",that.MessageId)
        upfd.append('file', that.fileData)
        shopMany.updateShop(upfd).then(response =>{
          console.log(response.data,"更新成功啦啦啦啦啦")
        })
        return true;
      },
      beforeAvatarUploadTwe(file) {
          log(file,'上传门面')
          let that = this
          log(that.MessageId,'sasasass')
          that.tweData.id = that.MessageId
      },
      beforeAvatarUploadThree(file) {
          log(file,'上传环境')
          let that = this
          log(that.MessageId,'sasasass')
          that.threeData.id = that.MessageId
      },
      beforeAvatarUploadFour(file) {
          log(file,'上传产品图片')
          let that = this
          log(that.MessageId,'sasasass')
          that.fourData.id = that.MessageId
      },
      beforeAvatarUploadFive(file) {
          log(file,'上传商家图片')
          let that = this
          log(that.MessageId,'sasasass')
          that.fiveData.id = that.MessageId
      },

      handleAvatarSuccess(response, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file,"#####" );
        // this.info.file = file;
      },
      //添加商家
      send(){
        // let that = this
        that.$refs.newupload.submit()
        // var obj = {
        //     id : that.MessageId,
        //     name : that.info.name,
        //     remark : that.info.remark

        // }
        // let that = this
        // console.log(that.info,'输出参数');
        
        //   // var that = this;
        //   let info = that.info;
        //   let file = that.file;
        //   console.log(file,"777777777");
          
        //   var token=getToken();
        //   that.info.token = token;
        //   console.log(info,"33414");
        //  if ( info.name &&  info.remark  !== "") {
        //    shopMany.addShop(info,file).then(response => {
        //     console.log(response.data, "返回数据");
        //     if (response.data.result == "0") {
        //     console.log(response.data.data.id);

        //     that.newuser= true;
        //   }
      //   });
      //   console.log("成功");
      // } else {
      //   console.log("失败");
      //   that.$notify.error({
      //     title: "错误",
      //     message: "请填写完整信息",
      //     position: "bottom-right"
      //   });
      // }
      },
      //商家信息是否存在
      hasInfo(){
        var that = this;
        var token=getToken();
        that.info.token = token
        console.log( token);
        console.log( that.fileList1,"!!!!!!!");
        let a = {
          token: token
            }
        shopMany.hasInfo(a)
        .then(response=>{
          console.log(response,"token返回信息");
          if (response.data.result == "0") {
            that.MessageId = response.data.data.merchantInformation.id
            console.log(response.data.data);
            this.info.name = response.data.data.merchantInformation.name;
            this.info.remark = response.data.data.merchantInformation.remark;
            this.shopinfo.attributeExtensions = response.data.data.attributeExtensions;
            response.data.data.files1.forEach(e =>{
                  e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList1.push({url:url,id:e.id})
            }); 
            response.data.data.files2.forEach(e =>{
                  e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList2.push({url:url,id:e.id})
            });  
            response.data.data.files3.forEach(e =>{
                  e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList3.push({url:url,id:e.id})
            });  
            response.data.data.files4.forEach(e =>{
                  e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList4.push({url:url,id:e.id})
            });
            console.log(response.data.data.merchantInformation.headPortrait,"劳动改造111");
            
            this.imageUrl = 'http://apitest.letterbook.cn/letter' + response.data.data.merchantInformation.headPortrait
            response.data.data.largefieldAttributes.forEach( e=>{
              if(e.code == "brand_story"){
                console.log(e.code,e.remark,"富文本富文本")
                this.pinpai.remark = e.remark
                this.pinpai.id = e.id
                console.log(this.pinpai.remark,"富文本嘤嘤嘤")
              }else if(e.code == "service_idea"){
                console.log(e.code,e.remark,"富文本富文本22222")
                this.fuwu.remark = e.remark
                this.fuwu.id = e.id
              }
            })
           
           
           that.newuser = true
           that.isex = false
            
            }

        })
      },
      addinfo(){
        var that =  this;
        var attributeExtensions=that.shopinfo.attributeExtensions;
        console.log(attributeExtensions);

        var name=this.nameinfo;
        console.log(name);
        
        var remark=this.remarkinfo;
        attributeExtensions.push({name:name,remark:remark});
        // console.log(yy.tinyHtml);
        
      },
      // handlec(cc){
      //   var cc= cc;
      //   console.log(cc);
      // }    

    }
  }

 components: {

 }

</script>

<style scoped lang="scss">
.shop_details{
    width: 100%;
    margin-top: 200px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .shop_info{
      width: 1200px;
      display: flex;
      flex-direction: column;
      margin: 50px auto;
      .shop_naph{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 30px;
        .chose{
          display: flex;
          flex-direction: row;
          // color: slategray;
          margin-left: 200px;
          // input{
          //     position: relative;
          //     right: 120px;
          //     opacity: 0;
          // }
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
          }
        }
        .el-input{
          width: 500px;
        }
      }
      .el-input{
        margin-bottom: 25px;
      }
    }
      .shop_infode{
        width: 1200px;
        display: flex;
        justify-content:center;
        flex-direction: row;
        margin: 0 auto;
        .el-table{
          margin-top:20px;
        }
        .el-button{
          margin:0 102px 0 12px;
        }
      }
    .shop_photo{
      display: flex;
      width: 1200px;
      justify-content: center;
      // align-items: center;
      margin: 40px auto;
      div{
        width: 300px;
        // height: 353px;
      }
      .el-button{
        margin-top: 15px;
      }
      .pro_photo{
        margin-left: 20px;
        margin-right: 20px;
      }
    }
    .shop_story{
      width: 1200px;
      margin: 40px auto;
      font-size: 20px;
      div{
        margin-bottom: 60px;
      }
      .story{
        margin-top:20px;
      }

    }

   
}
</style>
