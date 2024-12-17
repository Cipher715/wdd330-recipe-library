import ExternalServices from "./ExternalServices.mjs";
import RecipeDetail from "./RecipeDetail.mjs";

const service = new ExternalServices();
const detail = new RecipeDetail();

export default class Welcome{
    async init(){
        let recipe = await service.getRandomRecipe();
        detail.init(recipe);
    }
}