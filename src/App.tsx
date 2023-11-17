import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path='/' Component={Home} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
