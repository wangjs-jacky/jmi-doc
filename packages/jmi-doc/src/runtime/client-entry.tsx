import { createRoot } from "react-dom/client"
import App from "./App.js";

const renderInBorwser = () => {
  const containerEle = document.getElementById("root");
  console.log("123",123);
  
  if (!containerEle) {
    throw new Error("#root element not found")
  }
  createRoot(containerEle).render(<App />)
}

renderInBorwser();