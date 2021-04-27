const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3001;

let globalData = [];

const loginUtils = (w) => {
	const DbData = fs.readFileSync("./user.json").toString();
	globalData = JSON.parse(DbData);
	return globalData.find(
		(u) => u.username == w.username && u.password == w.password
	);
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("hello");
	console.log();
});
app.post("/login", ({ body }, res) => {
	const isRegis = loginUtils(body);
	console.log(isRegis);
	if (isRegis) {
		res.send({
			suc: true,
			msg: "success",
			data: isRegis,
		});
	} else {
		res.send({ suc: false, msg: "Invalid username or password" });
	}
});

app.post("/register", (req, res) => {
	console.log(req.body);
	const { username, password } = req.body;
	if (username && password) {
		const data = {
			token: username + new Date().getTime(),
			username,
			password,
		};
		const DbData = fs.readFileSync("./user.json").toString();
		globalData = JSON.parse(DbData);
		globalData.push(data);
		console.log(globalData);
		fs.writeFile("./user.json", JSON.stringify(globalData), (err, data) => {
			console.log(err);
		});
		// globalData.user.push({ username, password });
		res.send({
			suc: true,
			msg: "success",
			data,
		});
	} else {
		res.send({ suc: false, msg: "Invalid username or password" });
	}
});

app.listen(port);
