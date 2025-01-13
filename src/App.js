// import React, { useState } from "react";
// import StartScreen from "./components/StartScreen/StartScreen";
// import SpellDatabase from "./components/SpellDatabase/SpellDatabase";
// import CharacterCreator from "./components/CharacterCreator/CharacterCreator";
// import "./App.css";

// const App = () => {
//   const [screen, setScreen] = useState(null); // null означает стартовый экран

//   const renderScreen = () => {
//     if (screen === "spells") return <SpellDatabase />;
//     if (screen === "character") return <CharacterCreator />;
//     return <StartScreen onOptionSelect={setScreen} />;
//   };

//   return <div className="app-container">{renderScreen()}</div>;
// };

// export default App;



import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Workscreen from "./components/Workscreen/Workscreen";
import appStore from "./store/appStore";

function App() {
  return (
    <div className="app">
      <Header/>
      <Categories store={appStore}/>
      <Workscreen store={appStore}/>
    </div>
  );
}

export default App;
