import { useEffect, useState } from "react"

function TowerOfHanoi() {
	const [towers, setTowers] = useState([[5, 4, 3, 2, 1], [], []])
	const [selected, setSelected] = useState(-1)
	const [moves, setMoves] = useState(0)

	function handleClickedTower(clickedIndex: number) {
		if (selected >= 0) {
			const newTowers = [...towers]
			const poppedDisc = newTowers[selected].pop()
			if (poppedDisc === undefined || newTowers.length < 0) return
			newTowers[clickedIndex].push(poppedDisc)
			setTowers(newTowers)
			setSelected(-1)
		} else {
			setSelected(clickedIndex)
		}
	}

	return (
		<div className="towers">
			{towers.map((tower, i) => (
				<div
					onClick={() => handleClickedTower(i)}
					className={`tower ${selected === i ? "selected" : ""}`}
					key={i}
				>
					<div className="peg"></div>
					<div className="discs">
						{tower.map((v, i) => (
							<div
								key={i}
								className="disc"
								style={{ width: (v + 1) * 20 }}
							>
								{v}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default TowerOfHanoi
