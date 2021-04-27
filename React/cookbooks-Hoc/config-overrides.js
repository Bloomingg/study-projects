const {
	override,
	fixBabelImports,
	addWebpackResolve,
	addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
	//按需加载
	fixBabelImports("import", {
		libraryName: "antd-mobile",
		style: "css",
	}),
	addWebpackResolve({
		extensions: [".js", ".json", ".jsx"],
	}),
	addWebpackAlias({
		"@": path.resolve(__dirname, "src/"),
		"@i": path.resolve(__dirname, "src/assets/images/"),
		"@c": path.resolve(__dirname, "src/components/"),
		"@u": path.resolve(__dirname, "src/utils/"),
	})
);
