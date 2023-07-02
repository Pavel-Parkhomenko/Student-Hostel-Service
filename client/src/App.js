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
import { MainStudent, Claim } from './componets/ForStudent'
import { ContainerTech } from './componets/ForStudent/Tech/ContainerTech'
import { FullNews } from "./componets/NewsAction/FullNews"
import { MainMentor } from "./componets/ForMentor/MainMentor";
import { CreateClaim } from "./componets/ForMentor/CreateClaim";
import { CreateEvent } from "./componets/ForMentor/CreateEvent";
import { Chat } from "./componets/Chat";
import { CreateChat } from "./componets/Chat/CreateChat"
import { AdminRoom } from "./pages/AdminRoom"
import { MainAdmin } from "./componets/ForAdmin/MainAdmin"
import { ImportStudents } from "./componets/ForAdmin/ImportStudents"
import { EmployeeList } from "./componets/ForAdmin/EmployeeList"
import { FullMentor } from "./componets/FullMentor";
import { AccPlaces } from "./componets/ForAdmin/AccPlaces";
import { CreateMentor } from "./componets/ForAdmin/CreateMentor";
import { CreateTech } from "./componets/ForAdmin/CreateTech"
import { CreateRepair } from "./componets/ForStudent/CreateRepair"
import { AddStudent } from "./componets/ForAdmin/AddStudent"
import { Reports } from "./componets/ForAdmin/Reports"
import { PayHostel } from "./componets/ForStudent/PayHostel"
import { ViewPayHostel } from "./componets/ForAdmin/ViewPayHostel";
import { RepairViewAdmin } from "./componets/ForAdmin/RepairAction/RepairViewAdmin";
import { FullStudentMentor } from "./componets/ForMentor/FullStudentMentor";
import { FullStudentAdmin } from "./componets/ForAdmin/FullStudentAdmin";
import { StudentListAdmin } from "./componets/ForAdmin/StudentListAdmin";
import { StudentsListMentor } from "./componets/ForMentor/StudentsListMentor";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ChangeBalls } from "./componets/ForMentor/ChangeBalls";
import { BallsInfo } from "./componets/ForStudent/BallsInfo";
import { FreePlaces } from "./componets/ForAdmin/FreePlaces";

function App() {
  const [contextState] = useState({
    toast
  })

  return (
    <MyContext.Provider value={contextState}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true}
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
        pauseOnHover theme="light"
      />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reg' element={<Registration />} />
          <Route path='/student' element={<StudentRoom />}>
            <Route index element={<MainStudent />} />
            <Route path="tech" element={<ContainerTech />} />
            <Route path="pay-hostel" element={<PayHostel />} />
            <Route path="claim" element={<Claim />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="balls-info" element={<BallsInfo />} />
            <Route path="news/:id" element={<FullNews />} />
            <Route path="events" element={<EventPanel />} />
            <Route path="chat" element={<Chat />} />
            <Route path="employee-info" element={<EmployeeList />} />
            <Route path="employee-info/:id" element={<FullMentor />} />
            <Route path="create-repair" element={<CreateRepair />} />
          </Route>
          <Route path='/mentor' element={<MentorRoom />}>
            <Route index element={<MainMentor />} />
            <Route path="students" element={<StudentsListMentor />} />
            <Route path="students/:id" element={<FullStudentMentor />} />
            <Route path="students/:id/create" element={<CreateClaim />} />
            <Route path="students/:id/add-tech" element={<CreateTech />} />
            <Route path="students/:id/change-balls" element={<ChangeBalls />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="news/:id" element={<FullNews />} />
            <Route path="news/create" element={<NewNews />} />
            <Route path="events" element={<EventPanel />} />
            <Route path="events/create" element={<CreateEvent />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/create" element={<CreateChat />} />
          </Route>
          <Route path='/admin' element={<AdminRoom />}>
            <Route index element={<MainAdmin />} />
            <Route path="students" element={<StudentListAdmin />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students/repairs" element={<RepairViewAdmin />} />
            <Route path="students/:id" element={<FullStudentAdmin />} />
            <Route path="students/:id/add-tech" element={<CreateTech />} />
            <Route path="students/import" element={<ImportStudents />} />
            <Route path="students/view-pay-hostel" element={<ViewPayHostel />} />
            <Route path="employee" element={<EmployeeList />} />
            <Route path="employee/:id" element={<FullMentor />} />
            <Route path="employee/create" element={<CreateMentor />} />
            <Route path="places" element={<AccPlaces />} />
            <Route path="places/free-places" element={<FreePlaces />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App
