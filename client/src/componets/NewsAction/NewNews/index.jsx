import React, { useState, useEffect } from 'react'
import { SERVER } from '../../../constants'
import { useHttp } from "../../../hooks"
import { toastMess } from '../../../helpers'

export function NewNews() {
  const [sections, setSections] = useState([])
  const [header, setHeader] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const {request} = useHttp();
  const [idNews, setIdNews] = useState(0)

  useEffect(() => {
    async function getIdFetch() {
      const mentorData = JSON.parse(localStorage.getItem('user'))
      const { data } = await request(SERVER + '/news/create-news', 'POST', {
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

  function handleSaveSection(event) {
    event.preventDefault()
    console.log(file)
    if(description.length < 5 || description.length > 1000) {
      toastMess(false, "Неверная длина описания")
      return
    }
    toastMess(true, "Секция создана")
    setSections([...sections, {header, description, file, id: idNews}])
    setDescription('')
    setHeader('')
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

  async function handleSaveNews() {
    if(!sections.length){
      toastMess(false, "Сначала нужно создать секцию")
    }
    const formDataArray = sections.map((item, index) => {
      const formData = new FormData();
      Object.keys(item).forEach(key => {
        formData.append(`${key}`, item[key]);
      });
      return formData;
    });

    let requests = formDataArray.map(item => fetch(SERVER + '/news/create-section', {
      method: 'POST',
      body: item,
    }));

    Promise.all(requests)
      .then(responses => responses.forEach(
        response => toastMess(response.ok, "Обработка запроса...")
      ));
  }

  return (
    <>
      <form onSubmit={handleSaveSection}>
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
                required
                pattern="[A-Za-zА-Яа-яЁё0-9]{5,15}"
                title="Минимум 5 и максимум 15 символов"
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
              required
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
                    required
          />
          </div>
          <div className="d-flex justify-content-between bd-highlight mt-3">
            <button
              type="submit"
              className="btn bg-primary border-0 text-light rounded"
            >
              Создать секцию
            </button>
            <button
              type="button"
              className="btn bg-primary border-0 text-light rounded"
              onClick={handleSaveNews}
            >
              Сохранить новость
            </button>
          </div>
        </div>
      </form>
      <div className="bg-light rounded p-3 mt-3">
        {sections.map((item, ind) => (
          <p className="text-muted" key={ind}>Секция {ind + 1}: {item.header}</p>
        ))}
      </div>
    </>
  )
}