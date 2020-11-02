<template>
  <div id="order">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>资金管理</el-breadcrumb-item>
      <el-breadcrumb-item>资金流水记录：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="资金流水单号：">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="业务流水单号：">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="formInline.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="margin-left:10px">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="formInline.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="业务类型：">
          <el-select v-model="formInline.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="资金流水单号" min-width="150"></el-table-column>
      <el-table-column prop="name" label="业务流水单号" min-width="150"></el-table-column>
      <el-table-column prop="province" label="商户号" min-width="150"></el-table-column>
      <el-table-column prop="city" label="商户名称" min-width="150"></el-table-column>
      <el-table-column prop="address" label="业务名称" min-width="150"></el-table-column>
      <el-table-column prop="address" label="支付公司" min-width="150"></el-table-column>
      <el-table-column prop="address" label="结算主体" min-width="150"></el-table-column>
      <el-table-column prop="address" label="支付方式" min-width="150"></el-table-column>
      <el-table-column prop="address" label="业务类型" min-width="150"></el-table-column>
      <el-table-column prop="address" label="币种账户" min-width="150"></el-table-column>
      <el-table-column prop="address" label="交易金额" min-width="150"></el-table-column>
      <el-table-column prop="address" label="到账金额" min-width="150"></el-table-column>
      <el-table-column prop="address" label="服务费扣款方式" min-width="150"></el-table-column>
      <el-table-column prop="address" label="商户费率" min-width="150"></el-table-column>
      <el-table-column prop="address" label="服务费金额" min-width="150"></el-table-column>
      <el-table-column prop="address" label="是否到账" min-width="150"></el-table-column>
      <el-table-column prop="address" label="实时账户余额" min-width="150"></el-table-column>
      <el-table-column prop="address" label="备注" min-width="150"></el-table-column>
      <el-table-column prop="address" label="资金流水状态" min-width="150"></el-table-column>
      <el-table-column prop="address" label="创建时间" min-width="150"></el-table-column>
      <el-table-column prop="address" label="更新时间" min-width="150"></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">确认充值</el-button>
          <el-button @click="cancel(scope.row)" type="text" size="small">取消充值</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="确认充值"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="充值币种：" prop="region">
          <el-select class="itemIn2" v-model="ruleForm.region" placeholder="请选择充值币种">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额：" prop="name">
          <el-input class="itemIn2" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="充值服务费：" prop="name">
          <el-input class="itemIn2" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="到账币种：" prop="region">
          <el-select class="itemIn2" v-model="ruleForm.region" placeholder="请选择到账币种">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到账金额：" prop="name">
          <el-input class="itemIn2" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      total: 100,
      currentPage4: 1,
      dialogVisible: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      this.dialogVisible = true;
      // this.$router.push({ path: "/order-details", query: {} });
    },
    cancel(row) {
      this.$confirm("确认执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.handleClose();
    },
  },
};
</script>

<style lang="less" scoped>
#order {
  .seach {
    margin-top: 20px;
  }
  .pagination {
    width: 100%;
    text-align: center;
    margin-top: 15px;
  }
  .itemIn2 {
    max-width: 350px;
  }
}
</style>