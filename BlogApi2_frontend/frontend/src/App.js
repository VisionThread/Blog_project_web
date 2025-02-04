
// import './App.css';
// import { BrowserRouter as Router} from 'react-router-dom';
// import Navbar from './component/Navbar';
// import { AuthorProvider } from './context/AuthorContext';
// import Footer from './component/Footer';
// import AppRoutes from './Routes';
// function App() {
//   return (
//     <AuthorProvider>

// <Router>
//     <div className="App bg-[#F0F4F0] min-h-screen flex flex-col">
//       <Navbar />
//       <main className="container mx-auto mt-8 px-4 flex-grow">
//         {/* <Routes>
//           <Route path={ROUTES.HOME} element={<Home />} />
//           <Route path={ROUTES.LOGIN} element={<Login />} />
//           <Route path={ROUTES.REGISTER} element={<Register />} />
//           <Route path={ROUTES.ABOUT} element={<AboutPage />} />
//           <Route path={ROUTES.ADD_BLOG} element={<AddBlog />} />
//           <Route path={ROUTES.AUTHOR_SEARCH} element={<AuthorSearch />} />
//           <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetailPage/>} />
//           <Route path={ROUTES.AUTHOR_DASHBOARD} element={<AuthorDashboard/>} />
//           <Route path={ROUTES.EDIT_BLOG} element={<EditBlog/>}></Route>
//         </Routes> */}

//         <AppRoutes/>
//       </main>
//       <Footer/>
//     </div>
//   </Router>


//     </AuthorProvider>
   
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { AuthorProvider } from "./context/AuthorContext";
import AppRoutes from "./Routes";

function App() {
  return (
    <AuthorProvider>
      <Router>
        <div className="App bg-[#F0F4F0] min-h-screen flex flex-col">
          <Navbar />
          <main className="container mx-auto mt-8 px-4 flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthorProvider>
  );
}

export default App;
