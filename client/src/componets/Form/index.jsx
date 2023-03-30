import React from 'react'
import './styles.css'

export function Form({
                       fields,
                       onChange,
                       onClick,
                       buttonName,
                       errors= new Map(),
                       messFromServer
                     }) {
  return (
    <div className="container">
      <div className="row main-form">
        <form className="" method="post" action="#">
          {fields.map(({nameField, placeholder, icon, name, id, type}, ind) =>
            <div className="form-group" key={id}>
              <label htmlFor={id} className="cols-sm-2 control-label">{nameField}</label>
              <div className="cols-sm-10" style={{position: "relative"}}>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className={icon} aria-hidden="true" style={{color: "white"}}></i>
                  </span>
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                  />
                </div>
                {
                  errors?.has(name)
                  ?
                    <span className="err__message">{errors.get(name)}</span>
                  :
                    <span className="err__message"></span>
                }
              </div>
            </div>
          )}
          {messFromServer ? <span className="err__message">{messFromServer}</span> : null}
          <div className="mt-5">
            <button
              type="button"
              className="bg-primary text-white border-0 w-100"
              onClick={onClick}
            >
              {buttonName}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}