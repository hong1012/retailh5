const _ = {
  shouldRun:true,
  lastTime:0,
  timer:null,
  now(){
    return new Date().getTime();
  },
  throttle(func, wait){
    const now = this.now();
    if(now - this.lastTime - wait >= 0&& !this.timer){
      this.lastTime = now;
      func()
    } else {
      clearInterval( this.timer );
      this.timer = setTimeout(() => {
        this.lastTime = now;
        func()
        this.timer = null
      }, wait-(now - this.lastTime));
    }
  }
}
