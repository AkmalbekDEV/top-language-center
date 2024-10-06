import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/ProductContext.jsx";
import GroupProvider from "./context/GroupContext.jsx";
import StudentProvider from "./context/StudentsContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <ProductProvider>
        <StudentProvider>
          <GroupProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </GroupProvider>
        </StudentProvider>
      </ProductProvider>
  </BrowserRouter>
);
