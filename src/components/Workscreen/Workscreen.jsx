function Workscreen({ store }) {
    if (!store.activeCategory) {
      return <div className="worksreen">Выберите категорию</div>;
    }
  
    switch (store.activeCategory) {
      case "Персонажи":
        return store.activeSubcategory === "Создание персонажей" ? (
          <CharacterCreation />
        ) : (
          <MyCharacters />
        );
      case "Заклинания":
        return <Spells />;
      default:
        return <div>Функционал в разработке</div>;
    }
  }
  