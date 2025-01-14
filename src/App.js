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


import React from "react";
import DndMultiverse from "./components/DndMultiverse/DndMultiverse";

const App = () => {
  return (
    <div >
      <DndMultiverse/>
    </div>
  );
};
export default App;


