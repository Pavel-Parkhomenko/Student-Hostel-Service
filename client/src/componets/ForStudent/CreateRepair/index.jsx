import React, { useState, useEffect, useContext } from 'react'
import { SimpleForm } from "../../SimpleForm";
import { CREATE_REPAIR_FORM } from '../../../mocks'
import { SERVER } from "../../../constants";
import { useHttp } from "../../../hooks";
import { ViewRepairs } from "../../ViewRepairs";
import { MyContext } from '../../../context'

export function CreateRepair() {
  const [form, setForm] = useState({
    header: '',
    description: '',
  })
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const numberTest = JSON.parse(localStorage.getItem('user')).numberTest
      const { data, message } = await request(SERVER + `/repair/get-repairs-id`, "POST", {
        numberTest: numberTest
      })
      setRes([...data])
    }
    fetchData()
  }, [])

  const { request } = useHttp()
  const { toast } = useContext(MyContext)

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))
    const repair = {
      ...form,
      room: user.room,
      user: {
        firstName: user.firstName,
        secondName: user.secondName,
        middleName: user.middleName,
        numberTest: user.numberTest
      }
    }
    const { data, message } = await request(SERVER + '/repair/create', 'POST', {...repair})
    setRes([...res, data])
    toast.success(message)
  }

  return (
    <>
      <div className="w-100 p-3 bg-white rounded">
        <SimpleForm
          fields={CREATE_REPAIR_FORM}
          onChange={handleInput}
          onClick={(event) => handleClick(event)}
          buttonName="Сохранить"
          errors={null}
          messFromServer={''}
        />
      </div>
      <div>
        <ViewRepairs repairs={res}/>
      </div>
    </>
  )
}