<template>
    <div class="role_manage">
        <div class="role_new">
            <div class="role_new_user_title">主题列表</div>
            <div class="role_new_user" @click="dialogVisible = true">
                  <el-button type="primary" plain>新增主题</el-button>
            </div>
        </div>
        <div>
            <div>
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="themeName"
        label="主题"
        >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button
          @ @click="handleClick(scope.$index,scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
                <el-button
         @click.native.prevent="deleteRow(scope.$index)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
            </div>
        </div>
    <!-- <div class="paging">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div> -->
    <!-- 新增主题 -->
    <el-dialog
  title="新增主题"
  :visible.sync="dialogVisible"
  :center="true"
  top="30vh"
  width="30%"
  :before-close="handleClose">
  <div class="new_flex">
  <div class="flex_theme">
    <div class="flex_title">新增主题</div>
    <div class="flex_input">
      <el-input v-model="theme.themeName" placeholder="请输入内容"></el-input>
    </div>
  </div>
  </div>
  <div class="new_flex">
  <div class="flex_date">
    <div class="date_twe">添加时间</div>
    <div class="date_picker">
    <el-date-picker
      v-model="theme.createTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </div>
  </div>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="newTheme">确 定</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>

  </span>
</el-dialog>
<!-- 编辑主题 -->
    <el-dialog
  title="修改主题"
  :visible.sync="editDialog"
  :center="true"
  top="30vh"
  width="30%"
  :before-close="handleClose">
  <div class="new_flex">
  <div class="flex_theme">
    <div class="flex_title">主题内容</div>
    <div class="flex_input">
      <el-input v-model="thememo.themeName" placeholder="请输入内容"></el-input>
    </div>
  </div>
  </div>
  <div class="new_flex">
  <div class="flex_date">
    <div class="date_twe">创建时间</div>
    <div class="date_picker">
    <el-date-picker
      v-model="thememo.createTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </div>
  </div>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="editTheme">确 定</el-button>
    <el-button @click="editDialog = false">取 消</el-button>

  </span>
</el-dialog> 
    </div>
</template>

<script>
const log = console.log.bind(console);
import * as themeMany from "@/api/theme";
import * as themeFilter from "@/utils/filter";
import Vue from "vue";
    export default {
          data() {
        return {
          num: 0,
          strNo: 1,
          pages: 1, 
          pageSize:100,
          editDialog:false,
          dialogVisible: false,           
          tableData: [],
          theme: {
               // 新建 
            themeName:'',
            createTime:'',
   
        },
        thememo: {
              // 新建 
          themeName:'',
          createTime:'',
  
      },        
        }
      },
    created: function() {
      this.ThemeList();
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var that = this;
      that.strNo = val;
      that.ThemeList();
      log(val);
    },
        // 增加主题
    newTheme() {
      var that = this;
      var theme = that.theme;
      // log(theme.createTime, "创建主题");
      var key = themeFilter.dateFilterex(theme.createTime)
      theme.createTime = key
      // Vue.set(theme,'createTime', key)
      // log(theme.createTime,'添加时间');
      if (theme.themeName && theme.createTime!== "") {
        themeMany.newTheme(theme)
        .then(response => {
          log(response.data, "返回数据");
          if (response.data.result == "0") {
            that.ThemeList();
            // log(qwe);
            Object.keys(theme).forEach(e => {
              theme[e] = "";
            });

          }
            that.dialogVisible = false;
        });
        log("成功");
      } else {
        log("失败");
        that.$notify.error({
          title: "错误",
          message: "请保持信息完整",
          position: "bottom-right"
        });
      }
    },
        // 主题列表
    ThemeList() {
      var that = this;
      var obj = {
        strNo: that.strNo,
        pageSize:that.pageSize
      };
      themeMany.ThemeList(obj).then(response => {
        // log(response.data, "数据列表");
        that.pages = response.data.data.total;
        var themeNewList = response.data.data.list;
        // log(response.data.data,'返回的主题列表####')
        for (let i = 0; i < themeNewList.length; i++) {
          var e = themeNewList[i];
          var key=e.createTime.substr(0,10);
          // log(key,'****');
          // var key = themeFilter.dateFilterex(e.createTime);
          // log(key, "洗数据ing");
          Vue.set(e,'createTime', key)
        }
        that.tableData = themeNewList;
      });
    },
     handleClick(index, row) {
      var that = this;
      that.num = index;
      log(that.num, row, "嘤嘤嘤");
      that.thememo = row;
      log(that.thememo, "更新");
      that.editDialog = true;
    },
    //编辑主题
    editTheme() {
      var that = this;
      log(that.thememo, "编辑数据更新");
      var thememo = that.thememo;
      var key = themeFilter.dateFilterex(thememo.createTime)
      thememo.createTime = key;
      log(thememo, "编辑传送的数据");
      if (thememo.themeName && thememo.createTime != "") {
        log("成功");
        themeMany.editTheme(that.thememo ).then(response => {
          log(response.data, "更新成功");
          if (response.data.result == 0) {
            that.ThemeList();

          }
          that.editDialog = false;
        });
      } else {
        log("失败");
        that.$notify.error({
          title: "错误",
          message: "请填写完整信息",
          position: "bottom-right"
        });
      };
      // if (thememo.themeName == theme.themeName && thememo.createTime != "") {
      //   log("成功");
      //   themeMany.editTheme(that.thememo ).then(response => {
      //     log(response.data, "更新成功");
      //     if (response.data.result == 0) {
      //       that.ThemeList();

      //     }
      //     that.editDialog = false;
      //   });
      // } else {
      //   log("失败");
      //   that.$notify.error({
      //     title: "错误",
      //     message: "请填写完整信息",
      //     position: "bottom-right"
      //   });
      // };
    },
        //删除角色
    deleteRow(index) {
      var that = this;
      var deletNum = that.tableData;
      let num = deletNum[index].id;
      let n = {
        id: num
      };
      themeMany.deletTheme(n).then(response => {
        log(response.data, "删除成功");
        if (response.data.result == 0) {
          that.ThemeList();
        }
      });
    },
    }
    }
</script>

<style lang="scss" scoped>
    .role_manage {
      margin-top: 200px;
        width: 100%;
        height: auto;
        .new_flex {
          display: flex;
          justify-content: center;
               //弹窗主题
        .flex_theme {
          font-size: 14px;
          width: 400px;
          display: flex;
          justify-content: space-between;
          .flex_title {
            font-size: 14px;
            margin-top: 12px;
          }
          .flex_input {
              .el-input {
                width: 300px;
              }
          }
        }
        //弹窗时间
        .flex_date {

          margin-top: 20px;
          width: 400px;
          display: flex;
          justify-content: space-between;
          .date_twe {
              font-size: 14px;
              margin-top: 12px;
          }
          .date_picker {
            // background: pink;
            width: 300px;
              .el-input {
                width: 300px;
                
              }
          }
        }
        }
       
        .role_new {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .role_new_user {
                margin-top: 20px;
                margin-right: 20px;
            }
            .role_new_user_title {
                margin-top: 20px;
                margin-right: 20px;
                font-size: 20px;
            }
        }
        .paging {
        width: 98%;
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
</style>
