import { makeAutoObservable } from "mobx";

class AppStore {
  activeCategory = null;
  activeSubcategory = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveCategory(category) {
    this.activeCategory = category;
    this.activeSubcategory = null;
  }

  setActiveSubcategory(subcategory) {
    this.activeSubcategory = subcategory;
  }
}

const appStore = new AppStore();
export default appStore;
