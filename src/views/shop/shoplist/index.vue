<template>
  <div class="art_list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="artid" label="ID" min-width="10%"></el-table-column>
      <el-table-column prop="arttitle" label="标题" min-width="10%"></el-table-column>
      <el-table-column label="标题图" min-width="12%">
	      	<!-- <img :src="" alt="" class="imgp" > -->
                   <template slot-scope="scope">
              <img :src="scope.row.artpic" width="40" height="40" alt="yyy" >
         </template>
				</el-table-column>
      <el-table-column prop="arttime" label="创建时间" min-width="12%"></el-table-column>
      <el-table-column prop="artpro" label="省份" min-width="12%"></el-table-column>
      <el-table-column prop="artcity" label="城市" min-width="12%"></el-table-column>
      <el-table-column prop="artthe" label="主题" min-width="12%"></el-table-column>
      <el-table-column prop="artshow" label="是否显示" min-width="12%"></el-table-column>
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
