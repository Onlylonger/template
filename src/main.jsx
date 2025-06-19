// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

import { createPopper } from "./components/popper";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const btnEle = document.getElementById("btn");
const popEle = document.getElementById("pop");

const { x, y } = createPopper(btnEle, popEle);

Object.assign(popEle.style, {
  left: `${x}px`,
  top: `${y}px`,
});
