import React from 'react'
import './styles.css'

// nameField, placeholder, icon, name, id
export function Form({
                       fields,
                       onChange,
                       onClick,
                       buttonName
                     }) {
  return (
    <div className="container">
      <div className="row main-form">
        <form className="" method="post" action="#">
          {fields.map(({nameField, placeholder, icon, name, id, type}) =>
            <div className="form-group" key={id}>
              <label htmlFor={id} className="cols-sm-2 control-label">{nameField}</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className={icon} aria-hidden="true" style={{color: "white"}}></i>
                  </span>
                  <input
                    type={type}
                    className="form-control"
                    name={name} id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
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