import React, { useState } from "react";
import ReactDom from 'react-dom/client'
import App from "./App";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Success from "./Success";
import Signup from "./signup";
import Navbar from "./Navbar";

const RootApp = () => {
    const [loggedUser, setLoggedUser] = useState("")

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<App setLoggedUser={setLoggedUser} />} />
                <Route path="/success" element={<Success username={loggedUser} />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDom.createRoot(document.getElementById("root"))
root.render(<RootApp />)