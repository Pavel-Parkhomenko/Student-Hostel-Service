import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Login} from './pages/Auth/Login'
import {Registration} from './pages/Auth/Registration'
import {Home} from './pages/Home'
import { StudentRoom } from './pages/StudentRoom'
import {NewsPanel} from './componets/NewsPanel'
import {EventsPanel} from "./componets/EventsPanel";
import {MentorRoom} from './pages/MentorRoom'
import { Context } from './context'
import {CreateNewsPanel} from "./pages/MentorRoom/CreateNewsPanel"
import {NewNews} from "./pages/MentorRoom/NewNews";

function App() {
  return (
    <Context.Provider value={{role: "mentor"}}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/reg' element={<Registration />}/>
          <Route path='/st-room' element={<StudentRoom/>}>
            <Route path="news" element={<NewsPanel />} />
            <Route path="events" element={<EventsPanel />} />
          </Route>
          <Route path='/mentor' element={<MentorRoom />}>
            <Route path="news" element={<NewsPanel />} />
            <Route path="news/create" element={<NewNews />} />
          </Route>
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default App
