import {render, act, screen, fireEvent} from '@testing-library/react';
import ProjectMedia from './ProjectMedia';
const project={title:'Demo',demo:'/demo.mp4',poster:'/demo.jpg'};
let observers;
beforeEach(()=>{
  observers=[];
  window.IntersectionObserver=jest.fn(callback=>{observers.push(callback);return {observe:jest.fn(),disconnect:jest.fn()};});
  jest.spyOn(HTMLMediaElement.prototype,'play').mockImplementation(()=>Promise.resolve());
  jest.spyOn(HTMLMediaElement.prototype,'pause').mockImplementation(()=>{});
});
afterEach(()=>jest.restoreAllMocks());
test('autoplays a matched demo only when visible, then pauses offscreen',()=>{
  render(<ProjectMedia project={project} motion autoPlay />);
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  act(()=>observers[0]([{isIntersecting:true,intersectionRatio:1,boundingClientRect:{top:0,height:200}}]));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  act(()=>observers[0]([{isIntersecting:false,intersectionRatio:0,boundingClientRect:{top:-300,height:200}}]));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  act(()=>observers[0]([{isIntersecting:true,intersectionRatio:1,boundingClientRect:{top:0,height:200}}]));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
});
test('motion preference blocks autoplay but retains explicit playback',()=>{
  render(<ProjectMedia project={project} motion={false} autoPlay />);
  act(()=>observers[0]([{isIntersecting:true,intersectionRatio:1,boundingClientRect:{top:0,height:200}}]));
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button',{name:'Play Demo demo'}));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
});
test('shows a usable fallback if media fails',()=>{
  const {container}=render(<ProjectMedia project={project} motion={false} />);
  fireEvent.error(container.querySelector('video'));
  expect(screen.getByText('Demo unavailable. Open the project below.')).toBeInTheDocument();
  expect(screen.getByRole('img',{name:'Demo preview'})).toHaveAttribute('src','/demo.jpg');
});
