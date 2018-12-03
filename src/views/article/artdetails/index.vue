<template>
	<div class="art_details">
			<div class="citypro">
				<img src="../../../assets/input/City.png" alt="" width="40px" height="40px">
				<provincial-cities></provincial-cities>
			</div>
			<div class="art_ti">
				<div><el-input v-model="input" placeholder="请输入标题" style="width: 700px;margin:15px 0"></el-input></div>
				<!-- <el-input v-model="input" placeholder="请输入内容" style="width: 700px;margin:10px 260px;"></el-input> -->
					<div><el-col >
						<el-autocomplete
							style="width: 700px;"
							class="inline-input"
							v-model="state1"
							:fetch-suggestions="querySearch"
							placeholder="请选择主题"
							@select="handleSelect"
						></el-autocomplete>
					</el-col></div>
			</div>
					<div class="midtwo">
						<div class="read">阅读量起始值<el-input v-model="input" placeholder="请输入起始值" style="width: 150px;margin-left: 20px;"></el-input></div>	
						<div class="ifshow">是否显示<el-select style="width: 100px;margin-left: 20px;"	 v-model="isshow">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					</div>
						<div class="upload">
							添加标题图<el-upload  
							style="width: 100px;height: 100px; margin-left: 20px;"	
								class="avatar-uploader"
								action="https://jsonplaceholder.typicode.com/posts/"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</div>

			</div>
			<div class="art_edit">
			<!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" :disabled="editorDisabled"></ckeditor>	 -->
				<!-- <div class="pributton">	<el-button @click="emptyEditor" type="primary">确定</el-button>
					<el-button @click="reEditor" type="primary">修改</el-button></div>	 -->
					<tinymce></tinymce>
			</div>
	</div>
</template>

<script>
	import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
	 import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
	 import Tinymce from '@/components/Tinymce'
  export default {
		name: "artdetails",
		 components: { Tinymce },
	 data() {
            return { 
								restaurants: [],
								state1: '',
                editor: ClassicEditor,
								editorData: '',
								editorDisabled:false,
                editorConfig: {
								language: 'zh-cn',
				        ckfinder: {
           				 uploadUrl: '/admin/Upload/uploadUrl'
            //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          }
                },
								// formLabelWidth: '20px',
								  input: '',
									isshow:'是',
									imageUrl: '',
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
            };
		},
	methods:{
		// 选择主题
		querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
			},
			
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
			},
			// 选择图片
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
      handleSelect(item) {
        console.log(item);
			} ,
			// 编辑器操作
			emptyEditor() {
				var that=this;
				var editorData =	this.editorData;
				this.editorDisabled = true;
				console.log(editorData);					
				},
				reEditor(){
					var that=this;
					var editorData =	this.editorData;
					this.editorDisabled = false;
				},
				
    },
	
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>

<style scoped lang="scss">
.art_details{
	// float: right;
	width: 100%;
	margin-top: 200px;
	height: auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	// justify-content: center;
	.citypro{
		width: 700px;		
		height: auto;
 		display: flex;
		margin: 0 auto;
			img{
			margin: 0 20px 20px 110px;
			width: 40px;
			height: 40px;	
		}
		provincial-cities{
			display: inline-block;
		}
	}
	.art_ti{
		margin: 0 auto;
	}
	.midtwo{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 0 0 20px 60px;
		.read{
			// margin-left:260px;
			display: flex;
			align-items: center;
		}
		.ifshow{
			// margin-left:50px;
			display: flex;
			align-items: center;
		}
		.upload{
			display: flex;
			align-items: center;
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
				width: 100px;
				height: 100px;
				line-height: 100px;
				text-align: center;
			}
			.avatar {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
	}
	.art_edit{
		margin-left: 15px;
		.pributton{
			margin-top:10px;
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
