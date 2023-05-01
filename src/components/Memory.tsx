/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react"

type TCell = {
	row: number
	col: number
}

function Memory() {
	const initialSize = 4

	function generateRandomGrid(rows: number, cols: number) {
		const size = rows * cols
		if (size % 2 !== 0) {
			throw new Error("Grid size must be even.")
			return
		}

		const halfSize = size / 2
		const numbers = Array.from({ length: halfSize }, (_, i) => i).flatMap(
			(n) => [n, n]
		)
		const shuffled = numbers.sort(() => Math.random() - 0.5)

		const grid = Array.from({ length: rows }, (_, r) =>
			Array.from({ length: cols }, (_, c) => shuffled[r * cols + c])
		)
		return grid
	}

	const [gridSize, setGridSize] = useState(initialSize)
	const [grid, setGrid] = useState(() =>
		generateRandomGrid(gridSize, gridSize)
	)
	const [revealedGrid, setRevealedGrid] = useState(() =>
		new Array(gridSize).fill("").map(() => new Array(gridSize).fill(false))
	)
	const [prevClicked, setPrevClick] = useState<TCell | undefined>()
	const [rowStyle, setRowStyle] = useState({
		display: "grid",
		gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
		gap: "15px",
		fontSize: "42px",
	})

	function changeGridSize() {
		setRowStyle((prevStyle) => ({
			...prevStyle,
			gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
		}))
		setGrid(generateRandomGrid(gridSize, gridSize))
		setRevealedGrid(
			new Array(gridSize)
				.fill("")
				.map(() => new Array(gridSize).fill(false))
		)
		setPrevClick(undefined)
	}

	function handleCardClicked(rowIndex: number, colIndex: number) {
		if (revealedGrid[rowIndex][colIndex]) return
		// reveal clicked card
		if (!grid) return null
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
					}, 200)
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
			<div className="input">
				<label htmlFor="grid-size">Grid size: </label>
				<input
					id="grid-size"
					type="number"
					value={gridSize}
					min={2}
					step={2}
					onChange={(e) => setGridSize(+e.target.value)}
				/>
				<button onClick={changeGridSize}>Change grid size</button>
			</div>
			{grid
				? grid.map((row, rowIndex) => (
						<div key={rowIndex} className="row" style={rowStyle}>
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
									{revealedGrid[rowIndex][colIndex]
										? num
										: "X"}
								</div>
							))}
						</div>
				  ))
				: null}
		</div>
	)
}

export default Memory
