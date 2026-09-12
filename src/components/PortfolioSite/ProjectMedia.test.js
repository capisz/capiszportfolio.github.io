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

test('offers separate links for the video and the live app',()=>{
 render(<ProjectMedia project={{...project,liveUrl:'https://example.com/demo'}} motion={false}/>);
 expect(screen.getByRole('link',{name:'Open Demo demo video in a new tab'})).toHaveAttribute('href','/demo.mp4');
 expect(screen.getByRole('link',{name:'Open Demo live app'})).toHaveAttribute('href','https://example.com/demo');
 expect(screen.queryByRole('button',{name:/controls/i})).toBeNull();
});
test('projects without a live URL still link directly to their video',()=>{
 render(<ProjectMedia project={project} motion={false}/>);
 expect(screen.getByRole('link',{name:'Open Demo demo video in a new tab'})).toHaveAttribute('href','/demo.mp4');
 expect(screen.queryByRole('link',{name:/live app/})).toBeNull();
 expect(screen.getByRole('button',{name:'Play Demo demo'})).toBeInTheDocument();
});
