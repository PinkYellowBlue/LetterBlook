<template>
  <div class="details_many">
    <div class="details_many_flex">
      <div class="many_flex_width">
        <div class="business_top_many">
          <div class="business_top">
            <div class="business_top_title">商家照片:</div>
            <div class="business_top_img">
              <el-carousel indicator-position="none" arrow="always">
                <el-carousel-item v-for="(item, index) in manyImg" :key="index">
                  <img :src="item.imgUrl" alt>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="business_top_right">
            <div class="business_top_title">用户照片:</div>
            <div class="business_top_img">
              <img :src="userPhoto" alt>
            </div>
          </div>
        </div>
        <div class="business_bottom_many">
          <div class="bottom_many_margin">
            <div class="many_once">
              <div class="once_title">发起者昵称:</div>
              <div class="once_text">{{data.nickName}}</div>
            </div>
            <div class="many_once">
              <div class="once_title">发起者性别:</div>
              <div class="once_text">{{data.userSex}}</div>
            </div>
            <div class="many_once">
              <div class="once_title">主题:</div>
              <div class="once_text">{{data.themeId}}</div>
            </div>
          </div>
          <div class="bottom_many_margin">
            <div class="many_once">
              <div class="once_title">活动日期:</div>
              <div class="once_text">{{data.startTime}} 至 {{data.endTime}}</div>
            </div>
            <div class="many_once">
              <div class="once_title">活动时间:</div>
              <div class="once_text">{{data.startHour}}点 至 {{data.endHour}}点</div>
            </div>
            <div class="many_once">
              <div class="once_title">具体地址:</div>
              <div class="once_text">{{data.address}}</div>
            </div>
          </div>
          <div class="bottom_many_margin">
            <div class="many_once">
              <div class="once_title">起止年龄:</div>
              <div class="once_text">{{data.startAge}}岁 至 {{data.endAge}}岁</div>
            </div>
            <div class="many_once">
              <div class="once_title">实际人数:</div>
              <div class="once_text">{{data.participants}}人</div>
            </div>
            <div class="many_once">
              <div class="once_title">人数:</div>
              <div class="once_text">{{data.peopleCount}}人</div>
            </div>
          </div>
          <div class="bottom_many_margin">
            <div class="many_once">
              <div class="once_title">费用:</div>
              <div class="once_text">{{data.cost}}</div>
            </div>
            <div class="many_once">
              <div class="once_title">性别:</div>
              <div class="once_text">{{data.sex}}</div>
            </div>
            <div class="many_once">
              <div class="once_title">发起目的:</div>
              <div class="once_text">{{data.remark}}</div>
            </div>
          </div>
          <div class="friends_number">
              <div class="people_number">预约人数:</div>
              <div class="right_people_list">
                  <div class="people_img_name" v-for="(item, index) in friend" :key="index">
                      <div class="img_name">
                          <div class="people_img">
                              <div class="flex_img">
                                  <img :src="item.fImg" alt="">
                              </div>
                            </div>
                          <div class="people_text">{{item.name}}</div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="examine_button">
              <div class="examine_button_many">
                  <div class="">
                      <el-button type="primary" @click="dialogVisible=true">审核预约</el-button>
                  </div>
                  <div class="">
                      <el-button type="danger"@click="black">返回列表</el-button>
                  </div>
              </div>

          </div>
        </div>
      </div>
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
import * as subscribe from "@/api/appointment";
import * as datadeFilter from "@/utils/filter";
import Vue from "vue";
const log = console.log.bind(console);
export default {
  data() {
    return {
      data: {},
      userPhoto: "",
      dialogVisible: false,
      titeleC: true,
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
      status: '3',
      statusText: '',
      manyImg: [
        {
          imgUrl: "static/fiveimg/le.png"
        },
        {
          imgUrl: "static/fiveimg/le.png"
        },
        {
          imgUrl: "static/fiveimg/le.png"
        },
        {
          imgUrl: "static/fiveimg/le.png"
        }
    ],
      friend: [

          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },{
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },{
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },{
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },
          // {
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },{
          //     fImg: 'static/fiveimg/le.png',
          //     name: '超级大香蕉'
          // },

      ]
    };
  },
  created: function() {
    this.details();
  },
  methods: {
    details() {
      let that = this;
      let id = localStorage.getItem("id");
      let a = { reservationId: id };
      subscribe.cardDetails(a).then(response => {
        log(response.data, "ssss");
        var data = response.data.data;
        that.userPhoto =  'http://image.letterbook.cn' + data.photo
        log(that.userPhoto,'用户图片')
        var sex = datadeFilter.sexFilterex(data.sex);
        var userSex = datadeFilter.sexFilterex(data.userSex);
        var cost = datadeFilter.fedFilter(data.cost);
        Vue.set(data, "sex", sex);
        Vue.set(data, "userSex", userSex);
        Vue.set(data, "cost", cost);
        that.data = data;
      });
  },
  //返回列表
  black() {
      let that = this
      that.$router.push({
          path: "/dataList",
      });
  },
  //预约审核
  newUser() {
      let that = this
      let Iid = localStorage.getItem('id')
      let b = {
          reservationId: Iid,
          state: that.status,
          remark: that.statusText,
      }
      that.dialogVisible = false
      subscribe.examine(b)
      .then(response => {
          log(response.data,'返回数据')
          that.$router.push({
              path: "/dataList",
          });
        })

  },
  handleClose(done) {
  this.$confirm("确认关闭？")
    .then(_ => {
      done();
    })
    .catch(_ => {});
},
  }
};
</script>
<style lang="scss">
.el-carousel {
//   background: pink;
  width: 300px;
  height: 200px;
  .el-carousel__container {
      .el-carousel__arrow {
        background-color: rgb(56, 67, 86) ;
        opacity: .8;
      }
    .el-carousel__item {
      width: 300px;

      img {
        width: 300px;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.details_many {
  width: 100%;
  height: auto;
  margin-top: 200px;
  // background: pink;
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
  //空白占有部分
  .margin_top {
      width: 100%;
      margin-top: 300px;
      height: 100px;
      background: yellow;
    }
    //
  .details_many_flex {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    .many_flex_width {
      width: 1200px;
      height: auto;
      .business_top_many {
        width: 1200px;
        display: flex;
        justify-content: flex-start;
        .business_top {
          width: 500px;
          display: flex;
          justify-content: flex-start;
          .business_top_title {
            font-size: 20px;
            color: #999;
          }
          .business_top_img {
            margin-top: 30px;
            margin-left: 30px;
          }
        }
        .business_top_right {
          width: 500px;
          display: flex;
          justify-content: flex-start;
          .business_top_title {
            font-size: 20px;
            color: #999;
          }
          .business_top_img {
            margin-top: 30px;
            margin-left: 30px;
            img {
              width: 300px;
            }
          }
        }
      }
      .business_bottom_many {
        width: 1200px;
        height: auto;
        .bottom_many_margin {
          width: 1200px;
          height: auto;
          display: flex;
          justify-content: center;
          .many_once {
            margin-top: 60px;
            width: 1200px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .once_title {
              font-size: 18px;
              color: #333;
            }
            .once_text {
              width: 300px;
              padding-left: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #6e6e6e;
            }
          }
        }
        .friends_number {
            width: 1200px;
            height: auto;
            margin-top:60px;
            // background: pink;
            // display: flex;
            // justify-content: flex-start;
            // flex-wrap: wrap;
            .people_number {
                font-size: 18px;
                color: #333;
            }
            .right_people_list {
                margin-left: 130px;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .people_img_name {
                  margin-top: 30px;
                    .img_name {
                        width: 110px;
                        height: 100px;
                        // background: yellow;
                        .people_img {
                            display: flex;
                            justify-content: center;
                            .flex_img {
                                img {
                                    border-radius: 50% ;
                                    width: 60px;
                                    height: 60px;
                                }
                            }
                        }
                        .people_text {
                            text-align: center;
                            font-size: 15px;
                        }

                    }
                }
            }

        }
        .examine_button {
            margin-top: 30px;
            width: 1200px;
            display: flex;
            justify-content: center;
            .examine_button_many {
                width: 1200px;
                // height: 300px;
                // background: pink;
                display: flex;;
                justify-content: space-around;
            }
        }
      }
    }
  }
}
</style>
