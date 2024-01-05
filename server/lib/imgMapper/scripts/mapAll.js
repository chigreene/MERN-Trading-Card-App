const path = require('path')
const { ImgMapper } = require('../imgMapper.js');

(async function(){
    try{
        const waiter = await ImgMapper.init();
    } catch(err){
        console.error("Error mapping images.", err)
    }
})();