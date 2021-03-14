<template>
    <div>
       <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card >
           <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                     <el-input placeholder="请输入内容"  v-model="queryInfo.query" clearable @clear='getUserList'>
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe>
                <el-table-column type='index' label="#"></el-table-column>
                <el-table-column label="姓名" prop="username"> </el-table-column>
                <el-table-column label="邮箱" prop="email"> </el-table-column>
                <el-table-column label="电话" prop="mobile"> </el-table-column>
                <el-table-column label="角色" prop="role_name"> </el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            @change="userStateChanged(scope.row)"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                 </el-table-column>        
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" size='mini' icon="el-icon-edit"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" size='mini' icon="el-icon-delete"></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable='false'>
                           <el-button type="warning" size='mini' icon="el-icon-setting"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>    
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>


            <!-- 添加用户的对话框 -->
            <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%">
                <!-- 内容主体区域 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                     <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                     <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                     <el-form-item label="手机" prop="mobile">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        // 自定义验证邮箱的规则
        var checkEmail = (rule,value,callback) =>{
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if(regEmail.test(value)){
                // 合法的邮箱
                return callback()
            }
            callback(new Error('请输入合法的邮箱'))
        }
        // 自定义验证手机号的规则
        var checkMobile = (rule,value,callback) =>{
             // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57]|)[0-9]{8}$/
            if(regMobile.test(value)){
                // 合法的邮箱
                return callback()
            }
            callback(new Error('请输入合法的手机号'))
        }
        return{
            //获取用户列表的参数对象
            queryInfo:{
                // 搜索框绑定的内容
                query:'',
                // 当前的页数
                pagenum:1,
                // 当前每页显示多少条数据 
                pagesize:10
            },
            userList:[],//列表数据
            total:0,// 列表总数
            addDialogVisible:false, // 控制添加用户对话框的显示和隐藏
            addForm:{ // 添加用户的表单数据
                username:"",
                passwoed:'',
                email:'',
                mobile:''
            },
            addFormRules:{ //添加表单的验证规则对象
                username:[
                    { required:true,message:'请输入用户名',trigger:'blur' },
                    {min:3, max:10, message:'用户名的长度在3~10个字符之间' , trigger:'blur'}
                ],
                password:[
                    { required:true,message:'请输入密码',trigger:'blur' },
                    {min:6, max:15, message:'用户名的长度在、6~15个字符之间' , trigger:'blur'}
                ],
                email:[
                    { required:true,message:'请输入邮箱',trigger:'blur' },
                    {min:6, max:15, message:'用户名的长度在、6~15个字符之间' , trigger:'blur'},
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                     { required:true,message:'请输入手机号',trigger:'blur' },
                     {min:6, max:15, message:'用户名的长度在、6~15个字符之间' , trigger:'blur'},
                     {validator:checkMobile,trigger:'blur'}
                ]
            },
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
           const {data:res} = await this.$http.get('users',{params:this.queryInfo})
           if(res.meta.status != 200) return this.$message.error('获取用户列表失败');
           this.userList = res.data.users
           console.log(this.userList)
           this.total = res.data.total
        },
        // 监听pagesize 改变的事件
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getUserList()
             console.log(newSize)
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getUserList()
            console.log(newPage)
        },
        // 监听  switch 开关状态的改变
        async userStateChanged(userInfo){
          const {data:res} =  await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
          console.log(res)
          if(res.meta.status != 200){
              userInfo.mg_state = !userInfo.mg_state
              return this.$message.error('更新用户状态失败')
          }
          this.$message.success('更新用户成功')
        }
    }
}
</script>

<style lang="less" scoped>

</style>