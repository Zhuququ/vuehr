<template>
    <div>
        <el-form :rules="rules" :model="loginForm" ref="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-link type="primary" style="float: right;">忘记密码</el-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // 使用插件的形式后，就不需要每次在使用方法前进行import了
    // import {postKeyValueRequest} from "../utils/api";

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        // 直接this.func就可以使用插件中的方法了
                        this.postKeyValueRequest('/doLogin', this.loginForm).then(resp=>{
                            if (resp) {
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                                // this.$route获取url信息
                                let redirect = this.$route.query.redirect;
                                this.$router.replace((redirect == '/' || redirect == undefined) ? "/home" : redirect);
                            }
                        });
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .loginContainer {
        border-radius: 15px;
        border: 1px solid #eaeaea;
        width: 350px;
        margin: 180px auto;
        padding: 25px 35px 15px 35px;
        background-clip: padding-box;
        background: #ffffff;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        text-align: center;
        color: #535658;
    }
</style>