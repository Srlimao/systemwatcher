const {ipcRenderer } = require('electron');
const si = require('systeminformation');

let spanCpuLoad = document.querySelector('#cpu-total-load');
let divCoresLoad = document.querySelector('#cores-load-list');
let divMainCpu = document.querySelector('.container');

window.onload = function(){
    SetCpuLoad();
};

function SetCpuLoad(){
    setInterval(() => {
        si.currentLoad()
            .then((data) => {
                spanCpuLoad.textContent = Math.round(data.currentload) + '%';
                //UpdateCoreLoadList(data);
            })
            .catch(error => spanCpuLoad.textContent = error);
      },  500);
}

function UpdateCoreLoadList(data){
    let list = document.createElement('ul');
    let item;
    data.cpus.forEach((element,index) => {
        item = document.createElement('li');
        item.appendChild(document.createTextNode('Core #'+ (index+1) + ': ' + Math.round(element.load) + '%'));
        //ipcRenderer.send('console-log',element);
        list.appendChild(item);
    });
    divCoresLoad.replaceChild(list,divCoresLoad.childNodes[0]);
    ipcRenderer.send('console-log',divMainCpu.style.height);
    divMainCpu.style.height = divCoresLoad.style.height;

}
