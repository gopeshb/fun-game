import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Toaster } from 'react-hot-toast';
import Game from "./pages/Game.jsx";
export default function App() {
  return (
    <BrowserRouter>
    <Toaster/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route element={<PrivateRoute/>} >
      <Route path="/user/game" element={<Game/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
