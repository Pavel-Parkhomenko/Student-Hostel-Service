import React from 'react'

// remarks: [{
//   dateAndTime: "10.10.2023 10:10",
//   text: "ad fsdf sdf fdg fgdf ert gdgdf",
//   mentor: {
//     firstName: "Светлана",
//     secondName: "Общажновна",
//     middleName: "Евгеневно",
//   }
// }],

const remarks = [{
  dateAndTime: "10.10.2023 10:10",
  header: "Чайник",
  status: 0,
  text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  mentor: {
    firstName: "Светлана",
    secondName: "Общажновна",
    middleName: "Евгеневна",
  }
}, {
  dateAndTime: "10.10.2023 10:10",
  header: "Чайник",
  status: 0,
  text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
  mentor: {
    firstName: "Светлана",
    secondName: "Общажновна",
    middleName: "Евгеневна",
  }
}]

export function Claim() {
  return (
    <div>
      {remarks.map(item => (
        <div
          className="card mb-3"
          style={item.status === 0 ? {borderColor: "red"} : {borderColor: "green"} }
        >
          <div className="card-header bg-transparent text-muted">
            <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
            {item.dateAndTime}
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.header}</h5>
            <p className="card-text">{item.text}</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <div className="text-muted">
              <i className="bi bi-person text-primary fs-5 pe-2" />
              <span>{item.mentor.secondName}</span>
              <span className="px-2">{item.mentor.firstName}</span>
              <span>{item.mentor.middleName}</span>
            </div>
            <button type="button" className="btn btn-primary">Я прочитал</button>
          </div>
        </div>
      ))}
    </div>

  )
}