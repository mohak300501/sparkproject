import './App.css'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './components/home'
import Login from './components/login'
import Register from './components/register'

function App() {
    const [user, setLoginUser] = useState({})
    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
    }, [])

    const updateUser = (user) => {
        localStorage.setItem("MyUser", JSON.stringify(user))
        setLoginUser(user)
    }

    return (
        <HashRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        {
                            user && user._id ? <Home updateUser={updateUser} /> : <Login updateUser={updateUser} />
                        }
                    </Route>
                    <Route path="/login">
                        <Login updateUser={updateUser} />
                    </Route>
                    <Route path="/register" component={Register} exact />
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
