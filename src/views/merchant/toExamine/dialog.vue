<template>
  <div id="dialog">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
    >
      <div
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.payTypeID"
      >
        <span class="itemTit">{{ domain.name }} :</span>
        <el-form-item :prop="'domains.' + index + '.rate'">
          <span class="tit">收款费率：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.rate"
            class="itemIn"
          ></el-input
          >
          <span class="tit">收 款 通 道：</span>
          <el-select
            :disabled="disabledbo"
            v-model="domain.channelId"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in paychannels"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="withdrawRate">
          <span class="tit">提现费率：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.withdrawRate"
            class="itemIn"
          ></el-input
          >
          <span class="tit">提现单笔费：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.withdrawSingleCharge"
            class="itemIn"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rechargeRate">
          <span class="tit">充值费率：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.rechargeRate"
            class="itemIn"
          ></el-input
          >
          <span class="tit">充值单笔费：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.rechargeSingleCharge"
            class="itemIn"
          ></el-input>
        </el-form-item>
        <el-form-item prop="payoutRate">
          <span class="tit">代付费率：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.payoutRate"
            class="itemIn"
          ></el-input
          >
          <span class="tit">代付单笔费：</span>
          <el-input
            :disabled="disabledbo"
            v-model="domain.payoutSingleCharge"
            class="itemIn"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { paychannels, domains } from "@/util/select";
import { paytype } from "@/axios/api";
export default {
  props: {
    disabledbo: Boolean,
  },
  data() {
    return {
      paychannels: paychannels,
      dynamicValidateForm: {
        domains: domains,
      },
    };
  },
  methods: {
    peiRate(retas) {
      for (let i = 0; i < retas.length; i++) {
        for (let k = 0; k < domains.length; k++) {
          if (domains[k].payTypeID == retas[i].payTypeID) {
            for (const key in domains[k]) {
              if (key != "name") {
                domains[k][key] = retas[i][key];
              }
            }
          }
        }
      }
    },
  },
  created() {
    // this.peiRate();
  },
};
</script>

<style>
</style>