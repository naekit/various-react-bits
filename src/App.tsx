import { useState } from "react"
import "./App.css"

type Operand = {
	id: string
	name: string
	value: boolean
}

type Operators = "or" | "and"

type OperationNode = {
	id: string
	operandA: string | OperationNode
	operandB: string | OperationNode
}

type Operation = {
	id: string
	operandA: string
	operandB: string
	operator: Operators
}

function Operation({
	operation,
	operations,
	changeOperationType,
	changeOperationOperand,
	operands,
}: {
	operation: OperationNode
	operations: Record<string, Operation>
	changeOperationType: (arg0: string, arg1: Operators) => void
	changeOperationOperand: (
		operationId: string,
		isOperandA: boolean,
		operandId: string
	) => void
	operands: Operand[]
}) {
	function getOperand(operandId: string) {
		const operand = operands.find((operand) => operand.id === operandId)
		if (!operand)
			throw new Error("no operand found with the id of" + operandId)
		return operand
	}

	return (
		<div style={{ paddingLeft: "50px" }}>
			<select
				onChange={(e) =>
					changeOperationType(
						operation.id,
						e.target.value as Operators
					)
				}
				defaultValue={operations[operation.id].operator}
			>
				<option value="or">or</option>
				<option value="and">and</option>
			</select>
			<br />
			{typeof operation.operandA === "string" ? (
				<select
					onChange={(e) =>
						changeOperationOperand(
							operation.id,
							true,
							e.target.value
						)
					}
					value={getOperand(operations[operation.id].operandA).id}
				>
					{operands.map((operand) => (
						<option key={operand.id} value={operand.id}>
							{operand.name}
						</option>
					))}
				</select>
			) : (
				<Operation
					changeOperationOperand={changeOperationOperand}
					changeOperationType={changeOperationType}
					operands={operands}
					operation={operation.operandA}
					operations={operations}
				/>
			)}
			<br />
			{typeof operation.operandB === "string" ? (
				<select
					onChange={(e) =>
						changeOperationOperand(
							operation.id,
							false,
							e.target.value
						)
					}
					value={getOperand(operations[operation.id].operandB).id}
				>
					{operands.map((operand) => (
						<option key={operand.id} value={operand.id}>
							{operand.name}
						</option>
					))}
				</select>
			) : (
				<Operation
					changeOperationOperand={changeOperationOperand}
					changeOperationType={changeOperationType}
					operands={operands}
					operation={operation.operandB}
					operations={operations}
				/>
			)}
		</div>
	)
}

function App() {
	const [operands, setOperands] = useState<Operand[]>([
		{
			id: "operand_123",
			name: "mybool",
			value: false,
		},
		{
			id: "operand_abc",
			name: "otherbool",
			value: true,
		},
		{
			id: "operand_3",
			name: "geil",
			value: true,
		},
	])

	const [rootOperation, setRootOperations] = useState<OperationNode>({
		id: "1",
		operandA: {
			id: "2",
			operandA: "operand_abc",
			operandB: "operand_3",
		},
		operandB: "operand_abc",
	})

	const [operations, setOperations] = useState<Record<string, Operation>>({
		1: {
			id: "1",
			operator: "or",
			operandA: "operand_123",
			operandB: "operand_abc",
		},
		2: {
			id: "2",
			operator: "and",
			operandA: "operand_abc",
			operandB: "operand_3",
		},
	})

	function getOperand(operandId: string) {
		const operand = operands.find((operand) => operand.id === operandId)
		if (!operand)
			throw new Error("no operand found with the id of" + operandId)
		return operand
	}

	function changeArgValue(argId: string, newValue: boolean) {
		setOperands((prevArgs) => {
			return prevArgs.map((arg) =>
				arg.id === argId ? { ...arg, value: newValue } : arg
			)
		})
	}

	function changeArgName(argId: string, newName: string) {
		setOperands((prevArgs) => {
			return prevArgs.map((arg) =>
				arg.id === argId ? { ...arg, name: newName } : arg
			)
		})
	}

	function changeOperationType(operationId: string, newOperator: Operators) {
		setOperations((prevOperations) => ({
			...prevOperations,
			...{
				[operationId]: {
					...prevOperations[operationId],
					operator: newOperator,
				},
			},
		}))
	}

	function changeOperationOperand(
		operationId: string,
		isOperandA: boolean,
		operandId: string
	) {
		setOperations((prevOperations) => ({
			...prevOperations,
			...{
				[operationId]: {
					...prevOperations[operationId],
					[isOperandA ? "operandA" : "operandB"]: operandId,
				},
			},
		}))
	}

	function calculateFinalBool(operationNode: OperationNode): boolean {
		const operation = operations[operationNode.id]

		function getValue(property: "operandA" | "operandB") {
			return typeof operationNode[property] === "string"
				? getOperand(operation[property]).value
				: calculateFinalBool(operationNode[property] as OperationNode)
		}

		if (operation.operator === "and") {
			return getValue("operandA") && getValue("operandB")
		} else {
			return getValue("operandA") || getValue("operandB")
		}
	}

	return (
		<>
			<div className="app">
				<h1>Hello</h1>
				<ul>
					{operands.map((arg) => (
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
					<Operation
						operation={rootOperation}
						operations={operations}
						changeOperationType={changeOperationType}
						changeOperationOperand={changeOperationOperand}
						operands={operands}
					/>
					<br />
					result: {calculateFinalBool(rootOperation) + ""}
				</ul>
			</div>
		</>
	)
}

export default App
