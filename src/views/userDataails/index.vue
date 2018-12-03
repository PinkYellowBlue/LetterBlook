<template>
    <div class="user_dataails">
        <div class="user_dataails_top">
            <div class="user_top">
                <div class="user_top_center">
                    <div class="user_top_message">
                        <div class="img_yuan">
                            <img src="../../assets/registe/a.jpg" alt="">
                        </div>
                    </div>
                    <div class="user_top_let" v-for="(item,index) in list" :key="index">
                        <div class="message_flex">
                            <div>{{item.nickName}}</div>
                            <div class="sex_flex">
                                <div>性别</div>
                                <div>{{item.sex}}</div>
                            </div>
                            <div class="name_flex">
                                <div>真实姓名</div>
                                <div>{{item.userName}}</div>
                            </div>
                            <div class="city_flex">
                                <div>注册省市</div>
                                <div>{{item.province}}-{{item.city}}</div>
                                <!-- <div>{{item.city}}</div> -->
                            </div>
                            <div class="date_flex">
                                <div>注册时间</div>
                                <div>2019年18月20日</div>
                            </div>
                        </div>
                        <div class="message_flex_bottom">
                            <div class="message_flex">
                                <div class="name_flex">
                                    <div>生日</div>
                                    <div>{{item.birth}}</div>
                                </div>
                                <div class="name_flex">
                                    <div>手机号</div>
                                    <div>{{item.phone}}</div>
                                </div>
                                <div class="city_flex">
                                    <div>会员类型</div>
                                    <div>年卡会员</div>
    
                                </div>
                                <div class="date_flex">
                                    <div>账户余额</div>
                                    <div>{{item.amount}}元</div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="user_dataails_bottom">
            <div class="dataails_bottom_dynamic">
                <div class="dynamic_number">动态 {{dynamicNumber}}条</div>
                <div class="bottom_dynamic_left">
                    <div class="dynamic_left_scllo">
                        <div class="dynamic_left_list" v-for="(item, index) in listDataails" :key="index">
                            <div class="dynamic_left_list_str">
                                {{item.content}}
                            </div>                                                      
                            <div class="dynamic_left_list_img">
                                <div v-for="(imger ,index) in item.userFileVos" :key="index">
                                        <img :src="imger.imgUrl" alt="">
                                </div>
                                
                            </div>
                            <div class="button_right" @click="deleterMessage(index)">
                                <el-button type="danger" plain>点击删除</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="paginatt">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="2" layout="total, prev, pager, next, jumper" :total="dynamicNumber">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="dataails_bottom_friends">
                <div class="bottom_friend_top">
                    好友233位
                </div>
                <div class="bottom_friend_right">
                    <div class="friend_right_scllo">
                        <div class="friend_right_scllo_center">
                        <div class="friend_right_list">
                            <div class="friend_right_img_title" >
                                <div class="header_many_user_many" v-for="(title, index) in pinkk" :key="index">
                                    <div class="header_many_user_pink">
                                        <div class="header_many_user_img">
                                            <img :src="title.img" alt="">
                                        </div>
                                    </div>
                                    <div class="header_many_user_name">{{title.t}}</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="paginatt">
                        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10" layout=" prev, pager, next" :total="dynamicNumber">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
         <div class="air_scool"></div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定要删除此动态吗？</span>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteIndex">确 定</el-button>
                      </span>
        </el-dialog>
    </div>
</template>

