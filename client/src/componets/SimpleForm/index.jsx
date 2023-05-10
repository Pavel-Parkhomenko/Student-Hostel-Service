import React from 'react'

export function SimpleForm(
  {
    fields,
    onChange,
    onClick,
    buttonName,
    errors = new Map(),
    messFromServer
  }) {
  return (
    <form className="d-flex flex-column" onSubmit={onClick}>
      {fields.map((
        {
          nameField, placeholder, icon, name, id,
          type, hr, required, summaryBefore, summaryAfter,
          pattern, title,
        }) => (
        <React.Fragment key={id}>
          <div className="row mb-3 w-75 d-lg-flex align-items-center">
            {summaryBefore ? <p className="text-muted">{summaryBefore}</p> : null}
            <label htmlFor={id} className="col-form-label-sm col-3 m-0">{nameField}</label>
            <div className="input-group col-sm" style={{height: '30px'}}>
              <input
                required={required || false}
                name={name}
                type={type}
                className="form-control form-control-sm"
                placeholder={placeholder || ''}
                onChange={onChange}
                pattern={pattern || ".*"}
                title={title || 'Разрешены любые символы'}
              />
              <span className="input-group-text">
                    <i className={`${icon} text-primary`}/>
                  </span>
            </div>
          </div>
          {summaryAfter ? <p className="text-muted">{summaryAfter}</p> : null}
          { hr ? <hr className="hr"/> : null }
        </React.Fragment>
      ))}
      <button
        type="submit"
        className="btn btn-primary w-25"
      >
        {buttonName}
      </button>
    </form>
  )
}