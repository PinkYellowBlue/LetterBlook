<template>
  <div class="user_many">
    <query-many :titlee="name" @lookup="ddx" @look="l" @ok="k"></query-many>
    <div class="user_tab">
         <el-table
      :data="tableData"
      style="width: 100%">
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
      <el-table-column
        prop="handle"
        label="操作"
        >
        <template slot-scope="scope">
        <el-button
          size="mini"
@click.native.prevent="userDetails(scope.$index,scope.row)"
          >更多</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="2"
      layout="total, prev, pager, next, jumper"
      :total="pages">
    </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import * as user from "@/api/user";
import * as filter from "@/utils/filter";
import Vue from "vue";
// import func from './vue-temp/vue-editor-bridge';
var log = console.log.bind(console);
export default {
  data() {
    return {
      currentPage4: 4,
      tableData: [],
      name: "cms/user/findAll",
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
      }
    };
  },
  created: function() {
    this.filter();
  },
  methods: {
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
      user.userList(that.lookup)
      .then(response => {
        log(response, "成功");
        var n = [];
        var res = response.data.data;
        var listN = res.list;
        that.pages = res.total
        for (var i = 0; i < listN.length; i++) {
          var memberValue = listN[i].type; //会员类型
          var stateValue = listN[i].onlineStatus; //会员类型
          var newType = filter.memberFilter(memberValue);
          var newState = filter.lineFilter(stateValue);
          Vue.set(listN[i], "type", newType);
          Vue.set(listN[i], "onlineStatus", newState);
          n.push(1);
        }
        if (n.length == listN.length) {
          log(listN, "新返回的数据");
          that.tableData = listN;
        }
      });
    },
    // UserQuery() {

    // },
    //订单详情
    userDetails(row) {
      var that = this;
      var data = that.tableData[row];
      var id = data.id;
      var obj = { id: id };
      log(obj, "订单号");
      localStorage.setItem("id", id); //本地保存订单
      that.$router.push({
        path: "/userDataails",
        query: {
          paperId: id
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user_many {
  width: 100%;
  margin-top: 200px;
  height: auto;
  .user_tab {
    margin-top: 20px;
    margin-left: 10px;
    width: 98%;
    height: 800px;
    // border: 1px solid #999;
    .paging {
      width: 98%;
      display: flex;
      margin-top: 30px;
      justify-content: center;
    }
  }
}
</style>
