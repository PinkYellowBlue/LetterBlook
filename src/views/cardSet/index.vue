<template>
    <div class="card_set">
        <div class=" card_set_top">
            <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="syskey"
      label="卡类型"
      
      >
    </el-table-column>
    <el-table-column
      prop="sysValue"
      label="金额"
      >
    </el-table-column>
    <el-table-column
      prop="sysDec"
      label="卡说明">
    </el-table-column>
  </el-table>
        </div>
        <div class="card_market">卡销售统计</div>
        <div class="screen_five">
            <el-select v-model="information.cardType" placeholder="卡类型选择" clearable>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
              <el-cascader size="large" :options="optionss" v-model="selectedOptions" @change="handleChange" clearable>
  
          </el-cascader>
    <el-button type="primary" plain @click="cardCound">查 询</el-button>
  <el-button type="primary" plain>导出EXCEL</el-button>

        </div>
        <div>
             <el-table
      :data="cardData"
      style="width: 100%">
      <el-table-column
        prop="cardType"
        label="卡类型"
        >
      </el-table-column>
      <el-table-column
        prop="countVipCard"
        label="数量"
        >
      </el-table-column>
      <el-table-column
        prop="vipCardTime"
        label="时间">
      </el-table-column>
    </el-table>
        </div>
        <div class="air_boom"></div>
    </div>
</template>

<script>
import { provinceAndCityData } from "element-china-area-data";
import * as user from "@/api/user";
import * as filter from "@/utils/filter";
import Vue from "vue";
// import func from './vue-temp/vue-editor-bridge';
const log = console.log.bind(console);
export default {
  data() {
    return {
      optionss: provinceAndCityData,
      selectedOptions: [],
      value6: "",
      options: [
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
      information: {
        cardType: "",
        createTime: "",
        endTime: "",
        areaId: ""
      },
      card: "",
      key: "",
      date: [],
      tableData: [],
      cardData: []
    };
  },
  created: function() {
    this.cardList();
    this.cardCound();
  },
  methods: {
    handleChange(value) {
      console.log(value, "数据是什么");
    },
    cardList() {
      var that = this;
      user.cardList().then(response => {
        log(response, "会员列表");
        that.tableData = response.data.data;
      });
    },
    cardCound() {
      var that = this;
      var date = that.date;
      var q = [];
      var p = []
      // var load = [];
      if (date == null) {
        date = ''
      }
          that.information.areaId = that.selectedOptions[1]
      
      log(that.selectedOptions,'地区')
      if (date != null) {
        var n = filter.dateFilter(date);
        // load.push(n);
        that.information.createTime = n[0];
        that.information.endTime = n[1];
        log(that.information.createTime, that.information.endTime, "骑士结束");
        var information = that.information;
        log(information, "提交的信息");
      }
      log(that.information, "提交的信息");
      user.cardCound( that.information).then(response => {
        log(response, "数据%#￥#￥");
        var d = response.data.data;
        for (var i = 0; i < d.length; i++) {
          var e = d[i];
          var cardT = e.cardType;
          var newCardT = filter.memberFilter(cardT);
          Vue.set(e, "cardType", newCardT);
          q.push(1);
        }
        if (q.length == d.length) {
          that.cardData = d;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card_set {
  margin-top: 200px;
  width: 100%;
  height: auto;
  margin-left: 10px;
  .air_boom {
    width: 100%;
    height: 300px;
  }
  .card_set_top {
    margin-top: 20px;
    width: 98%;
    height: auto;
  }
  .card_market {
    margin-top: 30px;
    font-size: 20px;
    font-weight: 700;
  }
  .screen_five {
    width: 98%;
    // background: pink;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
}
</style>
