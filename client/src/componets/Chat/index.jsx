import React, { useState, useEffect } from 'react'
import { Message } from "./Message";
import { sendMessage, subscribeToMessages } from './api'
import { Link } from 'react-router-dom'
import { useHttp } from "../../hooks";
import { SERVER } from "../../constants";
import { Loading } from '../Loading'
import { EmptyData } from "../EmptyData";

export function Chat() {
  const [activeChatId, setActiveChatId] = useState(0)
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { loading, request } = useHttp()
  const [chats, setChats] = useState([])
  const [activeRole, setActiveRole] = useState('')
  async function handleClickIdChat(ind, id) {
    const { data } = await request(SERVER + '/chat/get-messages', "POST", {
      id: id
    })
    setMessages(data?.messages)
    setActiveChatId(id)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setActiveRole(user.role || 'student')
    setUser(user.firstName + " " + user.middleName)
    async function getChats() {
      const res = await request(SERVER + '/common/get-chats', "POST", {
        role: user.role || "student",
        id: user._id || user.id
      })
      if(res.data.length !== 0) {
        const { data } = await request(SERVER + '/chat/get-chats', "POST", {
          idChats: res.data
        })
        setChats(data)
      }
    }
    getChats()
  }, [])

  // useEffect(() => {
  //   subscribeToMessages((message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, []);

  const handleSendMessage = (event) => {
    setMessages([...messages, {
      user, text, createdAt: Date.now()
    }])
    sendMessage({ user, text, id: activeChatId });
    setText('');
  };

  if(loading) return <Loading />

  console.log(chats)

  return (
    <div className="d-flex rounded bg-light p-3" style={{minHeight: "300px"}}>
      <div className="w-25 me-5 border p-2">
        {
          activeRole === 'student' ? null :
          <div className="border mb-1 rounded" style={{height: "50px", textAlign: 'center'}}>
            <Link to="create">Создать чат</Link>
          </div>
        }
        {chats.map((item, ind) => (
          <div
            key={item._id}
            className="border bg-primary mb-1 rounded text-light ps-3"
            onClick={() => handleClickIdChat(ind, item._id)}
            style={{height: "50px"}}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="d-flex flex-column justify-content-end w-75">
        <div className="d-flex flex-column px-2" style={{maxHeight: '500px', overflowY: "scroll"}}>
          {messages?.map((item, ind) => {
            if(user !== item.user) {
              return (
                <div className="mb-3 w-100 d-flex justify-content-end" key={ind}>
                  <Message text={item.text} user={item.user} createdAt={item.createdAt}/>
                </div>
              )
            } else {
              return(
                <div className="mb-3 w-75" key={ind}>
                  <Message text={item.text} user={item.user} createdAt={item.createdAt}/>
                </div>
              )
            }
          })}
        </div>
        <div className="input-group mt-3">
          <input type="text" className="form-control" placeholder="Сообщение" aria-label="Username"
                 aria-describedby="input-group-right"
                 value={text}
                 onChange={(e) => setText(e.target.value)}
          />
            <span className="input-group-text" id="input-group-right-example"
                  onClick={handleSendMessage}
            >
              <i className="bi bi-arrow-return-left"></i>
            </span>
        </div>
      </div>
    </div>
  )
}