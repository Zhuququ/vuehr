<template>
    <div>
        <el-container>
            <el-header class="home-header">
                <div class="title">微人事</div>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link user-info">
                        {{user.name}}<img :src="user.userface" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!--                    <el-menu @select="menuClick">-->
                    <!--                        <el-submenu index="1" v-for="(item, index) in this.$router.options.routes" :key="index"-->
                    <!--                                    v-if="!item.hidden">-->
                    <!--                            <template slot="title">-->
                    <!--                                <i class="el-icon-location"></i>-->
                    <!--                                <span>{{item.name}}</span>-->
                    <!--                            </template>-->
                    <!--                            <el-menu-item :index="child.path" v-for="(child, indexj) in item.children" :key="indexj">-->
                    <!--                                {{child.name}}-->
                    <!--                            </el-menu-item>-->
                    <!--                        </el-submenu>-->
                    <!--                    </el-menu>-->
                    <!--                    router属性：自动的使用vue的router，根据index进行跳转-->
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item, index) in routes" :key="index">
                            <template slot="title">
                                <i class="icon" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :index="child.path" v-for="(child, indexj) in item.children" :key="indexj">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎来到微人事！
                    </div>
                    <router-view class="homeRouterView"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            handleCommand(cmd) {
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest('/logout');
                        window.sessionStorage.removeItem('user');
                        this.$store.commit('initRoutes', []);
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消注销'
                        });
                    });
                }
            },
            // menuClick(index, indexPath) {
            //     this.$router.push(index);
            // }
        }
    }
</script>

<style>
    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 楷体;
        color: #47aefd;
        padding-top: 50px;
    }

    .home-header {
        background-color: #47aefd;
        display: flex;
        align-items: center; /*当前行的侧轴（纵轴）方向上的对齐方式*/
        justify-content: space-between; /*在主轴（横轴）方向上的对齐方式*/
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .home-header .title {
        font-size: 30px;
        font-family: 楷体;
        color: #ffffff;
    }

    .home-header .user-info {
        cursor: pointer;
        color: #ffffff;
        display: flex;
        align-items: center;
    }

    .home-header .user-info img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .icon {
        color: #47aefd !important;
        margin-right: 10px;
    }

    .homeRouterView {
        margin-top: 10px;
    }
</style>