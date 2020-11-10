<template>
  <div id="order">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>资金管理</el-breadcrumb-item>
      <el-breadcrumb-item>充值审核：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small" 
      >
        <el-form-item label="充值申请单号：">
          <el-input clearable v-model="formInline.billId"></el-input>
        </el-form-item>
        <el-form-item label="商户号：">
          <el-input clearable v-model="formInline.merchantId"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：">
          <el-input clearable v-model="formInline.companyName"></el-input>
        </el-form-item>
        <el-form-item label="充值状态：">
          <el-select clearable v-model="formInline.status">
            <el-option
              v-for="(item, index) in rechargeStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值申请时间：">
          <el-col :span="11">
            <el-date-picker
              clearable
              type="datetime"
              placeholder="开始时间"
              v-model="formInline.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="margin-left: 10px">-</el-col>
          <el-col :span="11">
            <el-date-picker
              clearable
              type="datetime"
              placeholder="结束时间"
              v-model="formInline.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="_payoutexport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="id"
        label="充值申请单号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="merchantId"
        label="商户号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="companyName"
        label="商户名称"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="bizContactName"
        label="商务联系人姓名"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="bizContactNumber"
        label="商务联系人手机号码"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="currency"
        label="充值币种"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="充值金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="rechargeAmount"
        label="充值服务费"
        min-width="150"
      ></el-table-column>
      <!-- <el-table-column prop="address" label="到账币种" min-width="150"></el-table-column> -->
      <el-table-column
        prop="successAmount"
        label="到账金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="successDate"
        label="到账日期"
        min-width="160"
      ></el-table-column>
      <el-table-column
        prop="_status"
        label="充值状态"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="申请充值时间"
        min-width="160"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="160"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.status == '0' || scope.row.status == '2'">
          <el-button  @click="handleClick(scope.row)" type="text" size="small"
            >确认充值</el-button
          >
          <el-button @click="cancel(scope.row)" type="text" size="small"
            >取消充值</el-button
          >
          </div>
          <div v-else>
            <el-button disabled @click="handleClick(scope.row)" type="text" size="small"
              >确认充值</el-button
            >
            
            <el-button disabled @click="cancel(scope.row)" type="text" size="small"
              >取消充值</el-button
            >
            </div>
        </template>
     
      </el-table-column>
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
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="充值币种：" prop="currency">
          <el-select
            class="itemIn2"
            v-model="ruleForm.currency"
            placeholder="请选择充值币种"
          >
            <el-option
              v-for="(item, index) in paytypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额：" prop="amount">
          <el-input class="itemIn2" v-model="ruleForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="充值服务费：" prop="rechargeAmount">
          <el-input
            disabled
            class="itemIn2"
            v-model="ruleForm.rechargeAmount"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  rechargelist,
  rechargelistexport,
  rechargeaudit,
  recharge,
} from "@/axios/api";
import { rechargeStatus, paytypes } from "@/util/select";
import { getTodayTimes, downloadDoc, Mul, Add } from "@/util/public";
export default {
  data() {
    return {
      formInline: {
        status: 0,
        billId: "",
        startTime: "",
        endTime: "",
      },
      tableData: [],
      total: 0,
      currentPage4: 1,
      dialogVisible: false,
      ruleForm: {
        id: "",
        status: "",
        approver: "",
        amount: "",
        currency: "",
        countryCode: "",
        rate: "",
        singleCharge: "",
        rechargeAmount: "",
      },
      rules: {
        currency: [
          { required: true, message: "请选择充值币种", trigger: "change" },
        ],
        amount: [
          { required: true, message: "请填写充值金额", trigger: "blur" },
        ],
      },
      merData: {
        page: 1,
        size: 10,
        billId: "",
        status: 0,
        startTime: "",
        endTime: "",
      },
      rechargeStatus: rechargeStatus,
      paytypes: paytypes,
    };
  },
  methods: {
    onSubmit() {
      let _formInline = this.formInline;
      for (const key in _formInline) {
        this.merData[key] = _formInline[key];
      }
      let data_ = getTodayTimes();
      if (this.merData["startTime"] == "") {
        this.merData.startTime = data_ + " 00:00:00";
      }
      if (this.merData["endTime"] == "") {
        this.merData.endTime = data_ + " 23:59:59";
      }

      this.Listhanlder();
    },
    _payoutexport() {
      let _formInline = this.formInline;
      let data_ = getTodayTimes();

      if (
        _formInline["startTime"] == "" ||
        _formInline["startTime"] == undefined
      ) {
        _formInline.startTime = data_ + " 00:00:00";
      }
      if (_formInline["endTime"] == "" || _formInline["endTime"] == undefined) {
        _formInline.endTime = data_ + " 23:59:59";
      }
      rechargelistexport(this.formInline).then((res) => {
        downloadDoc(res.data, "充值审核信息");
      });
    },
    handleClick(row) {
      this.ruleForm.id = row.id;
      this.ruleForm.status = 1;
      this.ruleForm.approver = row.approver;
      this.ruleForm.amount = row.amount;
      this.ruleForm.currency = row.currency;
      this.ruleForm.countryCode = row.countryCode;
      this.ruleForm.rate = row.rate;
      this.ruleForm.singleCharge = row.singleCharge;
      this.ruleForm.rechargeAmount = row.rechargeAmount;
      this.dialogVisible = true;
    },
    cancel(row) {
      let datas = {
        id: row.id,
        status: 2,
        approver: row.approver,
        amount: row.amount,
        currency: "INR",
        countryCode: "IN",
      };
      this.$confirm("确认执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this._rechargeaudit(datas);
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    _rechargeaudit(data) {
      rechargeaudit(data).then((res) => {
        if (res.data.code == 1000) {
          this.$message.success("操作成功!");
          this.handleClose();
          this.Listhanlder();
        }
      });
    },
    handleSizeChange(val) {
      this.merData.size = val;
      this.Listhanlder();
    },
    handleCurrentChange(val) {
      this.merData.page = val;
      this.Listhanlder();
    },
    Listhanlder() {
      rechargelist(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            for (let index = 0; index < rechargeStatus.length; index++) {
              if (res_.status == rechargeStatus[index].value) {
                res_._status = rechargeStatus[index].label;
              }
            }
            return res_;
          });
          this.tableData = _tableData;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
    },
    submitForm(formName) {
      let datas = {
        id: this.ruleForm.id,
        status: this.ruleForm.status,
        approver: this.ruleForm.approver,
        amount: this.ruleForm.amount,
        currency: this.ruleForm.currency,
        countryCode: this.ruleForm.countryCode,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._rechargeaudit(datas);
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
  watch: {
    "ruleForm.amount": function (newVal, oldVal) {
      this.ruleForm.rechargeAmount = Add(
        Mul(newVal, this.ruleForm.rate),
        this.ruleForm.singleCharge
      );
    },
  },
  created() {
    let data_ = getTodayTimes();
    this.merData.startTime = data_ + " 00:00:00";
    this.merData.endTime = data_ + " 23:59:59";
    this.formInline.startTime = data_ + " 00:00:00";
    this.formInline.endTime = data_ + " 23:59:59";
    this.Listhanlder();
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