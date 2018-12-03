<template>
 <div class="shop_details">
      <div class="shop_info">
        <el-input placeholder="请输入店名" v-model="input1" :rules="[{ required: true, message: '商家店名不能为空',trigger: 'blur'}]">
          <template slot="prepend">商家店名</template>
        </el-input>
        <!-- <el-input placeholder="请输入分店名（没有可不填）" v-model="input3">
          <template slot="prepend">商家分店名</template>
        </el-input> -->
        <el-input placeholder="请输入商家描述（一句话）" v-model="input2">
          <template slot="prepend">商家描述</template>
        </el-input>  
        <el-input placeholder="请输入商家详细地址" v-model="input3">
          <template slot="prepend">详细地址</template>
        </el-input> 
        <el-button type="primary" >确定</el-button>   
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
        <el-button type="primary" @click="addinfo">确定</el-button></div>
              <el-table
              stripe
              :data="attributeExtensions"
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
                  @click.native.prevent="deleteRow(scope.$index, attributeExtensions)"
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList1"
            :limit="1"
            :on-exceed="warn"
            list-type="picture"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div style="margin-left:20px; margin-bottom:20px;">
          <label for="ting">请上传大厅环境照片：</label><el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList2"
            :limit=3
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div class="pro_photo">
          <label for="ting">请上传产品照片：</label><el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList3"
            :limit=3
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div>
          <label for="ting">请上传室内照片：</label><el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList4"
            :limit=3
            :on-exceed="warn"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </div>
      <div class="shop_story">
        <div><label for="story">品牌故事：</label><tinymce id="story"  @cc="con"></tinymce></div>
        <div><label for="serve">服务理念：</label><tinymce id="serve" @cc="con1"></tinymce></div>
      </div>
            <el-button type="primary"  @click="shit"> 确定 </el-button>
    </div>

 </div>
</template>

<script>
   import Tinymce from '@/components/Tinymce'
import * as shopMany from "@/api/shop";
import Qs from 'qs'
import Vue from "vue";
export default {
  components: { Tinymce},
 data() {
 return {
     dateW: {
        
     },
     shitE: '',
   attributeExtensions:[
     {
       name:"成立日期",
       remark:"2018.12.12"
     },
      {
       name:"成立日期",
       remark:"2018.12.12"
     },
     {
       name:"成立日期",
       remark:"2018.12.12"
     }
   ],
   largefieldAttributes:[],
//    content:"",
    newuser:false,
    code:"",
   remarkinfo:"",
   nameinfo:"",
   input1:"一",
   input2:"嘤嘤嘤",
   input3:"",
   value1:"",
   str:"",
   str1:"",
   f1:"",
   f2:"",
   f3:"",
   f4:"",
   dialogImageUrl: '',
   dialogVisible: false,
      fileList1: [{url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}    ],
   fileList2: [{url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
    {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    ],
   fileList3: [{url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
    {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    ],
    fileList4: [{url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
    {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    ]
      

 }
 },
  mounted() {
    
  },
  methods: {
    shit() {
      let that = this
    //   let shitt =  that.shitE
    //   let shitt1 =  that.shitE1
        // that.attributeExtensions.forEach(e=>{
        //     that.str += e + ','
        //     console.log(that.str);            
        // })
        // that.largefieldAttributes.forEach(e=>{
        //     that.str1 += e + ','
        //     console.log(that.str1);
        // })
        // that.fileList1.forEach(e=>{
        //     that.f1 += e + ','
        //     console.log(that.f1);
        // })
        // that.fileList2.forEach(e=>{
        //     that.f2 += e + ','
        //     console.log(that.f2);
        // })
        // that.fileList3.forEach(e=>{
        //     that.f3 += e + ','
        //     console.log(that.f3);
        // })
        // that.fileList4.forEach(e=>{
        //     that.f4 += e + ','
        //     console.log(that.f4);
        // })
      let attributeExtensions = that.attributeExtensions
      let largefieldAttributes = that.largefieldAttributes;
      let f1 = that.fileList1;
      let f2 = that.fileList2;
      let f3 = that.fileList3;
      let f4 = that.fileList4;
      console.log(f4);
      
      let name = that.input1;
      let remark = that.input2;
    //   shopMany.addshop(name,remark,attributeExtensions,largefieldAttributes,f1,f2,f3,f4)
    //     .then(response => {
    //       log(response.data, "返回数据");
    //       if (response.data.result == "0") {
    //         // that.ThemeList();
    //         // log(qwe);
    //         // Object.keys(theme).forEach(e => {
    //         //   theme[e] = "";
    //         // });
    //         console.log("嘤嘤嘤");
            

    //       }
    //         // that.dialogVisible = false;
    //     });
        // let  y=stringify(attributeExtensions);
        // console.log(y);
    //   console.log(shitt,'$$$$$kkkkk');
    //   console.log(shitt1,'$$$$$');
      console.log(attributeExtensions);
    //   console.log(largefieldAttributes);      
    //   console.log(largefieldAttributes[0].code);      

    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
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
        var attributeExtensions=this.attributeExtensions;
        console.log(attributeExtensions);
        
 },
    con(c1){
        const that = this
      var remark = c1
      var code=1;
       let largefieldAttributes = that.largefieldAttributes;
        // largefieldAttributes.forEach(e=>{
        //     console.log(e.code);
        // })
         Vue.set(largefieldAttributes,'remark', remark)
       largefieldAttributes.push({code:code,remark:remark});  
    },
    con1(c1){
    const that = this
    var code=2
    var remark = c1
    let largefieldAttributes = that.largefieldAttributes;
    largefieldAttributes.push({code:code,remark:remark}); 
    },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt1M = file.size / 1024 / 1024 < 1;
      console.log(file.size);
      
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }isJPG && 
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
           alert("图片数量超出最大上传个数！");
        }
        return isLt1M;
      },
      addinfo(){
        var attributeExtensions=this.attributeExtensions;
        console.log(attributeExtensions);

        var name=this.nameinfo;
        console.log(name);
        
        var remark=this.remarkinfo;
        attributeExtensions.push({name:name,remark:remark});
        var yy=document.getElementById("story");
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
      margin: 30px auto;
      .el-input{
        margin-bottom: 25px;
      }
    }
      .shop_infode{
        width: 1200px;
        display: flex;
        // justify-content: space-around;
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
      // justify-content: flex-start;
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
