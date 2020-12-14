import axios from 'axios';


let userInfo = {
    username: null,
    password: null
}

let myAuth = {
    authenticate: (username, password) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:4000/login/loginForJWT',
                {
                    auth: {
                        username: username,
                        password: password
                    }
                })
                .then(result => {
                    userInfo = {
                        username: username,
                        password: password
                    }
                    localStorage.setItem('token', result.data.token);
                    axios.get('http://localhost:4000/login/jwtProtectedResource', {
                        headers: {
                            "Authorization": "Bearer " + result.data.token
                        }
                    }).then(result => {
                        resolve(result)
                    }).catch(error => {
                        console.log(error);
                        reject();
                    })
                })
                .catch(error => {
                    console.log(error);
                    reject();
                })
        });
    },
    getAxiosAuth: () => {
        return {
            auth: userInfo
        }
    }
}

export default myAuth;