<<<<<<< HEAD
<template>
 <div class="shop_details">
      <div class="shop_info">
        <div class="shop_naph">
          <el-input placeholder="请输入店名" v-model="info.name" clearable>
            <template slot="prepend">商家店名</template>
          </el-input>
          <div class="chose">
            <!-- <el-button type="primary">上传商家头像<i class="el-icon-upload el-icon--right"></i></el-button>
             <input type="file" @click="tirggerFile($event)" id="se">             -->
            <!-- <img :src="imageUrl" alt=""> -->
            <!-- <img v-if="imageUrl" :src="imageUrl" alt="嘤嘤嘤" style="width:100px;height:100px;"> -->
            <label for="touxiang">上传商家头像:</label><el-upload
              class="avatar-uploader"
              :action="imgUrlEx"
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
                <div class="cityse" style="display: flex;justify-content:flex-start;"> 
             <provincial-cities @provinceer="p" @cityer="c"></provincial-cities>
            <div>
            <el-select v-model="ququ" placeholder="请选择区" style="width:200px;">
            <el-option
                v-for="item in qu"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaCode">
            </el-option>
            </el-select>
            </div>          
        </div>
         <div style="margin-top:20px"><el-input placeholder="请输入经度" style="width:200px" v-model="info.longitude"><template slot="prepend">经度</template></el-input>
        <el-input placeholder="请输入纬度" style="width:200px;margin:0 20px" v-model="info.latitude"><template slot="prepend">纬度</template></el-input>
        <a href="http://www.gpsspg.com/maps.htm" target="view_window">点击此处获得经纬度</a></div>

        <!-- <el-input placeholder="请输入分店名（没有可不填）" v-model="input3">
          <template slot="prepend">商家分店名</template>
        </el-input> -->
        <el-input placeholder="请输入商家描述（一句话）" v-model="info.remark" clearable>
          <template slot="prepend">商家描述</template>
        </el-input>  
          <!-- <el-select v-model="themeid" placeholder="请选择主题" style="margin-bottom:30px">
            <el-option
              v-for="item in theme"
              :key="item.id"
              :label="item.themeName"
              :value="item.id">
            </el-option>
          </el-select> -->
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
        <div><el-input placeholder="(例)员工数量" style="width:200px;" v-model="nameinfo" label="操作" clearable></el-input>
        <el-input placeholder="100" style="width:200px;" v-model="remarkinfo" clearable></el-input>
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
            :multiple="true"
            :data="tweData"
            :on-exceed="warn"
            :before-upload="beforeAvatarUploadTwe"
            list-type="picture"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <!-- <div style="margin-left:20px; margin-bottom:20px;">
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
            <el-button size="small" type="primary">点击上传</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          <!-- </el-upload>
        </div> -->
        <div class="pro_photo">
          <label for="ting">请上传商家环境照片：</label><el-upload
            class="upload-demo"
            :action="imgUrlExO"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUploadFour"
            :file-list="fileList3"
            :data="fourData"
            :limit=9
            :multiple="true"
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <!-- <div>
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
            <el-button size="small" type="primary">点击上传</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          <!-- </el-upload>
        </div> -->
      </div>
      <div class="shop_story">
        <div><label for="story">品牌故事：</label><tiny-mce id="story"  @cc="con" style="margin-top:20px"  :remark="this.pinpai.ramark"></tiny-mce></div>
        <div><label for="serve">服务理念：</label><tiny-mcee id="serve" @cc="con1" style="margin-top:20px"  :remark="this.fuwu.ramark"></tiny-mcee></div>
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
  components: { 
    "tiny-mce":Tinymce,
    "tiny-mcee":Tinymce1
    },
 data() {
 return {
     dateW: {
        
     },
     shitE: '',
    isex:true,
   largefieldAttributes:[],
//    content:"",
    imgUrlEx: 'http://cms.letterbook.cn/letter-cms/cms/merchantInformation/addMerchantInformation',
    newuser:false,
    imgUrlExO: 'http://cms.letterbook.cn/letter-cms/cms/merchantInformation/uploadMerchantInformationImage',
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
     token:"",
     longitude:"",
     latitude:""
    },
    shitEx: '32',
    file:"",
   imageUrl:"",
   value1:"",
   str:"",
   str1:"",
   f1:"",
   f2:"",
   f3:"",
   f4:"",
   themeid:"",
   theme:[],
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
    lookup:{
    provinceId:"",
    cityId:""
  },
   qu:[],
   shiId:"",
   ququ:'',
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
     city(){
      let that = this;
      let city = that.shiId;
      console.log(city,"获得的city");      
      shopMany.selectCity(city).then( response=>{        
        that.qu = response.data.data
        console.log(that.qu,"返回的区!!!")
      }
      )
    },
    p(pro) {
      var that = this
        log(pro,'传过来的数据') 
        that.lookup.provinceId = pro
        if (pro == null) {
          that.lookup.provinceId = ''
        }
    },
    c(cityEx) {
      var that = this
        log(cityEx,'传过来的city') 
        that.lookup.cityId = cityEx.citycode
        that.shiId = cityEx.cityid
        console.log(that.shiId,"wqerqwerqwerqweqweerqw");
        
        if (cityEx == null) {
          that.lookup.cityId = ''
        }
        that.city();
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
          fd.append('lng', info.longitude)
           fd.append('lat', info.latitude)
           fd.append('cityCode', that.ququ)
          //  fd.append('themeid', that.themeid)
        shopMany.addShop(fd).then(response => {
           console.log(response.data, "返回数据");
          if (response.data.result == "0") {
            console.log("成功","%%%%%%");
            // console.log(response.data.data.merchantInformation.userId,"龙致远");
            that.imageUrl = 'http://image.letterbook.cn/' + response.data.data.merchantInformation.headPortrait;
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
        upfd.append('lng', info.longitude)
        upfd.append('lat', info.latitude)
        upfd.append('cityCode', that.ququ)
        // upfd.append('themeid', that.themeid)
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
        let that = this
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
            localStorage.setItem("sid",that.MessageId)
            console.log(that.MessageId,'*******************');
            
            console.log(response.data.data);
            this.info.name = response.data.data.merchantInformation.name;
            this.info.remark = response.data.data.merchantInformation.remark;
            this.info.longitude = response.data.data.merchantInformation.lng;
            this.info.latitude = response.data.data.merchantInformation.lat;
            this.shopinfo.attributeExtensions = response.data.data.attributeExtensions;
            response.data.data.files1.forEach(e =>{
                  e.imgUrl = 'http://image.letterbook.cn/' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList1.push({url:url,id:e.id})
            }); 
            response.data.data.files2.forEach(e =>{
                  e.imgUrl = 'http://image.letterbook.cn/' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList2.push({url:url,id:e.id})
            });  
            response.data.data.files3.forEach(e =>{
                  e.imgUrl = 'http://image.letterbook.cn/' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList3.push({url:url,id:e.id})
            });  
            response.data.data.files4.forEach(e =>{
                  e.imgUrl = 'http://image.letterbook.cn/' + e.imgUrl
                  var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.fileList4.push({url:url,id:e.id})
            });
            console.log(response.data.data.merchantInformation.headPortrait,"劳动改造111");
            
            this.imageUrl = 'http://image.letterbook.cn/' + response.data.data.merchantInformation.headPortrait
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
        that.selectTheme();
      },
      selectTheme(){
        
          shopMany.ThemeList().then(response => {
        // log(response.data, "数据列表");
        // that.pages = response.data.data.total;
        this.theme = response.data.data.list;
        // log(response.data.data,'返回的主题列表####')
        // for (let i = 0; i < themeNewList.length; i++) {
          // var e = themeNewList[i];
          // var key=e.createTime.substr(0,10);
          // log(key,'****');
          // var key = themeFilter.dateFilterex(e.createTime);
          // log(key, "洗数据ing");
          // Vue.set(e,'createTime', key)
        // }
        // that.tableData = themeNewList;
      });
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
          .cityse{
            
            margin-top: 20px;
            // flex-direction: row;
            
            .many_choice{
              display: inline;
              width: 500px;
              margin: 0;
            }
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
=======
    <template>
     <div class="shop_details">
         <div class="shop_intro">
                <div class="shop_name">
                    <div><span>商家店名：</span><span>{{info.shopName}}</span></div>
                    <div class="touxiang"><span>商家头像：</span><img :src="info.shopHead" alt="嘤嘤嘤"></div>
                </div>
                <div class="shop_disc">
                    <span>商家描述：</span>
                    <span>{{info.shopRemark}}</span>
                </div>
         </div>
         <div class="shop_info">
             <span>商家具体信息：</span>
                 <el-table
                :data="info.shopDetails"
                style="width: 100%"
                stripe>
                <el-table-column
                    prop="name"
                    label="具体信息"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="信息内容"
                    width="300">
                </el-table-column>
                </el-table>
         </div>
         <div class="shop_photo">
            <div class="photo">
                <div class="block">
                    <span class="demonstration">商家门面照片：</span>
                    <el-carousel height="250px" :interval="5000" indicator-position="none"> 
                    <el-carousel-item v-for="item in info.files1" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="block">
                    <span class="demonstration">商家大厅环境：</span>
                    <el-carousel height="250px" :interval="5000" indicator-position="none">
                    <el-carousel-item v-for="item in info.files2" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="photo">
                <div class="block">
                    <span class="demonstration">商家产品照片：</span>
                    <el-carousel height="250px"  :interval="5000" indicator-position="none">
                    <el-carousel-item v-for="item in info.files3" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="block">
                    <span class="demonstration">商家室内照片：</span>
                    <el-carousel height="250px" :interval="5000" indicator-position="none">
                    <el-carousel-item v-for="item in info.files4" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
         </div>
         <div class="shop_art">
            <div>
                 <div class="art">品牌故事:</div>
                <div v-html="info.shopStory">{{info.shopStory}}</div>
            </div>
            <div >
                 <div class="art">服务理念：</div>
                 <div v-html="info.shopServe">{{info.shopServe}}</div>
            </div>
         </div>
         <div class="shop_handle">
            <div>
                <label for="se">审核：</label><el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                id="se">
                </el-option>
             </el-select>
            </div>
            <div>
                <label for="se2">请选择驳回理由：</label><el-select v-model="value1" placeholder="请选择">
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                id="se2">
                </el-option>
             </el-select>
            </div>
            <el-button type="primary" @click="handle" style="margin-right:10px">提交</el-button>
            <router-link :to="'/shoplist'"><el-button type="primary">返回列表</el-button></router-link>
         </div>
     </div>
    </template>
    
    <script>
    import * as shopMany from "@/api/shop";
    import * as shopFilter from "@/utils/filter"; 
     export default {
         name:"shopdetails",
     data() {
     return {
         id:"1",
         tableData:[],
        // files1: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        // files2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        // files3: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        // files4: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        options: [{
          value: '0',
          label: '申请'
        }, {
          value: '1',
          label: '驳回'
        }, {
          value: '2',
          label: '上架'
        }, {
          value: '3',
          label: '封停'
        }],
        options1: [{
            value: '0',
            label: '想驳回就驳回'
            }, {
            value: '1',
            label: '就是要驳回'
            }, {
            value: '2',
            label: '驳回驳回'
            }, {
            value: '3',
            label: '不同意这门亲事'
            }, {
            value: '4',
            label: '欢迎下次再来'
        }],
        value: '',
        value1: '',
        info:{
            shopName:"",
            shopRemark:"",
            shopHead:"",
            shopDetails:[],
            files1:[],
            files2:[],
            files3:[],
            files4:[],
            shopStory:"",
            shopServe:"",
        },
        }
        },
    created() {
        this.init();
        },
        methods:{
            init(){
                var that = this;
                console.log(typeof that.id,that.id,"@@@@")
                that.id = this.$route.params.id;
                 shopMany.shopQuery(that.id).then(response => {
                     console.log(response.data,"嘤嘤嘤，出数据啦");
                    this.info.shopName = response.data.data.merchantInformation.name;
                 this.info.shopRemark = response.data.data.merchantInformation.remark;
                 this.info.shopDetails = response.data.data.attributeExtensions;
                response.data.data.files1.forEach(e =>{
                  e.imgUrl = 'http://image.letterbook.cn' + e.imgUrl
                //   var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.info.files1 =  response.data.data.files1
                console.log(this.info.files1,"列表1");
                
                }); 
                response.data.data.files2.forEach(e =>{
                        e.imgUrl = 'http://image.letterbook.cn' + e.imgUrl
                    //   var url = e.imgUrl
                    console.log(e.imgUrl,"@1213131")
                   this.info.files2 =  response.data.data.files2
                });  
                response.data.data.files3.forEach(e =>{
                    e.imgUrl = 'http://image.letterbook.cn' + e.imgUrl
                    //   var url = e.imgUrl
                    console.log(e.imgUrl,"@1213131")
                    this.info.files3 =  response.data.data.files3
                });  
                response.data.data.files4.forEach(e =>{
                    e.imgUrl = 'http://image.letterbook.cn' + e.imgUrl
                    //   var url = e.imgUrl
                    console.log(e.imgUrl,"@1213131")
                   this.info.files4 =  response.data.data.files4
                });
                console.log(response.data.data.merchantInformation.headPortrait,"劳动改造111");
                
                this.info.shopHead = 'http://image.letterbook.cn' + response.data.data.merchantInformation.headPortrait
                response.data.data.largefieldAttributes.forEach( e=>{
                if(e.code == "brand_story"){
                    // console.log(e.code,e.remark,"富文本富文本")
                    this.info.shopStory = e.remark
                    // console.log(this.pinpai.remark,"富文本嘤嘤嘤")
                }else if(e.code == "service_idea"){
                    // console.log(e.code,e.remark,"富文本富文本22222")
                    this.info.shopServe = e.remark
                }
                })
                     
                 })
            },
            handle(){
                var that = this;
                var obj = {
                id: that.id,
                state: that.value,
                reasonsForAbandonment: that.value1
                };
                shopMany.shopHandle(obj).then(response=>{
                    console.log(response.data,"嘤嘤嘤嘤嘤嘤");
                    
                })
                console.log(obj,"驳回理由")
            },
              //返回列表
                // black() {
                //     let that = this
                //     that.$router.push({
                //         path: "/shoplist",
                //     });
                // },
        },
        components: {
        
        }
        }
    </script>
    
    <style scoped lang="scss">
        .shop_details{
            width:100%;
            height: auto;
            margin-left:200px; 
            margin-top:200px;
            color: slategray;
            // display: flex;
            // justify-content: flex-start;
            img{
                width: 150px;
                height: 150px;
            }
            .shop_name{
                width: 1200px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                div{
                    span{
                        margin-right: 15px;
                    }
                }
                .touxiang{
                    display: flex;
                    align-items: center;
                    margin-left:350px;
                }
            }
            .shop_disc{
                // margin-left: 100px;
                width: 1200px;
                margin-top: 50px;
                margin-bottom: 60px;
            }
            .shop_info{
                width: 800px;
                display: flex;
                // justify-content: center;
                align-items: center;
                margin-bottom: 60px;
                span{
                    margin-right: 80px;
                    // margin-bottom: 30px;
                }
            }
            .shop_photo{
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                .photo{
                    width: 1200px;
                    height: 250px;
                    margin-bottom: 50px;
                    display: flex;
                    .block{
                        width: 250px;
                        margin-right: 250px;
                                           
                        .demonstration{
                            margin-right:10px;
                           padding-bottom: 20px;
                            width: 100px;
                        }
                        .el-carousel{
                            margin-top:15px;
                        }
                    }
                }
                .el-carousel__item img {
                    // color: #475669;
                    // font-size: 14px;
                    opacity: 0.75;
                    // line-height: 150px;
                     width: 250px;
                     height:250px;
                    margin: 0;
                }
                .el-carousel__item:nth-child(2n) {
                    // background-color: #99a9bf;
                    
                }
                .el-carousel__indicator {
                    display: none;
                }

            }
            .shop_art{
                width: 1200px;
                margin-bottom: 60px;
                display: flex;
                flex-direction: column;
                .art{
                    margin-top:20px;
                    margin-bottom: 20px; 
                }
            }
            .shop_handle{
                display: flex;
                margin-bottom: 100px;
                div{
                    margin-right: 40px;
                }
            }
        }


    </style>
    
>>>>>>> e7dfd5fbfee084b494385b4f38e04919ef8882d3
