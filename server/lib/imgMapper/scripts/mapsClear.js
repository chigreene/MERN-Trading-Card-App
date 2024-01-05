const fs = require('fs').promises
const path = require('path')
const { ImgMapper } = require('../imgMapper.js');

(async function clearer(){
    try{
        const mapFiles = await fs.readdir(path.join(__dirname, '../resources/temp_maps/'), (err, files)=>{
            if(err){
                console.error("Error reading directory", err);
            }else{
                return files;
            };
        });
        if (mapFiles){
            mapFiles.forEach(async (file) => {
                const deleter = await fs.unlink(path.join(__dirname, `../resources/temp_maps/${file}`), (err)=>{
                    console.error('Failed to delete maps.', err);
                });
            })
        };
        ImgMapper.clearInstances();
        console.log('Maps cleared.')
    } catch (err){
        console.error("An error has occured.", err);
    }
})();