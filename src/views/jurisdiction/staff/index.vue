<template>
    <div class="role_manage">
        <div class="role_new">
            <div class="role_new_user" @click="dialogVisible = true">
                  <el-button type="primary" plain>新增员工</el-button>
            </div>
        </div>
        <div>
            <div>
                <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="phone"
        label="账号"
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="employeeStatus"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="roleValue"
        label="所属角色">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="录用时间">
      </el-table-column>
      
      <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="editStaff(scope.$index)"
          type="text"
          size="small">
          编辑
        </el-button>
                <el-button
          @click.native.prevent="deleteStaffX(scope.$index)"
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
  <el-dialog
  title="新增员工"
  :visible.sync="dialogVisible"
  top="30vh"
  width="30%"
  :center ="true"
  :before-close="handleClose">
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">账号</div>
  <div class="input_tag">
    <el-input v-model="staffMany.phone" placeholder="请输入账号"></el-input>
  </div>
  </div>
  </div>
    <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">密码</div>
  <div class="input_tag">
    <el-input v-model="staffMany.passWord" placeholder="请输入密码" type="password"></el-input>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">姓名</div>
  <div class="input_tag">
    <el-input v-model="staffMany.userName" placeholder="请输入姓名"></el-input>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_state">
      <div class="title_tag">状态</div>
  <div class="input_tag">
 <el-select v-model="staffMany.status" placeholder="请选择">
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
      <div class="flex_act">
      <div class="title_tag">角色</div>
  <div class="input_tag">
    <el-select v-model="staffMany.roleKey" placeholder="请输入角色">
    <el-option
      v-for="item in optionss"
      :key="item.id"
      :label="item.roleValue"
      :value="item.id">
    </el-option>
  </el-select>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">时间</div>
  <div class="input_tag">
    <el-date-picker
        v-model="staffMany.createTime"
        type="date"
        placeholder="选择日期">
        </el-date-picker>
  </div>
  </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="newStaff">确 定</el-button>
  </span>
</el-dialog>
 <el-dialog
  title="编辑员工"
  :visible.sync="editStaffes"
  top="30vh"
  width="30%"
  :center ="true"
  :before-close="handleClose">
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">账号</div>
  <div class="input_tag">
    <el-input v-model="editStaffNew.phone" placeholder="请输入账号"></el-input>
  </div>
  </div>
  </div>
    <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">密码</div>
  <div class="input_tag">
    <el-input v-model="editStaffNew.password" placeholder="请输入密码" type="password"></el-input>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">姓名</div>
  <div class="input_tag">
    <el-input v-model="editStaffNew.userName" placeholder="请输入姓名"></el-input>
  </div>
  </div>
  </div>
  <div class="propr_flex_center">
      <div class="flex_state">
      <div class="title_tag">状态</div>
  <div class="input_tag">
 <el-select v-model="editStaffNew.employeeStatus" placeholder="请选择">
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
      <div class="flex_act">
      <div class="title_tag">角色</div>
  <div class="input_tag">
    <el-select v-model="editStaffNew.roleValue" placeholder="请输入角色">
    <el-option
      v-for="item in optionss"
      :key="item.id"
      :label="item.roleValue"
      :value="item.roleValue">
    </el-option>
  </el-select>
  </div>
  </div>
  </div>
  <!-- <div class="propr_flex_center">
      <div class="flex_act">
      <div class="title_tag">时间</div>
  <div class="input_tag">
    <el-date-picker
        v-model="editStaffNew.createTime"
        type="date"
        placeholder="选择日期">
        </el-date-picker>
  </div>
  </div>
  </div> -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelEdit">取 消</el-button>
    <el-button type="primary" @click="editStaffButton">确 定</el-button>
  </span>
</el-dialog>
<div class="air_csse"></div>
    </div>
</template>

