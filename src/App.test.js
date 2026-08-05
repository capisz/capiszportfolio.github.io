import { projects } from './data/portfolioContent';

test('keeps refreshed portfolio projects ordered and live', () => {
  expect(projects.map((project) => project.title)).toEqual([
    'DraftKings NBA Optimizer',
    'Amazon Room Generator',
    'FunkFit',
    'Pokémon Prize Checker',
    'backstop.ai',
    'ParkNYC',
    'Contessa Shop',
    'Concrete Jungle Sports',
    'Hudson Chess',
    'Dragapultist',
    'Marketplace Chrome Extension',
    'Chess Opening Driller',
  ]);

  const amazon = projects.find((project) => project.title === 'Amazon Room Generator');
  const funkFit = projects.find((project) => project.title === 'FunkFit');
  const parkNYC = projects.find((project) => project.title === 'ParkNYC');

  expect(amazon).toMatchObject({
    media: '/assets/projects/amazon-room.mp4',
    isVideo: true,
    statusLabel: 'Live',
  });
  expect(funkFit).toMatchObject({
    media: '/assets/projects/elephit.mp4',
    isVideoPortrait: true,
    openUrl: 'https://github.com/capisz/funkfit',
    liveLabel: 'view repo ↗',
    statusLabel: 'Live',
  });
  expect(parkNYC).toMatchObject({
    media: '/assets/projects/parknyc.mp4',
    isVideo: true,
    statusLabel: 'Live',
  });
});
