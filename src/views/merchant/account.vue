<template>
  <div id="account">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商户账户查询 :</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="商户号：">
          <el-input v-model="formInline.merchantId" clearable></el-input>
        </el-form-item>
        <el-form-item label="收款状态：">
          <el-select clearable v-model="formInline.receiveStatus">
            <el-option
              v-for="(item,index) in status_"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现状态：">
          <el-select clearable v-model="formInline.withdrawStatus">
            <el-option
              v-for="(item,index) in status_"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="merchantId" label="商户号" min-width="150"></el-table-column>
      <el-table-column prop="companyName" label="商户名称" min-width="120"></el-table-column>
      <el-table-column prop="currency" label="币种账户" min-width="120"></el-table-column>
      <el-table-column prop="totalBalance" label="账户总余额" min-width="120"></el-table-column>
      <el-table-column prop="availableBalance" label="可用余额" min-width="200"></el-table-column>
      <el-table-column prop="blockedBalance" label="不可用余额" min-width="200"></el-table-column>
      <el-table-column prop="todayAmount" label="当天交易额" min-width="200"></el-table-column>
      <el-table-column prop="_receiveStatus" label="收款状态" min-width="100"></el-table-column>
      <el-table-column prop="_withdrawStatus" label="提现状态" min-width="100"></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">冻结收款</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">解冻提现</el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
import { accountlist } from "@/axios/api";
import { _status_ } from "@/util/select";
export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      total: 100,
      currentPage4: 1,
      merData: {
        page: 1,
        size: 10,
      },
      status_: _status_,
    };
  },
  methods: {
    onSubmit() {
      let _formInline = this.formInline;
      for (const key in _formInline) {
        if (_formInline[key] != "") {
          this.merData[key] = _formInline[key];
        } else {
          delete this.merData[key];
        }
      }
      this.Listhanlder();
    },
    handleClick(row) {
      // this.$router.push({ path: "/register-details", query: {} });
      this.$message({
        message: "暂未开通",
        type: "warning",
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
      accountlist(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            res_._receiveStatus = res_.receiveStatus == "1" ? "正常" : "冻结";
            res_._withdrawStatus = res_.withdrawStatus == "1" ? "正常" : "冻结";
            return res_;
          });
          this.tableData = _tableData;
        }
      });
    },
  },
  created() {
    this.Listhanlder();
  },
};
</script>

<style lang="less" scoped>
#account {
  .seach {
    margin-top: 20px;
  }
  .pagination {
    width: 100%;
    text-align: center;
    margin-top: 15px;
  }
}
</style>