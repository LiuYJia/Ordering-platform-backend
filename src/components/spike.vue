<template>
    <div id="spike">
        <el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getmsgs">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addmsgs">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
		<el-table :data="users" highlight-current-row  @selection-change="selsChange">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column type="index">
			</el-table-column>
			<el-table-column prop="name" label="名称" sortable>
			</el-table-column>
			<el-table-column prop="price" label="价格" sortable>
			</el-table-column>
			<el-table-column prop="des" label="描述" sortable>
			</el-table-column>
			<el-table-column prop="sort" label="所属类别" sortable>
			</el-table-column>
			<el-table-column prop="num" label="月售" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="editmsg(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

        <!--批量删除/分页-->
		<el-col :span="24" class="toolbar2">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total">
			</el-pagination>
		</el-col>

        <!--新增界面-->		
        <el-dialog
            :title="dialogtitle"
            :visible.sync="addFormVisible"
            :before-close="cancel"
            >
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>	
                <el-form-item label="价格" prop="price">
					<el-input v-model="addForm.price" auto-complete="off"></el-input>
				</el-form-item>	
                <el-form-item label="所属类别" prop="sort">
					<el-select v-model="addForm.sort" placeholder="请选择所属类别">
                        <el-option label="推荐" value="1"></el-option>
                        <el-option label="热销" value="2"></el-option>
                        <el-option label="主食" value="3"></el-option>
                        <el-option label="饮料" value="4"></el-option>                       
                    </el-select>
				</el-form-item>			
				<el-form-item label="月售" prop="num">
					<el-input-number v-model="addForm.num" :min="0" :max="200"></el-input-number>
				</el-form-item>				
				<el-form-item label="描述" prop="des">
					<el-input type="textarea" v-model="addForm.des" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
            <div slot="footer" class="dialog-footer">
				<el-button @click.native="cancel">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
                filters: {
					name: ''
				},
                users: [{id:1,name:'汉堡',des:'微辣',price:'10',sort:'1',num:'10'},
                    {id:2,name:'汉堡1',des:'微辣',price:'10',sort:'1',num:'10'},
                    {id:3,name:'汉堡2',des:'微辣',price:'10',sort:'1',num:'10'},
                    {id:4,name:'汉堡3',des:'微辣',price:'10',sort:'1',num:'10'},
                    {id:5,name:'汉堡4',des:'微辣',price:'10',sort:'1',num:'10'},
                    {id:6,name:'汉堡5',des:'微辣',price:'10',sort:'1',num:'10'}],
				total: 6,
				page: 1,
                listLoading: false,
                dialogtitle:'',
				sels: [],//列表选中列				
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    des: [
						{ required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    price: [
						{ required: true, message: '请输入价格', trigger: 'blur' }
                    ],
                    sort: [
						{ required: true, message: '请选择类别', trigger: 'blur' }
                    ],
				},
				//新增界面数据
				addForm: {
					name: '',
					num: '',
					des: '',
					price:'',
					sort: ''
				}

			}
    },
    methods:{
        //获取列表
        getmsgs(val) {
            console.log(this.filters.name);
        },
        addSubmit(){
            console.log(this.addForm);
        },
        selsChange: function (sels) {
            console.log(sels);
            this.sels = sels;
        },
        handleCurrentChange(val) {
            console.log(val);
            this.page = val;
            // this.getUsers();
        },
        cancel(){
            this.addForm = {
					name: '',
					num: '',
					des: '',
					price:'',
					sort: ''
                };
            this.addFormVisible = false;
        },
        addmsgs() { 
            this.dialogtitle = '新增';         
            this.addFormVisible = true;
        },
        editmsg(val1,val2,val3) {   
            this.dialogtitle = '编辑'; 
            console.log(val2.id);        
            this.addFormVisible = true;
            this.addForm = {
					name: '1',
					num: '1',
					des: '1',
					price:'1',
					sort: '1'
				};
        },
        
        //删除
			handleDel: function (index, row) {
                console.log(row.id)
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
				}).catch(() => {

				});
			},
        //批量删除
        batchRemove: function () {
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }).catch(() => {

            });
        }
    }
}
</script>
<style>

#spike{
    height: 85vh;
    width: 100%;
}
#spike .toolbar{
    height: 10vh;   
    line-height: 10vh; 
    width:100%;  
}
#spike .toolbar form{
    height: 100%; 
    width: 76vw;
    margin: 0 auto;
    background-color: rgb(231, 231, 230);
}
#spike .toolbar .el-form-item__content{
    line-height: 10vh;
}
#spike .toolbar .el-form-item:first-child{
    margin-left: 1vw;
}
#spike .el-table{
    width: 76vw;
    height: 60vh;
    margin: 0 auto;
    overflow: auto;
}
#spike .toolbar2{
    height: 15vh;
    width: 76vw;
    margin: 0 auto;
    float: none;
    display: flex;
    align-items: center;
    justify-content:space-between
}
</style>
