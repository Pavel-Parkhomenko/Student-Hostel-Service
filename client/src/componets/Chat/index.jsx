import React, { useState, useEffect } from 'react'
import { Message } from "./Message";
import { Link } from 'react-router-dom'
import { useHttp } from "../../hooks";
import { SERVER } from "../../constants";
import chatBack from '../../assets/chat.svg'

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5001/', {
  reconnectionAttempts: 20
});

const styleChat = {
  height: '100%',
  maxHeight: '600px',
  overflowY: "scroll",
  background: `url(${chatBack})`,
  backgroundSize: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}

export function Chat() {
  const [activeChatId, setActiveChatId] = useState(0)
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { request } = useHttp()
  const [chats, setChats] = useState([])
  const [activeRole, setActiveRole] = useState('')
  const [messageFromSocket, setMessageFromSocket] = useState({})
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
    socket.emit('testUser', user.firstName)
    getChats()
    socket.on('message', message =>
      setMessageFromSocket({ ...message }))
  }, [])

  useEffect(() => {
    if(Object.keys(messageFromSocket).length){
      setMessages([...messages, messageFromSocket])
      setMessageFromSocket({})
    }
  }, [messageFromSocket])

  const handleSendMessage = (event) => {
    socket.emit('message', { user, text, id: activeChatId });
    setText('');
  };

  return (
    <div className="d-flex rounded bg-light p-3" style={{minHeight: "300px"}}>
      <div className="w-25 me-5 border p-2">
        {
          activeRole === 'student' ? null :
          <div className="border mb-1 rounded d-flex align-items-center justify-content-center"
               style={{height: "50px"}}>
            <Link to="create">Создать чат</Link>
          </div>
        }
        {chats.map((item, ind) => (
          <div
            key={item._id}
            className="border bg-primary mb-1 rounded text-light d-flex align-items-center justify-content-center"
            onClick={() => handleClickIdChat(ind, item._id)}
            style={{height: "50px", cursor: 'pointer'}}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="d-flex flex-column justify-content-end w-75 min-vh-100">
        <div className="d-flex flex-column px-2"
             style={styleChat}
        >
          {messages?.map((item, ind) => {
            if(user !== item.user) {
              return (
                <div className="mb-3 w-75 d-flex justify-content-end" key={ind}>
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
        <div className="input-group mt-3"
             style={{position: 'sticky', bottom: '15px'}}
        >
          <input type="text" className="form-control" placeholder="Сообщение" aria-label="Username"
                 aria-describedby="input-group-right"
                 value={text}
                 disabled={activeChatId === 0}
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