import {act,renderHook} from '@testing-library/react';
import useWelcome from './useWelcome';
beforeEach(()=>{jest.useFakeTimers();window.history.replaceState(null,'','#top');});
afterEach(()=>jest.useRealTimers());
const wheel=()=>{const event=new WheelEvent('wheel',{deltaY:80,cancelable:true});act(()=>window.dispatchEvent(event));return event;};
test('welcome automatically reveals and releases scrolling within 4400ms',()=>{
 const {result}=renderHook(()=>useWelcome(true));expect(result.current.phase).toBe('welcome');
 act(()=>jest.advanceTimersByTime(2800));expect(result.current.phase).toBe('revealing');
 act(()=>jest.advanceTimersByTime(1600));expect(result.current.phase).toBe('ready');expect(wheel().defaultPrevented).toBe(false);
});
test('scroll accelerates reveal and is held only until the form is visible',()=>{
 const {result}=renderHook(()=>useWelcome(true));expect(wheel().defaultPrevented).toBe(true);expect(result.current.phase).toBe('revealing');
 act(()=>jest.advanceTimersByTime(300));expect(wheel().defaultPrevented).toBe(true);
 act(()=>jest.advanceTimersByTime(1300));expect(result.current.phase).toBe('ready');expect(wheel().defaultPrevented).toBe(false);
});
test('touch scroll accelerates while pinch remains available',()=>{
 const {result}=renderHook(()=>useWelcome(true));
 const start=new Event('touchstart');Object.defineProperty(start,'touches',{value:[{clientY:300}]});act(()=>window.dispatchEvent(start));
 const move=new Event('touchmove',{cancelable:true});Object.defineProperty(move,'touches',{value:[{clientY:240}]});act(()=>window.dispatchEvent(move));
 expect(move.defaultPrevented).toBe(true);expect(result.current.phase).toBe('revealing');
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
