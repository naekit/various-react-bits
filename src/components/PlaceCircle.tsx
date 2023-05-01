import { useState } from "react"

type TPoint = {
	x: number
	y: number
}

function PlaceCircle() {
	const [points, setPoints] = useState<TPoint[]>([])
	const [popped, setPopped] = useState<TPoint[]>([])

	function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
		const { pageX, pageY } = e
		setPoints((prev) => [...prev, { x: pageX, y: pageY }])
	}

	function handleUndo() {
		const newPoints = [...points]
		const poppedPoint = newPoints.pop()
		if (!poppedPoint) return
		setPopped((prev) => [...prev, poppedPoint])
		setPoints(newPoints)
	}

	function handleRedo() {
		const redoPoints = [...popped]
		const returnPoint = redoPoints.pop()
		if (!returnPoint) return
		setPoints((prev) => [...prev, returnPoint])
		setPopped(redoPoints)
	}

	function handleClear() {
		setPoints([])
		setPopped([])
	}

	return (
		<>
			<button disabled={points.length === 0} onClick={handleUndo}>
				undo
			</button>
			<button
				disabled={popped.length === 0 && points.length === 0}
				onClick={handleClear}
			>
				clear
			</button>
			<button disabled={popped.length === 0} onClick={handleRedo}>
				redo
			</button>
			<div className="clickcircle" onClick={handlePlaceCircle}>
				{points.map((point) => (
					<div
						key={`${Math.random() * point.x + point.y}`}
						className="point"
						style={{
							left: point.x - 20,
							top: point.y - 20,
						}}
					></div>
				))}
			</div>
		</>
	)
}

export default PlaceCircle
