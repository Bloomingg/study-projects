// 防抖函数
export function debounce(func, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
      // console.log(this);
    }, delay);
  };
}