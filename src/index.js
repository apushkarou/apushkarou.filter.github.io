import FilterComponent from './components/filter/index.js';
import CocktailsWrapper from './components/cocktails-container/index.js';

const app = document.getElementById('app');

const filterComponent = new FilterComponent();
const cocktailsWrapper = new CocktailsWrapper();

if (app) {
    app.append(filterComponent.element);
    app.append(cocktailsWrapper.element);
} else {
    throw new Error('Root element not found');
}