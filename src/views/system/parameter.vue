<template>
  <div id="parameter">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>公共参数配置 :</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="fen"></div>
    <p class="ps">ps:此页面用于配置公共参数；目前只有代付审核配置这一项；</p>
    <el-form
      size="medium"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
      inline
    >
      <el-form-item label="代付审核配置 ：" prop="isAutoPass">
        <el-radio-group v-model="ruleForm.isAutoPass">
          <el-radio label="true">自动审核</el-radio>
          <el-radio label="false">人工审核</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { autopassstatus, autopass } from "@/axios/api";
export default {
  data() {
    return {
      ruleForm: {
        isAutoPass: "",
      },
      rules: {
        isAutoPass: [
          { required: true, message: "代付审核配置", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._autopass();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _autopassstatus() {
      autopassstatus().then((res) => {
        if (res.data.code == 1000) {
          this.ruleForm.isAutoPass = String(res.data.result);
        }
      });
    },
    _autopass() {
      autopass({ isAutoPass: JSON.parse(this.ruleForm.isAutoPass) }).then(
        (res) => {
          if (res.data.code == 1000) {
            this.$message.success("操作成功");
          }
        }
      );
    },
  },
  created() {
    this._autopassstatus();
  },
};
</script>

<style lang="less" scoped>
#parameter {
  .fen {
    width: 100%;
    height: 10px;
  }
  .ps {
    font-size: 14px;
    color: red;
  }
}
</style>