import React, { useState, useEffect } from 'react'
import readXlsxFile from 'read-excel-file'
import { useHttp } from "../../hooks";

export function Home() {

  const [file1, setFile1] = useState([])

  function handleChange(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      console.log(rows)
      setFile1(rows)
    })
  }

  const {loading, request} = useHttp();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);
    await fetch('http://localhost:5000/test/upload', {
      body: formData,
      method: 'POST'
    })
  };

  return (
    <div className="container">
      <input onChange={e => handleChange(e)} type="file" id="input" className="w-100" />

      <form onSubmit={handleSubmit2}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={handleNameChange} required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} required />
        <br />
        <label htmlFor="file">File:</label>
        <input type="file" name="file" id="file" onChange={handleFileChange} required />
        <br />
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

//<div>
//         <h1>Chat</h1>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
//           <input type="text" placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} />
//           <button type="submit">Send</button>
//         </form>
//         <ul>
//           {messages.map((message, index) => (
//             <li key={index}><strong>{message.user}:</strong> {message.text}</li>
//           ))}
//         </ul>
//       </div>