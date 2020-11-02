<template>
  <div id="dialog">
    <!-- <el-checkbox class="itemTit" v-model="types.Wallet">Wallet</el-checkbox> -->
    <span class="itemTit">Wallet :</span>
    <el-form
      :model="WalletForm"
      ref="WalletForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item prop="rate">
        <span class="tit">收款费率：</span>
        <el-input
          :disabled="disabledbo"
          v-model="WalletForm.rate"
          class="itemIn"
        ></el-input
        >
        <span class="tit">收 款 通 道：</span>
        <el-select :disabled="disabledbo" v-model="WalletForm.channelId" placeholder="请选择">
          <el-option
            v-for="(item, index) in paychannels"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">提现费率：</span>
        <el-input :disabled="disabledbo" v-model="WalletForm.name" class="itemIn"></el-input>
        <span class="tit">提现单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="WalletForm.withdrawSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="rechargeRate">
        <span class="tit">充值费率：</span>
        <el-input :disabled="disabledbo" v-model="WalletForm.rechargeRate" class="itemIn"></el-input>
        <span class="tit">充值单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="WalletForm.rechargeSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">代付费率：</span>
        <el-input :disabled="disabledbo" v-model="WalletForm.payoutRate" class="itemIn"></el-input>
        <span class="tit">代付单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="WalletForm.payoutSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- <el-checkbox class="itemTit" v-model="types.UPI">UPI</el-checkbox> -->
    <span class="itemTit">UPI :</span>
    <el-form
      :model="UPIForm"
      ref="UPIForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item prop="name">
        <span class="tit">收款费率：</span>
        <el-input :disabled="disabledbo" v-model="UPIForm.rate" class="itemIn"></el-input>
        <span class="tit">收 款 通 道：</span>
        <el-select :disabled="disabledbo" v-model="UPIForm.channelId" placeholder="请选择">
          <el-option
            v-for="(item, index) in paychannels"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">提现费率：</span>
        <el-input :disabled="disabledbo" v-model="UPIForm.name" class="itemIn"></el-input>
        <span class="tit">提现单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="UPIForm.withdrawSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">充值费率：</span>
        <el-input :disabled="disabledbo" v-model="UPIForm.rechargeRate" class="itemIn"></el-input>
        <span class="tit">充值单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="UPIForm.rechargeSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">代付费率：</span>
        <el-input :disabled="disabledbo" v-model="UPIForm.payoutRate" class="itemIn"></el-input>
        <span class="tit">代付单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="UPIForm.payoutSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- <el-checkbox class="itemTit" v-model="types.Debit">Debit</el-checkbox> -->
    <span class="itemTit">Debit :</span>
    <el-form
      :model="DebitForm"
      ref="DebitForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item prop="name">
        <span class="tit">收款费率：</span>
        <el-input :disabled="disabledbo" v-model="DebitForm.rate" class="itemIn"></el-input>
        <span class="tit">收 款 通 道：</span>
        <el-select :disabled="disabledbo" v-model="DebitForm.channelId" placeholder="请选择">
          <el-option
            v-for="(item, index) in paychannels"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">提现费率：</span>
        <el-input :disabled="disabledbo" v-model="DebitForm.name" class="itemIn"></el-input>
        <span class="tit">提现单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="DebitForm.withdrawSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">充值费率：</span>
        <el-input :disabled="disabledbo" v-model="DebitForm.rechargeRate" class="itemIn"></el-input>
        <span class="tit">充值单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="DebitForm.rechargeSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">代付费率：</span>
        <el-input :disabled="disabledbo" v-model="DebitForm.payoutRate" class="itemIn"></el-input>
        <span class="tit">代付单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="DebitForm.payoutSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- <el-checkbox class="itemTit" v-model="types.Credit">Credit</el-checkbox> -->
    <span class="itemTit">Credit :</span>
    <el-form
      :model="CreditForm"
      ref="CreditForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <el-form-item prop="name">
        <span class="tit">收款费率：</span>
        <el-input :disabled="disabledbo" v-model="CreditForm.rate" class="itemIn"></el-input>
        <span class="tit">收 款 通 道：</span>
        <el-select :disabled="disabledbo" v-model="CreditForm.channelId" placeholder="请选择">
          <el-option
            v-for="(item, index) in paychannels"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">提现费率：</span>
        <el-input :disabled="disabledbo" v-model="CreditForm.name" class="itemIn"></el-input>
        <span class="tit">提现单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="CreditForm.withdrawSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">充值费率：</span>
        <el-input :disabled="disabledbo" v-model="CreditForm.rechargeRate" class="itemIn"></el-input>
        <span class="tit">充值单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="CreditForm.rechargeSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <span class="tit">代付费率：</span>
        <el-input :disabled="disabledbo" v-model="CreditForm.payoutRate" class="itemIn"></el-input>
        <span class="tit">代付单笔费：</span>
        <el-input :disabled="disabledbo"
          v-model="CreditForm.payoutSingleCharge"
          class="itemIn"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { paychannels } from "@/util/select";
export default {
  props: {
    dialogForm: Object,
    disabledbo: Boolean,
  },
  data() {
    return {
      CreditForm: {},
      UPIForm: {},
      WalletForm: {},
      DebitForm: {},
      paychannels: paychannels,
    };
  },
  methods: {
    _resetFields() {
      this.$refs["CreditForm"].resetFields();
      this.$refs["UPIForm"].resetFields();
      this.$refs["WalletForm"].resetFields();
      this.$refs["DebitForm"].resetFields();
    },
  },
  created() {
    this.CreditForm = this.dialogForm.CreditForm;
    this.UPIForm = this.dialogForm.UPIForm;
    this.WalletForm = this.dialogForm.WalletForm;
    this.DebitForm = this.dialogForm.DebitForm;
  },
};
</script>

<style>
</style>