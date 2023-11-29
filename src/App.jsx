import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Surah from './pages/Surah';
import Ayat from './pages/Ayat';

function App() {
  React.useEffect(() => {
    const bookmarksData = localStorage.getItem('bookmarks');

    // Jika tidak ada data bookmarks di localStorage, inisialisasikan dengan []
    if (!bookmarksData) {
      localStorage.setItem('bookmarks', JSON.stringify([]));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/surah" element={<Home />} />
          <Route path="/surah/:id" element={<Surah />} />
          <Route path="/surah/:id/:ayat" element={<Ayat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
