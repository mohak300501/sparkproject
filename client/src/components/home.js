import React from "react"

const Home = ({ updateUser, user }) => {
    return (
        <div className="home">
            <h1>Welcome, {user.name}!</h1><br />
            <div className="button" onClick={() => updateUser({})} >Logout</div><br />
            <div className="left ma w-65">
                <b>User Details</b><br/>
                Name: {user.name}<br/>
                Email: {user.email}<br/>
                Password: {user.password}
            </div><br />
            <p className="left ma w-65">
                <b>Dear SPARK team,</b><br />
                I have deployed this app to Heroku - <a href="https://sparkauthproject.herokuapp.com/">https://sparkauthproject.herokuapp.com/</a>.<br />
                The code is stored and maintained at GitHub - <a href="https://github.com/mohak300501/sparkproject">https://github.com/mohak300501/sparkproject</a>.
            </p><br />
            <p className="left ma w-65">
                <b>Other Projects</b><br />
                I have contributed to the following projects.
                <ul>
                    <li><a href="https://iitr.ac.in/ism21/">ISM 2021</a> (ReactJS + GoogleSheets) - Indian Strings Meeting 2021 to be hosted by IIT Roorkee.</li>
                    <li><a href="https://www.iitr.ac.in/sanskritclub/">Sanskrit Club | IITR</a> (Basic HTML) - Lead web developer at Sanskrit Club IIT Roorkee.</li>
                    <li><a href="https://sanskrit-club.herokuapp.com/">Sanskrit Club | IITR</a> (Ruby on Rails + Postgres) - Revamp of old website.</li>
                    <li><a href="https://susamarksportal.herokuapp.com/">SusaMarksPortal</a> (Flask + DBSQLite) - Portal for Subhashitam Samskritam course organized by Sanskrit Club IITR.</li>
                    <li><a href="https://openlibraryportal.herokuapp.com/">OpenLibrary</a> (Flask + Postgres) - Noble initiative for connecting students who can't afford/avail of books to those willing to donate.</li>
                    <li><a href="https://blooddonation.gigalixirapp.com/">BloodDonation</a> (Phoenix) - Noble initiative to connect patients to donors willing to donate blood in emergency situations.</li>
                    <li><a href="http://missanfoundation.com/">Missan Foundation</a> (PHP) - Voluntary services rendered to an NGO.</li>
                    <li><a href="https://sandipkulkarni.com/">Sandip N Kulkarni</a> (WordPress) - Voluntary services rendered to an individual.</li>
                </ul>
            </p>
        </div>
    )
}

export default Home