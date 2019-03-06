<template>
    <div id="home">
        <el-row class="container">
            <el-col :span="24" class="header">
                <el-col :span="10" class="title">
                    
                    <i class="el-icon-menu"></i>
                    {{sysName}}
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner"><img src="../assets/images/head.jpg" alt="xxx" />{{sysUserName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>

            

            <el-col :span="24" class="main">
                <aside>
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				    </el-menu>
                </aside>

                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="title">{{$route.name}}</strong>
                            <el-breadcrumb separator="/" class="breadcrumb-inner">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="24" class="content-wrapper">
                            <transition name="fade" mode="out-in">
                                <router-view />
                            </transition>
                        </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
				sysName:'后台管理系统',
				collapsed:false,
				sysUserName: 'Admin',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
    },
    created(){
        console.log(this.$route);
    },
    methods:{
        onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
    }
}
</script>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    #home{
        height: 100vh;
        width: 100vw;
        
    }
    #home .header{
        height: 10vh;
        background-color: #20a0ff;
    }
    #home .header .title{
        height: 100%;
        line-height: 10vh;
        text-align: left;
        color: white;
        font-size: 20px;
        margin-left: 5vw;
    }
    #home .header .userinfo{
        height: 100%;
        float: right;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 2vw;
    }
    #home .header .el-dropdown span{
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    #home .header .userinfo img {
        width: 7vh;
        height: 7vh;
        border-radius: 50px;
        float: right;
        margin-right: 20px;        
    }
    #home .main{
        display: flex;
    }
    #home .main aside{
        flex: 0 0 20vw;
        border-right: 1px solid rgb(218, 216, 216);
        height: 90vh;
        /* box-shadow: 0 0 1px black; */
    }
    #home .main section{
        flex: 1;
        /* border: 1px solid red; */
    }
    #home .content-container{
        width: 80vw;
        height: 90vh;
        /* background-color: rgb(173, 173, 187); */
    }
    #home .breadcrumb-container{
        display: flex;
        height: 5vh;
        /* border: 1px solid black; */
    }
    #home .breadcrumb-container .title{
        flex: 1;
        line-height: 5vh;
        margin-left: 2vw
    }
    #home .breadcrumb-container .el-breadcrumb{
        line-height: 5vh;
        margin-right: 2vw
    }
    
</style>


