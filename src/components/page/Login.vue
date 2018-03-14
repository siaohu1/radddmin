<template>
    <div class="login-wrap">
        <div class="ms-title">rate-admin</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(ruleForm) {
                let _th = this;
                let options = {
                    userName:this.ruleForm.username,
                    password: this.ruleForm.password,
                    sys:'admin',
                    systemVersion:7,
                    pVersion:1,
                    version:1,
                    system:'win',
                    channel : 1,
                    mobileInfo:'pc',
                }
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                let params = new URLSearchParams();
                params.append('userName', options.userName);
                params.append('password', options.password);
                params.append('sys', options.sys);
                params.append('systemVersion', options.systemVersion);
                params.append('pVersion', options.pVersion);
                params.append('version', options.version);
                params.append('system', options.system);
                params.append('channel', options.channel);
                params.append('mobileInfo', options.mobileInfo);
                axios({
                    url:'https://bit.macsen318.com/btoken/admin/passport/login',
                    method: 'post',
                    data: params,
                }).then(function(response){
                    let myToken = response.data.data.token;
                    window.localStorage.setItem('ms_username',_th.ruleForm.username);
                    window.localStorage.setItem('token',myToken);
                    window.localStorage.pathname='/';
                    if (response.data.ret == 1) {
                        _th.$router.push('/projectList')

                    }else{
                        alert(response.data.msg)
                        return false;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:150px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }

</style>
