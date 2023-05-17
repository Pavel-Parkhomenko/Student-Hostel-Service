import React, { useEffect, useState } from 'react'
import { StudentList } from '../../StudentList'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { Link } from "react-router-dom";
import { Loading } from '../../Loading'

export function StudentsListMentor() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await request(SERVER + '/student/get-info', "GET")
      setRes([...data])
    }
    fetchData()
  }, [])

  if(loading) return <Loading />

  return (
    <StudentList res={res}>
      <div className="bg-light rounded min-vh-100 p-3">
        <p>Для начала нужно ипортировать список студентов.</p>
        <p>Данные должен импортировать комендат общежития</p>
      </div>
    </StudentList>
  )
}