import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "normalize.css/normalize.css"
import "antd/dist/antd.css"
import MainPage from "./pages/main-page"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

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
