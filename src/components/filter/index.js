
import { getData } from '../../fixtures.js';

export default class FilterComponent {
  data = getData();
  abortController = new AbortController();

  constructor({ filterBy = 'strDrink' } = {}) {
    this.filterBy = filterBy;
    this.render();
    this.initEvents();
  }

  get template() {
    return `
            <div>
                <div data-element="filter_container" class="filter_container">
                    <div class="filter_header">Search cocktail Drinks</div>
                    <input data-element="filter" type="text" class="filter_input" />
                </div>
            </div>
        `;
  }

  render() {
    this.element = this.createElement();
    this.subElements = this.getSubElements();
  }

  initEvents() {
    this.subElements.filter.addEventListener(
      'keyup',
      (e) => {
        const inputValue =
          e.target.value.toLocaleLowerCase();

        const filteredData =
          inputValue.length < 1
            ? this.data
            : this.data.filter((drink) => {
                return (
                  drink[this.filterBy]
                    .toLocaleLowerCase()
                    .indexOf(inputValue) > -1
                );
              });
        document.dispatchEvent(
          new CustomEvent('filter-cocktails', {
            detail: {
              filteredData
            }
          })
        );
      },
      { signal: this.abortController.signal }
    );
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

  remove() {
    this.element?.remove();
  }

  destroy() {
    this.remove();
    this.abortController.abort();
  }
}
