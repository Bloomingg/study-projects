import "./assets/css/index.css";
import "./assets/css/index.less";

const add = (a, b) => {
	return a + b;
};
const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(10);
	}, 1000);
});
console.log(add(1, 2));
console.log(p);

// import {sub} from "./test"  该方式会将test与index打包为同一个chunk
// 动态导入 能将导入的文件单独打包
// import("./test")
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

// 该方式可实现懒加载功能 即当文件需要使用时才加载
// 第一个参数为chunkName 第二参数为开启preFetch预加载
// 正常加载为并行加载 预加载等其他资源加载完毕后 浏览器空闲时加载
document.getElementById("app").onclick = () => {
	import(/* webpackChunkName: "test", webpackPrefetch: true */ "./test")
		.then(({ sub }) => console.log(sub(4, 2)))
		.catch((err) => console.log(err));
};
