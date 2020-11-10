<template>
  <div id="order">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>交易管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单信息查询：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="平台单号：">
          <el-input clearable v-model="formInline.orderId"></el-input>
        </el-form-item>
        <el-form-item label="商户订单号：">
          <el-input clearable v-model="formInline.merchantOrderId"></el-input>
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input clearable v-model="formInline.userId"></el-input>
        </el-form-item>
        <el-form-item label="商户号：">
          <el-input clearable v-model="formInline.merchantId"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：">
          <el-input clearable v-model="formInline.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="支付方式：">
          <el-select clearable v-model="formInline.payTypeId">
            <el-option
              v-for="(item, index) in paytypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select clearable v-model="formInline.status">
            <el-option
              v-for="(item, index) in orderStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生成时间：">
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
        prop="orderId"
        label="平台单号"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="merchantOrderId"
        label="商户订单号"
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
        prop="userId"
        label="用户ID"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="orderAmount"
        label="订单金额"
        min-width="130"
      ></el-table-column>
      <el-table-column
        label="支付详情"
        min-width="150"
      >
      <template slot-scope="scope">
        <div class="operation">
          <span  style="color: #65B4FF; cursor: pointer;" class="oper_edit" @click="editRow(scope.row)"> 点击查看</span>
        </div>
      </template>
      </el-table-column>
      <el-table-column
        prop="_payTypeId"
        label="支付方式"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="paymentRate"
        label="商户费率"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="fee"
        label="订单手续费"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="settlementAmount"
        label="商户结算金额"
        min-width="130"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="商品名称"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="_status"
        label="订单状态"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="订单生成时间"
        min-width="160"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        min-width="160"
      ></el-table-column>
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
    title="支付详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    width="70%"
    :before-close="handleClose"
  >
  <el-table :data="tableDatadetail" border style="width: 100%">
    <el-table-column
    prop="id"
    label="支付单号"
    min-width="150"
  ></el-table-column>
    <el-table-column
      prop="orederId"
      label="平台单号"
      min-width="150"
    ></el-table-column>
    <el-table-column
      prop="_channelId"
      label="通道名称"
      min-width="150"
    ></el-table-column>
    <el-table-column
      prop="channelOrderId"
      label="通道单号"
      min-width="150"
    ></el-table-column>
    <el-table-column
      prop="status"
      label="支付状态"
      min-width="150"
    >
    <template slot-scope="scope">
      <span
      v-if="scope.row.status==0"
        size="mini"
      >处理中</span>
      <span
      v-else-if="scope.row.status==1"
        size="mini"
      >成功</span>
      <span
      v-else-if="scope.row.status==2"
        size="mini"
      >失败</span>
    </template>
  </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间""
      min-width="150"
    ></el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      min-width="130"
    ></el-table-column>
   
  </el-table>
  </el-dialog>
  </div>
</template>

<script>
import { orderList, paytype,detailOrderList } from "@/axios/api";
import { orderStatus, paytypes ,paychannels} from "@/util/select";
import Dialog from "../merchant/toExamine/dialog";

export default {
  components: { Dialog },
  data() {
    return {
      dialogVisible:false,
      ruleForm: {
      },
      paychannels: paychannels,
      formInline: {},
      tableData: [],
      total: 0,
      currentPage4: 1,
      tableDatadetail:[],
      merData: {
        page: 1,
        size: 10,
      },
      orderStatus: orderStatus,
      paytypes: paytypes,
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
      // this.$router.push({ path: "/order-details", query: {} });
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
      orderList(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            for (let index = 0; index < orderStatus.length; index++) {
              if (res_.status == orderStatus[index].value) {
                res_._status = orderStatus[index].label;
              }
            }
             for (let index = 0; index < paytypes.length; index++) {
              if (res_.payTypeId == paytypes[index].value) {
                res_._payTypeId = paytypes[index].label;
              }
            }
            
            return res_;
          });
          this.tableData = _tableData;
        }
      });
    },
    editRow(params){
      this.dialogVisible=true;
      
      detailOrderList(params.orderId).then((res) => {
        if (res.data.code == "1000") {
          debugger
          let _tableData = res.data.result.map((res_) => {
            for (let index = 0; index < paychannels.length; index++) {
              if (res_.channelId == paychannels[index].value) {
                res_._channelId = paychannels[index].label;
              }
            }
            return res_;
          });
          this.tableDatadetail=_tableData;
        }
      });

    },
    handleClose() {
      this.dialogVisible = false;
      
      
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