import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./context/ProductContext.jsx";
// import StudentProvider from "./context/StudentsContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import JournalProvider from "./context/journals/JournalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      {/* <StudentProvider> */}
      <JournalProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </JournalProvider>
      {/* </StudentProvider> */}
    </ProductProvider>
  </BrowserRouter>
);
