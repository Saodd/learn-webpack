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
            throttledApiCall({i}).then(console.log)
        }
    }, [])
    return <button onClick={handleClick}>点击我！</button>
}


async function apiCall(params: any): Promise<any> {
    console.log("HTTP 请求……", params)
    await new Promise(r => setTimeout(r, 1000))
    if (Math.random() < 0.2) throw '随机报错'
    return {data: "123"}
}

let queue: (() => void)[] = []
let count = 0
const countLimit = 3

function throttledApiCall(params: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const task = () => {
            apiCall(params)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    if (queue.length) {
                        queue.shift()()
                    } else {
                        count--
                    }
                })
        }
        if (count < countLimit) {
            count++
            task()
        } else {
            queue.push(task)
        }
    })
}
