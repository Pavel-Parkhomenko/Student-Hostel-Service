import React, { useEffect, useState } from 'react'
import { StudentList } from '../../StudentList'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { Loading } from '../../Loading'

export function StudentsListMentor() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const impact = JSON.parse(localStorage.getItem('user')).impact
      const { data } = await request(SERVER + '/mentor/get-students-by-impact', "POST", {
        impact
      })
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