import { useState } from 'react';
import PieChartComponent from './PieChartComponent';
import { VideoList } from './components/VideoList';

function App() {
  const [crx, setCrx] = useState('create-chrome-ext');

  return (
    <main>
      <h3 className="text-blue-500 py-2 font-semibold rounded-lg bg-green-500">Popup Page!</h3>
      <PieChartComponent />
      <VideoList />
    </main>
  );
}

export default App;
