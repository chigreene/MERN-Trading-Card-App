const fs = require('fs').promises;
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

class ImgMapper{
    static async init(){
        const imgFiles = await fs.readdir(path.join(__dirname, './resources/source_imgs/'), (err, files)=>{
            if (err){
                console.error("An error has occured while reading directory", err);
            } else {
                return files;
            }
        })
        console.log(imgFiles)
        const mapFiles = await fs.readdir(path.join(__dirname, './resources/temp_maps/'), (err, files)=>{
            if (err){
                console.error("An error has occured while reading directory", err);
            } else {
                return files;
            }
        });
        imgFiles.forEach((file)=>{
            if (!mapFiles.includes(file.replace('.png', '.json'))){
                const newMap = new ImgMapper(file).imageMapper()
            }
        })
        // console.log(mapFiles)
    };
    static instances = [];
    static clearInstances(){
        this.instances=[];
    }
    constructor(filename){
        if (!filename.includes('.png')){
            throw new Error('Image files must be PNG files and end in a .png file extension.')
        }
        this.filename = filename;
        this.imgPath = path.join(__dirname, `./resources/source_imgs/${filename}`)
        this.mapPath = path.join(__dirname, `./resources/temp_maps/${filename.replace('.png', '.json')}`)
        this.colorGroups = [];
        ImgMapper.instances.push(this);
    };
    async imageMapper(){
        const img = dom.window.document.createElement('img');
        img.setAttribute('src', this.imgPath);
        for(let y=0; y<img.height; y++){
            for(let x=0; x<img.width; x++){
                const getData = img.getcontext('2d').getImageData(x, y, img.width, img.height).data;
                if(getData){
                    const initColors = this.colorGroups.map(group=>group.initColor)
                    if (getData && !initColors.includes(getData)){
                        this.colorGroups.push({
                            tagNo: this.colorGroups.length,
                            initColor: getData,
                            children: []
                        });
                    };
                    this.colorGroups[initColors.indexOf(getData)].children.push({
                        x,
                        y,
                        clr: getData,
                        colorTag: this.colorGroups[initColors.indexOf(getData)].tagNo
                    });
                };
                
            };
        };
        const waiter = await fs.writeFile(this.mapPath, JSON.stringify(this.colorGroups))
    };
    async mapReader(){
        const waiting = await fs.readFile(this.mapPath, 'utf8', (err, data)=>{
            if (err){
                console.log(err);
            } else {
                this.colorGroups = JSON.parse(data);
            }
        })
    }

    async setColor(colorGroup, input){
        colorGroup.children.forEach((pixel)=>{
            pixel.clr=input;
        });
        // Database standin
        const waiter = await fs.writeFile(`${imgStr}.json`, JSON.stringify(this.colorGroups))
        return
    }
    async resetColor(colorGroup){
        colorGroup.children.forEach((pixel)=>{
            pixel.clr=colorGroup.initColor;
        });
        // Database standin
        const waiter = await fs.writeFile(`${imgStr}.json`, JSON.stringify(this.colorGroups))
        return
    }
}

module.exports = { ImgMapper };