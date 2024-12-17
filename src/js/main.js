import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import RecipeDetail from "./RecipeDetail.mjs";

const service = new ExternalServices();

loadHeaderFooter();

const recipe = await service.getRandomRecipe();
const detail = new RecipeDetail();

detail.init(recipe);