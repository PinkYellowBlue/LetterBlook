    <template>
     <div class="shop_list">
         <div class="search">
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="请输入搜索内容（商家名称或审核状态）"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
            <!-- <el-select v-model="value" placeholder="请选择" @blur="search">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <!-- <el-autocomplete
            placeholder="请输入商家描述"
            prefix-icon="el-icon-search"
            v-model="input21" style="width:600px">
            </el-autocomplete> -->
         </div>
         <div>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="店名"
                prop="name">
                </el-table-column>
                <!-- <el-table-column
                label="用户"
                prop="name">
                </el-table-column> -->
                <el-table-column
                label="介绍"
                prop="remark">
                </el-table-column>
                <el-table-column
                label="推荐等级"
                prop="starRating">
                </el-table-column>
                <el-table-column
                label="状态"
                prop="state">
                </el-table-column>
                <el-table-column
                label="提交时间"
                prop="createTime">
                </el-table-column>
                <el-table-column
                align="right" width="180px" label="操作"> 
                <template slot-scope="scope">
                    <router-link :to="'/shopdetails/'+scope.row.id">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-view">审批</el-button>
                    </router-link>
                    <!-- <el-button
                    size="mini"
                    type="danger" icon="el-icon-remove-outline"
                    @click="handleDelete(scope.$index, scope.row)">封停</el-button> -->
                </template>
                </el-table-column>
            </el-table>
         </div>
             <!-- 分页器 -->
    <div class="paging">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="strNo"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pages"
      ></el-pagination>
    </div>
     </div>
    </template>
    
    <script>
   import * as shopMany from "@/api/shop";
    import * as shopFilter from "@/utils/filter";   
   import Vue from "vue";
    export default {
    name:"shoplist",
    created: function() {
      this.shopList();
      this.init();
    },
    data() {
      return {
        tableData: [],
        tableData1:[],
        arr:[],
        search: '',
        strNo:1,
        pages:10,
        pageSize:10,
        input21:"",
        state2:"",
        options: [{
          value: '0',
          label: '申请'
        }, {
          value: '1',
          label: '驳回'
        }, {
          value: '2',
          label: '上架'
        }, {
          value: '3',
          label: '封停'
        }],
        value: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
       console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        var that = this;
        that.strNo = val;
        console.log(val);
        that.shopList();
      },
      init(){
        var that = this;
        var obj = {
          strNo: 1,
          pageSize: 10000
        };
          shopMany.shopList(obj).then(response => {
          // console.log(response.data, "数据列表1111111");
          that.pages = response.data.data.total;
          // that.pageSize = response.data.data.rows;
          var shopList1 = response.data.data.list;
          for (let i = 0; i < shopList1.length; i++) {
            var e = shopList1[i];
            var key = shopFilter.handleShop(e.state);
            // console.log(key, "洗数据洗数据洗数据");
            Vue.set(e, "state", key);
            var time = shopFilter.dateFilterShop(e.createTime);
                      Vue.set(e, "createTime", time);
          }
          that.tableData1 = shopList1;
        });
      },
      // 列表
      shopList() {
        var that = this;
        var obj = {
          strNo: that.strNo,
          pageSize: that.pageSize
        };
        shopMany.shopList(obj).then(response => {
          console.log(response.data, "数据列表");
          that.pages = response.data.data.total;
          // that.pageSize = response.data.data.rows;
          var shopList = response.data.data.list;
          for (let i = 0; i < shopList.length; i++) {
            var e = shopList[i];
            var key = shopFilter.handleShop(e.state);
            console.log(key, "洗数据洗数据洗数据");
            Vue.set(e, "state", key);
            var time = shopFilter.dateFilterShop(e.createTime);
                      Vue.set(e, "createTime", time);

          }
          that.tableData = shopList;
        });
      },
      querySearch(queryString, cb) {
        var that = this;
        var restaurants = that.tableData1;
        
        // let value = that.value
        if( queryString === ""){
            that.shopList();
        }else {
        console.log(queryString,restaurants,"111222333");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // var results1 = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        console.log(results,"$$$$!!!!");
        that.tableData =  results;

        cb(results);
        }
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || restaurant.state.toLowerCase().indexOf(queryString.toLowerCase()) ===0 );
        };
      },
      handleSelect(item) {
        console.log(item);
      },

    }
  }
    </script>
    
    <style scoped lang="scss">
        .shop_list{
            margin-top: 200px;
            width: 100%;
            height: auto;
            // background: green;
            display: flex;
            justify-content: center;
            flex-direction: column;
            .search{
                width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-around;
                .el-autocomplete{
                    width: 400px;
                    margin-top: 20px;
                    margin-bottom: 50px;
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
    