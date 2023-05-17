import { useEffect, useState } from 'react';
import PieChartComponent from './PieChartComponent';
import { PoliticsDTO } from '../content';

function App() {
  const [politics, setPolitics] = useState<PoliticsDTO | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['politicsData'], function (result) {
      setPolitics(result.politicsData);
    });

    // Listener for live updates
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      setPolitics(request.politicsData);
    });
  }, []);

  return (
    <main>
      {politics ? (
        <PieChartComponent {...politics!} />
      ) : (
        <div className="flex justify-center items-center text-xl p-5 rounded">
          정치 성향 분석중입니다..
        </div>
      )}
    </main>
  );
}

export default App;
