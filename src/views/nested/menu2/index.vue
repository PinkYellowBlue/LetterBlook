<template>
  <div class="new_user">
    <div class="new_user_top">
      <div class="new_user_top_case">
        <div class="new_user_top_case_flex">
          <div>
            <el-select
              v-model="queryQC.provinceId"
              clearable
              placeholder="请选择省份"
              :filterable="true"
              remote
            >
              <el-option
                v-for="item in provincet"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaCode"
              ></el-option>
            </el-select>
          </div>
          <div class="list_case_bottom">
            <div class="list_case_date">注册时间:</div>
            <div>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
          <div>
            <el-button type="primary" plain @click="showwToggest">列表/图表</el-button>
          </div>
          <div class="button_ex">
            <div>
              <el-button type="primary" plain @click="queryList">查 询</el-button>
            </div>
            <div>
              <el-button type="primary" plain>导出EXCEL</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new_user_data">
      <div class="new_data">2018年11月12日至2018年11月22日 全国新用户统计</div>
      <div class="new_button" @click="showToggest">
        <el-button type="warning" plain>柱状图/折线图</el-button>
      </div>
    </div>
    <div v-if="showw" class="tab_user">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="peopleCount" label="数量"></el-table-column>
      </el-table>
    </div>
    <div v-else>
      <ve-line :data="chartData" v-if="show"></ve-line>
      <ve-histogram :data="chartData" v-else></ve-histogram>
    </div>
    <!-- 分页器 -->
    <div class="paging">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="strNo"
        :page-size="2"
        layout="total, prev, pager, next, jumper"
        :total="pages"
      ></el-pagination>
    </div>
    <div class="air_scoon"></div>
  </div>
</template>

<script>
const log = console.log.bind(console);
import * as filter from "@/utils/filter";
import * as province from "@/api/place";
import VeLine from "v-charts/lib/line.common";
import VeHistogram from "v-charts/lib/histogram.common";
import * as dataStaer from "@/api/dataStatis";
import { provinceAndCityData } from "element-china-area-data";
export default {
  components: {
    VeLine,
    VeHistogram
  },
  data() {
    return {
      optionss: provinceAndCityData,
      selectedOptions: [],
      provincet: [],
      show: true,
      showw: true,
      date: "",
      strNo: 1,
      pages: 100, //总条数
      queryQC: {
        provinceId: "", //省份
        createTime: "", //时间
        endTime: "" //时间
      },
      chartData: {
        columns: ["province", "peopleCount"],
        rows: []
      },
      value6: "",
      value: "",
      tableData: []
    };
  },
  created: function() {
    this.province();
    this.provinceChoice();
  },
  methods: {
    //分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      that.strNo = val;
      that.province();
      log(val);
    },
    //查询省份
    provinceChoice() {
      var that = this;
      province.provinceList().then(response => {
        that.provincet = response.data.data;
        log(response.data, "省份");
      });
    },
    //查询
    queryList() {
      var that = this;
      var dataNN = that.date;
      // if (dataNN != '' && dataNN != null) {
      //     var n = filter.dateFilterex(dataNN)
      //     that.queryQC.dateN = n
      //     log(n,'时间')
      // }
      if (dataNN == null) {
        dataNN = "";
      }
      if (dataNN != null) {
        var n = filter.dateFilter(dataNN);
        that.queryQC.createTime = n[0];
        that.queryQC.endTime = n[1];
        log(n, "时间");
      }
      dataStaer.newUserList(that.queryQC).then(response => {
        log(response.data, "查询数据");
        that.tableData = response.data.data.list;
        that.chartData.rows = response.data.data;
        that.pages =  response.data.data.total
      });
    },
    showToggest() {
      var that = this;
      // this.show = false
      if (this.show) {
        console.log("响应");
        this.show = false;
      } else {
        this.show = true;
      }
      console.log(that.tableData, "数据");
    },
    showwToggest() {
      // this.show = false
      if (this.showw) {
        console.log("响应");
        this.showw = false;
      } else {
        this.showw = true;
      }
    },
    handleChange(value) {
      console.log(value, "数据是什么");
    },
    //列表
    province() {
      var that = this;
      var obj = {
        strNo: that.strNo
      };
      dataStaer.newUserList(obj).then(response => {
        log(response.data, "数据列表");
        var data = response.data.data.list;
        that.tableData = data;
        that.chartData.rows = that.tableData;
        that.pages = response.data.data.total;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.new_user {
  width: 100%;
  height: auto;
  margin-top: 200px;
  .paging {
    width: 98%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .air_scoon {
    width: 100%;
    height: 200px;
  }
  .tab_user {
    margin-top: 10px;
    margin-left: 20px;
  }
  .new_user_top {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    .new_user_top_case {
      width: 100%;
      height: auto;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      border: 1px solid #dcdcdc;
      .new_user_top_case_flex {
        // background: paleturquoise;
        margin-top: 20px;
        width: 1300px;
        display: flex;
        margin-left: 30px;
        justify-content: space-between;
        .list_case_bottom {
          display: flex;
          justify-content: space-between;
          .list_case_date {
            margin-top: 10px;
            margin-right: 10px;
          }
        }
      }
      .button_ex {
        width: 300px;
        display: flex;
        margin-left: 30px;
        // margin-top: 20px;
        margin-bottom: 20px;
        justify-content: space-between;
      }
    }
  }
  .new_user_data {
    margin-top: 20px;
    margin-left: 30px;
    width: 98%;
    display: flex;
    justify-content: space-between;
    .new_data {
      margin-top: 12px;
    }
    .new_button {
      margin-right: 20px;
    }
  }
}
</style>
