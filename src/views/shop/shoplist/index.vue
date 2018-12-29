<<<<<<< HEAD
<template>
  <div class="art_list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="artid" label="ID" min-width="10%"></el-table-column>
      <el-table-column prop="arttitle" label="标题" min-width="10%"></el-table-column>
      <el-table-column prop="arttime" label="提交时间" min-width="12%"></el-table-column>
      <el-table-column prop="artstatus" label="审核状态" min-width="12%"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="15%">
      <template slot-scope="scope">
      <router-link :to="'/artdetails'">
        <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
      </router-link>
        <!-- <el-button type="text" size="small" @click="handleClick(scope.$index,scope.row)">编辑</el-button> -->
        <el-button type="text" size="small" @click="handleClickView(scope.row)">预览</el-button>
        <!-- <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button> -->
      </template>
      </el-table-column>
    </el-table>
<!-- 编辑信息框 -->
    <el-dialog :visible.sync="dialogFormVisible" class="dialog"
			top="30vh"
			width="30%"
			:before-close="handleClose">
      <el-form :model="articlee">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input :disabled='view' v-model="articlee.artid" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input :disabled="view"  v-model="articlee.arttitle" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="标题图" :label-width="formLabelWidth">
          <!-- <el-input  :disabled="view" v-model="articlee.artpic" placeholder="请输入内容"></el-input> -->
					<!-- <img :src="articlee.artpic" alt=""> -->
					<template>
						<el-upload  :disabled="view"
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="articlee.artpic" :src="articlee.artpic" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</template>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input  :disabled="view" v-model="articlee.arttime" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-input  :disabled="view" v-model="articlee.artpro" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input  :disabled="view" v-model="articlee.artcity" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主题" :label-width="formLabelWidth">
          <el-input  :disabled="view" v-model="articlee.artthe" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth" placeholder="请选择">
          <el-select  :disabled="view" v-model="articlee.artshow" >
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
        </el-form-item>
       <el-form-item v-show='view' label="审核状态" :label-width="formLabelWidth" placeholder="请选择">
          <el-select :disabled="view" v-model="articlee.artstatus" >
					</el-select>
        </el-form-item>
      </el-form>
      <div v-show='edit' slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editArticle">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { provinceAndCityData } from "element-china-area-data";

    export default {
      name: "artlist",
      data() {
        return {
          tableData: [{
            artid:'1',
						arttitle:'11',
						artpic:'../../../assets/input/Date.png',
						arttime:'111',
						artpro:'1111',
						artcity:'11111',
						artthe:'111',
						artshow:'是',
						artstatus:'1111'
          }, {
            artid:'2',
						arttitle:'11',
						artpic:'../../../assets/input/Date.png',
						arttime:'111',
						artpro:'1111',
						artcity:'11111',
						artthe:'111',
						artshow:'否',
						artstatus:'1111'
          }, {
            artid:'3',
						arttitle:'11',
						artpic:'../../assets/input/Date.png',
						arttime:'111',
						artpro:'1111',
						artcity:'11111',
						artthe:'111',
						artshow:'是',
						artstatus:'1111'
          }],
					options: [
						{
							value: 0,
							label: "是"
						},
						{
							value: 1,
							label: "否"
						}
					],
					imageUrl: '',
					edit:true,
					view:false,
          dialogFormVisible: false,
          form: {
						//新建
            artid: '',
            arttitle: '',
            artpic: '',
            arttime: '',
            artpro: '',
            artcity: '',
            artthe: '',
            artshow: '',
						artstatus:''
          },
					articlee:{
						//编辑
            artid: '',
            arttitle: '',
            artpic: '',
            arttime: '',
            artpro: '',
            artcity: '',
            artthe: '',
            artshow: ''
          },
					num:0,
          formLabelWidth: '120px'
        }
      },
      methods:{
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
					var that=this;
					that.edit = true;
					that.view = false;
			}, 
				handleClick(index,row) {
         console.log(row);
				var that = this;
				// that.num = index;
				that.articlee = row;
				console.log(that.articlee);
				that.dialogFormVisible = true;
      },
			 handleClickView(row) {
				 var that = this;
				 that.articlee = row;
				 console.log(that.articlee);
				 that.dialogFormVisible = true;
				 that.edit = false;
				 that.view = true;
				console.log(row);
			    },
			editArticle(){
				//编辑文章
					var that = this;
					var articlee = that.articlee;
					if (articlee.artid && articlee.arttitle && articlee.artpic && articlee.arttime 
					&& articlee.artpro && articlee.artcity && articlee.artthe!= "") {
						console.log("嘤嘤嘤");
						if (articlee.artshow == "0") {
							articlee.artshow = '是';
						} else if (articlee.artshow == "1") {
							articlee.artshow = '否';
							console.log("123213");
							console.log(that.dialogFormVisible);
							
						}
      }
      that.tableData.artpic=articlee.artpic;
      console.log(that.tableData.artpic);
      
			that.dialogFormVisible = false;
  },
	 handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
				this.articlee.artpic = this.imageUrl;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
			deleteRow(index, rows) {
        rows.splice(index, 1);
      }
	},
}

</script>

<style lang="scss" scoped>
.art_list{
  margin-top: 220px;
  width: 100%;
  height: auto;
  background: yellow;
  .dialog{
    margin-top: 50px;
  }
	imgp{
		width:200px;
		height: 200px;
	}

}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
=======
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
    
>>>>>>> e7dfd5fbfee084b494385b4f38e04919ef8882d3