<script>
const log = console.log.bind(console);
import * as user from "@/api/user";
import * as filter from "@/utils/filter";
import Vue from "vue";
export default {
  data() {
    return {
      currentPage4: 1,
      dialogVisible: false,
      listDataails: [],
      pinkk: [
        {
          t: "今天星期日",
          img: "src/assets/registe/q.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/a.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/w.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/e.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/s.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/d.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/a.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/w.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/e.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/s.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/d.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/a.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/w.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/e.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/s.jpg"
        },
        {
          t: "今天星期日",
          img: "src/assets/registe/d.jpg"
        }
      ],
      list: [],
      pages: "",
      imgList: [],
      dynamicNumber: 1
    };
  },
  created: function() {
    this.userMessage();
    this.DynamicList();
    // this.FirendList();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        var that = this;
    //   var val = localStorage.getItem("id");
      var id = { 
          userId: "265",
          pageNo: val
          };
      user.dynamicList(id).then(response => {
        log(response.data, "获取动态信息");
        that.dynamicNumber = response.data.data.total;
        that.listDataails = response.data.data.list
        // var imgAjaxList = that.listDataails
        // that.imgList = that.listDataails
        var arraye = that.listDataails
        // log(arraye,'数组*&*&*&')
        var n = []
        var numberN = []
        // that.imgList = imgAjaxList
            for (let i = 0; i < arraye.length; i++) {
                var e = arraye[i]
                //.userFileVos;
                log(e,'@@@@')
                // n.push(1)
                let numberN = e.userFileVos
                 log(numberN,'图片数组')
                //  n.push(numberN)
                for (let l = 0; l < numberN.length; l++) {
                    var r = numberN[l].imgUrl;
                     n.push(numberN[l])
                    var q = filter.testImg(r);
                    log(q,'改革数据')
                    // n.push(1)
                    Vue.set(numberN[l], "imgUrl", q);
                    var obj = {imgUrl: r}
                    n.push(obj)
                }     
            }
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleterMessage(index) {
      var that = this;
      log(index, "是什么");
      that.dialogVisible = true;
      localStorage.setItem("list", index);
    },

    // deleterOne(index) {
    //     var that = this
    //     var b = that.listDataails[index]
    //     log(b, '找到信息了')

    // },
    deleteIndex() {
      var that = this;
      var index = localStorage.getItem("list");
      that.listDataails.splice(index, 1);
      that.dialogVisible = false;
    },
    userMessage() {
      var that = this;
      var val = localStorage.getItem("id");
      var id = { id: val };
      user.userdetails(id).then(response => {
        log(response.data, "获取信息");
        that.list.push(response.data.data);
        that.list.forEach(e => {
          var i = filter.sexFilter(e.sex);
          Vue.set(e, "sex", i);
        });
      });
    },
    DynamicList() {
      var that = this;
      var val = localStorage.getItem("id");
      var id = { userId: "265" };
      user.dynamicList(id).then(response => {
        log(response.data, "获取动态信息");
        that.dynamicNumber = response.data.data.total; //总条数
        that.listDataails = response.data.data.list //图文集合
        that.pages = response.data.data.pages
        // var imgAjaxList = that.listDataails
        // that.imgList = that.listDataails
        var arraye = that.listDataails
        // log(arraye,'数组*&*&*&')
        var n = []
        var numberN = []
        // that.imgList = imgAjaxList
            for (let i = 0; i < arraye.length; i++) {
                var e = arraye[i]
                //.userFileVos;
                log(e,'@@@@')
                // n.push(1)
                let numberN = e.userFileVos
                 log(numberN,'图片数组')
                //  n.push(numberN)
                for (let l = 0; l < numberN.length; l++) {
                    var r = numberN[l].imgUrl;
                     n.push(numberN[l])
                    var q = filter.testImg(r);
                    log(q,'改革数据')
                    // n.push(1)
                    Vue.set(numberN[l], "imgUrl", q);
                    var obj = {imgUrl: r}
                    n.push(obj)
                }     
            }
                // that.imgList = n
                //     log(that.imgList,'转换之后的数组####')
                // if (numberN.length == n.length) {
                //     that.imgList = numberN
                //     log(that.imgList,'转换之后的数组####')
                // }
        // imgAjaxList.forEach(e => {
        //     var i = filter.testImg(e.userFileVos);
        //   Vue.set(e, "userFileVos", i);
        // });
                
      });
    },
    FirendList() {
      var that = this;
      var val = localStorage.getItem("id");
      var id = { id: val };
      user.firendList(id).then(response => {
        log(response.data, "获取好友数量");
        // that.dynamicNumber = response.data.data.total
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user_dataails {
  width: 100%;
  height: auto;
  margin-left: 30px;
  margin-top: 200px;
  .air_scool {
    width: 100%;
    height: 300px;
  }
  .user_dataails_top {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid pink;
    border-top: 1px solid pink;
    // background: pink;
    .user_top {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100px;
      .user_top_center {
        display: flex;
        justify-content: center;
        width: 80%;
        align-items: center;
        // background: pink;
      }
      .user_top_message {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-left: 30px;
        background: seagreen;
        .img_yuan {
          img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: seagreen;
          }
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: seagreen;
        }
      }
      .user_top_let {
        width: 80%;
        // background: khaki;
        margin-left: 40px;
        .message_flex {
          width: 100%;
          display: flex;
          font-size: 15px;
          justify-content: space-between;
          // background: sienna;
          .name_flex {
            width: 150px;
            display: flex;
            justify-content: space-between;
          }
          .sex_flex {
            width: 80px;
            display: flex;
            justify-content: space-between;
          }
          .city_flex {
            width: 220px;
            display: flex;
            justify-content: space-between;
          }
          .date_flex {
            width: 200px;
            display: flex;
            justify-content: space-between;
          }
        }
        .message_flex_bottom {
          width: 90%;
          display: flex;
          font-size: 15px;
          margin-top: 10px;
          justify-content: space-between;
          // background: sienna;
          .name_flex {
            width: 150px;
            display: flex;
            justify-content: space-between;
          }
          .city_flex {
            width: 150px;
            display: flex;
            justify-content: space-between;
          }
          .date_flex {
            width: 150px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .user_dataails_bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .dataails_bottom_dynamic {
      width: 50%;
      // background: rgb(133, 71, 81);
      // border: 1px solid palevioletred;
      height: 700px;
      .dynamic_number {
        width: 100%;
        height: 40px;
        text-align: center;
        color: #fff;
        background: rgb(48, 65, 86);
        line-height: 40px;
        font-size: 20px;
      }
      .bottom_dynamic_left {
        width: 100%;
        margin-top: 10px;
        // background: peru;
        height: 700px;
        overflow: hidden;
        border: 1px solid skyblue;
        .paginatt {
          width: 100%;
          display: flex;
          margin-top: 20px;
          justify-content: center;
        }
        > .dynamic_left_scllo {
          // background: seagreen;
          width: 102%;
          height: 600px;
          line-height: 30px;
          // text-align: center;
          overflow-y: scroll;
          .dynamic_left_list {
            margin-top: 20px;
            width: 98%;
            height: auto;
            // border-bottom: 1px solid palevioletred;
            // padding-bottom: 20px;
            // position: relative;
            // border: 1px solid palegreen;
            // background: pink;
            .button_right {
              margin-left: 83%;
              // position: absolute;
              // right: 0px;
              // bottom: 0px;
            }
            .dynamic_left_list_str {
              margin-left: 10px;
              padding-top: 10px;
            }
            .dynamic_left_list_img {
                display: flex;
                flex-direction: row;
                width: 300px;
              margin-top: 20px;
              margin-left: 20px;
              // display: flex;

              img {
                width: 250px;
                //  height: 250px;
              }
            }
          }
        }
      }
    }
    .dataails_bottom_friends {
      width: 40%;
      // background: palegreen;
      height: 700px;
      .bottom_friend_top {
        width: 100%;
        height: 40px;
        text-align: center;
        color: #fff;
        background: rgb(48, 65, 86);
        line-height: 40px;
        font-size: 20px;
      }
      .bottom_friend_right {
        width: 100%;
        margin-top: 10px;
        // background: peru;
        height: 700px;
        overflow: hidden;
        border: 1px solid skyblue;
        .paginatt {
          width: 100%;
          display: flex;
          margin-top: 20px;
          justify-content: center;
        }
        > .friend_right_scllo {
          // background: seagreen;
          width: 102%;
          height: 600px;
          line-height: 30px;
          // text-align: center;
          overflow-y: scroll;
          .friend_right_scllo_center {
            width: 100%;
            display: flex;
            justify-content: center;

            .friend_right_list {
              margin-top: 20px;
              width: 400px;
              height: auto;
              display: flex;
              justify-content: center;
              .friend_right_img_title {
                width: 80%;
                height: auto;
                // background: plum;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .header_many_user_many {
                  margin-top: 10px;
                  height: 100px;
                  width: 100px;
                  // background: paleturquoise;
                  //  margin-right: 200px;
                  .header_many_user_pink {
                    display: flex;
                    justify-content: center;
                    .header_many_user_img {
                      width: 50px;
                      height: 50px;
                      // background: pink;
                      border-radius: 50%;
                      img {
                        width: 50px;
                        height: 50px;
                        // background: pink;
                        border-radius: 50%;
                      }
                    }
                  }
                  .header_many_user_name {
                    color: black;
                    font-size: 16px;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
