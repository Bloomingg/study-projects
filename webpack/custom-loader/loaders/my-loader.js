const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");
const schema = require("./schema.json");

module.exports = function (content, map, meta) {
	console.log("my loader");

	//获取options
	const options = getOptions(this);
	//检测options是否合法
	validate(schema, options, {
		name: "my-loader",
	});
	console.log(options);

	// 同步loader
	// return content;
	// this.callback(null, content, map, meta);

	// 异步loader
	const callback = this.async();
	setTimeout(() => {
		callback(null, content);
	}, 1000);
};
//pitch方法从上往下执行完成后loader函数从下往上执行
module.exports.pitch = function () {
	console.log("pitch");
};
