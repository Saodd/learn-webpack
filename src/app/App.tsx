import * as React from "react";


export class App extends React.Component<any, any> {
    render() {
        return <div>
            <p>Hello, Lewin!</p>
            <MyButton/>
        </div>
    }
}

function MyButton() {
    const handleClick = React.useCallback(() => {
        for (let i = 0; i < 20; i++) {
            throttledApiCall({}).then(console.log)
        }
    }, [])
    return <button onClick={handleClick}>点击我！</button>
}


async function apiCall(params: any): Promise<any> {
    console.log("HTTP 请求……")
    await new Promise(r => setTimeout(r, 200))
    if (Math.random() < 0.2) throw '随机报错'
    return {data: "123"}
}

let queue: (() => void)[] = []

function throttledApiCall(params: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        queue.push(() => {  // 1. 将任务闭包推入队列。
            apiCall(params)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    queue.shift()
                    // 2. 任务完成后，要触发下一个任务。
                    if (queue.length) queue[0]()
                })
        })
        // 如果队列只有1个任务，额外触发一次
        if (queue.length === 1) queue[0]()
    })
}
