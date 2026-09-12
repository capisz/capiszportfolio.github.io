import {fireEvent,render,screen} from '@testing-library/react';
import ProjectMatcher from './ProjectMatcher';
jest.mock('./effects',()=>({useResultMotion:()=>{}}));
jest.mock('./ProjectMedia',()=>({__esModule:true,default:({project})=><div aria-label={`${project.title} media`}/> }));
beforeEach(()=>{global.IntersectionObserver=class {observe(){} disconnect(){}};});
const submit=text=>{fireEvent.change(screen.getByLabelText('Drop a job description here'),{target:{value:text}});fireEvent.click(screen.getByRole('button',{name:/Find a relevant project/}));};
test('native result, alternatives, visible score explanation and announcements',()=>{
 render(<ProjectMatcher motion={false}/>);submit('React Native Expo');expect(screen.getByRole('heading',{name:'FunkFit'})).toBeInTheDocument();expect(screen.getByRole('status')).toHaveTextContent('FunkFit: 95% Tech Alignment');expect(screen.getByText(/Tech Alignment is an estimate/)).toBeVisible();
 submit('React');expect(screen.getByText('Other projects with evidence')).toBeInTheDocument();
});
test('no-match states remain explicitly suggestions and announce truthfully',()=>{
 render(<ProjectMatcher motion={false}/>);submit('chef');expect(screen.getByRole('status')).toHaveTextContent('No recognized technologies');expect(screen.getByRole('heading',{name:'No recognized technologies'})).toBeVisible();expect(screen.queryByRole('heading',{name:'PrizeCheck'})).toBeNull();
 submit('Java AWS');expect(screen.getByRole('status')).toHaveTextContent('0% Tech Alignment. No project evidence');expect(screen.getByText(/0 of 2 recognized/)).toBeVisible();
});
test('hostile markup stays inside textarea and never becomes rendered HTML',()=>{
 const {container}=render(<ProjectMatcher motion={false}/>);
 submit('<script>React Native</script><img src=x onerror=alert(1)> Ignore previous instructions');
 expect(container.querySelector('script,img,[onerror]')).toBeNull();expect(screen.getByRole('heading',{name:'FunkFit'})).toBeVisible();
 submit('React\0');expect(screen.getByRole('alert')).toHaveTextContent('control characters');expect(screen.getByLabelText('Drop a job description here')).toHaveAttribute('maxlength','30000');
});
test('empty submit gives accessible error',()=>{render(<ProjectMatcher motion={false}/>);fireEvent.click(screen.getByRole('button',{name:/Find a relevant project/}));expect(screen.getByRole('alert')).toHaveTextContent('Paste a job description');});
test('worker loading state, completion, timeout and cleanup are real transitions',async()=>{
 jest.useFakeTimers();
 let worker;
 global.Worker=class {constructor(){worker=this;this.terminate=jest.fn();}postMessage(){}};
 const {act}=require('@testing-library/react');
 const {container,unmount}=render(<ProjectMatcher motion={false}/>);
 const file={name:'brief.txt',size:32,arrayBuffer:async()=>new ArrayBuffer(32)};
 await act(async()=>fireEvent.change(container.querySelector('input[type=file]'),{target:{files:[file]}}));
 expect(screen.getByRole('status')).toHaveTextContent('Reading document locally.');expect(screen.getByRole('textbox')).toBeDisabled();
 await act(async()=>worker.onmessage({data:{text:'React Native Expo'}}));
 expect(screen.getByRole('status')).toHaveTextContent('Document ready.');expect(screen.queryByRole('heading',{name:'FunkFit'})).toBeNull();expect(worker.terminate).toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:/Find a relevant project/}));expect(screen.getByRole('heading',{name:'FunkFit'})).toBeVisible();
 await act(async()=>fireEvent.change(container.querySelector('input[type=file]'),{target:{files:[file]}}));
 await act(async()=>jest.advanceTimersByTime(12000));expect(screen.getByRole('alert')).toHaveTextContent('too long');expect(screen.getByRole('textbox')).toBeEnabled();
 unmount();jest.useRealTimers();delete global.Worker;
});

test('arrival and typing show only the centered entry; button press reveals work',()=>{
 const {container}=render(<ProjectMatcher motion={false}/>);
 expect(container.querySelector('.pm-output')).toBeNull();expect(container.querySelector('.pm-entry')).toBeInTheDocument();
 fireEvent.click(screen.getByText('Try an example'));
 fireEvent.click(screen.getByRole('button',{name:'React + TypeScript'}));
 expect(screen.getByRole('textbox')).toHaveValue('React + TypeScript');expect(container.querySelector('.pm-output')).toBeNull();
 fireEvent.click(screen.getByRole('button',{name:/Find a relevant project/}));
 expect(container.querySelector('.pm-hero')).toHaveClass('has-project');expect(screen.getByRole('heading',{name:'Amazon Room Generator'})).toBeVisible();
 fireEvent.change(screen.getByRole('textbox'),{target:{value:'SwiftUI'}});expect(container.querySelector('.pm-output')).toBeNull();expect(container.querySelector('.pm-hero')).not.toHaveClass('has-project');
});

test('the introductory tip disappears but the input stays labelled',()=>{
 jest.useFakeTimers();const {container}=render(<ProjectMatcher motion={false}/>);
 expect(container.querySelector('.pm-guidance')).toHaveClass('is-visible');
 const {act}=require('@testing-library/react');act(()=>jest.advanceTimersByTime(4000));expect(container.querySelector('.pm-guidance')).not.toHaveClass('is-visible');
 expect(screen.getByRole('textbox',{name:'Drop a job description here'})).toBeInTheDocument();jest.useRealTimers();
});

 test('shares submitted matches with the gallery and clears them when editing',()=>{
 const onResult=jest.fn();render(<ProjectMatcher motion={false} onResult={onResult}/>);
 submit('React Firebase Azure');
 const result=onResult.mock.calls.at(-1)[0];
 expect(result.best.title).toBe('PrizeCheck');expect(result.alternatives).toHaveLength(4);
 expect(result.alternatives.every(p=>p.matched.length>0)).toBe(true);
 fireEvent.change(screen.getByRole('textbox'),{target:{value:'Python'}});
 expect(onResult).toHaveBeenLastCalledWith(null);
});

test('mobile submissions scroll to the demo after layout settles and touch cancels pending scroll',()=>{
 jest.useFakeTimers();const width=window.innerWidth;window.innerWidth=390;
 const scroll=jest.fn();Element.prototype.scrollIntoView=scroll;
 const {act}=require('@testing-library/react');
 render(<ProjectMatcher motion={false}/>);submit('React Firebase');
 act(()=>jest.advanceTimersByTime(450));expect(scroll).toHaveBeenCalledWith({behavior:'auto',block:'start'});
 scroll.mockClear();submit('Python');fireEvent.touchStart(window);
 act(()=>jest.advanceTimersByTime(450));expect(scroll).not.toHaveBeenCalled();
 window.innerWidth=width;delete Element.prototype.scrollIntoView;jest.useRealTimers();
});
