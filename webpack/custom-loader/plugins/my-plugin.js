class Myplugin {
	apply(compiler) {
		complier.hooks.thisCompilation.tap("Myplugin", (compilation) => {
			console.log(compilation);
		});
	}
}
module.exports = Myplugin;
