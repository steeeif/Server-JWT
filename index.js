var app = require('./server.js')
var config = require('./config.js')

/*
 * Start server
 */
app.listen(config.PORT, () => console.log('running on port:' + config.PORT))
