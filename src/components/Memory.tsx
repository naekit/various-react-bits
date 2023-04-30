import { useState } from "react"

type TCell = {
	row: number
	col: number
}

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

	const [prevClicked, setPrevClick] = useState<TCell | undefined>()

	function handleCardClicked(rowIndex: number, colIndex: number) {
		if (revealedGrid[rowIndex][colIndex]) return
		// reveal clicked card
		const clickedNum = grid[rowIndex][colIndex]
		const newRevealedGrid = [...revealedGrid]
		newRevealedGrid[rowIndex][colIndex] = true
		setRevealedGrid(newRevealedGrid)
		// setPrevClick(clickedNum)
		// if one card has already been clicked prior
		if (prevClicked) {
			const prevClickedNum = grid[prevClicked?.row][prevClicked?.col]
			// second click of 2 clicks
			// if they both match, mark them as answered
			if (prevClickedNum !== clickedNum) {
				setTimeout(() => {
					newRevealedGrid[rowIndex][colIndex] = false
					newRevealedGrid[prevClicked.row][prevClicked.col] = false
					setRevealedGrid([...newRevealedGrid])
				}, 1000)
			} else {
				const hasWon = revealedGrid
					.flat()
					.every((isRevealed) => isRevealed)
				if (hasWon) {
					setTimeout(() => {
						alert("You Won!!!!")
					})
				}
			}
			// if they don't match, hide them after 1 second
			setPrevClick(undefined)
		} else {
			setPrevClick({ row: rowIndex, col: colIndex })
		}

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
							className={`card ${
								revealedGrid[rowIndex][colIndex]
									? "revealed"
									: ""
							}`}
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
