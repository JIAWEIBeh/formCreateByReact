import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/share.css';
import * as util from './utils/utils'
import Home from './Component/Home';
//import Move from './Component/Move';
import Preview from './Component/Preview';
import FormatText from './Component/FormatText';
import DraggerTest from './Component/DraggerTest';
import DraggerSort from './Component/DraggerTest/DraggerSort';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import * as Bootstrap from 'react-bootstrap';
import * as Antd from 'antd';

window.Bootstrap = Bootstrap;
window.Antd = Antd;
let hashName = util.getHashName()
let ApplyComponent;
if(hashName === 'home'){
    ApplyComponent = Home;
}else if(hashName === 'preview'){
    ApplyComponent = Preview;
}else if(hashName === 'format'){
    ApplyComponent = FormatText;
}else if(hashName === 'draggertest'){
    if(util.getHashUrlParams('type') === 'list'){
        ApplyComponent = DraggerSort
    }else{
        ApplyComponent = DraggerTest;
    }
}else{
    ApplyComponent = Home;
}

ReactDOM.render(<ApplyComponent></ApplyComponent>, document.getElementById('root'));
