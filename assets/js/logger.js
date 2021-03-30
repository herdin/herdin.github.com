const logger = (function(){
  let level = 0;
  function active(levelValue = 1) {
    level = levelValue;
  }
  function deactive() {
    level = 0;
  }
  function log(text, obj) {
    if(level > 0) {
        (obj)?
        console.log(text, obj) :
        console.log(text)      ;
    }
  }
  function trace(text, obj) {
    if(level > 1) {
        (obj)?
        console.log(text, obj) :
        console.log(text)      ;
    }
  }
  return {
      active: active,
      deactive: deactive,
      log: log,
      trace: trace,
  };
})();
