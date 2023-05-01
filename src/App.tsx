import { useState } from "react"
import "./App.css"
import Memory from "./components/Memory"
import Conditionals from "./components/Condtionals"
import PlaceCircle from "./components/PlaceCircle"

type ComponentName = "Memory" | "Conditionals" | "PlaceCircle" | null

function App(): JSX.Element {
	const [selectedComponent, setSelectedComponent] =
		useState<ComponentName>(null)

	const handleComponentClick = (componentName: ComponentName) => {
		setSelectedComponent(componentName)
	}

	const handleExitClick = () => {
		setSelectedComponent(null)
	}

	return (
		<div className="app">
			{selectedComponent === null && (
				<div className="logo">
					<h1>Select a component to render:</h1>
					<button onClick={() => handleComponentClick("Memory")}>
						Memory Game
					</button>
					<button
						onClick={() => handleComponentClick("Conditionals")}
					>
						Conditional Checker
					</button>
					<button onClick={() => handleComponentClick("PlaceCircle")}>
						Place Circle
					</button>
				</div>
			)}
			{selectedComponent === "Memory" && (
				<div>
					<div className="exittitle">
						<h1>Memory Component</h1>
						<button onClick={handleExitClick}>Exit</button>
					</div>
					<Memory />
				</div>
			)}
			{selectedComponent === "Conditionals" && (
				<div>
					<div className="exittitle">
						<h1>Conditionals Component</h1>
						<button onClick={handleExitClick}>Exit</button>
					</div>
					<Conditionals />
				</div>
			)}
			{selectedComponent === "PlaceCircle" && (
				<div>
					<div className="exittitle">
						<h1>PlaceCircle Component</h1>
						<button onClick={handleExitClick}>Exit</button>
					</div>
					<PlaceCircle />
				</div>
			)}
		</div>
	)
}

export default App
