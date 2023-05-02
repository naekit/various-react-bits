import { useState } from "react"
import "./App.css"
import Memory from "./components/Memory"
import Conditionals from "./components/Condtionals"
import PlaceCircle from "./components/PlaceCircle"
import ShoppingCart from "./components/ShoppingCart"

type ComponentName =
	| "Memory"
	| "Conditionals"
	| "PlaceCircle"
	| "ShoppingCart"
	| null

// sample middleware
// async function errorNotFound(reqName: string, err: Error) {
// 	const sendErr = await fetch("snlnl.com", {
// 		method: "POST",
// 		body: JSON.stringify({ reqName, err }),
// 		headers: { "Content-Type": "application/json" },
// 	})

// 	const res = await sendErr.data

// 	const clientErrorData = {
// 		message: res.message,
// 		user: res.user,
// 		code: res.code
// 	}

// 	return clientErrorData
// }

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
					<button
						onClick={() => handleComponentClick("ShoppingCart")}
					>
						Shopping Cart
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
						<h1>Place Circle Component</h1>
						<button onClick={handleExitClick}>Exit</button>
					</div>
					<PlaceCircle />
				</div>
			)}
			{selectedComponent === "ShoppingCart" && (
				<div>
					<div className="exittitle">
						<h1>Shopping Cart Component</h1>
						<button onClick={handleExitClick}>Exit</button>
					</div>
					<ShoppingCart />
				</div>
			)}
		</div>
	)
}

export default App
