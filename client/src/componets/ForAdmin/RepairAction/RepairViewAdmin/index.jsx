import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../../hooks'
import { SERVER } from '../../../../constants'
import { ViewRepairs } from '../../../ViewRepairs'
import { Link } from "react-router-dom";

export function RepairViewAdmin() {
  const { request, loading } = useHttp()
  const [repairs, setRepairs] = useState([])

  useEffect(() => {
    async function fetchRepairs() {
      const { data } = await request(SERVER + '/repair/get-repairs-all')
      setRepairs(data)
    }
    fetchRepairs()
  }, [])
  return(
    <div>
      <ViewRepairs repairs={repairs} role="admin">
        <hr className="hr"/>
      </ViewRepairs>
    </div>
  )
}