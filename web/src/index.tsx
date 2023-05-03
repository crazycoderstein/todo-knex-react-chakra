import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

console.log('1')

root.render(
	<App />
)
console.log('2')
reportWebVitals()

console.log('3')