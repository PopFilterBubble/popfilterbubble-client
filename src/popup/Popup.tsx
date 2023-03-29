import { useState } from 'react';

function App() {
  const [crx, setCrx] = useState('create-chrome-ext');

  return (
    <main>
      <h1 className="text-blue-600 font-bold">Hello world!</h1>
    </main>
  );
}

export default App;
