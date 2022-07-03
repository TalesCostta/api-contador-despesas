const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bancodados")
.then(()=>{
    console.log("Conexão está bem estabelecida...")
}).catch((err)=>{
    console.log("Erro de conexão");
    console.log(err)
})