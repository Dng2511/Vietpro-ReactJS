import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layout
import Footer from "./shared/components/Layout/Footer";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Sidebar from "./shared/components/Layout/Sidebar";
import Slider from "./shared/components/Layout/Slider";

// Import Pages
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
//Redux

import { Provider } from "react-redux";
import store from "./redux-setup/store";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          {/*	Body	*/}
          <div id="body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Menu />
                </div>
              </div>
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  <Slider />
                  
                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Category-:id" element={<Category/>}/>
                    <Route path="/ProductDetails-:id" element={<ProductDetails/>}/>
                    <Route path="/Search" element={<Search/>}/>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/Success" element={<Success/>}/>
                    <Route path="*" element={<NotFound/>}/>
                  </Routes>

                  
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          {/*	End Body	*/}
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;