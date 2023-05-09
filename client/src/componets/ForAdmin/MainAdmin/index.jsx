import React, { useEffect, useState } from 'react'

export function MainAdmin() {
  const [res, setRes] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const admin = JSON.parse(localStorage.getItem('user'))
      setRes(admin)
    }
    fetchData()
  }, [])

  return (
    <div className="px-3 py-3 bg-white rounded">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Фамилия</small>
          <p>{res.secondName}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Имя</small>
          <p>{res.firstName}</p>
        </div>
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Отчество</small>
          <p>{res.middleName}</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between w-50">
          <small className="text-muted">Логин</small>
          <p>{res.account?.login}</p>
        </div>
      </div>
      <hr className="hr" />
    </div>
  )
}