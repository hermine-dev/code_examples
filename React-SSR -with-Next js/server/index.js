const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const next = require('next');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const passport = require('./passport');
const { JWT_STRATEGIES } = require('./constants');


require('./db'); // Initialize the DB connection

app.prepare().then(() => {
    const server = express();
    server.use(express.static('uploads'));
    server.use('/static', express.static('static'));
    server.use('/_next', express.static('.next'));
    server.use(cookieParser());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());
    server.use(passport.initialize());
    // Require our routes into the application.
    server.use('/api/v1',(req, res, next) => {
        passport.authenticate(JWT_STRATEGIES.LOCAL, { session: false }, (err, user) => {
            if (!err && user) {
                req.user = user;
            }
            next();
        })(req, res, next);
    });
    require('./routes')(server, passport);

    server.get('*', (req, res) => {
        // console.log(req.url);
        return handle(req, res);
    });

    try{
        const httpServer = http.createServer(server); // todo maybe when using https we need to change this
        require('./socket')(httpServer, server); // important for use real time notifications or messages
        httpServer.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on ${process.env.REMOTE_IP}:${port}`);
        });
    }catch (e) {
        console.log('socket error: ', e);
    }
});
