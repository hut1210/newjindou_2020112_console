<template>
  <div id="payment">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>资金管理</el-breadcrumb-item>
      <el-breadcrumb-item>代付审核：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="代付申请单号：">
          <el-input clearable v-model="formInline.billId"></el-input>
        </el-form-item>
        <el-form-item label="申请单状态：">
          <el-select clearable v-model="formInline.status">
            <el-option
              v-for="(item, index) in paymentStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代付申请时间：">
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
          <el-button type="primary" @click="_payoutexport">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="id"
        label="代付申请单号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="merchantId"
        label="商户号"
        min-width="150"
      ></el-table-column>
      <!-- <el-table-column prop="province" label="商户名称" min-width="150"></el-table-column> -->
      <el-table-column
        prop="_payType"
        label="代付类型"
        min-width="150"
      ></el-table-column>
      <!-- <el-table-column prop="address" label="申请代付笔数" min-width="150"></el-table-column> -->
      <!-- <el-table-column prop="address" label="付款成功笔数" min-width="150"></el-table-column> -->
      <!-- <el-table-column prop="address" label="申请代付总金额" min-width="150"></el-table-column> -->
      <!-- <el-table-column prop="address" label="付款成功金额" min-width="150"></el-table-column> -->
      <el-table-column
        prop="_status"
        label="申请单状态"
        min-width="150"
      ></el-table-column>
      <el-table-column prop label="代付详情" min-width="150">
        <template slot-scope="scope">
          <el-button @click="viewDetails(scope.row)" type="text" size="small"
            >点击查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申请代付时间"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="150"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.status == '0' || scope.row.status == '2'">
            <el-button @click="handleClick(scope.row, 3)" type="text" size="small"
            >审核通过</el-button
          >
          <el-button @click="handleClick(scope.row, 2)" type="text" size="small"
            >审核拒绝</el-button
          >
            </div>
            <div v-else>
              <el-button disabled @click="handleClick(scope.row)" type="text" size="small"
                >审核通过</el-button
              >
              
              <el-button disabled @click="cancel(scope.row)" type="text" size="small"
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
import { payoutList, payoutupdate, payoutexport } from "@/axios/api";
import { paymentStatus } from "@/util/select";
import { getTodayTimes, downloadDoc } from "@/util/public";
export default {
  data() {
    return {
      formInline: {
        status: "0",
        billId: "",
        startTime: "",
        endTime: "",
      },
      tableData: [],
      total: 0,
      currentPage4: 1,
      merData: {
        page: 1,
        size: 10,
        billId: "",
        status: 0,
        startTime: "",
        endTime: "",
      },
      paymentStatus: paymentStatus,
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
      payoutexport(this.formInline).then((res) => {
        downloadDoc(res.data, "审核信息");
      });
    },
    viewDetails(row) {
      this.$router.push({
        path: "/payoutdetaillist",
        query: { orderId: row.id },
      });
    },
    handleClick(row, type) {
      let datas = {
        id: row.id,
        status: type,
        approver: row.approver,
      };
      this.$confirm("确认执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this._payoutupdate(datas);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
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
      payoutList(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            res_._payType =
              res_.payType == "1" ? "电子钱包付款" : "银行付款方式";
            for (let index = 0; index < paymentStatus.length; index++) {
              if (res_.status == paymentStatus[index].value) {
                res_._status = paymentStatus[index].label;
              }
            }
            return res_;
          });
          this.tableData = _tableData;
        }
      });
    },
    _payoutupdate(data) {
      payoutupdate(data).then((res) => {
        if (res.data.code == "1000") {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        }
      });
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
#payment {
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