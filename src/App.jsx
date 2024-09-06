import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Frame1 from './components/Frame1.jsx'


function App() {
  

  return (
    <>
     <Frame1/>
    </>
  )
}
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default App
