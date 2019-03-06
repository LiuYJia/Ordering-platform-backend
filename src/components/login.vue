<template>
    <div id="login">
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item>
                <el-button type="primary" @click.native.prevent="login" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            logining: false,
            ruleForm: {
                account: 'admin',
                checkPass: '123456'
            },
            rules2: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            },
            checked: true
      };
    },
    methods:{       
        login(){
            console.log(this.ruleForm);
            this.$router.push('/home')
        }
    }
}
</script>
<style>
    #login{
        background-image: url('../assets/images/bg.jpg');
        background-size: 100vw 100vh;
        background-repeat: no-repeat;
        height: 100vh;
        width: 100vw;
        position: relative;
    }
    #login form{
        width: 40%;
        height: 50%;
        box-shadow: 1px 1px 5px gray;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    #login h3{
        margin-top: 20px;
    }
    #login .el-form-item {
        width: 70%;
        text-align: center;
        margin: 10px auto;
    }
    #login button{
        width: 50%;
        margin-top: 20px;
    }
</style>
