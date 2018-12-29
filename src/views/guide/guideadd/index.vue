<template>

  <div class="user_many">
    <div class="guideadd">
       <div class="guide_content">
        <el-input placeholder="请输入关于引导的描述" v-model="lookup.name" clearable><template slot="prepend">关于引导的描述</template></el-input>
        <el-input placeholder="请输入引导路径" v-model="lookup.url" clearable><template slot="prepend">引导路径</template></el-input>
        <el-input placeholder="请输入引导权重" v-model="lookup.import" clearable><template slot="prepend">引导权重</template></el-input>
        </div>
    </div>
    <query-many :titlee="name" @lookup="ddx" @look="l" @ok="k"></query-many>
    <div class="user_tab">
            <el-table
          :data="tableData"
          style="width: 100%"
          ref="multipleTable"
          @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
          <el-table-column
            prop="id"
            label="用户 UID"
            >
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="昵称"
            >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            prop="type"
            label="会员卡类型"
            >
          </el-table-column>
          <el-table-column
            prop="consumeCount"
            label="消费次数"
            >
          </el-table-column>
          <el-table-column
            prop="onlineStatus"
            label="是否在线"
            >
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            >
          </el-table-column>
          <el-table-column
            prop="city"
            label="城市"
            >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间"
            >
          </el-table-column>
        </el-table>
        <div class="paging">
          <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="pages">
        </el-pagination>
        </div>
              
    </div>
    <div class="button">
        <el-button type="primary"  style="width:30%;margin-top:50px" @click="add1">提交</el-button>
        <el-button type="primary"  style="width:30%;margin-top:50px" @click="add2">按查询条件提交</el-button>
    </div>
  </div>
</template>

<script>
import * as user from "@/api/user";
import * as guideMany from "@/api/guide";
import * as filter from "@/utils/filter";
import Vue from "vue";
// import func from './vue-temp/vue-editor-bridge';
var log = console.log.bind(console);
export default {
  data() {
    return {
        guide:{

        },
      currentPage4: 4,
      tableData: [],
      name: "cms/user/findAllForGuide",
      newTable: [],
      pages: 1,
      page: 1,
      no:'',
      ok : '',
      lookup: {
        provinceId: "", //省份
        cityId: "", //城市
        nickName: "", //昵称
        phone: "", //手机号
        userType: "", //会员类型
        userName: "", //真实姓名
        createTime: "", //创建时间
        endTime: "", //结束时间
        strNo:1,
        pageSize:10,
        name:"",
        url:"",
        import:"",
        userInfo_ids:[]
      },
      multipleSelection: []
    };
  },
  created: function() {
    this.filter();
  },
  methods: {
    // send2(){
    //   var that = this;
    //   // that.multipleSelection.forEach(e=>{
    //   //   // var id = e.id
    //   //   this.guide.userInfo_ids.push(e.id)
    //   // })
    //     that.add2();
    // },
    add1(){
            var that = this;
      that.multipleSelection.forEach(e=>{
        // var id = e.id
        this.lookup.userInfo_ids.push(e.id)
      })
      var obj = {
        name : that.lookup.name,
        url :that.lookup.url,
        importanceLevel : that.lookup.import,
        userInfoIds : that.lookup.userInfo_ids
      }
      log(obj,'提交的参数')
        guideMany.addGuide(obj)
        .then(response=>{
        console.log(response.data.data,"#####");
        if(response.data.data != 0){
        alert("成功引导"+response.data.data+"个用户")       
        console.log(response.data.data,"@#$@@#$@#$@$@#$@#$@#$#@");
        that.filter();
        }else{
          alert("本次添加数据为零，您可能需要更多的好友") 
        }
})    
    },
      add2(){
        let that = this;
        that.multipleSelection.forEach(e=>{
          // var id = e.id
          this.lookup.userInfo_ids.push(e.id)
        })
        var obj= {
            provinceId:that.no.provinceId,
            cityId:that.no.cityId,
            nickName:that.no.nickName,
            phone:that.no.phone,
            userType:that.no.userType,
            userName:that.no.userName,
            createTime:that.no.createTime,
            endTime:that.no.endTime,
            name : that.lookup.name,
            url :that.lookup.url,
            importanceLevel : that.lookup.import,
            userInfoIds : that.lookup.userInfo_ids,
            strNo:1,
            pageSize:10,

        }
        log(obj,"晕晕晕嘤嘤嘤")
        guideMany.addGuideWith(obj).then(response=>{
          if(response.data.data != 0){
        alert("滴咚，成功引导"+response.data.data+"个用户")
        that.filter();       
        console.log(response.data.data,"@#$@@#$@#$@$@#$@#$@#$#@");
        
        }else{
          alert("本次添加数据为零，您可能需要更多的好友")
        }
        console.log(response.data,"#####");       
      })    

    },
      // send1(){

      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection,"选中选中")
      },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    l(s) {
        log(s,'sss')
        this.no = s
    },
    k(s) {
        log(s,'kkkkkk')
        this.ok = s
    },
     handleCurrentChange(val) {
      var that = this;
      console.log(`当前页: ${val}`);
      if (that.ok) {
          log(that.no,'^^^^^^^^')
      var query = that.no
      log(query,'回退了什么')
      that.page = val;
      log(that.page, "第几页");
      // query.pageNo = val;
      // log(query.pageNo, "更新页码成功");
          that.lookup = query
       }
      that.page = val;
      that.lookup.strNo = val
      that.filter();
    },
    ddx(data) {
      var that = this;
      log(data, "数组数据@#!@");
      that.newTable.push(data);
      var load = []
      // that.tableData = data.list
      var n = data.list;
      for (var i = 0; i < n.length; i++) {
        var e = n[i].type;
        var a = n[i].onlineStatus
        var newA = filter.lineFilter(a);
        var newE = filter.memberFilter(e);
        Vue.set(n[i], "type", newE); 
        Vue.set(n[i], "onlineStatus", newA); 
        load.push(1)
      }
      if (load.length == n.length) {
            log(n, "新返回的数据");
            that.tableData = n;
      }
      that.pages = data.total
      that.page = data.page;
     
    },
    //用户列表
    filter() {
      var that = this;
      guideMany.guserList(that.lookup)
      .then(response => {
        log(response, "成功");
        response.data.data.list.forEach(e=>{
          var key = filter.lineFilter(e.onlineStatus)
          Vue.set(e, "onlineStatus", key);
        })
        that.tableData = response.data.data.list
        that.pages = response.data.data.total
        that.page = response.data.data.page
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.user_many {
  width: 100%;
  margin-top: 200px;
  height: auto;
  justify-content: center;
  .guide_content{     
      width: 50%;
      margin: 0 auto;
      .el-input{
          margin-bottom:20px;
          width: 700px;
      }
  }
  .user_tab {
    margin-top: 20px;
    margin-left: 10px;
    width: 98%;
    height: auto;
    // border: 1px solid #999;
    .paging {
      width: 98%;
      display: flex;
      margin-top: 30px;
      justify-content: center;
    }
  }
  .button{
    display: flex;
    width: 60%;
    margin:0 31%;
    align-items: center;

  }
}
</style>
