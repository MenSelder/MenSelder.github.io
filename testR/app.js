// v1 - minin

  // window.addEventListener('load', async () => {
  //   if ("serviceWorker" in navigator){
  //       try{
  //           const reg = await navigator.serviceWorker.register('/sw.js');
  //           console.log("success reg", reg);
  //       }
  //       catch(e){
  //           console.log("Sw reg error", e);
  //       }
  //   }
  // })

  // v2

  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator){
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('SW registred', registration);
        })
        .catch(error => {
          console.log('SW reg failed', error);
        })
    }
  });

