    <template>
     <div class="shop_details">
         <h2>引导详情</h2>
         <div>
             关于引导的描述：<el-input v-model="guide.name"></el-input>
             是否查看：
               <el-select v-model="guide.state" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
             关于引导的路径：<el-input v-model="guide.url"></el-input>
             关于引导的权重：<el-input v-model="guide.importanceLevel"></el-input>
             来源：<el-input v-model="guide.source" disabled="true"></el-input>
             <el-button type="primary" @click="send">确认修改</el-button>
         </div>
     </div>
    </template>
    
<script>
    // import * as shopMany from "@/api/shop";
       import * as guideMany from "@/api/guide";
    import * as guideFilter from "@/utils/filter";  
    import Vue from "vue";

    // import * as shopFilter from "@/utils/filter"; 
     export default {
         name:"guidedetails",
     data() {
     return {
         id:"1",
         tableData:[],
        // id:"",
        guide:{
            name:"",
            url:"",
            state:"",
            importanceLevel:"",
            source:""
        },
        value: '',
        value1: '',
        options: [{
          value: '0',
          label: '未查看'
        }, {
          value: '1',
          label: '已查看'
        }],
        }
        },
    created() {
        this.init();
        },
        methods:{
            init(){
                var that = this;
                
                that.id = this.$route.params.id;
                console.log(typeof that.id,that.id,"@@@@")
                 guideMany.detailGuide(that.id).then(response => {
                     console.log(response.data,"嘤嘤嘤，出数据啦");
                     var key = guideFilter.handleGuide(response.data.data.state);
                        that.guide.state = key;
                        that.guide.importanceLevel = response.data.data.importanceLevel;
                        that.guide.name =  response.data.data.name;    
                        that.guide.url = response.data.data.url;
                        var source = guideFilter.handleGuideSour(response.data.data.source);
                        that.guide.source = source})
                        console.log(that.guide,"gudesdfafdsd");
                        
            },
            send(){
                let that = this;
                // let statex = guideFilter.handleGuideEx(that.guide.state)
                // console.log(that.guide.state,"that.guide.statethat.guide.statethat.guide.state");
                if(that.guide.state == "未查看"){
                    that.guide.state = 0
                }else if(that.guide.state == "已查看"){
                    that.guide.state = 1
                }
                var obj = {
                state:  that.guide.state,
                importanceLevel :that.guide.importanceLevel,
                name : that.guide.name,
                url : that.guide.url,
                id : that.id
                }
                console.log(obj,"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                
                guideMany.updateGuide(obj).then(res=>{
                    console.log(res.data,"###################################");
                     if(res.data.result == 1){
                         alert("修改失败")
                         this.$router.push('/guidedetails/' + that.id);
                     }else{
                         alert("修改成功")
                         this.$router.push('/guidelist');
                     }
                })
                // console.log(that.guide,"wocaocaoocaocoaocoaocoao"); 
            },
            handle(){
            },
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
            div{display: flex;
            flex-direction: column;
            width:80%;
            .el-input{
                margin-bottom: 20px;
                // margin-top: 20px;
                // width: 800px;
            }
            .el-select{
                margin-bottom: 20px;
            }
            .el-button{
                width: 80%;
            }
 
        }
        }

    </style>
    