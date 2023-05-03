export const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

export const getItemStyle = (isDragging, draggableStyle) => ({
	...draggableStyle,
	userSelect: 'none',
	width: '560px',
})

function newId() {
	return Math.random().toString(36).substr(2, 9)
}
export { newId }
