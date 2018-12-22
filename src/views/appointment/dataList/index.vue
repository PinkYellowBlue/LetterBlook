<template>
  <div class="appoint_many">
    <div class="appoint_top">
      <div class="appoint_query">
        <div class="query_top">
          <div class="query_top_o">
            <div>
              <img src="../../../assets/input/City.png" alt>
            </div>
            <provincial-cities @provinceer="proo" @cityer="citt"></provincial-cities>
          </div>
          <div class="query_top_o">
            <div>
              <img src="../../../assets/input/City.png" alt>
            </div>
            <div>
              <el-date-picker
                v-model="dateQ"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="query_top_t">
          <div class="query_top_t_o">
            <div>
              <img src="../../../assets/input/City.png" alt>
            </div>
            <div class="top_input">
              <el-input placeholder="请输入详细地址" v-model="input10" clearable></el-input>
            </div>
          </div>
          <div class="top_input_s">
            <el-select v-model="value5" clearable placeholder="请选择主题">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="top_button">
            <el-button type="primary" plain @click="clickQ">查 询</el-button>
          </div>
        </div>
        <div class="tabe_list">
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="发起" prop="roleValues"></el-table-column>
              <el-table-column prop="roleValue" label="主题"></el-table-column>
              <el-table-column prop="roleStatus" label="开始"></el-table-column>
              <el-table-column prop="roleStatuss" label="结束"></el-table-column>
              <el-table-column prop="descption" label="小时"></el-table-column>
              <el-table-column prop="descptions" label="具体地址"></el-table-column>
              <el-table-column prop="descptionss" label="限制人数 "></el-table-column>
              <el-table-column prop="descptionsss" label="状态"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.$index,scope.row)"
                    type="text"
                    size="small"
                  >审核</el-button>
                  <el-button
                    @click.native.prevent="editAuthority(scope.$index)"
                    type="text"
                    size="small"
                  >详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const log = console.log.bind(console);
import * as subscribe from "@/api/appointment";
export default {
  data() {
    return {
        Submission: {
            prom: '',
            cityy: '',
            dateS: '',
            dateE: '',
        },
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
      input10: "",
      tableData: [
        {
          roleValues: "李四",
          roleValue: "以茶会友 琴棋书画",
          roleStatus: "2018-12-12 08-12-21",
          roleStatuss: "2018-12-12 08-12-21",
          descption: "2",
          descptions: "开福区凤凰天街苑",
          descptionss: "21",
          descptionsss: "待审核"
        }
      ],
      value5: "",
      dateQ: []
    };
  },
  created:function() {
      this.SubscribeList()
  },
  methods: {
      //省份
      proo(pro) {
          log(pro,'sss')
          let that = this
          that.Submission.prom = pro
      },
      citt(cityEx) {
          log(cityEx,'WWWW')
          let that = this
          that.Submission.cityy = cityEx
      },
    clickQ() {
      let that = this;
      
      if (that.dateQ == null) {
          that.dateQ = ''
      }
      if (that.dateQ !== null) {
          that.Submission.dateS = that.dateQ[0]
          that.Submission.dateE = that.dateQ[1]
      }
      log(that.Submission, "有没有值");
    },
    SubscribeList() {
        let that = this
        subscribe.cardList()
        .then( response => {
            log(response.data,'返回数据')
        })
    }

  }
};
</script>

<style scoped lang="scss">
.appoint_many {
  width: 100%;
  height: auto;
  margin-top: 200px;
  .appoint_top {
    width: 100%;
    display: flex;
    justify-content: center;
    .appoint_query {
      width: 1200px;
      //   background: pink;
      .query_top {
        margin-top: 60px;
        width: 1100px;
        // background: red;
        display: flex;
        justify-content: center;
        .query_top_o {
          width: 450px;
          display: flex;
          justify-content: center;
        }
      }
      .query_top_t {
        width: 1100px;
        display: flex;
        justify-content: start;
        margin-top: 30px;
        // background: red;
        .query_top_t_o {
          //   margin-left: 90px;
          width: 530px;
          display: flex;
          justify-content: center;
          .top_input {
            width: 300px;
            .el-input {
              width: 300px;
              input {
                width: 300px;
              }
            }
          }
          .top_input_s {
            width: 300px;
            .el-input {
              width: 300px;
              input {
                width: 300px;
              }
            }
          }
        }
        .top_button {
          margin-left: 100px;
        }
      }
    }
  }
}
</style>