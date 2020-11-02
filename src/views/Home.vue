<template>
  <div class="home">
    <div class="bome-nav">
      <div class="home-logo">
        <h3 class="left">业务管理系统</h3>
        <el-image class="home-logo-img" :src="navLogo"></el-image>
      </div>
      <el-menu
        :default-active="isNav"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409eff"
        :default-openeds="defaulNav"
      >
        <el-menu-item
          index="home"
          @click="handlerNav({ route: 'home' }, 'home')"
          style="
            border-bottom: 1px solid hsla(0, 0%, 93.3%, 0.1);
            border-top: 1px solid hsla(0, 0%, 93.3%, 0.1);
          "
        >
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu
          v-for="(item, index) in navList"
          :key="index"
          :index="item.route"
        >
          <template slot="title">
            <i :class="item.icoImg"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group v-if="item.children">
            <el-menu-item
              v-for="(itemC, indexC) in item.children"
              :key="indexC"
              :index="itemC.route"
              @click="handlerNav(itemC, item.route)"
              >{{ itemC.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="home-ringht">
      <div class="slid-top">
        <div class="_slid-top">
          <div class="slid-text">你好，管理员</div>
          <el-button class="slid-btn" type="text" @click="logOut()"
            >退出登录</el-button
          >
        </div>
      </div>
      <div class="content-box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import "@/css/home.less";
export default {
  name: "Home",
  data() {
    return {
      navLogo: require("../assets/navLogo.png"),
      isNav: sessionStorage.getItem("isNav")
        ? sessionStorage.getItem("isNav")
        : "home",
      defaulNav: [
        sessionStorage.getItem("isNavA")
          ? sessionStorage.getItem("isNavA")
          : "home",
      ],
      navList: [
        {
          name: "商户管理",
          icoImg: "el-icon-s-custom",
          route: "merchant",
          children: [
            {
              name: "注册用户管理",
              icoImg: "el-icon-location",
              route: "register",
            },
            {
              name: "商户审核",
              icoImg: "el-icon-location",
              route: "toExamine",
            },
            {
              name: "商户基本信息管理",
              icoImg: "el-icon-location",
              route: "information",
            },
            {
              name: "商户账户查询",
              icoImg: "el-icon-location",
              route: "account",
            },
          ],
        },
        {
          name: "交易管理",
          icoImg: "el-icon-bank-card",
          route: "transaction",
          children: [
            {
              name: "订单信息查询",
              icoImg: "el-icon-location",
              route: "orders",
            },
          ],
        },
        {
          name: "资金管理",
          icoImg: "el-icon-set-up",
          route: "capital",
          children: [
            {
              name: "充值审核",
              icoImg: "el-icon-location",
              route: "recharge",
            },
            {
              name: "代付审核",
              icoImg: "el-icon-location",
              route: "payment",
            },
            {
              name: "提现审核",
              icoImg: "el-icon-location",
              route: "withdrawal",
            },
            // {
            //   name: "收款到账审核",
            //   icoImg: "el-icon-location",
            //   route: "collection",
            // },
            // {
            //   name: "资金流水记录",
            //   icoImg: "el-icon-location",
            //   route: "record",
            // },
          ],
        },
        {
          name: "系统配置",
          icoImg: "el-icon-s-tools",
          route: "system",
          children: [
            // {
            //   name: "账户管理",
            //   icoImg: "el-icon-location",
            //   route: "system-account",
            // },
            {
              name: "公共参数配置",
              icoImg: "el-icon-location",
              route: "parameter",
            },
            {
              name: "支付通道管理",
              icoImg: "el-icon-location",
              route: "passageway",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handlerNav(isNav, activeRoute) {
      sessionStorage.setItem("isNav", isNav.route);
      sessionStorage.setItem("isNavA", activeRoute);
      this.$router.push({ path: `${isNav.route}`, query: {} });
    },
    logOut() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.clear();
          this.$router.push({ path: "/login", query: {} });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
  components: {},
};
</script>
<style lang="less" scope>
</style>
