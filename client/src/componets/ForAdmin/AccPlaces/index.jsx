import React, { useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { Loading } from "../../Loading";
import { Link } from "react-router-dom";

export function AccPlaces() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(SERVER + '/student/get-places', "GET")
      setRes([...data])
    }
    fetchData()
  }, [])

  if(loading) return <Loading />

  return(
    <div className="bg-light rounded p-3">
      <button className="btn btn-light mb-3">
        <Link className="text-primary text-decoration-none" to={'free-places'}>Посмотреть свободные места</Link>
      </button>
      <div className="d-flex">
        <div className="bg-primary rounded ms-2 px-3 text-light"
             style={{height: '25px'}}
        >
          <span>0-</span>
          <span>0-</span>
          <span>0</span>
        </div>
        <p> - отображены занятые комнаты</p>
      </div>
      <hr className="hr"/>
      <div className="d-flex flex-column">
        {res.map((item, ind) => {
          if(ind === 0) return
          if(!item) {
            return (
              <div key={ind} className="d-flex border-bottom mb-2">
                <p className="me-5" style={{width: '40px'}}>{ind}</p>
                <p>Этаж пустой</p>
              </div>
            )
          } else {
            return (
              <div className="d-flex border-bottom mb-2 flex-wrap" key={ind}>
                <p className="me-5" style={{width: '40px'}}>{ind}</p>
                {item.map((place, ind) => (
                  <div key={ind} className="bg-primary rounded ms-2 px-3 h-50 text-light">
                    <span>{place.floor}-</span>
                    <span>{place.block}-</span>
                    <span>{place.apartament}</span>
                  </div>
                ))}
                <p className="text-muted ms-5">Занято: {item.length}</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}