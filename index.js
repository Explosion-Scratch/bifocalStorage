const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const cors = require("cors");
app.use(cors());
const fs = require("fs");

app.get("/", (req, res) => {
	res.status(200).type("text/plain").send("Cross origin localStorage. See https://storage.explosionscratc.repl.co/__repl for the code, and browser.js in that for a script to use it.")
})
app.get('/get/:id', (req, res) => {
  res.json(require("./storage.json")[u(req)] || "")
});
app.get("/delete/:id", (req,res) => {
	var current = require("./storage.json");
	delete current[u(req)];
	fs.writeFileSync("./storage.json", JSON.stringify(current, null, 2));
	res.json(current[u(req)])
})
app.get("/set/:id", (req, res) => {
	var current = require("./storage.json");
	current[u(req)] = req.query.q || req.query.val;
	fs.writeFileSync("./storage.json", JSON.stringify(current, null, 2));
	res.json(current[u(req)])
})
app.listen(3000, () => {
  console.log('server started');
});

function u(req){
	return hash(`${req.headers['user-agent']}`).toString(36) + hash(req.params.id).toString(36)
}
const hash = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};