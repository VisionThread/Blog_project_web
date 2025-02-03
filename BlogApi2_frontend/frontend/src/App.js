
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import AboutPage from './screen/About';
import Login from './screen/Login';
import Register from './screen/Register';
import Home from './screen/Home';
import Navbar from './component/Navbar';
import { AuthorProvider } from './context/AuthorContext';
import AddBlog from './screen/AddBlog';
import AuthorSearch from './screen/SearchByAuthor';
import BlogDetailPage from './screen/BlogDisplay';
import AuthorDashboard from './screen/AuthorDashboard';
import EditBlog from './screen/EditBlog';
import Footer from './component/Footer';
function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <nav>
    //       {/* <Link to="/">Home</Link> | <Link to="/about">About</Link> */}
    //       <Link to="/login">Login</Link>||||| 
    //       <Link to="/register">Register</Link>
    //     </nav>

    //     <Routes>
    //       <Route path="/login" element={<Login/>} />
    //       <Route path="/register" element={<Register/>} />
    //       <Route path="/about" element={<AboutPage />} />
    //     </Routes>
    //   </div>
    // </Router>
    <AuthorProvider>

<Router>
    <div className="App bg-[#F0F4F0] min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/AuthorSearch" element={<AuthorSearch />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/blog/:blogId" element={<BlogDetailPage/>} />
          <Route path="/authordashboard" element={<AuthorDashboard/>} />
          <Route path="/editblog/:blogId" element={<EditBlog/>}></Route>
        </Routes>
      </main>
      <Footer/>
    </div>
  </Router>


    </AuthorProvider>
   
  );
}

export default App;
