import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";

export function CreateChat() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])
  const [usersId, setUsersId] = useState([])
  const [chatId, setChatId] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(URL + '/student/get-info', "GET")
      setRes([...data])
      const id = await request(URL + '/chat/create-chat', "GET")
      setChatId(id.data.id)
    }
    fetchData()
  }, [])

  async function handleCreateChat(event) {
    console.log(event)
    event.preventDefault()
    console.log('send form')
    // await request(URL + '/chat/add-id-to-user', 'POST', {
    //   arrayId: usersId,
    //   idChat: chatId,
    //   name: name,
    //   idMentor: JSON.parse(localStorage.getItem('user'))._id
    // })
  }

  return (
    <div className="rounded bg-light p-3">
      <form onSubmit={(event) => handleCreateChat(event)}>
        <div className="input-group input-group-sm">
          <span className="input-group-text" id="input-group-sm-example">Название чата</span>
          <input
            pattern="[A-Za-zА-Яа-яЁё]{5,10}"
            title="Минимум 5 и максимум 10 символов"
            type="text"
            className="form-control"
            aria-label="input group"
            aria-describedby="input-group"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <p className="text-muted">Перед созданием чата, сначала выберите студентов</p>
        <button
          type="submit"
          className="btn btn-info my-3"
        >
          Создать чат
        </button>
      </form>
      <div>
        <table className="table table-striped bg-light rounded">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Фамилия</th>
            <th scope="col">Имя</th>
            <th scope="col">Отчество</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {res.map(({ id, firstName, middleName, secondName, numberTest}, ind) => (
            <tr key={numberTest}>
              <th scope="row">{ind + 1}</th>
              <td><input type="checkbox" onChange={() => setUsersId([...usersId, id])}/></td>
              <td>{secondName}</td>
              <td>{firstName}</td>
              <td>{middleName}</td>
              <td><Link to={`/mentor/students/${numberTest}`}><i className="bi bi-file-text"></i></Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}