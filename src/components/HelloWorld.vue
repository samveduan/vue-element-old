<template>
  <div id="app">
    <el-container>
      <el-header> 
        <el-row>
          <el-col :span="6"><div>Header</div></el-col>
          <el-col :span="2" :offset="16">
            <div style="padding-top: 10px;">
              <span id="loginer">张某某</span>
              <el-dropdown style="line-height: 40px;">
                <a href="#" target="_self">
                  <el-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570179506639&di=4935eca28d128fe483724e9bb0bbd426&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F04%2F20170704113215_uAwk5.jpeg"></el-avatar>
                </a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-row class="tac">
              <el-col :span="24">
                <el-menu
                  :default-active="$route.path"
                  router unique-opened
                  class="el-menu-vertical-demo"
                  style="background: #eef1f6;"
                  @open="handleOpen"
                  @close="handleClose">

                  <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
                      <!--二级菜单-->
                      <template v-if="!item.leaf" >
                          <el-submenu :index="index+''">
                            <template slot="title">
                              <i :class="item.iconCls"></i>
                              <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                              <el-menu-item :index="child.path" :key="index" v-for="(child, index) in item.children">
                                {{child.name}}
                              </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                      </template>

                      <!--一级菜单-->
                      <template v-else>
                          <el-menu-item :index="child.path" :key="child.path" v-for="(child, index) in item.children">
                            <i :class="child.iconCls"></i>
                            <span slot="title">{{child.name}}</span>
                          </el-menu-item>
                      </template>
                      <!-- <subMenu v-else :data="item" :key="key"></subMenu> -->
                  </template>

				<!--导航菜单-->
				<!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu> -->
				<!--导航菜单-折叠后-->

				<!-- <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul> -->
                </el-menu>
              </el-col>
            </el-row>
        </el-aside>

        <el-main>
          <el-row>
            <el-col :span="24">
              <div class="grid-content" style="padding: 20px;">
                <router-view/>
              </div>
            </el-col>
          </el-row>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      ...mapActions('People', ['asyncSetName']),
      asyncSetAge(){
          this.$store.dispatch("People/asyncSetAge", 1);
      },
      asyncSetAddress(){
          this.$store.dispatch("People/asyncSetAddress", "中国湖南长沙");
      },
      asyncSetJob(){
          this.$store.dispatch("People/asyncSetJob", "P9");
      },
      loginOut(){
          localStorage.setItem("islogin", 0);
          console.log(localStorage.getItem("islogin"));
          this.$router.push("/login");
      }
  },
  computed: {
    ...mapState('People', ['name', 'age', 'address', 'job']),
    ...mapState('Product', {
      productName: 'name',
      count: 'count',
      price(state){return state.price},
      mount: state => state.mount
    }),
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header, .el-footer {
  background-color: #235d8b;
  color: #ffffff;
  text-align: left;
  line-height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 100;
}

.el-aside {
  background-color: #eef1f6;
  color: #ffffff;
  text-align: left;
  height: 100%;
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 80px;
}

.el-main {
  background-color: #FFFFFF;
  color: #333;
  text-align: left;
  height: 100%;
  position: absolute;
  left: 0; 
  top: 0;
  padding-top: 80px;
  padding-left: 210px;
  width: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo{
  background:#4175a4;
}
.el-dropdown{
  height: 40px;
}

#loginer{
  display: inline-block; margin-bottom: 20px; float: left; line-height: 40px; padding-right: 20px; font-size: 14px;
}
</style>
