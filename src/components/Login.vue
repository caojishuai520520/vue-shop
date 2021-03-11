<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区 -->
            <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
                <!-- 用户名 -->
                <el-form-item  prop="username"><!-- 通过prop来指定不同的校验规则 -->
                    <el-input v-model="loginForm.username"  prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <!-- 密码 -->
                 <el-form-item prop="password"> <!-- 通过prop来指定不同的校验规则 -->
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-thumb"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button @click="login" type="primary">登录</el-button>
                    <el-button @click="resetLoginForm" type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // 这是登录表单的数据绑定对象
            loginForm:{
                username:'zs',
                password:'123'
            },
            // 这是表单的验证规则对象
            loginFormRules:{
                // 验证用户名是否合法
                username:[
                     { required: true, message: '请输入登录名称', trigger: 'blur' },
                     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合格
                password:[
                     { required: true, message: '请输入登录密码', trigger: 'blur' },
                     { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 点击重置按钮，重置登录表单
        resetLoginForm(){
            // resetFields:对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.loginFormRef.resetFields()
        },
         // 点击登录验证
        login(){
            // validate:对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：
            // 是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
            // Function(callback: Function(boolean, object))
            this.$refs.loginFormRef.validate( async valid =>{
                if(!valid) return;
                const {data:res} = await this.$http.post('login',this.loginForm);
                console.log(res)
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login_container{
        height: 100%;
        background-color: #2b4d6b;
    }

    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);

        .avatar_box{
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50% );
            background-color: #fff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>