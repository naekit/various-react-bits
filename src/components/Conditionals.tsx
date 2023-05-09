/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react"
import { v4 as uuid } from "uuid"

type Operand = {
	id: string
	name: string
	value: boolean
}

type Operators = "or" | "and"

type OperandNode = {
	type: "operand"
	id: string
}

type OperationNode = {
	type: "operation"
	operator: Operators
	left: AstNode
	right: AstNode
}

type AstNode = OperandNode | OperationNode

function AstNodeComponent({
	node,
	operands,
	updateAstNode,
}: {
	node: AstNode
	operands: Operand[]
	updateAstNode: (newNode: AstNode) => void
}) {
	if (!node) {
		return null
	}

	function getOperand(operandId: string) {
		const operand = operands.find((operand) => operand.id === operandId)
		if (!operand)
			throw new Error("no operand found with the id of" + operandId)
		return operand
	}

	if (node.type === "operand") {
		const operand = getOperand(node.id)

		return (
			<select
				value={operand.id}
				onChange={(e) =>
					updateAstNode({ type: "operand", id: e.target.value })
				}
				className="op"
			>
				{operands.map((op) => (
					<option key={op.id} value={op.id}>
						{op.name}
					</option>
				))}
			</select>
		)
	} else {
		const operationNode = node

		return (
			<div style={{ paddingLeft: "50px" }}>
				<select
					value={operationNode.operator}
					onChange={(e) =>
						updateAstNode({
							...operationNode,
							operator: e.target.value as Operators,
						})
					}
					className="op"
				>
					<option value="or">or</option>
					<option value="and">and</option>
				</select>
				<br />
				<AstNodeComponent
					node={operationNode.left}
					operands={operands}
					updateAstNode={(newLeftNode) =>
						updateAstNode({ ...operationNode, left: newLeftNode })
					}
				/>
				<br />
				<AstNodeComponent
					node={operationNode.right}
					operands={operands}
					updateAstNode={(newRightNode) =>
						updateAstNode({ ...operationNode, right: newRightNode })
					}
				/>
			</div>
		)
	}
}

function evaluateAstNode(node: AstNode | null, operands: Operand[]): boolean {
	if (!node) {
		return false
	}
	if (node.type === "operand") {
		const operand = operands.find((operand) => operand.id === node.id)
		if (!operand)
			throw new Error("Operand not found with the id: " + node.id)
		return operand.value
	} else {
		const left = evaluateAstNode(node.left, operands)
		const right = evaluateAstNode(node.right, operands)
		return node.operator === "and" ? left && right : left || right
	}
}

function Conditionals() {
	const [operands, setOperands] = useState<Operand[]>([])

	const [rootAstNode, setRootAstNode] = useState<AstNode | null>(null)

	function addNewCondition() {
		const newId = uuid()
		setOperands([
			...operands,
			{
				id: newId,
				name: `new_condition_${newId}`,
				value: false,
			},
		])
	}

	function addNewOperation() {
		if (!rootAstNode) {
			if (operands.length === 0) {
				// No operands available to create an operation
				return
			}

			// Create a new operation with default values
			setRootAstNode({
				type: "operation",
				operator: "and",
				left: { type: "operand", id: operands[0].id },
				right: { type: "operand", id: operands[0].id },
			})
		} else {
			setRootAstNode({
				type: "operation",
				operator: "and",
				left: rootAstNode,
				right: { type: "operand", id: operands[0].id },
			})
		}
	}

	function removeCondition(operandId: string) {
		setOperands((prevOperands) =>
			prevOperands.filter((operand) => operand.id !== operandId)
		)

		function removeReferences(node: AstNode): AstNode | null {
			if (!node) return null
			if (node.type === "operand") {
				if (node.id === operandId) {
					return null
				}
				return node
			} else {
				const left = removeReferences(node.left)
				const right = removeReferences(node.right)
				if (!left || !right) {
					return left || right
				}
				return { ...node, left, right }
			}
		}

		setRootAstNode((prevRootAstNode) => {
			if (!prevRootAstNode) return null
			return removeReferences(prevRootAstNode) as AstNode
		})
	}

	function removeOperation() {
		if (!rootAstNode) return null
		if (rootAstNode.type === "operand") {
			return
		}
		setRootAstNode(rootAstNode.left)
	}

	return (
		<>
			<div className="app">
				<ul style={{ listStyle: "none" }}>
					{operands.map((arg) => (
						<li key={arg.id}>
							<input
								onChange={(e) =>
									setOperands((prevOperands) =>
										prevOperands.map((operand) =>
											operand.id === arg.id
												? {
														...operand,
														name: e.target.value,
												  }
												: operand
										)
									)
								}
								value={arg.name}
								className="op"
							/>
							<select
								onChange={(e) =>
									setOperands((prevOperands) =>
										prevOperands.map((operand) =>
											operand.id === arg.id
												? {
														...operand,
														value:
															e.target.value ===
															"true",
												  }
												: operand
										)
									)
								}
								value={`${arg.value}`}
								className="op"
							>
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<button onClick={() => removeCondition(arg.id)}>
								Remove Condition
							</button>
						</li>
					))}
					<button onClick={addNewCondition}>Add Condition</button>
					<br />
					<br />
					{rootAstNode && operands.length > 0 && (
						<AstNodeComponent
							node={rootAstNode}
							operands={operands}
							updateAstNode={setRootAstNode}
						/>
					)}
					<br />
					<button onClick={addNewOperation}>Add Operation</button>
					<button onClick={removeOperation}>Remove Operation</button>
					<br />
					result: {evaluateAstNode(rootAstNode, operands) + ""}
				</ul>
			</div>
		</>
	)
}

export default Conditionals
