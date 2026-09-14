// One budget for every demo, including play requests still awaiting a browser promise.
export function createPlaybackCoordinator() {
  const entries = new Map();
  const paused = new Set();
  let automatic = true;
  let hidden = false;
  function retryTransientPlay(e) {
    if(e.retryTimer)return;
    if(e.transientRetries>=2){e.blocked=true;e.notify('blocked');reconcile();return;}
    e.transientRetries++;
    const generation=e.generation;
    e.retryTimer=setTimeout(()=>{
      e.retryTimer=null;
      if(entries.get(e.id)!==e||generation!==e.generation)return;
      reconcile();
    },120*e.transientRetries);
  }
  function stop(e) {
    if(!e.video.paused) e.ignorePause++;
    e.video.pause();
  }
  function reconcile() {
    const candidates = [...entries.values()].filter(e => !hidden && !paused.has(e.id) && !e.failed && !e.blocked && e.ratio > 0 && (e.explicit || (automatic && e.auto && e.ratio >= .5)));
    candidates.sort((a,b) => Number(b.explicit)-Number(a.explicit) || b.ratio-a.ratio || a.distance-b.distance);
    const winners = new Set(candidates.slice(0,2));
    entries.forEach(e => {
      if (!winners.has(e) && e.desired) {e.desired=false; e.generation++; stop(e);}
    });
    winners.forEach(e => {
      if (e.desired) return;
      e.desired=true;
      const generation=++e.generation;
      Promise.resolve(e.video.play()).then(() => {
        e.transientRetries=0;
        if (!e.desired || !entries.has(e.id)) stop(e);
      }).catch(error => {
        if (generation !== e.generation) return;
        e.desired=false;
        if (error?.name === 'AbortError') {retryTransientPlay(e);return;}
        e.blocked=true;
        e.notify('blocked');
        reconcile();
      });
    });
  }
  return {
    register(id,video,notify) {
      const e={id,video,notify,ratio:0,distance:Infinity,auto:true,explicit:false,desired:false,blocked:false,failed:false,generation:0,ignorePause:0,transientRetries:0,retryTimer:null};
      entries.set(id,e);
      return () => {e.desired=false;e.generation++;clearTimeout(e.retryTimer);video.pause();if(entries.get(id)===e)entries.delete(id);reconcile();};
    },
    update(id,values) {const e=entries.get(id);if(!e)return;Object.assign(e,values);if(e.ratio===0||values.auto===false){e.explicit=false;e.transientRetries=0;clearTimeout(e.retryTimer);e.retryTimer=null;}reconcile();},
    play(id) {const e=entries.get(id);if(!e)return;paused.delete(id);e.explicit=true;e.blocked=false;e.transientRetries=0;clearTimeout(e.retryTimer);e.retryTimer=null;reconcile();},
    pause(id) {paused.add(id);const e=entries.get(id);if(e)e.explicit=false;reconcile();},
    nativePause(id) {const e=entries.get(id);if(e?.ignorePause){e.ignorePause--;return;}if(e?.desired)this.pause(id);},
    nativePlay(id,fromControls=false) {const e=entries.get(id);if(e&&!e.desired){stop(e);if(fromControls)this.play(id);}},
    refreshPositions(height) {entries.forEach(e=>{if(e.ratio>0){const r=e.video.getBoundingClientRect();e.distance=Math.abs(r.top+r.height/2-height/2);}});reconcile();},
    configure(values) {if('automatic' in values)automatic=values.automatic;if('hidden' in values)hidden=values.hidden;reconcile();},
  };
}
