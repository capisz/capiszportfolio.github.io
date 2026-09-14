import {act,renderHook} from '@testing-library/react';
import useWelcome from './useWelcome';
beforeEach(()=>{jest.useFakeTimers();window.history.replaceState(null,'','#top');});
afterEach(()=>jest.useRealTimers());
const wheel=()=>{const event=new WheelEvent('wheel',{deltaY:80,cancelable:true});act(()=>window.dispatchEvent(event));return event;};
test('typing, badge hold and landing finish before welcome and input',()=>{
 const {result}=renderHook(()=>useWelcome(true));
 for(const [phase,duration] of [['knight',2200],['badges',3200],['departing',1100],['welcome',2400],['revealing',500]]){
  expect(result.current.phase).toBe(phase);
  act(()=>jest.advanceTimersByTime(duration-1));expect(result.current.phase).toBe(phase);
  act(()=>jest.advanceTimersByTime(1));
 }
 expect(result.current.phase).toBe('ready');expect(wheel().defaultPrevented).toBe(false);
});
test('scroll cannot truncate typing or landing and preserves a readable badge hold',()=>{
 const {result}=renderHook(()=>useWelcome(true));
 for(let i=0;i<50;i++)expect(wheel().defaultPrevented).toBe(true);
 act(()=>jest.advanceTimersByTime(2199));expect(result.current.phase).toBe('knight');
 act(()=>jest.advanceTimersByTime(1));expect(result.current.phase).toBe('badges');
 for(let i=0;i<50;i++)wheel();
 act(()=>jest.advanceTimersByTime(2599));expect(result.current.phase).toBe('badges');
 act(()=>jest.advanceTimersByTime(1));expect(result.current.phase).toBe('departing');
 for(let i=0;i<50;i++)wheel();
 act(()=>jest.advanceTimersByTime(1099));expect(result.current.phase).toBe('departing');
 act(()=>jest.advanceTimersByTime(1));expect(result.current.phase).toBe('welcome');
});
test('touch cannot skip the typing stage',()=>{
 const {result}=renderHook(()=>useWelcome(true));
 const start=new Event('touchstart');Object.defineProperty(start,'touches',{value:[{clientY:300}]});act(()=>window.dispatchEvent(start));
 const move=new Event('touchmove',{cancelable:true});Object.defineProperty(move,'touches',{value:[{clientY:240}]});act(()=>window.dispatchEvent(move));
 expect(move.defaultPrevented).toBe(true);
 act(()=>jest.advanceTimersByTime(2199));expect(result.current.phase).toBe('knight');
 act(()=>jest.advanceTimersByTime(1));expect(result.current.phase).toBe('badges');
});
test.each(['Tab','Escape','End'])('%s bypasses the introduction without a keyboard trap',key=>{
 const {result}=renderHook(()=>useWelcome(true));act(()=>window.dispatchEvent(new KeyboardEvent('keydown',{key})));expect(result.current.phase).toBe('ready');
});
test('reduced motion, deep links and explicit skip never hold scrolling',()=>{
 const first=renderHook(()=>useWelcome(false));expect(first.result.current.phase).toBe('ready');first.unmount();
 window.history.replaceState(null,'','#work');const deep=renderHook(()=>useWelcome(true));expect(deep.result.current.phase).toBe('ready');deep.unmount();
 window.history.replaceState(null,'','#top');const skip=renderHook(()=>useWelcome(true));act(()=>skip.result.current.skip());expect(skip.result.current.phase).toBe('ready');
});
test('disabling motion or unmounting clears the scroll listeners',()=>{
 const {result,rerender,unmount}=renderHook(({motion})=>useWelcome(motion),{initialProps:{motion:true}});
 rerender({motion:false});expect(result.current.phase).toBe('ready');expect(wheel().defaultPrevented).toBe(false);unmount();expect(wheel().defaultPrevented).toBe(false);
});
