const express = require('express');
const app = express();
const port = process.env.PORT || 8010;
const rotas = require("./Routers/Route");

require("./DBConnection/conn");

app.use(express.json())
app.use(rotas)

app.listen(port, () => {
    console.log(`Conexão estabelecida na porta ${port}`);
})