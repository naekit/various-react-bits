import { useState } from "react"

function Memory() {
	const [grid, setGrid] = useState([
		[0, 3, 5, 1],
		[1, 2, 2, 4],
		[4, 3, 5, 0],
	])

	return (
		<div>
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((num, colIndex) => (
						<div key={colIndex} className="card">
							{num}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default Memory
