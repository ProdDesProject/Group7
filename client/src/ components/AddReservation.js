import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'

export default function AddReservation(props) {
    const [robot, setRobot] = useState({ idrobot: null, name: null });
    function submit(event) {
        event.preventDefault()
        axios.post("http://localhost:4000/res",
            {
                iduser: props.user.iduser,
                idrobot: props.match.params.robotId,
                idhour: props.match.params.minId,
                date: props.match.params.date
            }).then(props.history.push("/reservation"))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        let id = props.match.params.robotId;
        axios.get("http://localhost:4000/robots/").then(result => {
            let robot1 = result.data.find(i => i.idrobot == id);
            setRobot(robot1);
        })
    })

    function getHourDuration(min) {
        let startHour = Math.floor(min / 60);
        let endHour = startHour + 1
        let minute = min % 60
        if (minute < 10) {
            minute = `0${minute}`
        }
        return (<>{startHour}:{minute} - {endHour}:{minute}</>)
    }
    if (props.user == null) {
        return (<Redirect to="/" />)
    }
    else {
        return (<div>
            <div className="container-fluid1 px-0 px-sm-4 mx-auto">
                <div className="row justify-content-center mx-0">
                    <div className="col-lg-10">
                        <h2>Reserve</h2>
                        <div className="card border-0" style={{ minHeight: '700px' }}>
                            <Link to='/reservation'><p className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">Services</p></Link>
                            <div className="card-header bg-dark">

                            </div>
                            <div className="card-body p-3 p-sm-5">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Robot</th>
                                            <td>{robot.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Time</th>
                                            <td>{getHourDuration(props.match.params.minId)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <form onSubmit={submit}>
                                    <button type="submit">
                                        Reserved
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}
