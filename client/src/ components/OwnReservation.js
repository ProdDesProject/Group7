import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Router, Route, Redirect } from "react-router-dom";
import './Reservation.css';
export default function OwnReservation(props) {
    const [res, setRes] = useState([]);
    useEffect(() => {
        if (props.user != null) {
            axios.get("http://localhost:4000/res/res/" + props.user.username).then(result => {
                setRes(result.data);
            })
        }
    })
    let removeRes = (idres) => {
        axios.delete("http://localhost:4000/res/" + idres).then(
            console.log(props.resByUsername)
        ).catch(error => console.log(error));
    }

    function renderData() {
        if (res.length == 0) {
            return <div>No reservation</div>
        }
        else {
            return (
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Robot</th>
                            <th>Date</th>
                            <th>Day of the week</th>
                            <th>Time</th>
                            <th>&nbsp;</th>
                        </tr>
                        {res.map(i => {
                            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                            let date = new Date(i.date)
                            let now = Date.now()
                            let startHour = Math.floor(i.idhour / 60)
                            let endHour = startHour + 1
                            let min = i.idhour % 60
                            if (min < 10) {
                                min = `0${min}`
                            }
                            // if ((date - now) > 0) {
                                return (<tr>
                                    <td>{i.name}</td>
                                    <td>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</td>
                                    <td>{daysOfWeek[date.getDay()]}</td>
                                    <td>{startHour}:{min} - {endHour}:{min} </td>
                                    <td><button className="btn-danger" onClick={() => removeRes(i.idres)}>delete</button></td>
                                </tr>)
                            // }
                        })}
                    </tbody>
                </table>
            )
        }
    }
    if (props.user == null) {
        return (<Redirect to="/" />)
    }
    else {
        return (<div>
            <div className="container-fluid1 px-0 px-sm-4 mx-auto" style={{ maxWidth: '75rem', minHeight: '1000px' }}>
                <div className="row justify-content-center mx-0">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body p-3 p-sm-5">
                                <ul>
                                    <li><Link to='/reservation/user/'>Own Reservation</Link></li>
                                    <li><Link to='/reservation/'>Robot</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card border-0">
                            <div className="card-header bg-dark">

                            </div>
                            <div className="card-body p-3 p-sm-5">

                                {renderData()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

        )
    }
}
