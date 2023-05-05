// import { Container } from "@mui/material";
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import TodoList from './Component/TodoList'
import Layout from './Component/Layout'

function App() {
	return (
		<ChakraProvider>
			<Layout>
				<TodoList />
			</Layout>
		</ChakraProvider>
	)
}

export default App
