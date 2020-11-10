<template>
  <div id="withdrawal">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>资金管理</el-breadcrumb-item>
      <el-breadcrumb-item>提现审核：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="提现申请单号：">
          <el-input clearable v-model="formInline.applyId"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商户号：">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item> -->
        <el-form-item label="商户名称：">
          <el-input v-model="formInline.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="提现状态：">
          <el-select clearable v-model="formInline.status">
            <el-option
              v-for="(item, index) in withdrawalStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现申请时间：">
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
              placeholder="开始时间"
              v-model="formInline.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <!-- <el-button type="primary" @click="onSubmit">导出</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="applyId"
        label="提现申请单号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="merchantId"
        label="商户号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="merchantName"
        label="商户名称"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="amount"
        label="提现金额"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="serviceFee"
        label="提现服务费"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="toAccount"
        label="提现银行账户"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="_status"
        label="提现状态"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="flowId"
        label="资金流水单号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="申请提现时间"
        min-width="160"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="160"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
        <div v-if="scope.row.status == '1' || scope.row.status == '5'">
          <el-button @click="handleClick(scope.row, 3)" type="text" size="small"
          >审核通过</el-button
        >
        <el-button @click="handleClick(scope.row, 2)" type="text" size="small"
          >审核拒绝</el-button
        >
          </div>
          <div v-else>
            <el-button @click="handleClick(scope.row, 3)" type="text" size="small"
          >审核通过</el-button
        >
        <el-button @click="handleClick(scope.row, 2)" type="text" size="small"
          >审核拒绝</el-button
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
  </div>
</template>
 
<script>
import { reviewwithdraws, reviewwithdrawaudit } from "@/axios/api";
import { withdrawalStatus } from "@/util/select";
export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      total: 0,
      currentPage4: 1,
      merData: {
        page: 1,
        size: 10,
      },
      withdrawalStatus: withdrawalStatus,
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
    handleClick(row, state) {
      let datas = {
        applyId: row.applyId,
        operate: state,
      };
      this.$confirm("确认执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.refuse(datas);
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    refuse(data) {
      reviewwithdrawaudit(data)
        .then((res) => {
          if (res.data.code == 1000) {
            this.Listhanlder();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.merData.size = val;
      this.Listhanlder();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.merData.page = val;
      this.Listhanlder();
    },
    Listhanlder() {
      reviewwithdraws(this.merData).then((res) => {
        if (res.data.code == 1000) {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            res_._payType =
              res_.payType == "1" ? "电子钱包付款" : "银行付款方式";
            for (let index = 0; index < withdrawalStatus.length; index++) {
              if (res_.status == withdrawalStatus[index].value) {
                res_._status = withdrawalStatus[index].label;
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
    // let data_ = getTodayTimes();
    // this.merData.startTime = data_ + " 00:00:00";
    // this.merData.endTime = data_ + " 23:59:59";
    // this.formInline.startTime = data_ + " 00:00:00";
    // this.formInline.endTime = data_ + " 23:59:59";
    this.Listhanlder();
  },
};
</script>

<style lang="less" scoped>
#withdrawal {
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