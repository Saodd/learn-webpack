import * as ReactDOM from "react-dom";
import * as React from 'react';

import {App} from "./app/App";
import './index.css'


function main() {
    const d = document.createElement('div')
    document.body.appendChild(d)
    ReactDOM.render(<App/>, d)
}

main()
