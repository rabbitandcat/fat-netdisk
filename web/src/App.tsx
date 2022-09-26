import React, { useState } from 'react'
import './style/index.scss'
import "normalize.css/normalize.css"
import "antd/dist/antd.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./pages/main-page"
import LoginPage from "./pages/login-page"
import { Spin } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";


Spin.setDefaultIndicator(
  <LoadingOutlined style={{ fontSize: 25, color: "#fff" }} />
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
