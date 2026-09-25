import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import './index.css'

const Signup = () =>
{
    const navigate = useNavigate()
    const [user, setuser] = useState("")
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [repass, setrepass] = useState("")
    const [message, setmessage] = useState("")

    const handleuser = (event) =>
    {
        setuser(event.target.value)
    }

    const handleemail = (event) =>
    {
        setemail(event.target.value)
    }

    const handlepass = (event) =>
    {
        setpass(event.target.value)
    }

    const handlerepass = (event) =>
    {
        setrepass(event.target.value)
    }

    const signup = (event) =>
    {
        event.preventDefault()

        if(user === "" || email === "" || pass === "" || repass === "")
        {
            setmessage("Please fill all fields")
            return
        }

        if(!email.includes("@gmail.com"))
        {
            setmessage("Invalid email address")
            return
        }

        if(pass.length < 5)
        {
            setmessage("Password must be at least 5 characters long")
            return
        }

        if(pass !== repass)
        {
            setmessage("Passwords do not match")
            return
        }

        axios.post("http://localhost:5000/signup", { username: user, email: email, password: pass })
            .then(function(data)
            {
                if(data.data === true)
                {
                    navigate("/")
                }
                else {
                    setmessage(data.data)
                }
            })
            .catch(function(error)
            {
                setmessage(error.response?.data?.message || "Unable to connect to the server. Please try again.")
            })
    }

    return(
        <div className="container">
            <h1>Sign up</h1>
            <p className="subtitle">Create your AuraStack account</p>
            <form onSubmit={signup}>
                <label htmlFor="username">Username</label>
                <input id="username" placeholder="Choose a username" name="username" value={user} onChange={handleuser} autoComplete="username" />
                <label htmlFor="email">Email address</label>
                <input id="email" placeholder="you@example.com" name="email" type="email" value={email} onChange={handleemail} autoComplete="email" />
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="At least 3 characters" type="password" name="password" value={pass} onChange={handlepass} autoComplete="new-password" />
                <label htmlFor="repassword">Confirm password</label>
                <input id="repassword" placeholder="Enter your password again" type="password" name="repassword" value={repass} onChange={handlerepass} autoComplete="new-password" />
                <button type="submit">Create account</button>
            </form>
            <button className="secondary-button" onClick={() => navigate("/" )}>Back to login</button>
            <p className="error-text">{message}</p>
        </div>
    )
}

export default Signup