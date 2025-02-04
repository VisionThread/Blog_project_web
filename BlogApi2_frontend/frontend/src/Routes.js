import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AboutPage from './screen/About';
import Login from './screen/Login';
import Register from './screen/Register';
import Home from './screen/Home';
import AddBlog from './screen/AddBlog';
import AuthorSearch from './screen/SearchByAuthor';
import BlogDetailPage from './screen/BlogDisplay';
import AuthorDashboard from './screen/AuthorDashboard';
import EditBlog from './screen/EditBlog';
import SearchBlogs from './screen/SearchBlog';
import { ROUTES } from "./RoutesConstant";
const AppRoutes = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.ADD_BLOG} element={<AddBlog />} />
          <Route path={ROUTES.AUTHOR_SEARCH} element={<AuthorSearch />} />
          <Route path={ROUTES.HOME} element={<Home/>} />
          <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetailPage/>} />
          <Route path={ROUTES.AUTHOR_DASHBOARD} element={<AuthorDashboard/>} />
          <Route path={ROUTES.EDIT_BLOG} element={<EditBlog/>}></Route>
          <Route path={ROUTES.BLOG_SEARCH} element={<SearchBlogs/>}></Route>
        </Routes>
    </div>
  )
}

export default AppRoutes;

