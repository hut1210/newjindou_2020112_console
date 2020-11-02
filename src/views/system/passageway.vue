<template>
  <div id="order">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>支付通道管理:</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <!-- <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      > -->
      <!-- <el-form-item label="GrePay订单号：">
          <el-input clearable v-model="formInline.user"></el-input>
        </el-form-item> -->
      <!-- <el-form-item label="商户订单号：">
          <el-input clearable v-model="formInline.user"></el-input>
        </el-form-item> -->
      <!-- <el-form-item label="用户ID：">
          <el-input clearable v-model="formInline.user"></el-input>
        </el-form-item> -->
      <!-- <el-form-item label="商户号：">
          <el-input clearable v-model="formInline.user"></el-input>
        </el-form-item> -->
      <!-- <el-form-item label="商户名称：">
          <el-input clearable v-model="formInline.user"></el-input>
        </el-form-item> -->
      <!-- <el-form-item label="支付方式：">
          <el-select clearable v-model="formInline.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      <!-- <el-form-item label="订单状态：">
          <el-select clearable v-model="formInline.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      <!-- <el-form-item label="生成时间：">
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
        </el-form-item>
      </el-form> -->
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column
        prop="date"
        label="支付公司"
        min-width="150"
      ></el-table-column> -->
      <!-- <el-table-column
        prop="name"
        label="结算主体"
        min-width="150"
      ></el-table-column> -->
      <!-- <el-table-column
        prop="province"
        label="业务类型"
        min-width="150"
      ></el-table-column> -->
      <!-- <el-table-column
        prop="city"
        label="支付方式"
        min-width="150"
      ></el-table-column> -->
      <el-table-column
        prop="id"
        label="通道ID"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="通道名称"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="通道编码"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="rate"
        label="签约费率"
        min-width="150"
      ></el-table-column>

      <el-table-column
        prop="settlementInterval"
        label="结算周期"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="_status"
        label="通道状态"
        min-width="150"
      ></el-table-column>
      <!-- <el-table-column
        prop="address"
        label="操作员"
        min-width="150"
      ></el-table-column> -->
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="150"
      ></el-table-column>

      <!-- <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>

    <!-- <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
import { paychannel } from "@/axios/api";
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
    };
  },
  methods: {
    // onSubmit() {
    //   let _formInline = this.formInline;
    //   for (const key in _formInline) {
    //     if (_formInline[key] != "") {
    //       this.merData[key] = _formInline[key];
    //     } else {
    //       delete this.merData[key];
    //     }
    //   }
    //   this.Listhanlder();
    // },
    handleClick(row) {
      this.$message({
        message: "暂未开通",
        type: "warning",
      });
      // this.$router.push({ path: "/order-details", query: {} });
    },
    // handleSizeChange(val) {
    //   this.merData.size = val;
    //   this.Listhanlder();
    // },
    // handleCurrentChange(val) {
    //   this.merData.page = val;
    //   this.Listhanlder();
    // },
    Listhanlder() {
      paychannel().then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.map((res_) => {
            res_._status = res_.status == "1" ? "生效" : "无效";
            // for (let index = 0; index < toExamineStatus.length; index++) {
            //   if (res_.status == toExamineStatus[index].value) {
            //     res_._status = toExamineStatus[index].label;
            //   }
            // }
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
#order {
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