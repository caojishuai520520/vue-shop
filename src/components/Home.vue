<template>
    <el-container class="home_container">
		<!-- 头部区域 -->
  		<el-header>
			  <div>
				  <img src="../assets/heima.png" alt="">
				  <span>电商后台管理系统</span>
			  </div>
			<el-button  type="info" @click="logout">退出</el-button>
		</el-header>
		  <!-- 页面主体区域 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse? '64px' : '200px'"> <!-- 动态设置宽度 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
				<!-- 侧边栏菜单区 -->
				 <el-menu
                    :default-active='activePath'
                    router 
                    :collapse='isCollapse'
                    :collapse-transition='false'
                    unique-opened
					class="el-menu-vertical-demo"
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409Bff">
					<!-- 一级菜单 -->
					<el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
						<!-- 一级菜单的模板区域 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="iconObj[item.id]"></i>
							<!-- 文本 -->
							<span>{{item.authName}}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item @click="saveNavState('/'+ subItem.path)" :index="'/'+ subItem.path + '' " v-for="subItem in item.children" :key="subItem.id">
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>
								<!-- 文本 -->
								<span>{{subItem.authName}}</span>
							</template>
						</el-menu-item>
					</el-submenu>
    			</el-menu>
			</el-aside>
			<!-- 右侧内容 -->
			<el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
    data(){
        return{
            menulist:[],
            //数据统计模块的icon
            iconObj:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao',
            },
            isCollapse:false, //是否折叠,
            activePath:'' // 被激活的链接地址
        }
    },
	created(){
		this.getMenuList()
        if(window.sessionStorage.getItem('activePath')) return this.activePath = window.sessionStorage.getItem('activePath')
	},
    methods:{
        logout(){
            // 清除 sessionStorage 中的 token 值
            window.sessionStorage.clear()
            // 重新回到登录页面
            this.$router.push('/login')
            this.$message.success('退出成功！')
        },
		// 获取所有的菜单
		async getMenuList(){
		  const {data:res} = await this.$http.get('menus')
          this.menulist = res.data
          console.log(this.menulist)
		},
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },
        // 保存链接的激活状态
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
	.home_container{
		height: 100%;
		.el-header{
			background-color: #373d41;
			display: flex;
			justify-content: space-between;
			padding-left: 0;
			align-items: center;
			color: #fff;
			font-size: 20px;
			>div{
				display: flex;
				align-items: center;
				>img{
					width: 60px;
					height: 60px;
				}
				span{
					margin-left: 15px;
				}
			}
		}
		.el-aside{
			background-color: #333744;
            .el-menu{
                border-right: none;
            }
            .toggle-button{
                background-color: #4A5064;
                font-size: 10px;
                line-height: 24px;
                color: #fff;
                text-align: center;
                letter-spacing: 0.2em;
                cursor: pointer;
            }
		}
		.el-main{
			background-color: #EAEDF1;
		}
        .iconfont{
            margin-right: 10px;
        }
	}
	
</style>

