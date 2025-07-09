#!/usr/bin/env node

import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set('views', './views');

http.createServer(app).listen(3000);
console.log("listening on port 3000");

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.redirect(303, "/login-page.html");
});

app.get('/login-request', (req, res) => {
    const challenge = "should-be-random";
    const callbackURL = "http:/192.249.127.29/presentation-response";
    res.render("redirection-to-issuer.handlebars", {
        challenge: challenge,
	callbackURL: callbackURL
    });
});

app.use((req, res) => {
    res.status(404).send('NOT FOUND');
});
app.use((err, req, res, next) => {
    console.log("Error: " + err.stack);
    res.status(500).send('INTERNAL ERROR');
});
