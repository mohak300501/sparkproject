import './App.css'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Forgot from './components/forgot'
import Reset from './components/reset'

function App() {
    const [user, setLoginUser] = useState({})
    useEffect(() => {
        if (localStorage["MyUser"] !== "undefined") {
            setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
        }
    }, [])

    const updateUser = (user) => {
        localStorage.setItem("MyUser", JSON.stringify(user))
        setLoginUser(user)
    }

    return (
        <HashRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact>
                        {
                            user && user._id ? <Home updateUser={updateUser} user={user} /> : <Login updateUser={updateUser} />
                        }
                    </Route>
                    <Route path="/login" exact>
                        <Login updateUser={updateUser} />
                    </Route>
                    <Route path="/register" component={Register} exact />
                    <Route path="/forgot" component={Forgot} exact />
                    <Route path="/reset" exact>
                        {
                            localStorage.getItem('otp') && localStorage.getItem('otp') ? <Reset/> : <Login updateUser={updateUser} />
                        }
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
