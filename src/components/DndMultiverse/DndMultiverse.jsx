import React from "react";
import Header from "../Header/Header";
import Categories from "../Categories/Categories";
import Workscreen from "../Workscreen/Workscreen";
import Footer from "../Footer/Footer";

const DndMultiverse = () => {
  
  return (
    <div className="app">
      <Header/>
      <Categories/>
      <Workscreen/>
      <Footer/>
    </div>
  );
};

export default DndMultiverse;
