<template>
 <div class="active_list">
   <div class="act_table">
      <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
          type="selection"
          min-width="10%">
          </el-table-column>
          <el-table-column
          label="日期"
          min-width="20%">
          <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
          prop="name"
          label="姓名"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="address"
          label="地址"
          min-width="10%"
          show-overflow-tooltip>
          </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
   </div>
 </div>
</template>

<script>
  
  export default {
    name:"active",
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }

</script>

<style scoped lang="scss">
.active_list{
  margin-top: 200px;
  // margin-left: 
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .act_table{
    width: 1200px;
    margin-left: 50px;
  }
}
</style>
