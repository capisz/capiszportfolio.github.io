import {renderHook,act} from '@testing-library/react';
import {useMotionPreferences} from './motion';
let listener;
beforeEach(()=>{
  localStorage.clear();
  window.matchMedia=jest.fn(()=>({matches:true,addEventListener:jest.fn((name,cb)=>{listener=cb;}),removeEventListener:jest.fn()}));
});
test('respects system reduced motion on first render',()=>{
  const {result}=renderHook(()=>useMotionPreferences());
  expect(result.current.reduced).toBe(true);
  expect(result.current.enabled).toBe(false);
});
test('keeps a saved pause preference across remounts',()=>{
  window.matchMedia=jest.fn(()=>({matches:false,addEventListener:jest.fn(),removeEventListener:jest.fn()}));
  const first=renderHook(()=>useMotionPreferences());
  act(()=>first.result.current.toggle());
  expect(first.result.current.enabled).toBe(false);
  first.unmount();
  const second=renderHook(()=>useMotionPreferences());
  expect(second.result.current.paused).toBe(true);
});
test('responds when the system motion preference changes',()=>{
  const query={matches:false,addEventListener:jest.fn((name,cb)=>{listener=cb;}),removeEventListener:jest.fn()};
  window.matchMedia=jest.fn(()=>query);
  const {result}=renderHook(()=>useMotionPreferences());
  expect(result.current.enabled).toBe(true);
  act(()=>{query.matches=true;listener();});
  expect(result.current.enabled).toBe(false);
});
test('hidden tabs disable decorative motion and restore it on return',()=>{
 window.matchMedia=jest.fn(()=>({matches:false,addEventListener:jest.fn(),removeEventListener:jest.fn()}));
 const hidden=jest.spyOn(document,'hidden','get').mockReturnValue(false);
 const {result}=renderHook(()=>useMotionPreferences());
 expect(result.current.enabled).toBe(true);
 act(()=>{hidden.mockReturnValue(true);document.dispatchEvent(new Event('visibilitychange'));});expect(result.current.enabled).toBe(false);
 act(()=>{hidden.mockReturnValue(false);document.dispatchEvent(new Event('visibilitychange'));});expect(result.current.enabled).toBe(true);hidden.mockRestore();
});
