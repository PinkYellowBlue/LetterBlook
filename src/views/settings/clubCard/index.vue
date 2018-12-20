<template>
  <div class="clubCard_many">
    <div class="clubCard_many_cent">
      <el-table :data="CardList" style="width: 100%">
        <el-table-column prop="sysKey" label="会员类型"></el-table-column>
        <el-table-column prop="sysValue" label="金额"></el-table-column>
        <el-table-column prop="sysDec" label="说明"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editStaff(scope.$index)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   
  </div>
</template>

<script>
const log = console.log.bind(console);
import * as cardMany from "@/api/cardED";
import * as cardFilter from "@/utils/filter";
import Vue from "vue"
export default {
  data() {
    return {
        CardList: [

        ]
    };
  },
  created: function() {
      this.cardListN()
  },
  methods: {
      cardListN() {
          let that = this
        cardMany.cardList()
        .then( response => {
            let newArr = response.data.data
            newArr.forEach(e => {
                 let newName = cardFilter.cardFilter(e.sysKey)
                 let newMoney = cardFilter.dealMoney(e.sysValue)
                 Vue.set(e, 'sysKey', newName)
                 Vue.set(e, 'sysValue', newMoney)
            });
            that.CardList = newArr
            log(response.data,'返回的数据')
        })
      }
  }
};
</script>

<style scoped lang="scss">
.clubCard_many {
  margin-top: 200px;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  .clubCard_many_cent {
    width: 100%;
    height: auto;
  }
}
</style>