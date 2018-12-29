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
              <el-input placeholder="请输入详细地址" v-model="Submission.address" clearable></el-input>
            </div>
          </div>
          <div class="top_input_s">
            <el-select v-model="Submission.themeId" clearable placeholder="请选择主题">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.themeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="top_button">
            <el-button type="primary" plain @click="clickQ">查 询</el-button>
          </div>
        </div>

      </div>


    </div>
    <div class="tabe_list">
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="发起" prop="nickName"></el-table-column>
              <el-table-column prop="themeId" label="主题"></el-table-column>
              <el-table-column prop="startTime" label="开始日期"></el-table-column>
              <el-table-column prop="endTime" label="结束日期"></el-table-column>
              <el-table-column prop="startHour" label="开始小时"></el-table-column>
              <el-table-column prop="endHour" label="结束小时"></el-table-column>
              <el-table-column prop="address" label="具体地址"></el-table-column>
              <el-table-column prop="peopleCount" label="限制人数 "></el-table-column>
            <el-table-column prop="participants" label="实际人数 "></el-table-column>
              <el-table-column prop="releaseState" label="状态"></el-table-column>
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
        <div class="paging">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="Submission.pageNo"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="pages">
    </el-pagination>
    </div>
    <!-- 预约审核 -->
    <el-dialog
      title="审核用户"
      :visible.sync="dialogVisible"
      top="30vh"
      width="30%"
      :center="titeleC"
      :before-close="handleClose"
    >
      <div class="propr_flex_center">
        <div class="flex_state">
          <div class="title_tag">状态</div>
          <div class="input_tag">
            <el-select v-model="status" placeholder="请选择">
              <el-option
                v-for="item in examine"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="propr_flex_center">
        <div class="flex_describe">
          <div class="title_tag">描述</div>
          <div class="input_tag">
            <el-input type="textarea" :rows="4" placeholder="请输入内容(选填)" v-model="statusText"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newUser">确 定</el-button>
      </span>
    </el-dialog>
    <div class="margin_top"></div>
  </div>
</template>

<script>
const log = console.log.bind(console);
import * as subscribe from "@/api/appointment";
import * as appointfilter from "@/utils/filter";
import Vue from "vue";
export default {
  data() {
    return {
        status: '3',
        statusText: '',
        titeleC: true,
        dialogVisible: false,
        Submission: {
            provinceCode: '', //省
            cityCode: '', // 市
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            address: '', //详细地址
            themeId: '', //主题 id
            pageNo: 1, // 页数
        },
        pages: 0,//总条数
      options: [
        {
          value: "1",
          label: "以茶会友"
        },
        {
          value: "2",
          label: "健身撸铁"
        },
        {
          value: "3",
          label: "看电影吃饭"
        },
        {
          value: "4",
          label: "谈天说地"
        },
      ],
      examine: [
          {
          value: "3",
          label: "审核通过"
            },
            {
          value: "2",
          label: "审核不通过"
            },
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
      dateQ: [],
      Iid: '',
    };
  },
  created:function() {
      this.SubscribeList()
      this.themeList()
  },
  methods: {
      //获取预约用户
      handleClick(index) {
          let that = this
          let a = that.tableData[index].id
          that.Iid = a
          that.dialogVisible = true
          log(index,'sasa')
      },
      //主题列表
      themeList() {
          let that = this
          subscribe.themeMany()
          .then(response => {
              log(response.data,'返回数据*****')
              that.options = response.data.data.list
          })
      },
      //预约审核
      newUser() {
          let that = this
          let b = {
              reservationId: that.Iid,
              state: that.status,
              remark: that.statusText,
          }
          that.dialogVisible = false
          subscribe.examine(b)
          .then(response => {
              log(response.data,'返回数据')
              this.SubscribeList()
          })

      },
      handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //跳到预约详情
      editAuthority(index){
          let that = this
         let id =  that.tableData[index].id
         localStorage.setItem('id',id)
          log(index,'####')
          that.$router.push({
        path: "/appointDetails",
        query: {
          paperId: id
        }
      });
      },
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      var that = this;
      that.Submission.pageNo = val;
      that.SubscribeList();
      log(val);
    },
      //省份
      proo(pro) {
          log(pro,'sss')
          let that = this
          that.Submission.provinceCode = pro
      },
      citt(cityEx) {
          log(cityEx,'WWWW')
          let that = this
          that.Submission.cityCode = cityEx
      },
      //查询
    clickQ() {
      let that = this;
      if (that.dateQ == null) {
          that.Submission.startTime = ''
          that.Submission.endTime = ''
      }
      if (that.dateQ !== null) {
          that.Submission.startTime = that.dateQ[0]
          that.Submission.endTime = that.dateQ[1]
      }
      that.SubscribeList()
      log(that.Submission, "有没有值");
    },
    //获取列表
    SubscribeList() {
        let that = this
        let data = that.Submission
        subscribe.cardList(data)
        .then( response => {
            log(response.data,'返回数据')
            that.pages = response.data.data.total
            let data = response.data.data.list
             for (let i = 0; i < data.length; i++) {
                    var e = data[i];
                    var key = appointfilter.appointmentFilter(e.releaseState);
                        log(key, "洗数据&&*&*&**&");
                    Vue.set(e, "releaseState", key);
            }
            that.tableData = data
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
  //弹窗
  .propr_flex_center {
    display: flex;
    justify-content: center;
    .flex_act {
      width: 400px;
      display: flex;
      justify-content: space-between;
      .title_tag {
        margin-top: 10px;
        font-size: 17px;
      }
      .input_tag {
        width: 330px;
      }
    }
    .flex_state {
    margin-top: 20px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    .title_tag {
      // margin-right: 5px;
      margin-top: 10px;
      font-size: 17px;
    }
    .input_tag {
      width: 330px;
      .el-select {
        width: 330px;
      }
    }
  }
  //描述
  .flex_describe {
    margin-top: 20px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    .title_tag {
      // margin-right: 5px;
      margin-top: 10px;
      font-size: 17px;
    }
    .input_tag {
      // margin-left: 20px;
      width: 330px;
    }
  }
  }
  //
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
  .tabe_list {
    margin-top: 50px;
  }
  .paging {
      width: 98%;
      display: flex;
      margin-top: 30px;
      justify-content: center;
    }
    .margin_top {
      width: 100%;
      height: 300px;
    }
}
</style>
