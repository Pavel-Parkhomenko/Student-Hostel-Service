import React, { useState, useEffect } from 'react'
import { URL } from '../../../constants'
import { useHttp } from "../../../hooks";

export function NewNews() {
  const [sections, setSections] = useState([])
  const [header, setHeader] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const {loading, request} = useHttp();
  const [idNews, setIdNews] = useState(0)

  useEffect(() => {
    async function getIdFetch() {
      const mentorData = JSON.parse(localStorage.getItem('mentor'))
      const {data, message, errors} = await request(URL + '/news/create-news', 'POST', {
        mentor: {
          firstName: mentorData.firstName,
          secondName: mentorData.secondName,
          middleName: mentorData.middleName,
        }
      })
      setIdNews(data.id)
    }

    getIdFetch()
  }, [])

  function handleSaveSection() {
    setSections([...sections, {header, description, file, id: idNews}])
  }

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function handleSaveNews(event) {
    event.preventDefault();
    if(!sections.length) return
    const formDataArray = sections.map((item, index) => {
      const formData = new FormData();
      Object.keys(item).forEach(key => {
        formData.append(`${key}`, item[key]);
      });
      return formData;
    });

    let requests = formDataArray.map(item => fetch(URL + '/news/create-section', {
      method: 'POST',
      body: item,
    }));

    Promise.all(requests)
      .then(responses => responses.forEach(
        response => console.log(response.message)
      ));
  }

  return (
    <form onSubmit={handleSaveNews}>
      <div className="bg-light rounded p-3">
        <p className="text-muted">
          Сдесь вы можете создать одну секцию новости, к которой вы приклепляете фото
        </p>
        <div>
          <div className="input-group input-group-sm">
          <span className="input-group-text" id="input-group-sm-example">
            Заголовок
          </span>
            <input
              type="text"
              className="form-control"
              aria-label="Small input group"
              aria-describedby="input-group-sm"
              name="header"
              value={header}
              onChange={handleHeaderChange}
            />
          </div>
        </div>
        <div>
          <input
            className="form-control mt-3"
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-floating mt-3">
        <textarea className="form-control"
                  placeholder="Напишите здесь текст"
                  id="floatingTextarea"
                  style={{minHeight: "300px"}}
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
        />
        </div>
        <div className="d-flex justify-content-between bd-highlight mt-3">
          <button
            type="button"
            className="bg-primary border-0 text-light rounded"
            onClick={handleSaveSection}
          >
            Создать секцию
          </button>
          <button
            type="submit"
            className="bg-primary border-0 text-light rounded"
          >
            Сохранить новость
          </button>
        </div>
      </div>
    </form>
  )
}

//      <div className="bg-light rounded p-3 mt-3">
//         {sections ? sections.map((_, ind) => {
//           return <p className="text-muted" id={ind}>Секция <span>{ind}</span> создана</p>
//         }) : <p className="text-muted">Вы еще не создали секций</p>}
//       </div>