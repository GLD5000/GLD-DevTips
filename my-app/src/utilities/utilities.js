export function throttle(callbackFunction, delayTime = 250) {
    let execute = true;
    let waitingArgs;
    const waitHandler = () => {
      if (waitingArgs == null) {
        execute = true;
      } else {
        callbackFunction(...waitingArgs);
        //callbackFunction(waitingArgs);
        waitingArgs = null;
        setTimeout(waitHandler, delayTime);
      }
    };
    return (...args) => {
      if (execute === false) {
        waitingArgs = args;
        return;
      } // do not run function

      callbackFunction(args); // run function

      execute = false; // already run

      setTimeout(waitHandler, delayTime); // reset
    };
  }