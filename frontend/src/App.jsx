import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const sayHi = () => {
    setMessage('Hello World');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My Bible App</h1>
      <button onClick={sayHi}>Say Hi</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
