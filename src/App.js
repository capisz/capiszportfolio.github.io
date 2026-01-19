import './App.scss';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Layout />
      <Analytics />
    </>
  );
}

export default App;
