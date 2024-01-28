import React,{useState,useEffect } from 'react';

import Footer from "../Footer/Footer";
import LangButton from "../../atoms/LangButton";
import HomePage from "../../../pages/HomePage/HomePage";
const Layout = () => {

    return(
        <div>
            <LangButton/>
            <HomePage/>
            {/*<Footer/>*/}
        </div>
    )

}

export default Layout