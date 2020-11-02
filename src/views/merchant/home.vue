<template>
  <div id="register">
    <!-- <h3>待办事项：</h3>
    <el-row class="box">
      <el-col :span="6" class="box-col borRi">
        <div class="grid-content bg-purple">
          <h4>待审核充值</h4>
          <p>1000 笔</p>
        </div>
      </el-col>
      <el-col :span="6" class="box-col borRi">
        <div class="grid-content bg-purple-light">
          <h4>待审核充值</h4>
          <p>1000 笔</p>
        </div>
      </el-col>
      <el-col :span="6" class="box-col borRi">
        <div class="grid-content bg-purple">
          <h4>待审核充值</h4>
          <p>1000 笔</p>
        </div>
      </el-col>
      <el-col :span="6" class="box-col">
        <div class="grid-content bg-purple-light">
          <h4>待审核充值</h4>
          <p>1000 笔</p>
        </div>
      </el-col>
    </el-row> -->
    <h3>数据看板：</h3>
    <el-table :data="tableData" border style="width: 100%" :show-header="showHea" empty-text="待评估">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHea: false, //是否展示表头
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        // },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#register {
  .box {
    width: 100%;
    height: 150px;
    background-color: #ececec;
    .box-col {
      height: 100px;
      text-align: center;
      box-sizing: border-box;
      margin-top: 25px;
    }
    .borRi {
      border-right: 2px solid #ffffff;
    }
  }
}
</style>