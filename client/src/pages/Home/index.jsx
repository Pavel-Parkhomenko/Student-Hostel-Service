import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import { useHttp } from "../../hooks";
import axios from 'axios'

export function Home() {

  const [file1, setFile1] = useState([])

  function handleChange(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      console.log(rows)
      setFile1(rows)
    })
  }

  const {loading, request} = useHttp();

  async function loginHandle() {
    try {
      const {message} = await request('/student/import-students', 'POST', file1)
      console.log(message)
    } catch (error) {
      console.log(error)
    }
  }

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);

    // for (let key of formData.keys()) {
    //   console.log(key, formData.get(key));
    // }
    await fetch('http://localhost:5000/test/upload', {
      body: formData,
      method: 'POST'
    })

    // axios.post('http://localhost:5000/test/submit-form', formData)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    console.log('fetch')

    // try {
    //   const {message} = await request('http://localhost:5000/test/submit-form', {
    //     body: formData,
    //     method: 'POST'
    //   })
    //   console.log(message)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <div className="container">
      <input onChange={e => handleChange(e)} type="file" id="input" className="w-100" />
      <button type="button" onClick={loginHandle} className="btn-primary">test</button>

      <form onSubmit={handleSubmit}>
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