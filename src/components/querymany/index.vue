<template>
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
          <el-select v-model="lookup.userType" :placeholder=ss clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
          <el-button type="primary" plain  @click="queryUser">查询</el-button>
        </div>
        <div>
          <el-button type="primary" plain>导出EXCEL</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { provinceAndCityData } from "element-china-area-data";
import * as user from "@/api/user";
import * as filter from "@/utils/filter";
const log = console.log.bind(console);
export default {
  props: {
    titlee: String,
    required: true
  },
  data() {
    return {
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
        userType: "", //会员类型
        userName: "", //真实姓名
        createTime: "", //创建时间
        endTime: "", //结束时间
        strNo: 1,
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
      valu: ""
    };
  },
  methods: {
    handleChange(value) {
      var that = this;
      that.lookup.provinceId = value[0];
      that.lookup.cityId = value[1];
      console.log(value, "数据是什么");
    },
    d() {
      console.log(selectedOptions, "编码");
    },
    // pink() {
    //     var data = ['qwe']
    //     this.$emit('lookup', data)
    // },
    queryUser() {
      var that = this;
      log(that.lookup, "请求数据");
      log(this.titlee, "有没有传成功");
      var d = that.date;
      var p = true
      var s = p
        this.$emit("ok", s);
      // var load = [];
      if (d != null) {
        var n = filter.dateFilter(d)
        // load.push(n);
        that.lookup.createTime = n[0];
        that.lookup.endTime = n[1];
        log(that.lookup.createTime, that.lookup.endTime, "骑士结束");
        var val = that.lookup;
        log(val, "提交的信息");
      }   
        var s = that.lookup
        this.$emit("look", s);
      var url = that.titlee;
      user.userQuery(url, val).then(response => {
        log(response.data.data, "有没有值");
        var data = response.data.data;
        this.$emit("lookup", data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
