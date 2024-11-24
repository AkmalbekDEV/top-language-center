import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/ProductContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
    </ProductProvider>
  </BrowserRouter>
);
