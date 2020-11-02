<template>
  <div id="toExamine">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商户审核 :</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="商户ID：">
          <el-input clearable v-model="formInline.merchantId""></el-input>
        </el-form-item>
        <el-form-item label="认证公司名称：">
          <el-input clearable v-model="formInline.companyName"></el-input>
        </el-form-item>
        <el-form-item label="申请时间：">
          <el-col :span="11">
            <el-date-picker
              clearable
              type="datetime"
              placeholder="开始时间"
              v-model="formInline.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="margin-left:10px">-</el-col>
          <el-col :span="11">
            <el-date-picker
              clearable
              type="datetime"
              placeholder="结束时间"
              v-model="formInline.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select clearable v-model="formInline.status">
            <el-option
              v-for="(item,index) in toExamineStatus"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="merchantId" label="商户ID" min-width="150"></el-table-column>
      <el-table-column prop="companyName" label="认证公司名称" min-width="120"></el-table-column>
      <el-table-column prop="agentId" label="所属代理商ID" min-width="120"></el-table-column>
      <el-table-column prop="agentName" label="所属代理商名称" min-width="120"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" min-width="120"></el-table-column>
      <el-table-column prop="_status" label="审核状态" min-width="120"></el-table-column>
      <el-table-column prop="operator" label="审核员" min-width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == '2'"
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >审核</el-button>
          <el-button
            v-if="scope.row.status != '2'"
            type="text"
            size="small"
            @click="details(scope.row)"
          >查看详情</el-button>
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
import { examinelist } from "@/axios/api";
import { toExamineStatus } from "@/util/select";
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
      toExamineStatus: toExamineStatus,
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
      this.$router.push({
        path: "/toExamine-details",
        query: { clientId: row.clientId },
      });
    },
    details(row) {
      this.$router.push({
        path: "/details",
        query: { clientId: row.clientId },
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
      debugger
      examinelist(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            // res_._receiveStatus = res_.receiveStatus == "1" ? "正常" : "冻结";
            // res_._withdrawStatus = res_.withdrawStatus == "1" ? "正常" : "冻结";
            for (let index = 0; index < toExamineStatus.length; index++) {
              if (res_.status == toExamineStatus[index].value) {
                res_._status = toExamineStatus[index].label;
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
    this.Listhanlder();
  },
};
</script>

<style lang="less" scoped>
#toExamine {
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