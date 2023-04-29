import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Auth/Login'
import { Registration } from './pages/Auth/Registration'
import { Home } from './pages/Home'
import { StudentRoom } from './pages/StudentRoom'
import { NewsPanel } from './componets/NewsAction/NewsPanel'
import { EventPanel } from "./componets/ViewEvent/EventPanel";
import { MentorRoom } from './pages/MentorRoom'
import { MyContext } from './context'
import { NewNews } from "./componets/NewsAction/NewNews"
import { StudentList } from './componets/StudentList'
import { MainStudent, Claim } from './componets/ForStudent'
import { ContainerTech } from './componets/ForStudent/Tech/ContainerTech'
import { FullNews } from "./componets/NewsAction/FullNews"
import { MainMentor } from "./componets/ForMentor/MainMentor";
import { StudentFull } from "./componets/StudentFull";
import { CreateClaim } from "./componets/ForMentor/CreateClaim";
import { CreateEvent } from "./componets/ForMentor/CreateEvent";

function App() {
  const [contextState, setContextState] = useState({})
  return (
    <MyContext.Provider value={contextState}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setContextState={setContextState} />} />
          <Route path='/reg' element={<Registration setContextState={setContextState}/>} />
          <Route path='/student' element={<StudentRoom />}>
            <Route index element={<MainStudent />} />
            <Route path="tech" element={<ContainerTech />} />
            <Route path="claim" element={<Claim />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="news/:id" element={<FullNews />} />
            <Route path="events" element={<EventPanel />} />
            <Route path="chat" element={<h2>Чат</h2>} />
          </Route>
          <Route path='/mentor' element={<MentorRoom />}>
            <Route index element={<MainMentor />} />
            <Route path="students" element={<StudentList />} />
            <Route path="students/:id" element={<StudentFull />} />
            <Route path="students/:id/create" element={<CreateClaim />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="news/:id" element={<FullNews />} />
            <Route path="news/create" element={<NewNews />} />
            <Route path="events" element={<EventPanel />} />
            <Route path="events/create" element={<CreateEvent />} />
          </Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App
