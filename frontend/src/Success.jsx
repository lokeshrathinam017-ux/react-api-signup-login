import { useNavigate } from "react-router-dom"
import './index.css'

const Success = (props) =>
{
    const navigate = useNavigate()

    return(
        <div className="container">
            <h1>Welcome {props.username}!</h1>
            <p>Login Successful.</p>
            <button onClick={() => navigate("/")}>Logout</button>
        </div>
    )
}

export default Success