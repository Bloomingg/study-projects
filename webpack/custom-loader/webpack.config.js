const { resolve } = require("path");
const Myplugin = require("./plugins/my-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				// loader: resolve(__dirname,'loaders','my-loader'),
				loader: "my-loader",
				options: {
					name: "blooming",
				},
			},
		],
	},
	mode: "development",
	plugins: [new Myplugin()],
	//配置loader解析规则
	resolveLoader: {
		modules: ["node_modules", resolve(__dirname, "loaders")],
	},
};
