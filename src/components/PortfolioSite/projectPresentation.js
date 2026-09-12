import { catalog } from './matchEngine';
const descriptions = {
  PrizeCheck: 'Train your eye for missing Pokémon TCG prize cards. Practice the routine in a focused app, backed by Firebase and automated tests.',
  'DraftKings NBA Optimizer': 'Compare a live NBA slate and build lineups within the salary cap. A local recommendation engine explains which swaps improve the roster.',
  'Amazon Room Generator': 'Plan a room around its actual dimensions. Generate a layout, preview the space, and find furniture that fits.',
  FunkFit: 'Log food, weight, and activity in a native mobile app. Calorie targets adapt as your body and routine change.',
  CareCation: 'Bring clinic research and travel planning together, so medical tourism options are easier to compare.',
  'backstop.ai': 'Look closer at catcher pitch-calling. Live MLB data and a streamed Claude analysis explain the patterns behind each zone report.',
  ParkNYC: 'Compare parking options before you arrive. Explore curb guidance, meter rules, and routes on an interactive NYC map.',
  'Contessa Shop': 'A focused storefront for a three-piece collection, with size and color selection and rotating product views.',
  'Concrete Jungle Sports': 'A home for Knicks coverage, long-form stories, and podcast episodes, built for reading and listening.',
  'Hudson Chess': 'Help families explore a chess academy, read its latest stories, and find their next step. Built with React and Vite.',
  Dragapultist: 'Turn Pokémon TCG Live exports into a clearer record of your games. Review your play and spot patterns worth practicing.',
  'Marketplace Chrome Extension': 'Find nearby secondhand alternatives while browsing retail products. A Chrome extension connects product pages with Facebook Marketplace listings.',
  'Chess Opening Driller': 'Practice opening lines through repetition. Build a repertoire you can recall when it matters over the board.',
};
const portraitSizes = {FunkFit: {width:460,height:770}};
export const presentation = catalog.map(p => ({...p, shortDescription: descriptions[p.title], mediaSize: p.isVideoPortrait ? portraitSizes[p.title] : null, liveUrl: p.title === 'PrizeCheck' ? p.openUrl : p.liveUrl, poster: p.demo ? p.demo.replace(/\.mp4$/, '.jpg') : p.media}));
export const findPresentation = title => presentation.find(p => p.title === title);
