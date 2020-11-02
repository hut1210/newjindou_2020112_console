<template>
  <div id="details">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="yetou">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商户详情 :</el-breadcrumb-item>
    </el-breadcrumb>

    <h3 class="toh3">商户认证信息:</h3>
    <el-divider></el-divider>
    <el-form label-position="right" label-width="200px" :model="formLabelAlign">
      <el-form-item class="elFor" label="公司名称：">
        <el-input disabled v-model="formLabelAlign.companyName"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="营业执照号码：">
        <el-input disabled v-model="formLabelAlign.bizCertifNo"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="法人姓名：">
        <el-input
          disabled
          v-model="formLabelAlign.representativeName"
        ></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="法人证件号码：">
        <el-input
          disabled
          v-model="formLabelAlign.representativeIds"
        ></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="商务联系人姓名：">
        <el-input disabled v-model="formLabelAlign.bizContactName"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="银行账户：">
        <el-input disabled v-model="formLabelAlign.bankCardId"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="注册地址：">
        <el-input disabled v-model="formLabelAlign.registeredAddr"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="经营地址：">
        <el-input disabled v-model="formLabelAlign.bizAddr"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="所属行业：">
        <el-input disabled v-model="formLabelAlign.industry"></el-input>
      </el-form-item>
      <el-form-item class="elFor" label="官网链接：">
        <el-input disabled v-model="formLabelAlign.website"></el-input>
      </el-form-item>
    </el-form>

    <h3 class="toh3">认证文件:</h3>
    <el-divider></el-divider>
    <el-form label-position="right" label-width="200px" :model="formLabelAlign">
      <el-form-item class="elFor" label="商户开户资料信息表：">
        <el-button type="text" @click="download('merchant')"
          >下载预览</el-button
        >
        <!-- <el-button type="text" @click="onSubmit('merchant')">预览</el-button> -->
      </el-form-item>
      <el-form-item class="elFor" label="公司营业执照/商业登记证：">
        <el-button type="text" @click="download('businessLicense')"
          >下载预览</el-button
        >
        <!-- <el-button type="text" @click="onSubmit('businessLicense')"
          >预览</el-button
        > -->
      </el-form-item>
      <el-form-item class="elFor" label="公司注册证书：">
        <el-button type="text" @click="download('register')"
          >下载预览</el-button
        >
        <!-- <el-button type="text" @click="onSubmit('register')">预览</el-button> -->
      </el-form-item>
      <el-form-item class="elFor" label="法人身份证：">
        <el-button type="text" @click="download('corporateIdentityCard')"
          >下载预览</el-button
        >
        <!-- <el-button type="text" @click="onSubmit('corporateIdentityCard')"
          >预览</el-button
        > -->
      </el-form-item>
      <el-form-item class="elFor" label="公司章程：">
        <el-button type="text" @click="download('constitution')"
          >下载预览</el-button
        >
        <!-- <el-button type="text" @click="onSubmit('constitution')"
          >预览</el-button
        > -->
      </el-form-item>
      <el-form-item class="elFor" label="银行账户：">
        <el-button type="text" @click="download('bankAccount')"
          >下载预览</el-button
        >
        <!-- <el-button type="text" @click="onSubmit('bankAccount')">预览</el-button> -->
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="text" @click="downloadAll">下载全部文件</el-button>
      </el-form-item> -->
    </el-form>

    <h3 class="toh3">开通业务:</h3>
    <el-divider></el-divider>

    <Dialog ref="_dialog" :disabledbo="disabledbo" />

    <div style="margin-top: 50px; padding-left: 115px; margin-bottom: 20px">
      <el-button size="medium" @click="$router.history.go(-1)">返回</el-button>

      <el-button size="medium" type="primary" @click="modifyBusiness()"
        >审核通过</el-button
      >
    </div>
    <!-- 弹窗  图片 -->
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleCloseM"
      style="text-align: center"
    >
      <el-image style="display: block" :src="detailurl"></el-image>
    </el-dialog>
  </div>
</template>

<script>
import { examinedetail, merchantpass } from "@/axios/api";
import { downloadByBlob } from "@/util/public";
import Dialog from "./dialog";
export default {
  components: { Dialog },
  data() {
    return {
      formLabelAlign: {
        name: "营业执照号码",
        region: "营业执照号码",
        type: "营业执照号码",
      },
      disabledbo: false,

      information: {},

      dialogVisible2: false,
      detailurl: "",

      file: {
        merchant: "",
        businessLicense: "",
        register: "",
        corporateIdentityCard: "",
        constitution: "",
        bankAccount: "",
      },
    };
  },
  methods: {
    modifyBusiness() {
      this._merchantpass();
    },
    detail(clientId) {
      examinedetail(clientId).then((res) => {
        if (res.data.code == "1000") {
          this.information = res.data.result;
          this.formLabelAlign = res.data.result.detail;
          this.file.merchant = res.data.result.certifFile.merchantInfoFile;
          this.file.businessLicense =
            res.data.result.certifFile.bizRegistCertificateFile;
          this.file.register =
            res.data.result.certifFile.certificateIncorporationFile;
          this.file.corporateIdentityCard = res.data.result.certifFile.idFile;
          this.file.constitution = res.data.result.certifFile.articlesFile;
          this.file.bankAccount = res.data.result.certifFile.bankAccountFile;
          if (res.data.result.rates) {
            this.$refs._dialog.peiRate(res.data.result.rates);
          }
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    handleCloseM() {
      this.dialogVisible2 = false;
      this.detailurl = "";
    },
    onSubmit(type) {
      this.dialogVisible2 = true;
      this.detailurl = this.file[type];
    },
    download(type) {
      downloadByBlob(this.file[type], "");
    },
    downloadAll() {
      let _file = this.file;
      for (const key in _file) {
        downloadByBlob(_file[key], "");
      }
    },
    _merchantpass() {
      let _rates = JSON.parse(
        JSON.stringify(this.$refs._dialog.dynamicValidateForm.domains)
      );
      for (let index = 0; index < _rates.length; index++) {
        delete _rates[index].name;
      }
      let datas = {
        mid: this.information.merchantId,
        countryCode: "IN",
        currency: "INR",
        bankCardNumber: "424316625234453653",
        rateList: _rates,
      };
      merchantpass(datas).then((res) => {
        if (res.data.code == 1000) {
          this.$message.success("操作成功");
          $router.history.go(-1)
        }
      });
    },
  },
  created() {
    this.detail(this.$route.query.clientId);
  },
};
</script>

<style lang="less" >
#details {
  .toh3 {
    font-weight: 500;
  }

  .elFor {
    margin-bottom: 15px;
  }

  .el-input.is-disabled .el-input__inner {
    border: 0px solid #ffffff !important;
    background-color: #fff;
    color: #000000;
  }

  .detailsBtn {
    width: 100%;
    padding-left: 180px;
    margin-bottom: 30px;
    .detailsBtn-btn {
      padding: 12px 30px;
      margin: 0 20px;
    }
  }

  .itemIn {
    width: 100px;
    margin: 0 10px;
  }

  .itemIn2 {
    width: 80px;
    margin: 0 10px;
  }

  .itemTit {
    width: 100px;
    position: relative;
    top: 25px;
    margin-left: 10px;
  }

  .tit {
    margin-left: 35px;
  }
  .marL {
    margin-left: 130px;
  }
}
</style>