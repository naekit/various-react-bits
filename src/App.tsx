import { useState } from "react"
import "./App.css"

type Argument = {
	id: string
	name: string
	value: boolean
}

function App() {
	const [args, setArgs] = useState<Argument[]>([
		{
			id: "123",
			name: "mybool",
			value: false,
		},
		{
			id: "abc",
			name: "otherbool",
			value: true,
		},
	])

	function changeArgValue(argId: string, newValue: boolean) {
		setArgs((prevArgs) => {
			return prevArgs.map((arg) =>
				arg.id === argId ? { ...arg, value: newValue } : arg
			)
		})
	}

	function changeArgName(argId: string, newName: string) {
		setArgs((prevArgs) => {
			return prevArgs.map((arg) =>
				arg.id === argId ? { ...arg, name: newName } : arg
			)
		})
	}

	return (
		<>
			<div className="app">
				<h1>Hello</h1>
				<ul>
					{args.map((arg) => (
						<li key={arg.id}>
							<input
								onChange={(e) =>
									changeArgName(arg.id, e.target.value)
								}
								value={arg.name}
							/>
							<select
								onChange={(e) =>
									changeArgValue(
										arg.id,
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
