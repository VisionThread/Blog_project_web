
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { AuthorProvider } from "./context/AuthorContext";
import AppRoutes from "./Routes";
import "./index.css"

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthorProvider>
      <ToastContainer
      autoClose={2000} />
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-container">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthorProvider>
  );
}

export default App;
