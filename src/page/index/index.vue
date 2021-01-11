<template>
  <el-container class="index">
    <el-aside width="200px" class="left">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo navLeft"
          background-color="rgb(32,34,42)"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <div v-for="item in mapg.menus" :key="item.id">
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group v-for="i in item.children" :key="i.id">
                <el-menu-item :index="i.url">
                  <span>{{ i.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.url" v-else> 
              <span>{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="logout">
          <span>{{ mapg.username }}</span>
          <el-button type="primary" @click="logOut">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      info: "infoActions",
    }),
    logOut() {
      this.info({});
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({
      mapg: "infoGetters",
    }),
  },
  watch: {},
  mounted() {},
};
</script>



<style scoped>
.index {
  height: 100vh;
}
.left {
  background: rgb(32, 34, 42);
}
.header {
  background: rgb(179, 192, 209);
}
.navLeft {
  width: 100vw;
}
.shouye {
  color: white;
}
.logout {
  float: right;
}
</style>