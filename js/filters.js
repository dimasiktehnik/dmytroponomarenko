// productsGrid is available from previous file
const filtersBox = document.querySelector('.j-filter-box')
const cards = productsGrid.querySelectorAll('.j-product-box__item')
const eattimeSelect = document.querySelector('.j-eattime-filter');
const costSelect = document.querySelector('.j-cost-filter');
const filteredByCategory = false;
const filteredByCost = false;
const filteredByCategoryClass = 'j-eattime-filter';
const filteredByCostClass = 'j-cost-filter'
const filtersActions = [
  { class: filteredByCategoryClass, actionName: 'filterByCategory' },
  { class: filteredByCostClass, actionName: 'filterByCost' },
];

class Filters {
  constructor(filtersBox) {
    this.elem = filtersBox;
    // this.filteredByCategory = filteredByCategory;
    // this.filteredByCost = filteredByCost;
    this.cards = cards;
    this.categoryFilterValue = '';
    this.costFilterValue = '';
    productsGrid.onchange = this.onChange.bind(this);
  }

  filterProductsByCategory(filterParameterValue) {
    this.cards.forEach(card => {
      if (filterParameterValue !== card.dataset.eattime) card.classList.add('d-none');
    })

    this.filteredByCategory = true;
  }

  showAllProducts() {
    this.cards.forEach(card => card.classList.remove('d-none'))
  }

  filterProducts(e) {

  }

  toggleByCategory(e) {
    this.showAllProducts();
    const { classList: selectClassList, value: filterParameterValue  } = e.target;
    if (selectClassList.contains(filteredByCategoryClass)) this.categoryFilterValue = e.target.value;
    if (selectClassList.contains(filteredByCostClass)) this.costFilterValue = Number(e.target.value);

    this.showAllProducts();

    this.cards.forEach(card => {
      const categoryValue = card.dataset.eattime;
      const costDiv = card.querySelector(`.${costClass}`);
      const cost = parseInt(costDiv.innerText);
      console.log(this.categoryFilterValue, this.costFilterValue)

      if ((this.categoryFilterValue && categoryValue !== this.categoryFilterValue)) card.classList.add('d-none');
      if (this.categoryFilterValue === '0') this.showAllProducts();
      if (this.costFilterValue && cost > this.costFilterValue) card.classList.add('d-none');
      if (this.costFilterValue === this.categoryFilterValue === '0') this.showAllProducts();

    })
  }

  filterByCost(e) {
    const filterParameterValue = parseInt(e.target.value);
    this.showAllProducts()
    this.cards.forEach(card => {
      const costDiv = card.querySelector('.j-product-box__cost');
      const cost = parseInt(costDiv.innerText);
      console.log(cost, filterParameterValue)

      if (cost > filterParameterValue) card.classList.add('d-none');
    })
  }

  onChange(event) {
    const clickedElement = event.target;
    const hasButton = filtersActions.find(input => {
      return clickedElement.classList.contains(input.class)
    })

    if (hasButton) {
      this[hasButton.actionName](clickedElement);
    }
  };
}

const filters = new Filters(filtersBox);

eattimeSelect.addEventListener('change', filters.toggleByCategory.bind(filters));
costSelect.addEventListener('change', filters.toggleByCategory.bind(filters));
