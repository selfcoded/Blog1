const express = require("express")

const app = express()

app.set('secret', 'sdaadaadadasdadad')
app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routers/admin')(app)

app.listen(3000,()=>{
    console.log('http');
    
})