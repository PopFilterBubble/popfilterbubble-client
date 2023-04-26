import { useState } from 'react';
import PieChartComponent from './PieChartComponent';
import { VideoList } from './components/VideoList';

function App() {
  const [crx, setCrx] = useState('create-chrome-ext');

  return (
    <main>
      <PieChartComponent />
      <VideoList />
    </main>
  );
}

export default App;