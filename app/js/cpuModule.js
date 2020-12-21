const {ipcRenderer } = require('electron');
const si = require('systeminformation');

module.exports = {

    setCpuName(el){
        si.cpu().then(data=> el.textContent = data.manufacturer + ' ' + data.brand);
    },

    populateList(listLoadElement,listTempElement,titleElement){
        setInterval(() => {
            si.currentLoad()
                .then((data) => {
                    titleElement.textContent =  'Usage: '+ Math.round(data.currentload) + '%';
                    this.UpdateCoreLoadList(data,listLoadElement);
                })
                .catch(error => console.log(error));
            si.cpuTemperature()
                .then((data) => {
                    this.UpdateCoreTempList(data,listTempElement);
                })
                .catch(error=>console.error(error));
          },  500);
    },

    UpdateCoreLoadList(data,listElement){
        let list = document.createElement('ul');
        let item;
        data.cpus.forEach((element,index) => {
            item = document.createElement('li');
            item.appendChild(document.createTextNode('Core #'+ (index+1) + ': ' + Math.round(element.load) + '%'));
            //ipcRenderer.send('console-log',element);
            list.appendChild(item);
        });
        listElement.replaceChild(list,listElement.childNodes[0]);
    
    },

    UpdateCoreTempList(data,listElement){
        let list = document.createElement('ul');
        let item;
        console.log(data);
        data.cores.forEach((element,index) => {
            item = document.createElement('li');
            //item.appendChild(document.createTextNode('Core #'+ (index+1) + ': ' + Math.round(element.load) + 'ºC'));
            list.appendChild(item);
        });
        listElement.replaceChild(list,listElement.childNodes[0]);
    }
}
