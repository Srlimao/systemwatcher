const { ipcRenderer } = require('electron');
const { cpu } = require('systeminformation');
const cpuModule = require('./cpuModule');

let spanCpuLoad = document.querySelector('#cpu-total-load');
let divCoresLoad = document.querySelector('#cpu-info-left');
let divCoresTemp = document.querySelector('#cpu-info-right')
let divMainCpu = document.querySelector('.container');
let h1CpuName = document.querySelector('#cpu-name');
let cpuNameLoad = document.querySelector('#cpu-name-load');

window.onload = () => {    
    cpuModule.setCpuName(h1CpuName);
    cpuModule.populateList(divCoresLoad,divCoresTemp,cpuNameLoad);
}
