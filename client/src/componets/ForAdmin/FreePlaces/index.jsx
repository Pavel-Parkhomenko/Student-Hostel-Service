import React, { useEffect, useState } from 'react'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { Loading } from "../../Loading"

const style = {
  backgroundColor: '#d9e3e3'
}

export function FreePlaces() {

  const { loading, request } = useHttp()
  const [res, setRes] = useState([])
  const [curFloor, setCurFloor] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const { data, message } = await request(SERVER + '/admin/get-free-places', "GET")
      setRes([...data])
      console.log(data)
    }
    fetchData()
  }, [])

  if(loading) return <Loading />

  return(
    <div className="d-flex mb-2 flex-wrap bg-light p-3 rounded">
      <div>
        <div className="d-flex align-items-center mb-4">
          <div style={style} className="rounded m-2 p-2 text-primary">
            <span>14-1-1/2</span>
          </div>
          <p> - отображены комнаты, где свободно два места</p>
        </div>
      </div>
      <div className="d-flex flex-column">
        {res.map((item, ind) => {
          if(ind === 0) return
          if(item.length === 0) {
            return (
              <div key={ind} className="d-flex border-bottom mb-2">
                <p className="me-5" style={{width: '40px'}}>{ind}</p>
                <p>Этаж заполнен</p>
              </div>
            )
          } else {
            return (
              <div className="d-flex border-bottom mb-2 flex-wrap" key={ind}>
                <p className="me-5" style={{width: '40px'}}>{ind}</p>
                {item.map((place, ind) => {
                  if(place === item[ind + 1]) {
                    return (
                      <div key={ind} style={style} className="rounded m-2 p-2 text-primary">
                        <span>{place}/2</span>
                      </div>
                    )
                  } else {
                    return (
                      <div key={ind} style={style} className="rounded m-2 p-2 text-primary">
                        <span>{place}</span>
                      </div>
                    )
                  }
                })}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}