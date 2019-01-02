<template>
  <div class="art_list">
    <h1>{{list.name}}</h1>
    <div class="shop_content">
      <div><span>审核状态：</span><span>{{state}}</span></div>
      <div><span>提交时间：</span><span>{{createTime}}</span></div>
      <div v-show="ishave"><span>驳回理由：</span><span>{{reasonsForAbandonment}}</span></div>
    </div>
  </div>
</template>

<script>
  // import { provinceAndCityData } from "element-china-area-data";
import { getToken} from '@/utils/auth'
import * as shopMany from "@/api/shop";
    import * as shopFilter from "@/utils/filter";   


    export default {
      name: "shopaddlist",
      data() {
        return {
          list: "",
          state:"",
          createTime:"",
          reasonsForAbandonment:"",
          token:"qweqwewqeqweq",
          ishave:false
        }
      },
  created() {
    this.hasInfo();
    
  },
  methods:{
      hasInfo(){
        var that = this;
        var token=getToken();
        // console.log( that.token,"tottotootototto");

        that.token = token
        // console.log( token,"werqweqreqwreqerqerwqrqw");
        // console.log( that.fileList1,"!!!!!!!");
        let a = {
          token: token
            }
        shopMany.hasInfo(a)
        .then(response=>{
          console.log(response,"token返回信息0.0");
          if (response.data.result == "0") {
            // that.MessageId = response.data.data.merchantInformation.id
            // localStorage.setItem("sid",that.MessageId)
            // console.log(that.MessageId,'*******************');
            
            console.log(response.data.data);
            this.state = shopFilter.handleShop(response.data.data.merchantInformation.state);
            console.log(this.state,"woubuxin");
            
            this.list = response.data.data.merchantInformation;
            this.reasonsForAbandonment = response.data.data.merchantInformation.reasonsForAbandonment;
            if(this.reasonsForAbandonment != null){
              this.ishave = true
            }
            this.createTime = shopFilter.dateFilterShop(response.data.data.merchantInformation.createTime);
            console.log(this.createTime,"woubuxin");

            // this.info.latitude = response.data.data.merchantInformation.lat;
            // this.shopinfo.attributeExtensions = response.data.data.attributeExtensions;
          }
      
       })
     }
    }
}

</script>

<style lang="scss" scoped>
.art_list{
  margin-top: 220px;
  width: 100%;
  height: auto;
 
  // background: yellow;
  .shop_content{
	  margin-top:40px;
	  color: slategray;
  display: flex;
//   display: inline;
	div{
		margin-right:15px;
	}
  }
}
</style>
