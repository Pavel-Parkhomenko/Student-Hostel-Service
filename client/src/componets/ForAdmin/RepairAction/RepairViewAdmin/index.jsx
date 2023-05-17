import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../../hooks'
import { SERVER } from '../../../../constants'
import { ViewRepairs } from '../../../ViewRepairs'
import { Loading } from "../../../Loading";

const STATUS = {
  0: 'Новый',
  1: 'В процессе',
  2: 'Завершен'
}

export function RepairViewAdmin() {
  const { request, loading } = useHttp()
  const [repairs, setRepairs] = useState([])
  const [repairsFilter, setRepairsFilter] = useState([])

  useEffect(() => {
    async function fetchRepairs() {
      const { data } = await request(SERVER + '/repair/get-repairs-all')
      setRepairs(data)
      setRepairsFilter(data)
    }
    fetchRepairs()
  }, [])

  function handleFilter(type) {
    if(type === 3) {
      setRepairsFilter([...repairs])
      return
    }
    setRepairsFilter([...repairs.filter(item => item.status === type)])
  }

  if(loading) return <Loading />

  return(
    <div>
      <div>
        <button className="btn btn-light" onClick={() => handleFilter(3)}>Все</button>
        <button className="btn btn-light mx-3" onClick={() => handleFilter(0)}>Новые</button>
        <button className="btn btn-light" onClick={() => handleFilter(1)}>В процессе</button>
      </div>
      <ViewRepairs repairs={repairsFilter} role="admin">
        <hr className="hr"/>
      </ViewRepairs>
    </div>
  )
}