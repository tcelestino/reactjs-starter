var app         = require('connect')(),
    server      = require('serve-static');

app.use(server('.'))
app.listen(3000)
console.log(' ➜   Open: http://localhost:3000')

