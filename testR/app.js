
  window.addEventListener('load', async () => {
    if ("serviceWorker" in navigator){
        try{
            const reg = await navigator.serviceWorker.register('/sw.js');
            console.log("success reg", reg);
        }
        catch(e){
            console.log("Sw reg error", e);
        }
    }
  })

