// import { Container } from "@mui/material";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import Layout from "./components/Layout";

function App() {
  return (
    <ChakraProvider>
      <Layout>
        <TodoList />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
