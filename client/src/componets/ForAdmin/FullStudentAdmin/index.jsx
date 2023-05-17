import React from 'react'
import { StudentFull } from '../../StudentFull'
import { Link } from "react-router-dom";

export function FullStudentAdmin() {
  return(
    <StudentFull>
      <button type="button" className="btn btn-light">
        <Link className="text-decoration-none" to={"add-tech"}>Добавить технику</Link>
      </button>
    </StudentFull>
  )
}