import React from 'react'

export function Form(
  {
    fields,
    onChange,
    onClick,
    buttonName,
    errors = new Map(),
    messFromServer
  }) {
  return (
    <div>
      <div className="row main-form">
        <form className="" method="post" action="Auth/Form#">
          {fields.map(({nameField, placeholder, icon, name, id, type}, ind) =>
            <div className="form-group mb-3" key={id}>
              <label htmlFor={id} className="cols-sm-2 control-label">{nameField}</label>
              <div className="input-group">
                <span className="input-group-text" id="input-group-left-example">
                   <i className={icon} />
                </span>
                <input
                  aria-label="Username"
                  aria-describedby="input-group-left"
                  type={type}
                  className="form-control"
                  name={name}
                  id={id}
                  placeholder={placeholder}
                  onChange={onChange}
                />
              </div>

              <div className="cols-sm-10" style={{position: "relative"}}>
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
              className="btn bg-primary text-white border-0 w-100"
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