import './App.css'
import {Test} from './componets/Test'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Login} from './pages/Auth/Login'
import {Registration} from './pages/Auth/Registration'
import {Home} from './pages/Home'
import { StudentRoom } from './pages/StudentRoom'
import {NewsPanel} from './componets/NewsPanel'
import {EventsPanel} from "./componets/EventsPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<Registration/>}/>
        <Route path='/st-room' element={<StudentRoom/>}>
          <Route index path="news" element={<NewsPanel />} />
          <Route path="events" element={<EventsPanel />} />
        </Route>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </Router>
  )
}

export default App
