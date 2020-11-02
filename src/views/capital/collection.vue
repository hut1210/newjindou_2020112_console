<template>
  <div id="collection">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>资金管理</el-breadcrumb-item>
      <el-breadcrumb-item>收款到账审核：</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="商户号：">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="到账状态：">
          <el-select v-model="formInline.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易日期：">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="到账审核单号" min-width="150"></el-table-column>
      <el-table-column prop="name" label="商户号" min-width="150"></el-table-column>
      <el-table-column prop="province" label="商户名称" min-width="150"></el-table-column>
      <el-table-column prop="city" label="到账类型" min-width="150"></el-table-column>
      <el-table-column prop="address" label="交易金额" min-width="150"></el-table-column>
      <el-table-column prop="address" label="交易日期" min-width="150"></el-table-column>
      <el-table-column prop="address" label="结算周期" min-width="150"></el-table-column>
      <el-table-column prop="address" label="结算日期" min-width="150"></el-table-column>
      <el-table-column prop="address" label="到账状态" min-width="150"></el-table-column>
      <el-table-column prop="address" label="生成时间" min-width="150"></el-table-column>
      <el-table-column prop="address" label="更新时间" min-width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">确认到账</el-button>
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
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
#collection {
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