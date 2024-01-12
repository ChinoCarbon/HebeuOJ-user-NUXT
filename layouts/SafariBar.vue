<template>
  <div>
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#ffffff00"
        :router="true">
        <li class="title">
          <h2 style="margin: 0">
            河北工程大学在线评测系统
          </h2>
        </li>
        <el-menu-item index="/problems">题库</el-menu-item>
        <el-menu-item index="2">消息中心</el-menu-item>
        <el-menu-item index="3">订单管理</el-menu-item>
        <li class="account_bar">
          <el-button type="primary">登录</el-button>
          <el-button>注册</el-button>
        </li>
      </el-menu>
    </div>
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "SafariBar",
  data() {
    return {
      activeIndex: '4',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 80px;
  line-height: 80px;
  border-bottom: 2px solid transparent;
  color: #909399;
  float: right;
}

.el-menu--horizontal > .el-menu-item {
  height: 80px;
  line-height: 80px;
  border-bottom: 2px solid transparent;
  color: #909399;
}

.el-menu--horizontal > .account_bar {
  float: right;
  height: 80px;
  line-height: 80px;
  margin-right: 25px;
}

.title {
  height: 80px;
  line-height: 80px;
  float: left;
  margin-left: 25px;
  margin-right: 25px;
}
</style>
