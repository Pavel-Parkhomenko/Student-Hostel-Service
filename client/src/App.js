import './App.css'
import {Test} from './componets/Test'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Login} from './pages/Auth/Login'
import {Registration} from './pages/Auth/Registration'
import {Home} from './pages/Home'
import { StudentRoom } from './pages/StudentRoom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<Registration/>}/>
        <Route path='/st-room' element={<StudentRoom/>}/>
      </Routes>
    </Router>
  )
}

export default App
