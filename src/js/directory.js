import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Directory from "./Directory.mjs";

const service = new ExternalServices();

loadHeaderFooter();

const ingredient = await service.getIngredientList();
const category = await service.getCategoryList();
const area = await service.getAreaList();

const directory = new Directory(ingredient, category, area);

await directory.init();

