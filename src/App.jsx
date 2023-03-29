import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css"
import Home from './pages/Home'
import Surah from './pages/Surah'
import Ayat from './pages/Ayat'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path='/:id' element={<Surah />} />
          <Route path='/:id/:ayat' element={<Ayat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
