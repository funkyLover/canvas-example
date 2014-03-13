
var
    //http = require('http'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname));

//http.createServer(app).listen(8080);
app.listen(8080);