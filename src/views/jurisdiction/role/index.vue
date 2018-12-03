<template>
    <div class="role_manage">
        <div class="role_new">
            <div class="role_new_user" @click="dialogVisible = true">
                <el-button type="primary" plain>新增角色</el-button>
            </div>
        </div>
        <div class="tab_statc">
            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="编号" type="index" width="180">
                    </el-table-column>
                    <el-table-column prop="roleValue" label="角色">
                    </el-table-column>
                    <el-table-column prop="roleStatus" label="状态">
                    </el-table-column>
                    <el-table-column prop="descption" label="描述">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.$index,scope.row)"
                          type="text"
                          size="small">
                          编辑
                        </el-button>
                                <el-button
                          @click.native.prevent="editAuthority(scope.$index)"
                          type="text"
                          size="small">
                          编辑权限
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
        <!-- 分页器 -->
            <div class="paging">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="strNo"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="pages">
    </el-pagination>
    </div>
<!-- 新增角色 -->
<el-dialog
  title="新增角色"
  :visible.sync="dialogVisible"
  top="30vh"
  width="30%"
  :center=titeleC
  :before-close="handleClose">
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">角色</div>
  <div class="input_tag">
    <el-input v-model="roles.roleValue" placeholder="请输入内容"></el-input>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_state">
      <div class="title_tag">状态</div>
  <div class="input_tag">
 <el-select v-model="roles.status" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>  </div>
  </div>
  </div>
    <div class="propr_flex_center">
        <div class="flex_describe">
      <div class="title_tag">描述</div>
  <div class="input_tag">
 <el-input
  type="textarea"
  :rows="4"
  placeholder="请输入内容"
  v-model="roles.descption">
</el-input>
   </div>
  </div>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="newUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 编辑角色 -->
<el-dialog
  title="编辑角色"
  :visible.sync="editDialog"
  top="30vh"
  width="30%"
  :center=titeleC
  :before-close="handleClose">
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">角色</div>
  <div class="input_tag">
    <el-input v-model="roless.roleValue" placeholder="请输入内容"></el-input>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_state">
      <div class="title_tag">状态</div>
  <div class="input_tag">
 <el-select v-model="roless.roleStatus" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>  </div>
  </div>
  </div>
    <div class="propr_flex_center">
        <div class="flex_describe">
      <div class="title_tag">描述</div>
  <div class="input_tag">
 <el-input
  type="descption"
  :rows="4"
  placeholder="请输入内容"
  v-model="roless.descption">
</el-input>
   </div>
  </div>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialog = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
<div class="air_csse"></div>
    </div>
</template>

