import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="page-styling">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
