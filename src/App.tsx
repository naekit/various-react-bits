import { useState } from "react"
import "./App.css"

type Argument = {
	name: string
	value: boolean
}

function App() {
	const [args, setArgs] = useState<Argument[]>([
		{
			name: "mybool",
			value: false,
		},
		{
			name: "otherbool",
			value: true,
		},
	])

	function changeArg(argumentName: string, newValue: boolean) {
		console.log(argumentName, newValue)
		setArgs((prevArgs) => {
			return prevArgs.map((arg) =>
				arg.name === argumentName ? { ...arg, value: newValue } : arg
			)
		})
	}

	return (
		<>
			<div className="app">
				<h1>Hello</h1>
				<ul>
					{args.map((arg) => (
						<li key={arg.name}>
							<input
								onChange={() => console.log("changed")}
								value={arg.name}
							/>
							<select
								onChange={(e) =>
									changeArg(
										arg.name,
										e.target.value === "true"
									)
								}
								defaultValue={`${arg.value}`}
							>
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default App
