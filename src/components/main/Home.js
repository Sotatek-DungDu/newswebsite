import React from 'react';
import { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import PostData from '../../api/PostData';
import Header from './Header/Header'
import Footer from './Footer'
import BlogDetail from './Blog/BlogDetail/BlogDetail';
import AboutUs from './AboutUs/AboutUs'
import BlogGridContainer from '../main/BlogGrid/BlogGridContainer'
import BlogList from '../main/BlogList/BlogList'
import SidebarDetail from '../main/BlogGrid/Sidebar/SidebarDetail'
import Contact from './Contact/Contact'
import Category from './Category/Category'
import Address from './Address';
import HomeBlog from "./HomeBlog/HomeBlog"

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import '../../assets/css/main/css/main.css'
import '../../assets/css/main/css/util.min.css'
import '../../assets/css/main/Bootstrap/bootstrap.min.css'
import '../../assets/css/main/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../assets/css/main/fonts/fontawesome-5.0.8/css/fontawesome-all.min.css'

function Home() {

  return (
    
      <div className="animsition">
          <Routes>
            <Route path="/" exact element={ <HomeBlog /> } />

            {/* <Route path="/">
                <HomeBlog />
            </Route>
            <Route path="/">
                <HomeBlog />
            </Route> */}  
          </Routes>
      </div>
  )
}

export default Home