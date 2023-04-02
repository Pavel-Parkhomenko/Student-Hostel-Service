import React, {useState} from 'react'

export function NewNews() {

  const [form, setForm] = useState({
    header: "",
    file: '',
    text: '',
  })
  const [sections, setSections] = useState([])

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  function handleSaveSection() {
    setSections([...sections, {...form}])
  }

  function handleSaveNews() {
    console.log(sections)
  }

  return (
    <div>
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
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <input
            className="form-control mt-3"
            type="file"
            id="formFile"
            name="file"
            onChange={handleInput}
          />
        </div>
        <div className="form-floating mt-3">
        <textarea className="form-control"
                  placeholder="Напишите здесь текст"
                  id="floatingTextarea"
                  style={{minHeight: "300px"}}
                  name="text"
                  onChange={handleInput}
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
            type="button"
            className="bg-primary border-0 text-light rounded"
            onClick={handleSaveNews}
          >
            Сохранить новость
          </button>
        </div>
      </div>
      <div className="bg-light rounded p-3 mt-3">
        {sections ? sections.map((_, ind) => {
          return <p className="text-muted" id={ind}>Секция <span>{ind}</span> создана</p>
        }) : <p className="text-muted">Вы еще не создали секций</p>}
      </div>
    </div>
  )
}