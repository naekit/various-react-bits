import { useEffect, useState } from "react"

function ShoppingCart() {
	const [items, setItems] = useState<number | "">("")
	const [lines, setLines] = useState<number[][]>([[], [], [], [], []])
	const [err, setErr] = useState("")

	function addPersonToLine(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (items === undefined || items === "" || items <= 0) {
			setErr("Must have at least 1 item to checkout")
			setTimeout(() => {
				setErr("")
			}, 1000)
			return
		}

		let leastItemsAmount = Infinity
		let lineWithLeast

		for (const line of lines) {
			const totalInLine = line.reduce((a, c) => a + c, 0)
			if (totalInLine < leastItemsAmount) {
				leastItemsAmount = totalInLine
				lineWithLeast = line
			}
		}

		if (!lineWithLeast) return
		const indexOfShortestLine = lines.indexOf(lineWithLeast)

		const newLines = [...lines]
		newLines[indexOfShortestLine].push(items)

		setLines(newLines)
		setItems("")
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setLines((prevLines) =>
				prevLines.map((line) =>
					[line[0] - 1, ...line.slice(1)].filter((val) => val >= 0)
				)
			)
		}, 1000 / 2)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div>
			<form onSubmit={addPersonToLine}>
				<input
					required
					type="number"
					value={items}
					onChange={(e) => {
						if (e.currentTarget.value === "") {
							setItems("")
						} else {
							setItems(e.currentTarget.valueAsNumber)
						}
					}}
					className="op"
				></input>
				<button>Checkout</button>
			</form>
			{err && <p className="error">{err}</p>}
			<div className="lines">
				{lines.map((people, i) => (
					<div key={i}>
						<p>X</p>
						<ul>
							{people.map((item) => (
								<li key={Math.random() * item}>{item}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}

export default ShoppingCart