<script>
const log = console.log.bind(console);
import * as roleMany from "@/api/role";
import * as roleFilter from "@/utils/filter";
import Vue from "vue";
export default {
  data() {
    return {
      titeleC: true,
      options: [
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      value: "",
      input: "",
      textarea: "",
      strNo: 1,
      pages: 100,
      roles: {
        // 新建
        status: "", // 状态
        roleValue: "", // 角色
        descption: "" //描述
      },
      roless: {
        // 编辑
        roleStatus: "", // 状态
        roleValue: "", // 角色
        descption: "" //描述
      },
      num: 0,
      dialogVisible: false,
      editDialog: false,
      edit: false,
      tableData: []
    };
  },
  created: function() {
    this.RoleList();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
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
      that.RoleList();
      log(val);
    },
    //增加角色
    newUser() {
      var that = this;
      var roleName = that.roles;
      log(roleName, "创建角色");
      if (
        roleName.descption &&
        roleName.roleValue &&
        roleName.status !== ""
      ) {
        roleMany.newRole(roleName).then(response => {
          log(response.data, "返回数据");
          if (response.data.result == "0") {
            that.RoleList();
            Object.keys(roleName).forEach(e => {
              roleName[e] = "";
            });
            that.dialogVisible = false;
          }
        });
        log("成功");
      } else {
        log("失败");
        that.$notify.error({
          title: "错误",
          message: "请填写完整信息",
          position: "bottom-right"
        });
      }

      //     that.tableData.unshift(obj);
      //     that.dialogVisible = false;

      //     // that.input = ''
      //     // that.value = ''
      //     // that.textarea = ''
      //   } else {
      //     log("失败");
      //     that.$notify.error({
      //       title: "错误",
      //       message: "请填写完整信息",
      //       position: "bottom-right"
      //     });
      //   }
    },
    // 角色列表
    RoleList() {
      var that = this;
      var obj = {
        strNo: that.strNo
      };
      roleMany.RoleList(obj).then(response => {
        log(response.data, "数据列表");
        that.pages = response.data.data.total;
        var roleNewList = response.data.data.list;
        // roleNewList.forEach(e => {
        //      var key = roleFilter.roleState(e.roleStatus)
        //     Vue.set(e,'roleStatus', key)
        // });
        for (let i = 0; i < roleNewList.length; i++) {
          var e = roleNewList[i];
          var key = roleFilter.roleState(e.roleStatus);
          log(key, "洗数据&&*&*&**&");
          Vue.set(e, "roleStatus", key);
        }
        that.tableData = roleNewList;
      });
    },
    //找到当前角色
    handleClick(index, row) {
      var that = this;
      that.num = index;
      //   if (row.roleStatus == "正常") {
      //     row.roleStatus = 0;
      //   } else if (row.roleStatus == "禁用") {
      //     row.roleStatus = 1;
      //   }
      log(that.num, row, "🐔");
      that.roless = row;
      log(that.roless, "更新");
      //   var obj = row;
      //   // var that = this
      that.editDialog = true;
      //   // console.log(obj, '信息');
      //   that.input = obj.date;
      //   that.value = obj.name;
      //   that.textarea = obj.address;
      // if (that.edit) {
      //         obj.date = that.input
      //         obj.name = that.value
      //         obj.address = that.textarea
      // }
      // console.log(obj.date, '空吗');

      // if (that.input && that.value && that.textarea != '') {
      //     console.log('有没有数据');

      //         that.edit = true

      // }
    },
    //编辑角色
    editUser() {
      var that = this;
      log(that.roless, "编辑数据更新");
      var roless = that.roless;
      log(roless, "编辑传送的数据");
      if (roless.descption && roless.roleValue != "") {
        log("成功");
        if (roless.roleStatus == "正常") {
          roless.roleStatus = 0;
        } else if (roless.roleStatus == "禁用") {
          roless.roleStatus = 1;
        }
        roleMany.editRole(that.roless).then(response => {
          log(response.data, "更新成功");
          if (response.data.result == 0) {
            that.RoleList();
            that.editDialog = false;
          }
        });
        // var obj = new Object();
        // obj.date = that.input;
        // obj.name = that.value;
        // obj.address = that.textarea;
        // var editNum = that.tableData;
        // // editNum = obj
        // this.$set(editNum, that.num, obj);
        // log(editNum[that.num], obj, "是什么");
        // that.edit = true
        // if (that.edit) {
        //     that.handleClick(row)
        //     that.editDialog = false
        // } else {
        //     that.tableData.unshift(obj)
        //     that.dialogVisible = false
        // }
        // that.input = ''
        // that.value = ''
        // that.textarea = ''
      } else {
        log("失败");
        that.$notify.error({
          title: "错误",
          message: "请填写完整信息",
          position: "bottom-right"
        });
      }
    },
    //删除角色
    deleteRow(index) {
      var that = this;
      var deletNum = that.tableData;
      let num = deletNum[index].id;
      let n = {
        id: num
      };
      roleMany.deletRole(n).then(response => {
        log(response.data, "删除成功");
        if (response.data.result == 0) {
          that.RoleList();
        }
      });
    },
    //编辑权限
    editAuthority(index) {
      log(index, "权限");
    }
  }
};
</script>

<style lang="scss" scoped>
.role_manage {
  width: 100%;
  height: auto;
  margin-top: 200px;
  .air_csse {
    width: 100%;
    height: 300px;
  }
  .tab_statc {
    margin-left: 20px;
  }
  //弹窗
  //角色
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
  }
  //状态
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
  .role_new {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .role_new_user {
      margin-top: 20px;
      margin-right: 20px;
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
