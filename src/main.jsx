import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App" 
import Product from "./pages/Product"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "./theme"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Loading from "./components/Loading"
import Attractions from "./pages/Attractions"
import Register from "./pages/Register"
import Signin from "./pages/Signin"
import Myprofile from "./pages/Myprofile"
import RandomUser from './pages/RandomUser'
ReactDOM.createRoot(document.getElementById("root")).render(

    <ChakraProvider theme={theme}>
      <BrowserRouter basename="/vite-darkmode">
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <NavBar />
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/products' element={<Product />}></Route>
          <Route path='/loading' element={<Loading />}></Route>
          <Route path='/attractions' element={<Attractions />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/myprofile' element={<Myprofile />}></Route>
          <Route path='/user' element={<RandomUser />}></Route>
        </Routes>
        </BrowserRouter>
   
    </ChakraProvider>

)
