<template>
    <div class="many_choice">
        <div class="choice_flex" >
            <div class="choice_flex_province">
                 <el-select v-model="provinceo"  clearable placeholder="请选择省份"
                 :filterable="true" remote @change="remoteMethod" >
    <el-option
      v-for="item in province"
      :key="item.areaCode"
      :label="item.areaName"
      :value="item.areaId">
    </el-option>
  </el-select>
            </div>
                        <div class="choice_flex_city">
                 <el-select v-model="city" clearable placeholder="请选择城市"
                :filterable="true" remote @change="cityMethod">
    <el-option
      v-for="item in cityList"
      :key="item.areaId"
      :label="item.areaName"
      :value="item.areaCode">
    </el-option>
  </el-select>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
import * as province from "@/api/place";
const log = console.log.bind(console);
export default {
  data() {
    return {
      province: [],
      provinceo: "",
      cityList: [],
      city: ""
    };
  },
  created: function() {
    this.provinceChoice();
  },
  methods: {
    // 省份改变
    remoteMethod(key) {
      var that = this;
      let obj = {};
      obj = this.province.find(item => {
        return item.areaId === key;
      });
      log(obj, that.provinceo, "弟弟");
      that.city = "";
      if (obj) {
        var pro = obj.areaCode;
        that.$emit("provinceer", pro); //上传 省份code
      } else {
        var pro = null;
        that.$emit("provinceer", pro); //上传 空
      }
      var data = {
        areaId: that.provinceo
      };
      province.cityList(data).then(response => {
        log(response.data);
        that.cityList = response.data.data;
        log(response.data.data, "城市数据");
        // if (that.cityList[0]) {
        //     var cityEx = that.cityList[0].areaCode
        // }
        // if (cityEx) {
        //     that.$emit('cityer',cityEx)
        // } else {
        //     var cityEx = null
        //      that.$emit('cityer',cityEx)
        // }
      });
    },
    //选择城市
    cityMethod() {
      var that = this;
      log(that.city, "城市选择");
       if (that.city) {
              var cityEx = that.city
          }
          if (cityEx) {
              that.$emit('cityer',cityEx)
          } else {
              var cityEx = null
               that.$emit('cityer',cityEx)
          }
    },
    provinceChoice() {
      var that = this;
      province.provinceList().then(response => {
        that.province = response.data.data;
        log(response.data, "省份");
      });
    }
  }
};
</script>

<style scoped lang="scss">
.many_choice {
  .choice_flex {
    width: 420px;
    display: flex;
    justify-content: space-between;
  }
}
</style>