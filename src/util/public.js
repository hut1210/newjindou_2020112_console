// 图片下载
export function downloadByBlob(imgsrc, name) { // 下载图片地址和图片名
    // let image = new Image();
    // // 解决跨域 Canvas 污染问题
    // image.setAttribute("crossOrigin", "anonymous")
    // image.onload = function () {
    //     let canvas = document.createElement("canvas")
    //     canvas.width = image.width
    //     canvas.height = image.height
    //     let context = canvas.getContext("2d")
    //     context.drawImage(image, 0, 0, image.width, image.height)
    //     let url = canvas.toDataURL("image/png") //得到图片的base64编码数据
    //     let a = document.createElement("a") // 生成一个a元素
    //     let event = new MouseEvent("click") // 创建一个单击事件
    //     a.download = name || "photo" // 设置图片名称
    //     a.href = url // 将生成的URL设置为a.href属性
    //     a.dispatchEvent(event) // 触发a的单击事件
    // }
    // image.src = imgsrc

    let eleLink = document.createElement('a')
    eleLink.setAttribute("download", "")
    eleLink.href = imgsrc
    eleLink.target = "_blank"
    eleLink.click()
    eleLink.remove()
}


export function getTodayTimes() {
    let myDate = new Date(); //获取当前年份(2位)
    let year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    let month = ("0" + (myDate.getMonth() + 1)).slice(-2); //获取当前月份(0-11,0代表1月)
    let day = myDate.getDate(); //获取当前日(1-31)
    return year + '-' + month + "-" + day;
}

// 下载文件方法 
export function downloadDoc(content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename + ".csv";
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址 
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 自动触发点击 
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除 
    document.body.removeChild(eleLink);
};

export const Mul = (num1, num2) => {
    let m = 0,
        s1 = `${num1}`,
        s2 = `${num2}`
    try {
        m += s1.split('.')[1].length
    } catch (e) {}
    try {
        m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) *
        Number(s2.replace('.', '')) /
        Math.pow(10, m)
}

export const Add = (num1, num2) => {
    let r1, r2, m
    try {
        r1 = `${num1}`.split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = `${num2}`.split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return Math.round(num1 * m + num2 * m) / m
}