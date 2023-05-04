import { useState } from "react"

function TowerOfHanoi() {
	const [towers, setTowers] = useState([[3, 2, 1], [], []])
	const [selected, setSelected] = useState(-1)
	const [moves, setMoves] = useState(0)

	function handleClickedTower(clickedIndex: number) {
		if (selected >= 0) {
			if (
				towers[clickedIndex].length > 0 &&
				towers[clickedIndex][towers[clickedIndex].length - 1] <
					towers[selected][towers[selected].length - 1]
			) {
				return
			}
			const newTowers = [...towers]
			const poppedDisc = newTowers[selected].pop()
			if (poppedDisc === undefined || newTowers.length < 0) {
				setSelected(-1)
				return
			}
			newTowers[clickedIndex].push(poppedDisc)
			setTowers(newTowers)
			setSelected(-1)
			setMoves(moves + 1)
			if (newTowers[2].length === 3) {
				alert(`You won in ${moves} moves!`)
			}
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
							></div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default TowerOfHanoi
