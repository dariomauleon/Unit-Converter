const d = document;
import { domRef } from "./domRef.js";
import { selectedCategory, loadCategories } from "./ui.js";
import { handleConverter } from "./converters.js";
import { units } from "../utilities/units.js";

const initApp = () => {
  d.addEventListener("DOMContentLoaded", (e) => {
    loadCategories(units, domRef);
  });

  d.addEventListener("change", (e) => {
    if (e.target.matches(".category-selector select")) {
      selectedCategory(e.target.value, units, domRef);
    }
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches(".btn-converter button")) {
      handleConverter(domRef);
    }
  });
};

export default initApp;
