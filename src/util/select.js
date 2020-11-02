import {
    paytype,
    paychannel
} from "@/axios/api";
export let _status_ = [{
        label: "正常",
        value: "1",
    },
    {
        label: "冻结",
        value: "0",
    }
];
export let registerStatue = [{
    label: "未签约",
    value: "0",
}, {
    label: "已签约",
    value: "1",
}, {
    label: "审核中",
    value: "2",
}, {
    label: "审核失败",
    value: "3",
}, ]
export let toExamineStatus = [{
    label: "未签约",
    value: "0",
}, {
    label: "已签约",
    value: "1",
}, {
    label: "审核中",
    value: "2",
}, {
    label: "审核失败",
    value: "3",
}];
export let paymentStatus = [{
    label: "审批中",
    value: "0",
}, {
    label: "支付完成",
    value: "1",
}, {
    label: "审核不通过",
    value: "2",
}, {
    label: "审核通过",
    value: "3",
}, {
    label: "支付处理中",
    value: "4",
}, {
    label: "支付处理失败",
    value: "5",
}];
export let _paymentStatus = [{
    label: "等待处理中",
    value: "0",
}, {
    label: "处理成功",
    value: "1",
}, {
    label: "失败",
    value: "2",
}];
export let withdrawalStatus = [{
    label: "待审核",
    value: "1",
}, {
    label: "审核通过，通道提现中",
    value: "2",
}, {
    label: "提现成功",
    value: "3",
}, {
    label: "提现失败",
    value: "4",
}, {
    label: "审核拒绝",
    value: "5",
}]
export let orderStatus = [{
    label: "处理中",
    value: 0,
}, {
    label: "成功",
    value: 1,
}, {
    label: "失败",
    value: 2,
}]
// 0审核不通过，3审核通过，4支付处理中，5支付处理失败
export let rechargeStatus = [{
    label: "审批中",
    value: 0,
}, {
    label: "支付完成",
    value: 1,
}, {
    label: "审核不通过",
    value: 2,
}, {
    label: "审核通过",
    value: 3,
}, {
    label: "支付处理中",
    value: 4,
}, {
    label: "支付处理失败",
    value: 5,
}]

let domains = [];
let paytypes = [];
paytype().then((res) => {
    if (res.data.code == "1000") {
        let _paytype = res.data.result;
        for (let index = 0; index < _paytype.length; index++) {
            paytypes.push({
                value: _paytype[index].id,
                label: _paytype[index].name,
            });

            domains.push({
                payTypeID: _paytype[index].id,
                name: _paytype[index].name,
                rate: "0.05",
                channelId: "",
                payoutRate: "0.05",
                payoutSingleCharge: "10",
                withdrawRate: "0.18",
                payoutDeductionMethod: "0",
                withdrawSingleCharge: "2200",
                rechargeRate: "0",
                rechargeSingleCharge: "0",
            });
        }
    }
});

let paychannels = [];
paychannel().then((res) => {
    if (res.data.code == "1000") {
        let _paytype = res.data.result;
        for (let index = 0; index < _paytype.length; index++) {
            paychannels.push({
                value: String(_paytype[index].id),
                label: _paytype[index].name,
            });
        }
    }
});


export {
    paytypes,
    paychannels,
    domains
};