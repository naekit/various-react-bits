import { useState } from "react"

function Memory() {
	const [grid, setGrid] = useState([
		[0, 3, 5, 1],
		[1, 2, 2, 4],
		[4, 3, 5, 0],
	])

	const [revealedGrid, setRevealedGrid] = useState(
		new Array(grid.length)
			.fill("")
			.map(() => new Array(grid[0].length).fill(false))
	)

	function handleCardClicked(rowIndex: number, colIndex: number) {
		const newRevealedGrid = [...revealedGrid]
		newRevealedGrid[rowIndex][colIndex] =
			!newRevealedGrid[rowIndex][colIndex]
		setRevealedGrid(newRevealedGrid)
		// reveal clicked card

		// if one card has already been clicked prior
		// if they both match, mark them as answered
		// if they don't match, hide them after 1 second
		console.log(rowIndex, colIndex)
	}

	return (
		<div>
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((num, colIndex) => (
						<div
							onClick={() =>
								handleCardClicked(rowIndex, colIndex)
							}
							key={colIndex}
							className="card"
						>
							{revealedGrid[rowIndex][colIndex] ? num : "X"}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default Memory
