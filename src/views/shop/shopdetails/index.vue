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
                    width="200">
                </el-table-column>
                </el-table>
         </div>
         <div class="shop_photo">
            <div class="photo">
                <div class="block">
                    <span class="demonstration">商家门面照片：</span>
                    <el-carousel height="250px" :interval="5000"> 
                    <el-carousel-item v-for="item in info.files1" :key="item">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="block">
                    <span class="demonstration">商家大厅环境：</span>
                    <el-carousel height="250px" :interval="5000">
                    <el-carousel-item v-for="item in info.files2" :key="item">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="photo">
                <div class="block">
                    <span class="demonstration">商家产品照片：</span>
                    <el-carousel height="250px"  :interval="5000">
                    <el-carousel-item v-for="item in info.files3" :key="item">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="block">
                    <span class="demonstration">商家室内照片：</span>
                    <el-carousel height="250px" :interval="5000">
                    <el-carousel-item v-for="item in info.files4" :key="item">
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
            <router-link :to="'/shoplist'"><el-button type="primary" @click="back">返回列表</el-button></router-link>
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
                  e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                //   var url = e.imgUrl
                console.log(e.imgUrl,"@1213131")
                this.info.files1 =  response.data.data.files1
                console.log(this.info.files1,"列表1");
                
                }); 
                response.data.data.files2.forEach(e =>{
                        e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                    //   var url = e.imgUrl
                    console.log(e.imgUrl,"@1213131")
                   this.info.files2 =  response.data.data.files2
                });  
                response.data.data.files3.forEach(e =>{
                    e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                    //   var url = e.imgUrl
                    console.log(e.imgUrl,"@1213131")
                    this.info.files3 =  response.data.data.files3
                });  
                response.data.data.files4.forEach(e =>{
                    e.imgUrl = 'http://apitest.letterbook.cn/letter' + e.imgUrl
                    //   var url = e.imgUrl
                    console.log(e.imgUrl,"@1213131")
                   this.info.files4 =  response.data.data.files4
                });
                console.log(response.data.data.merchantInformation.headPortrait,"劳动改造111");
                
                this.info.shopHead = 'http://apitest.letterbook.cn/letter' + response.data.data.merchantInformation.headPortrait
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
                width: 600px;
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
    