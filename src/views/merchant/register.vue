<template>
  <div id="register">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item>注册用户管理 :</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="seach">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item label="注册邮箱：">
          <el-input clearable v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input clearable v-model="formInline.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input clearable v-model="formInline.clientId"></el-input>
        </el-form-item>
        <el-form-item label="申请时间：">
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
      </el-form>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="clientId"
        label="用户ID"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="注册邮箱"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="nickName"
        label="用户名"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="_status"
        label="企业认证状态"
        min-width="300"
      ></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
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
import { reviewMerchantList, MerchantList } from "@/axios/api";
import { registerStatue } from "@/util/select";
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
      registerStatue: registerStatue,
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
      this.merchanList();
    },
    handleClick(row) {
      // this.$router.push({ path: "/register-details", query: {} });
    },
    handleSizeChange(val) {
      this.merData.size = val;
      this.merchanList();
    },
    handleCurrentChange(val) {
      this.merData.page = val;
      this.merchanList();
    },
    merchanList() {
      reviewMerchantList(this.merData).then((res) => {
        if (res.data.code == "1000") {
          this.total = res.data.result.total;
          let _tableData = res.data.result.list.map((res_) => {
            for (let index = 0; index < registerStatue.length; index++) {
              if (res_.status == registerStatue[index].value) {
                res_._status = registerStatue[index].label;
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
    this.merchanList();
  },
};
</script>

<style lang="less" scoped>
#register {
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