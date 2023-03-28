import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Photo from './components/Photo';
import Api from './components/Api';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Photo />} />
      <Route path="/api" element={<Api />} />
    </Routes>
  );
}

export default App;
