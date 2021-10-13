import React from "react"

const Home = ({ updateUser, user }) => {
    return (
        <div className="homepage">
            <h1>Welcome, {user.name}!</h1><br/>
            <div className="button" onClick={() => updateUser({})} >Logout</div><br/>
            <p className="left ma w-60">
                <b>Dear SPARK team,</b><br/>
                I have deployed this app to Heroku - <a href="https://sparkauthproject.herokuapp.com/">https://sparkauthproject.herokuapp.com/</a>.<br/>
                The code is stored and maintained at GitHub - <a href="https://github.com/mohak300501/sparkproject">https://github.com/mohak300501/sparkproject</a>.
            </p><br/><br/>
            <p className="left ma w-60">
                <b>Other Projects</b><br/>
                I have contributed to the following projects.
                <ul>
                    <li><a href="https://iitr.ac.in/ism21/">ISM 2021</a> (ReactJS + GoogleSheets) - Indian Strings Meeting 2021 to be hosted at IIT Roorkee.</li>
                    <li><a href="https://www.iitr.ac.in/sanskritclub/">Sanskrit Club | IITR</a> (Basic HTML) - Lead web developer at Sanskrit Club IIT Roorkee.</li>
                    <li><a href="https://sanskrit-club.herokuapp.com/">Sanskrit Club | IITR</a> (Ruby on Rails) - Revamp of old website.</li>
                    <li><a href="https://openlibraryportal.herokuapp.com/">OpenLibrary</a> (Flask) - Noble initiative.</li>
                    <li><a href="https://blooddonation.gigalixirapp.com/">BloodDonation</a> (Phoenix) - Noble initiative.</li>
                    <li><a href="http://missanfoundation.com/">Missan Foundation</a> (PHP) - Website made for an NGO.</li>
                    <li><a href="https://sandipkulkarni.com/">Sandip N Kulkarni</a> (WordPress) - Website made for an individual.</li>
                </ul>
            </p>
        </div>
    )
}

export default Home