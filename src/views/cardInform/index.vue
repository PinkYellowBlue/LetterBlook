<template>
    <div class="card_input">
        <div class="center_input">
            <div class="card_input_send">
                <div class="card_input_send_title">通知标题:</div>
                <div class="send_title_input">
                    <el-input v-model="input_title" placeholder="请输入标题"></el-input>
                </div>
    
                <div class="card_input_send_title">通知方式</div>
                <el-select v-model="value" placeholder="请选择通知方式">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="send_button">
                    <el-button type="primary" plain>发 送</el-button>
    
                </div>
            </div>
        </div>
        <div class="content_card">
            <div class="content_card_twe">
                <div class="card_input_send_title">内容详情</div>
                <div class="card_input_send_content">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="user_name_list">
            <div class="user_name_list_case">
                <div class="user_name_list_case_top">
                    <div class="user_name_list_flex">
                        <div><img src="../../assets/input/City.png" alt=""></div>
                        <el-cascader size="large" :options="optionss" v-model="selectedOptions" @change="handleChange" clearable>
    
                        </el-cascader>
                    </div>
                    <div class="user_name_list_flex">
                        <div><img src="../../assets/input/User.png" alt=""></div>
                        <el-input v-model="notice.nickName" placeholder="请输入用户名"></el-input>
    
                    </div>
                    <div class="user_name_list_flex">
                        <div><img src="../../assets/input/PhoneNum.png" alt=""></div>
                        <el-input v-model="notice.phone" placeholder="请输入手机号"></el-input>
    
                    </div>
                    <div class="user_name_list_flex">
                        <div><img src="../../assets/input/VIP.png" alt=""></div>
                        <el-select v-model="notice.userType" placeholder="请选择会员类型" clearable>
                            <el-option v-for="item in optionsss" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
    
                        </el-select>
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
                        <el-date-picker v-model="value_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="user_name_list_flex">
                        <div><img src="../../assets/input/RealName.png" alt=""></div>
                        <el-input resize="none" v-model="notice.userName" placeholder="请输入姓名"></el-input>
                    </div>
                    <div>
                        <el-button type="primary" plain @click="queryNotice">查询</el-button>
                    </div>
                    <div>
                        <el-button type="primary" plain>导出EXCEL</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="teble_money">
            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="用户 UID">
                </el-table-column>
                <el-table-column prop="nickName" label="昵称">
                </el-table-column>
                <el-table-column prop="userName" label="姓名">
                </el-table-column>
                <el-table-column prop="userType" label="会员卡类型">
                </el-table-column>
                <el-table-column prop="onlineStatus" label="是否在线">
                </el-table-column>
                <el-table-column prop="province" label="省份">
                </el-table-column>
                <el-table-column prop="city" label="城市">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
            </el-table>
        </div>
        <div class="paginton_card">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10" layout="total, prev, pager, next, jumper" :total= pages>
            </el-pagination>
        </div>
        <div class="air_card"></div>
    </div>
</template>

<script>
import { provinceAndCityData } from "element-china-area-data";
import * as notic from "@/api/user";
import * as filter from "@/utils/filter";
import Vue from "vue";
const log = console.log.bind(console);
export default {
  data() {
    return {
      input_title: "",
      value_date: "",
      currentPage4: 4,
      selectedOptions: [],
      optionss: provinceAndCityData,
      input_user_name: "",
      input_name: "",
      input_phone: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      optionss: provinceAndCityData,
      optionsss: [
        {
          value: "1",
          label: "月卡"
        },
        {
          value: "2",
          label: "季卡"
        },
        {
          value: "3",
          label: "年卡"
        }
      ],
      value: "",
      textarea: "",
      tableData3: [],
      pages: 0,
      notice: {
        cityId: "",//城市
        nickName: "", // 昵称
        phone: "", //电话
        userName: "", //姓名
        userType: "", // 会员类型
        createTime: "", // 开始时间
        endTime: "", // 结束时间
        strNo: 1,
      },
      multipleSelection: []
    };
  },
  created: function() {
    this.NoticList();
  },
  methods: {
    // toggleSelection(rows) {
    //     if (rows) {
    //         rows.forEach(row => {
    //             this.$refs.multipleTable.toggleRowSelection(row);

    //         });
    //     } else {
    //         this.$refs.multipleTable.clearSelection();
    //     }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "保存的数据");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      
    },
    handleChange(value) {
      console.log(value, "数据是什么");
    },
    NoticList() {
      var that = this;
      notic.noticeList(that.notice).then(response => {
        log(response.data, "列表数据");
        that.tableData3 = response.data.data.list;
        that.pages = response.data.data.total
        that.tableData3.forEach(e => {
          var n = filter.fourFilter(e.userType);
          var q = filter.lineFilter(e.onlineStatus);
          Vue.set(e, "userType", n);
          Vue.set(e, "onlineStatus", q);
        });
      });
    },
    queryNotice() {
      var that = this;
      log(that.notice, "请求数据");
      var d = that.value_date;
      log(d, "请求时间");
      var q = that.selectedOptions
      var p = true;
      // var load = [];
      if (d == null) {
        d = "";
      }
      if (d != null) {
        var n = filter.dateFilter(d);
        // load.push(n);
        that.notice.createTime = n[0];
        that.notice.endTime = n[1];
        log(that.notice.createTime, that.notice.endTime, "骑士结束");
      }
      if (q == null) {
        q = "";
      }
      if (q != null) {
        // load.push(n);
        that.notice.cityId = q[1];
        log(that.notice.cityId, "地址编码");
      }
      that.notice.strNo = 1;
      log(that.notice, "最后要提交的数据");
        // notic.noticeList(that.notice)
        // .then(response => {
        //     log(response.data.data, '返回数据')
        //     that.tableData3 = response.data.data
        // })
        that.NoticList(that.notice)
    }
  }
};
</script>

<style lang="scss" scoped>
.card_input {
  margin-top: 200px;
  width: 100%;
  height: auto;
  .air_card {
    width: 100%;
    height: 400px;
  }
  .center_input {
    width: 98%;
    display: flex;
    justify-content: center;
    .card_input_send {
      width: 1000px;
      // background: pink;
      height: auto;
      display: flex;
      margin-top: 30px;
      justify-content: flex-start;
      .send_title_input {
        width: 300px;
      }
      .card_input_send_title {
        width: 150px;
        // height: 60px;
        // background: pink;
        font-size: 20px;
        text-align: center;
        margin-top: 10px;
      }
      .send_button {
        // width: 100px;
        margin-left: 40px;
      }
    }
  }
  .content_card {
    width: 98%;
    display: flex;
    justify-content: center;
    .content_card_twe {
      margin-top: 30px;
      width: 1000px;
      display: flex;
      justify-content: flex-start;
      .card_input_send_title {
        width: 150px;
        // height: 60px;
        // background: pink;
        font-size: 20px;
        text-align: center;
        margin-top: 10px;
      }
      .card_input_send_content {
        width: 600px;
      }
    }
  }
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
  .teble_money {
    margin-top: 20px;
  }
  .paginton_card {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
