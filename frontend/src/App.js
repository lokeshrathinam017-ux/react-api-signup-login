import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './index.css'

const App = (props) =>
{
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [msg, setmsg] = useState("")
    const [loginFailed, setloginFailed] = useState(false)
    const [username, setusername] = useState("")

    const handleusername = (event) =>
    {
        setusername(event.target.value)
    }

    const handleemail = (event) =>
    {
        setemail(event.target.value)
    }

    const handlepass = (event) =>
    {
        setpass(event.target.value)
    }

    const check = (event) =>
    {
        event.preventDefault()

        setloginFailed(false)

        if(username === "" || email === "" || pass === "")
        {
            setmsg("Please fill all fields")
            return
        }

        if(!email.includes("@"))
        {
            setmsg("Please enter a valid email")
            return
        }

        axios.post("https://react-api-signup-login.vercel.app/login", { username: username, email: email, password: pass })
            .then(function(data)
            {
                if(data.data.success === true)
                {
                    props.setLoggedUser(data.data.username)
                    navigate("/success")
                }
                else {
                    setmsg(data.data.message)
                    setloginFailed(true)
                }
            })
            .catch(function(error)
            {
                setmsg(error.response?.data?.message || "Unable to connect to the server. Please try again.")
            })
    }

    return(
        <div className="container">
            <h1>AuraStack Login</h1>
            <p className="subtitle">Sign in to continue</p>
            <form onSubmit={check}>
                <label htmlFor="username">Username</label>
                <input id="username" placeholder="Enter your username" name="username" value={username} onChange={handleusername} autoComplete="username" />
                <label htmlFor="email">Email address</label>
                <input id="email" placeholder="you@example.com" name="email" type="email" value={email} onChange={handleemail} autoComplete="email" />
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Enter your password" type="password" name="password" value={pass} onChange={handlepass} autoComplete="current-password" />
                <button type="submit">Sign in</button>
            </form>
            <p className="error-text">{msg}</p>
            {loginFailed &&
                <div className="signup-prompt">
                    <p>New to AuraStack? Please sign up before logging in.</p>
                    <button className="secondary-button" onClick={() => navigate("/signup")}>Create an account</button>
                </div>
            }
        </div>
    )
}

export default App