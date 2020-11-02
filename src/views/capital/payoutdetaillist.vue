<template>
  <div id="payoutdetaillist">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>资金管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/payment' }">代付审核</el-breadcrumb-item>
      <el-breadcrumb-item>代付详情：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="代付申请单号：">
          <el-input clearable v-model="formInline.billId"></el-input>
        </el-form-item>
        <el-form-item label="申请单状态：">
          <el-select v-model="formInline.status">
            <el-option
              v-for="(item,index) in paymentStatus"
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
      <el-table-column prop="payoutId" label="付款单号" min-width="150"></el-table-column>
      <el-table-column prop="payeeName" label="收款人姓名" min-width="150"></el-table-column>
      <el-table-column prop="payeeBankCode" label="收款人银行卡号" min-width="150"></el-table-column>
      <el-table-column prop="amount" label="付款金额" min-width="150"></el-table-column>
      <!-- <el-table-column prop="address" label="付款备注" min-width="150"></el-table-column> -->
      <el-table-column prop="status" label="付款状态" min-width="150"></el-table-column>
      <el-table-column prop="singleCharge" label="付款服务费" min-width="150"></el-table-column>
      <el-table-column prop="address" label="付款详情" min-width="150"></el-table-column>
      <!-- <el-table-column prop="_status" label="资金流水单号" min-width="150"></el-table-column> -->

      <el-table-column prop="updateTime" label="更新时间" min-width="150"></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">重新付款</el-button>
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
import { payoutdetaillist } from "@/axios/api";
import { _paymentStatus } from "@/util/select";
import { getTodayTimes } from "@/util/public";
export default {
  data() {
    return {
      formInline: {
        status: "0",
        billId: "",
      },
      tableData: [],
      total: 0,
      currentPage4: 1,
      merData: {
        page: 1,
        size: 10,
        billId: "",
        status: 0,
        orderId: "",
      },
      paymentStatus: _paymentStatus,
    };
  },
  methods: {
    onSubmit() {
      let _formInline = this.formInline;
      for (const key in _formInline) {
        this.merData[key] = _formInline[key];
      }
      this.Listhanlder();
    },
    handleClick(row) {
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
    refuse(row) {
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
      this.merData.size = `${val}`;
      this.Listhanlder();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.merData.page = `${val}`;
      this.Listhanlder();
    },
    Listhanlder() {
      payoutdetaillist(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            // res_._receiveStatus = res_.receiveStatus == "1" ? "正常" : "冻结";
            for (let index = 0; index < _paymentStatus.length; index++) {
              if (res_.status == _paymentStatus[index].value) {
                res_._status = _paymentStatus[index].label;
              }
            }
            return res_;
          });
          this.tableData = _tableData;
        }
      });
    },
  },
  created() {
    this.merData.orderId = this.$route.query.orderId;
    this.Listhanlder();
  },
};
</script>

<style lang="less" scoped>
#payoutdetaillist {
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