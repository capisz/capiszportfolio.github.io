import {createPlaybackCoordinator} from './playback';
const flush=()=>Promise.resolve().then(()=>Promise.resolve());
function setup(){
 const manager=createPlaybackCoordinator();
 const videos={};
 const add=(id,ratio=1,distance=100)=>{
  const video={play:jest.fn(()=>Promise.resolve()),pause:jest.fn()};videos[id]=video;
  const remove=manager.register(id,video,jest.fn());manager.update(id,{ratio,distance});return remove;
 };
 return {manager,videos,add};
}
test('two-slot budget prioritizes visibility and then viewport center',()=>{
 const {manager,add,videos}=setup();add('a',.7,20);add('b',.8,200);add('c',.8,10);
 expect(videos.a.pause).toHaveBeenCalled();expect(videos.b.play).toHaveBeenCalledTimes(1);expect(videos.c.play).toHaveBeenCalledTimes(1);
 manager.play('a');expect(videos.b.pause).toHaveBeenCalled();expect(videos.a.play).toHaveBeenCalledTimes(2);
});
test('manual pause survives leaving, reentry, and unregistering',()=>{
 const {manager,add,videos}=setup();const remove=add('a');manager.pause('a');manager.update('a',{ratio:0});manager.update('a',{ratio:1});expect(videos.a.play).toHaveBeenCalledTimes(1);
 remove();add('a');expect(videos.a.play).not.toHaveBeenCalled();manager.play('a');expect(videos.a.play).toHaveBeenCalledTimes(1);
});
test('offscreen and hidden tabs stop playback; reduced motion retains explicit play',()=>{
 const {manager,add,videos}=setup();manager.configure({automatic:false});add('a');expect(videos.a.play).not.toHaveBeenCalled();manager.play('a');expect(videos.a.play).toHaveBeenCalledTimes(1);
 manager.configure({hidden:true});expect(videos.a.pause).toHaveBeenCalled();manager.configure({hidden:false});expect(videos.a.play).toHaveBeenCalledTimes(2);
 manager.update('a',{ratio:0});manager.update('a',{ratio:1});expect(videos.a.play).toHaveBeenCalledTimes(2);
});
test('autoplay requires at least half visibility and is stopped during matching',()=>{
 const {manager,add,videos}=setup();add('a',.49);expect(videos.a.play).not.toHaveBeenCalled();manager.update('a',{ratio:.5});expect(videos.a.play).toHaveBeenCalledTimes(1);manager.update('a',{auto:false});expect(videos.a.pause).toHaveBeenCalled();
});
test('blocked autoplay releases its slot and can be explicitly retried',async()=>{
 const manager=createPlaybackCoordinator();const notify=jest.fn();const video={play:jest.fn().mockRejectedValueOnce({name:'NotAllowedError'}).mockResolvedValue(),pause:jest.fn()};manager.register('a',video,notify);manager.update('a',{ratio:1});await flush();expect(notify).toHaveBeenCalledWith('blocked');manager.update('a',{ratio:1});expect(video.play).toHaveBeenCalledTimes(1);manager.play('a');expect(video.play).toHaveBeenCalledTimes(2);
});
test('transient aborted autoplay retries without manual input',async()=>{
 jest.useFakeTimers();
 const manager=createPlaybackCoordinator();const notify=jest.fn();const video={play:jest.fn().mockRejectedValueOnce({name:'AbortError'}).mockResolvedValue(),pause:jest.fn()};
 manager.register('a',video,notify);manager.update('a',{ratio:1});await flush();expect(video.play).toHaveBeenCalledTimes(1);
 jest.advanceTimersByTime(120);await flush();expect(video.play).toHaveBeenCalledTimes(2);expect(notify).not.toHaveBeenCalled();
 jest.useRealTimers();
});
test('a late play promise is paused after its slot has been revoked',async()=>{
 const manager=createPlaybackCoordinator();let resolve;const video={play:jest.fn(()=>new Promise(r=>resolve=r)),pause:jest.fn()};manager.register('a',video,jest.fn());manager.update('a',{ratio:1});manager.update('a',{ratio:0});resolve();await flush();expect(video.pause).toHaveBeenCalledTimes(2);
});
test('delayed native play events cannot restart an offscreen video',()=>{
 const {manager,add,videos}=setup();add('a');manager.update('a',{ratio:0});manager.nativePlay('a');expect(videos.a.play).toHaveBeenCalledTimes(1);expect(videos.a.pause).toHaveBeenCalledTimes(2);
});
test('a programmatic pause event does not become a remembered user pause',()=>{
 const {manager,add,videos}=setup();add('a');manager.update('a',{ratio:0});manager.nativePause('a');manager.update('a',{ratio:1});expect(videos.a.play).toHaveBeenCalledTimes(2);
});
