export default function animate(obj, target, callback) {
  clearInterval(obj.timer);

  obj.timer = setInterval(function() {
    let step = (window.pageYOffset - target) / 10;
    // step = step > 0 ? Math.ceil(step) : Math.floor(step);
    step=Math.ceil(step)
    if (window.pageYOffset == target) {
      clearInterval(obj.timer);
      callback && callback();
    }
    // console.log(window.pageYOffset);
    // console.log(step);
    window.scroll(0, window.pageYOffset - step);
  }, 15);
}
