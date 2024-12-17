import { loadHeaderFooter } from "./utils.mjs";
import RecipeDetail from "./RecipeDetail.mjs";
import Welcome from "./Welcome.mjs";

const welcome = new Welcome();

loadHeaderFooter();

welcome.init();