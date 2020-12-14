import React, { useState, useEffect } from 'react';
import './Reservation.css';
import DatePicker from "react-datepicker";
import { Link, Router, Route, Redirect } from "react-router-dom";
import axios from "axios"
import OwnReservation from './OwnReservation'
import "react-datepicker/dist/react-datepicker.css";

export default function Reservation(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [isActive, setActive] = useState(false);
    const [res, setRes] = useState([]);
    const [now, setNow] = useState(Date.now())
    let robots;
    const [count, setCount] = useState(2)
    const toggleClass = () => {
        setActive(!isActive);
    };
    useEffect(() => {
        axios.get("http://localhost:4000/res/date/" + (startDate.getMonth() + 1) + '-' + startDate.getDate() + '-' + startDate.getFullYear()).then(result => {
            setRes(result.data)
            let own = res.filter(i=> i.iduser == props.user.iduser)
            setCount(5 - own.length)
        }).catch(error => {
            console.log(error);
        })

    })

    function addMonths(endDate, month) {
        endDate.setMonth(endDate.getMonth + month);
        return endDate;
    }
    // let hours1;
    // useEffect(() => {
    //     axios.get("http://localhost:4000/hours").then((result) => {
    //         hours1 = result.data
    //         setHours(result.data)
    //         console.log(hours1)
    //         hello(hours1)
    //     })
    // })
    if (props.user == null) {
        return (<Redirect to="/" />)
    }
    else {
        return (
            <div>
                <div className="container-fluid1 px-0 px-sm-4 mx-auto" style={{ maxWidth: '75rem' }}>
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
                                <form autoComplete="off">
                                    <div className="card-header bg-dark">
                                        <div className="mx-0 mb-0 row justify-content-sm-center justify-content-start px-1"> <DatePicker id="dp1" className="datepicker" selected={startDate} onChange={date => setStartDate(date)} minDate={new Date()}
                                            maxDate={addMonths(new Date(), 1)}
                                            showDisabledMonthNavigation /><span className="fa fa-calendar" ></span> </div>
                                    </div>
                                    <div className="card-body p-3 p-sm-5">
                                        <div>Reservation left: {count}</div>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Time</th>
                                                    {props.robots.map(i => {
                                                        return (<th key={i.idrobot}>{i.name}</th>)
                                                    })}
                                                </tr>
                                                {props.hours.map((i) => {
                                                    let hour = Math.floor(i.idhour / 60)
                                                    let min = i.idhour % 60
                                                    if (min < 10) {
                                                        min = `0${min}`
                                                    }
                                                    let time = startDate
                                                    time.setHours(hour)
                                                    let late = time - now
                                                    return (<tr key={i.idhour}>
                                                        <td key={i.idhour} onClick={toggleClass} >{hour}:{min}</td>
                                                        {props.robots.map((j) => {
                                                            let found = res.find(number => (number.idrobot === j.idrobot) && (number.idhour === i.idhour))
                                                            if (late < 0) {
                                                                if (found == undefined) {
                                                                    return (<td className="past"> Free </td>)
                                                                }
                                                                else if (found != undefined) {
                                                                    if (found.iduser === props.user.iduser) {
                                                                        return (<td className="past">Own</td>)
                                                                    }
                                                                    else {
                                                                        return (<td className="past">Reserved</td>)
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                if (found == undefined) {
                                                                    let link = "/reservation/new/robotId/" + j.idrobot + "/date/" + (startDate.getMonth() + 1) + '-' + startDate.getDate() + '-' + startDate.getFullYear() + "/minId/" + i.idhour
                                                                    return (<td className="free"><Link to={link}><a key={i.idhour + j.idrobot} href={link}> Free </a> </Link></td>)
                                                                }
                                                                else if (found != undefined) {
                                                                    if (found.iduser === props.user.iduser) {
                                                                        return (<td className="own">Own</td>)
                                                                    }
                                                                    else {
                                                                        return (<td className="res">Reserved</td>)
                                                                    }
                                                                }
                                                            }
                                                        })}
                                                    </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}