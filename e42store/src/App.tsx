import React from "react"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter} from "react-router-dom"
import {ContactWidget, Footer, Header} from "./components"
import {ComponentPagesRoute} from "./route"


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ToastContainer/>
                <ContactWidget />
                <Header/>
                <div className="general-content">
                    <ComponentPagesRoute/>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App