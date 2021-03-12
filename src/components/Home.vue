<template>
    <div>
        <el-button  type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        logout(){
            // 清除 sessionStorage 中的 token 值
            window.sessionStorage.clear()
            // 重新回到登录页面
            this.$router.push('/login')
            this.$message.success('退出成功！')
        }
    }
}
</script>

<style>

</style>