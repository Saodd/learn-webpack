import * as React from "react";
import axios from "axios";
import P1 from "../assets/1.png"


export class App extends React.Component<any, any> {
    render() {
        return <div>
            <p>Hello, Lewin!</p>
            <MyButton/>
            <a href={P1} download>下载图片</a>
        </div>
    }
}

// 当图片跨域时，在a标签中指定download属性无效，chrome依然会在新窗口中打开图片而不是下载。
function MyButton() {
    const handleClick = React.useCallback(() => {
        axios({
            url: "https://img.alicdn.com/bao/uploaded/i4/696944147/O1CN01AiO6Ao1gVNA1UpjFa_!!696944147.png_70x70.jpg",
            responseType: 'blob'  // 必须指定类型，否则会以字符串返回
        }).then(resp => {
            const data: Blob = resp.data  // 可选，便于类型提示

            // 模拟点击下载事件
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(data);
            link.download = 'lewin-20210624.png';
            link.click();
            window.URL.revokeObjectURL(link.href);
        })
    }, [])
    return <button onClick={handleClick}>点击我！</button>
}
