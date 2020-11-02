<template>
  <div id="information">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商户基本信息管理 :</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="公司名称：">
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
          <el-select v-model="formInline.region" clearable>
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
      <el-table-column prop="merchantId" label="商户号" min-width="150"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" min-width="120"></el-table-column>
      <el-table-column prop="bizCertifNo" label="营业执照号码" min-width="120"></el-table-column>
      <el-table-column prop="representativeName" label="法人姓名" min-width="120"></el-table-column>
      <el-table-column prop="industry" label="所属行业" min-width="120"></el-table-column>
      <el-table-column prop="createTime" label="开通时间" min-width="130"></el-table-column>
      <el-table-column prop="_status2" label="商户状态" min-width="80"></el-table-column>
      <el-table-column prop="_status" label="审核状态" min-width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="details(scope.row)">查看详情</el-button>
          <!-- <el-button @click="frozen(scope.row)" type="text" size="small">冻结</el-button> -->
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">操作记录</el-button> -->
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
import { baseinfoList } from "@/axios/api";
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
    details(row){
      this.$router.push({
        path: "/toExamine-details",
        query: { clientId: row.clientId },
      });
    },
    handleClick(row) {
      this.$message({
        message: "暂未开通",
        type: "warning",
      });
    },
    frozen(row) {
      this.$message({
        message: "暂未开通",
        type: "warning",
      });
      // this.$confirm("确认执行此操作吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!",
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消操作",
      //     });
      //   });
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
      baseinfoList(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            for (let index = 0; index < toExamineStatus.length; index++) {
              if (res_.status == toExamineStatus[index].value) {
                res_._status = toExamineStatus[index].label;
              }
            }

             res_._status2 = "正常"
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
#information {
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