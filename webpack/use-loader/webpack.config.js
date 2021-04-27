const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	//入口
	//单入口
	entry: "./src/index.js",
	// 多入口
	// entry: {
	// 	index: "./src/index.js",
	// 	test: "./src/test.js",
	// },
	//出口
	output: {
		//contenthash解决页面缓存导致不刷新问题
		filename: "[name].[contenthash:10].js",
		path: resolve(__dirname, "build"),
	},
	// loader
	module: {
		rules: [
			//详细loader配置
			{
				//匹配文件
				test: /\.css$/,
				//使用loader
				use: [
					//创建style标签 将js中的样式加入到header
					"style-loader",
					//将css文件变成commonjs模块加载到js中 里面的内容是样式字符串
					"css-loader",
				],
			},
			{
				//匹配文件
				test: /\.less$/,
				//使用loader
				use: [
					//创建style标签 将js中的样式加入到header
					// "style-loader",
					//将css抽取为单独文件 而非放入js中  避免js文件过大 避免从style标签引入闪屏问题
					miniCssExtractPlugin.loader,
					//将css文件变成commonjs模块加载到js中 里面的内容是样式字符串
					"css-loader",
					//将less编译为css
					"less-loader",
				],
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: "url-loader",
				options: {
					//图片大小小于8kb时 转换为base64编码
					// 优点 减少请求数量
					// 缺点 图片体积增大，加载时间变长
					limit: 8 * 1024,
					name: "[hash:10].[ext]",
					outputPath: "images",
				},
			},
			//js兼容性问题
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					//预设 指示babel做什么处理
					presets: [
						[
							"@babel/preset-env",
							{
								//按需加载
								useBuiltIns: "usage",
								// 指定core-js版本
								corejs: {
									version: 3,
								},
								//指定兼容到哪个版本的浏览器
								targets: {
									chrome: "60",
									firefox: "60",
									ie: "9",
									safari: "10",
								},
							},
						],
					],
				},
			},
		],
	},
	//plugins配置
	plugins: [
		new htmlWebpackPlugin({
			//以改文件为模板，自动引入打包输出的js/css资源
			template: "./src/index.html",
		}),
		// 提取css文件
		new miniCssExtractPlugin({
			filename: "css/main.css",
		}),
	],
	//模式 or production
	mode: "development",
	//开发服务器devServer 自动化编译
	// 只会在内存中编译打包，不会输出文件
	//webpack 4.x启动指令为 npx webpack-dev-server
	//5.x npx webpack serve
	devServer: {
		//启动路径
		contentBase: resolve(__dirname, "build"),
		//启用gzip
		compress: true,
		port: 3000,
		open: true,
	},
	//将node_module中代码单独打包一个chunk
	//自动分析多入口chunk中有无公共文件  若有会打包成一个单独chunk
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
};
