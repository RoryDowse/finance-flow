import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="page-styling">
        <Outlet />
      </main>
    </>
  )
}

export default App
