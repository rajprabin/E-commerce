const CONFIG = require('../configuration/config')
const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect(CONFIG.uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    
    }).then(()=>{
        console.log('DBConnectionEstablished.......')
    }).catch((err)=>{
        console.error('SomeThingFailed..',err)
    })
}

