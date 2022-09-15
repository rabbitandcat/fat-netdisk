import React, { useState } from 'react'
import './style/index.scss'
import "normalize.css/normalize.css"
import "antd/dist/antd.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./pages/main-page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
