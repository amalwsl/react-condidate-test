import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import BasicCard from "./cardBasic.tsx"
import "./card.css"

const App = () => (
    <div
        className="w-full h-full flex justify-center items-center"
        style={{ backgroundColor: "#F4F8FA", flexDirection: "column" }}>
        <span className="title">
            Let's plan your <strong>loan</strong>.
        </span>
        <BasicCard />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
