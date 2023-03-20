import React from 'react'
import img from './test.jpg'
import { useFetch } from '../hooks'

const url = `http://jsonplaceholder.typicode.com/posts`

export function Test() {
    const mes = useFetch(url)
    console.log(mes)
    // if (!data) return <p>Loading...</p>
    // if (error) return <p>There is an error. <span>{error}</span></p>
    // if (data) return <p>{JSON.stringify(data[0])}</p>
    return(
        <div>
            <button type="button" className="btn btn-primary">sfsd sdfsd sdfsd</button>
            <i className="bi bi-2-circle" style={{color: "green", fontSize: "50px"}}></i>
            <div class="container">
                <label htmlFor="formFile" className="form-label">Default file input</label>
                <input className="form-control" type="file" id="formFile"/>
            </div>
            <div className="card container" style={{backgroundColor: "yellow"}}>
                <img src={img}
                     className="card-img-top"
                     alt="card-img-top"
                     style={{ width: '500px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </div>
            <div style={{margin: "30px"}}>
                <p>
                    <button className="btn btn-primary">Button Primary</button>
                </p>
                <p>
                    <button className="btn btn-secondary">Button Secondary</button>
                </p>
                <p>
                    <i className="bi bi-alarm-fill text-warning" style={{fontSize: 50}}></i>
                </p>
                <p>
                    <i className="bi bi-bar-chart text-info" style={{fontSize: 40}}></i>
                </p>
            </div>
        </div>
    )
}