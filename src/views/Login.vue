<template>
  <div class="Login-box">
    <img :src="loginUrl" alt />
    <div class="loginFrom">
      <h1 class="login-h1">业务管理系统</h1>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="loginForm.pwd"></el-input>
        </el-form-item>
        <div class="login-pass">
          <el-button class="login-btn1" type="text" @click="forgetThePassword()">忘记密码</el-button>
        </div>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/axios/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      loginUrl: require("../assets/login.png"),
      loginForm: {
        email: "",
        pwd: "",
      },
      rules: {
        email: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    forgetThePassword() {},
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          login(this.loginForm).then((res) => {
            if (res.data.code == 1000) {
              Message.success("登录成功");
              sessionStorage.setItem("token", res.data.result.access_token);
              this.$router.push({ path: "/home", query: {} });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
 
<style lang="less">
.Login-box {
  width: 800px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .login-h1 {
    padding-left: 60px;
  }
  .loginFrom {
    width: 400px;
    height: auto;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 50px 80px 50px 20px;
    margin-top: 50px;
  }
  .login-pass {
    line-height: 10px;
    text-align: center;
    text-align: right;
    position: relative;
    top: -10px;
  }
  .login-btn1 {
    padding: 0;
  }
  .login-btn {
    width: 100%;
  }
}
</style>