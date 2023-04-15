import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Auth/Login'
import { Registration } from './pages/Auth/Registration'
import { Home } from './pages/Home'
import { StudentRoom } from './pages/StudentRoom'
import { NewsPanel } from './componets/NewsAction/NewsPanel'
import { EventsPanel } from "./componets/EventsPanel";
import { MentorRoom } from './pages/MentorRoom'
import { Context } from './context'
import { NewNews } from "./componets/NewsAction/NewNews"
import { StudentList } from './componets/StudentList'
import { MainStudent, Tech, Claim } from './componets/ForStudent'

function App() {
  return (
    <Context.Provider value={{role: "mentor"}}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reg' element={<Registration />} />
          <Route path='/student' element={<StudentRoom />}>
            <Route index element={<MainStudent />} />
            <Route path="tech" element={<Tech />} />
            <Route path="claim" element={<Claim />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="events" element={<EventsPanel />} />
            <Route path="chat" element={<h2>Чат</h2>} />
          </Route>
          <Route path='/mentor' element={<MentorRoom />}>
            <Route index element={<StudentList />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="news/create" element={<NewNews />} />
          </Route>
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default App
