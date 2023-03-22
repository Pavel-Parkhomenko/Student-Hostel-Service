import './App.css'
import {Test} from './componets/Test'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Login} from './pages/Auth/Login'
import {Registration} from './pages/Auth/Registration'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Test/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<Registration/>}/>
      </Routes>
    </Router>
  )
}

export default App
