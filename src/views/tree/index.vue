<template>
  <div class="user_many">
     <div class="user_name_list">
    <div class="user_name_list_case">
      <div class="user_name_list_case_top">
        <div class="user_name_list_flex">
          <div><img src="../../assets/input/City.png" alt=""></div>
          <el-cascader size="large" :options="optionss" clearable v-model="selectedOptions" @change="handleChange" placeholder="请选择地址" >
          </el-cascader>
        </div>
        <div class="user_name_list_flex">
          <div><img src="../../assets/input/User.png" alt=""></div>
          <el-input v-model="lookup.userName" placeholder="请输入姓名"></el-input>
  
        </div>
        <div class="user_name_list_flex">
          <div><img src="../../assets/input/PhoneNum.png" alt=""></div>
          <el-input v-model="lookup.phone" placeholder="请输入手机号"></el-input>
  
        </div>
        <div class="user_name_list_flex">
          <div><img src="../../assets/input/VIP.png" alt=""></div>
          <el-input v-model="lookup.phone" placeholder="请输入信书号"></el-input>
        </div>
  
      </div>
      <div class="user_name_list_case_bottom">
        <!-- <div class="register_buttoon">
          <el-button type="text" size="medium">注册时间: </el-button>
        </div> -->
        <!-- <div class="case_bottom_title">注册时间: </div> -->
        <!-- <div class="case_bottom_data"> -->
        <div class="list_case_bottom">
          <div class="list_case_date">注册时间:</div>
          <div>
                         <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
                        </div>
        </div>
        <div class="user_name_list_flex">
          <div><img src="../../assets/input/RealName.png" alt=""></div>
          <el-input resize="none" v-model="lookup.nickName" placeholder="请输入用户名"></el-input>
        </div>
        <div>
          <el-button type="primary" plain @click="queryUser" >查询</el-button>
        </div>
        <div>
          <el-button type="primary" plain>导出EXCEL</el-button>
        </div>
      </div>
    </div>
  </div>
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
        prop="letterNo"
        label="信书号"
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
          >更多</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page= page
      :page-size="2"
      layout="total, prev, pager, next, jumper"
      :total= pages>
    </el-pagination>
    </div>
    </div>
  </div>
</template>
<script>
import * as user from "@/api/user";
import * as filter from "@/utils/filter";
import { provinceAndCityData } from "element-china-area-data";
import Vue from "vue";
const log = console.log.bind(console);
export default {
  data() {
    return {
      currentPage4: 4,
      tableData: [],
      optionss: provinceAndCityData,
      selectedOptions: [],
      ss: "选择",
      value6: "",
      date: [],
      lookup: {
        provinceId: "", //省份
        cityId: "", //城市
        nickName: "", //昵称
        phone: "", //手机号
        letterNo: "", //信书号
        userName: "", //真实姓名
        createTime: "", //创建时间
        endTime: "", //结束时间
        strNo: 1
      },
      options: [
        {
          value: 1,
          label: "月卡"
        },
        {
          value: 2,
          label: "季卡"
        },
        {
          value: 3,
          label: "年卡"
        }
      ],
      value: "",
      valu: "",
      pages: 0,
      page: 1,
    };
  },
  created: function() {
    this.filter();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleChange(value) {
      var that = this;
      that.lookup.provinceId = value[0];
      that.lookup.cityId = value[1];
      console.log(value, "数据是什么");
    },
    handleCurrentChange(val) {
      var that = this;
      console.log(`当前页: ${val}`);
      if (that.ok) {
        log(that.no, "^^^^^^^^");
        var query = that.no[0];
        that.page = val;
        log(that.page, "第几页");
        query.pageNo = val;
        log(query.pageNo, "更新页码成功");
        that.lookup = query;
      }
      that.page = val;
      that.lookup.strNo = val;
      that.filter();
    },
    filter() {
      var that = this;
      user.userList(that.lookup).then(response => {
        log(response, "成功");
        var n = [];
        var res = response.data.data;
        var listN = res.list;
        that.pages = res.total;
        for (var i = 0; i < listN.length; i++) {
          var stateValue = listN[i].onlineStatus; //会员类型
          var newState = filter.lineFilter(stateValue);
          Vue.set(listN[i], "onlineStatus", newState);
          n.push(1);
        }
        if (n.length == listN.length) {
          log(listN, "新返回的数据");
          that.tableData = listN;
        }
      });
    },
    queryUser() {
      var that = this;
      log(that.lookup, "请求数据");
      log(this.titlee, "有没有传成功");
      var d = that.date;
      // var load = [];
      var n = filter.dateFilter(d);
      // load.push(n);
      that.lookup.createTime = n[0];
      that.lookup.endTime = n[1];
      log(that.lookup.createTime, that.lookup.endTime, "骑士结束");
      var val = that.lookup;
      log(val, "提交的信息");
      user.memberList(val).then(response => {
        log(response.data.data, "有没有值");
        that.tableData = response.data.data.list;
        that.pages = response.data.data.total;
        that.page = response.data.data.page;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user_many {
  margin-top: 200px;
  width: 100%;
  height: auto;
  .user_name_list {
    width: 100%;
    height: auto;
    // margin-top: 20px;
    // margin-left: 10%;
    display: flex;
    justify-content: center;
    .user_name_list_case {
      margin-top: 20px;
      margin-left: 10px;
      width: 1150px;
      height: 180px;
      // border: 1px solid #999;
      .user_name_list_case_top {
        width: 1100px;
        display: flex;
        margin-left: 10px;
        margin-top: 20px;
        justify-content: space-between;
        .user_name_list_flex {
          display: flex;
          justify-content: space-between;
          div {
            margin-right: 20px;
          }
        }
      }
      .user_name_list_case_bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        margin-left: 10px;
        width: 1100px;
        .list_case_bottom {
          display: flex;
          justify-content: space-between;
          .list_case_date {
            margin-top: 10px;
            margin-right: 10px;
          }
        }
        .user_name_list_flex {
          display: flex;
          justify-content: space-between;
          div {
            margin-right: 20px;
          }
        }
        .register_buttoon {
          // font-size: 20px;
          margin-left: 1.7rem;
        }
        // .case_bottom_data {
        //   height: 40px;
        // }
      }
    }
  }
  .user_tab {
    margin-top: 20px;
    margin-left: 10px;
    width: 98%;
    height: 800px;
    border: 1px solid #dcdcdc;
    .paging {
      width: 98%;
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
