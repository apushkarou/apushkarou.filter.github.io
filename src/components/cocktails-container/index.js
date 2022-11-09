import { getData } from '../../fixtures.js';

export default class CoctailsContainer {
  data = getData();
  abortController = new AbortController();

  constructor() {
    this.render();
    this.initEvents();
  }

  get template() {
    return `
        <div>
            <div data-element="cocktails_container" class="cocktails_container">
                ${this.getCocktailsCard(
                  this.data
                )}
            </div>
        </div>
    `;
  }

  createElement = () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;

    return wrapper.firstElementChild || wrapper;
  };

  getSubElements() {
    const result = {};
    const elements =
      this.element.querySelectorAll(
        '[data-element]'
      );

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  getCocktailsCard(data) {
    return data
      .map(
        ({
          strDrink,
          strAlcoholic,
          strCategory,
          strDrinkThumb,
          idDrink
        }) => {
          return `
            <div class="cocktails_card">
                <div class="cocktails_img"><img src="${strDrinkThumb}" /></div>
                <div class="cocktails_label">${strCategory}</div>
                <div class="cocktails_name" data-element-iddrink="${idDrink}">${strDrink}</div>
                <div class="cocktails_description">${strAlcoholic}</div>
            </div>
            `;
        }
      )
      .join('');
  }

  render() {
    this.element = this.createElement();
    this.subElements = this.getSubElements();
  }

  initEvents() {
    document.addEventListener(
      'filter-cocktails',
      (e) => {
        this.update(e.detail.filteredData);
      },
      {
        signal: this.abortController.signal
      }
    );
  }

  update(data) {
    this.subElements.cocktails_container.innerHTML =
      this.getCocktailsCard(data);
  }

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.abortController.abort();
  }
}