<script>
import * as staffMany from "@/api/staff";
import { RoleList } from "@/api/role";
import * as staffFilter from "@/utils/filter";
import Vue from "vue";
const log = console.log.bind(console);
export default {
  data() {
    return {
      currentPage4: "2",
      tableData: [],
      editStaffes: false,
      //添加员工
      staffMany: {
        phone: "", //账号
        userName: "", //姓名
        roleKey: "", // 角色名
        createTime: null, // 录用时间
        passWord: "", // 密码
        status: "" //状态
      },
      //编辑员工
      editStaffNew: {
        phone: "", //账号
        userName: "", //姓名
        roleValue: "", // 角色名
        passWord: "", // 密码
        employeeStatus: "", //状态
        id: "" //ID
      },
      optionss: [],
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
      dialogVisible: false
    };
  },
  created: function() {
    this.roleList();
    this.staffList();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 角色列表
    roleList() {
      let that = this;
      RoleList().then(response => {
        log(response.data, "角色数据");
        that.optionss = response.data.data.list;
      });
    },
    //添加员工
    newStaff() {
      //&& b.passWord && b.createTime  && b.roleKey && b.userName
      let that = this;
      let b = that.staffMany;
      let a = b.createTime;
      log("🏊", a);
      if (a == null) {
        a = "";
      } else if (a != null) {
        var n = staffFilter.dateFilterex(a);
        // load.push(n);
        that.staffMany.createTime = n;
        log(that.staffMany.createTime, "提交的信息");
      }
      if (
        b.phone &&
        b.passWord &&
        a &&
        b.roleKey &&
        b.userName &&
        b.status !== ""
      ) {
        log("盼空");
        staffMany.newStaff(that.staffMany).then(response => {
          log(response.data, "添加成功");
          that.staffList();
        var p = Object.keys(that.staffMany)
          p.forEach(e => {
              that.staffMany[e] = ''
          });
          // if (response.data.rulest) {

          // }
          that.dialogVisible = false;
        });
      } else {
        that.staffMany.createTime = null;
        log("失败");
        that.$notify.error({
          title: "错误",
          message: "请填写完整信息",
          position: "bottom-right"
        });
      }
      //   if (a == null) {
      //     a = "";
      //   }

      //   else if (a != null) {
      //     var n = staffFilter.dateFilterex(a);
      //     // load.push(n);
      //     that.staffMany.createTime = n;
      //     var date = that.staffMany.createTime;
      //     log(date, "提交的信息");
      //   }
      //   staffMany.newStaff(that.staffMany)
      //   .then(response => {
      //     log(response.data, "添加成功");
      //     that.staffList()
      //   });
    },
    //员工列表
    staffList() {
      let that = this;
      staffMany.staffList().then(response => {
        log(response.data, "员工列表");
        let array = response.data.data.list;
        for (let i = 0; i < array.length; i++) {
          const e = array[i].employeeStatus;
          let n = staffFilter.roleState(e);
          Vue.set(array[i], "employeeStatus", n);
        }
        that.tableData = array;
      });
    },
    //编辑员工
    editStaff(index) {
      let that = this;
      log(index, that.tableData[index], "下标");
      that.editStaffes = true;
      that.editStaffNew = that.tableData[index];
      log(that.editStaffNew, "@@@");
    },
    //提交编辑员工
    editStaffButton() {
      let that = this;
      let staffEdit = that.editStaffNew;
      log(staffEdit, "提交数据");
      if (staffEdit.employeeStatus == "正常") {
        staffEdit.employeeStatus = 0;
      } else if (staffEdit.employeeStatus == "禁用") {
        staffEdit.employeeStatus = 1;
      }
      if (
        staffEdit.phone &&
        staffEdit.password &&
        staffEdit.userName &&
        staffEdit.roleValue !== ""
      ) {
        staffMany.editStaffX(staffEdit).then(response => {
          log("编辑成功", response.data);
          that.staffList();
          that.editStaffes = false;
        });
      } else {
        log("失败");
        that.$notify.error({
          title: "错误",
          message: "请填写完整信息",
          position: "bottom-right"
        });
      }
    },
    //取消编辑
    cancelEdit() {
      let that = this;
      that.editStaffes = false;
      that.staffList();
    },
    //删除员工
    deleteStaffX(index) {
      let that = this;
      let a = that.tableData[index].id;
      let o = {
        id: a
      };
      staffMany.deleteStaffX(o).then(response => {
        log("返回", response.data);
        that.staffList();
      });
      log(index, "下标");
    }
  }
};
</script>

<style lang="scss" scoped>
.role_manage {
  width: 100%;
  height: auto;
  margin-top: 200px;
  // background: pink;
  .propr_flex_center {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
        .el-select {
          width: 330px;
        }
        .el-date-editor.el-input {
          width: 330px;
        }
      }
    }
  }
  .propr_flex_center {
    //状态
    .flex_state {
      //  margin-top: 20px;
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
        .el-date-editor.el-input {
          width: 330px;
        }
      }
    }
  }
  //   .propr_flex_center {
  //     //描述
  //     .flex_describe {
  //       margin-top: 20px;
  //       width: 400px;
  //       display: flex;
  //       justify-content: space-between;
  //       .title_tag {
  //         // margin-right: 5px;
  //         margin-top: 10px;
  //         font-size: 17px;
  //       }
  //       .input_tag {
  //         // margin-left: 20px;
  //         width: 330px;
  //         .el-date-editor.el-input {
  //             width: 330px;
  //         }
  //       }

  //     }
  //   }
  .air_csse {
    width: 100%;
    height: 300px;
  }
  .flex_act {
    width: 265px;
    display: flex;
    justify-content: space-between;
    .title_tag {
      margin-top: 10px;
      font-size: 17px;
    }
    .input_tag {
      width: 200px;
    }
  }
  //状态
  //  .flex_state {
  //    margin-top: 20px;
  //     width: 260px;
  //     display: flex;
  //     justify-content: space-between;
  //     .title_tag {
  //       // margin-right: 5px;
  //       margin-top: 10px;
  //       font-size: 17px;
  //     }
  // .input_tag {
  //   input {
  //     width: 210px;
  //   }
  //   width: 210px;
  //   background: pink;
  // }
  // }
  //描述
  // .flex_describe {
  //  margin-top: 20px;
  //   width: 265px;
  //   display: flex;
  //   justify-content: space-between;
  //   .title_tag {
  //     // margin-right: 5px;
  //     margin-top: 10px;
  //     font-size: 17px;
  //   }
  //   .input_tag {
  //     // margin-left: 20px;
  //     width: 200px;
  //   }
  // }
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
