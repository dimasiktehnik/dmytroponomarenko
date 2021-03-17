const [ productsGrid ] = document.getElementsByClassName('j-products-box');
const [ 
  addButtonClass, 
  changeQtyClass, 
  cardClass,
  errorClass, 
  costClass,
  titleClass,
  formOrderButtonClass
] = ['j-product-box__btn', 'j-qty__item', 'j-product-box__item', 'qty__item--error', 'j-product-box__cost', 'j-product-box__title', 'j-open-basket-btn'];

const addButtons = productsGrid.getElementsByClassName(addButtonClass);
const productsInBasket = [];

const productBoxActions = [
  { class: addButtonClass, actionName: 'addProductToCard' },
  { class: changeQtyClass, actionName: 'changeQty' },
];

class ProductBox {
  constructor(productsGrid) {
    this.elem = productsGrid;
    this.productsInBasket = productsInBasket;
    productsGrid.onclick = this.onClick.bind(this);
  }

  addProductToCard(clickedElement) {
    if (clickedElement.classList.contains(addButtonClass)) {
      const card = clickedElement.closest(`.${cardClass}`);

      const [ qtyInput ] = card.getElementsByClassName(changeQtyClass);
      const [ costHTMLValue ] = card.getElementsByClassName(costClass);
      const [ nameHTMLValue ] = card.getElementsByClassName(titleClass);
      const qty = qtyInput && Number(qtyInput.value);
      const cost = parseInt(costHTMLValue.innerText);
      const name = nameHTMLValue.innerText;
      const potentialProductToBasket = {
        qty, 
        cost: cost * qty,
        name
      }
      qty ? this.tryFillBasket(potentialProductToBasket) : this.validateQtyInput(qtyInput)

      this.cleanQty(qtyInput)
    }
  }

  tryFillBasket(potentialProduct) {
    const hasProductInBasketYet = this.productsInBasket.find(productsInBasket => productsInBasket.name === potentialProduct.name)

    hasProductInBasketYet 
      ? this.overwriteProduct(potentialProduct)
      : this.addNewProductToBasket(potentialProduct)

    updateBasketInfo(this.productsInBasket)
    this.checkDisabledOrderBtn()
  }

  checkDisabledOrderBtn() {
    const formOrderBtn = document.querySelector(`.${formOrderButtonClass}`);

    formOrderBtn.disabled = !Boolean(this.productsInBasket.length);
  }

  addNewProductToBasket(potentialProduct) {
    this.productsInBasket.push(potentialProduct)
  }

  overwriteProduct(potentialProduct) {
    this.productsInBasket.forEach(existedProduct => {
      if (existedProduct.name === potentialProduct.name) {
        existedProduct.cost += potentialProduct.cost;
        existedProduct.qty += potentialProduct.qty;
      }
    })
  }

  changeQty() {
    const qtyInputs = productsGrid.querySelectorAll('.j-qty__item');
    qtyInputs.forEach(qtyInput => {
      if (qtyInput.classList.contains(errorClass)) qtyInput.classList.remove(errorClass)
    })
  }

  validateQtyInput(qtyInput) {
    const qty = qtyInput && Number(qtyInput.value);

    if (Number(!qty)) { 
      qtyInput.classList.add(errorClass);
      return;
    }
  }

  cleanQty(qtyInput) {
    qtyInput.value = ''
  }

  cleanBasket() {
    this.productsInBasket = [];
    updateBasketInfo(this.productsInBasket);
    console.log(this.productsInBasket);
  }

  onClick(event) {
    const clickedElement = event.target;
    const hasButton = productBoxActions.find(input => {
      return clickedElement.classList.contains(input.class)
    })

    if (hasButton) {
      this[hasButton.actionName](clickedElement);
    }
  };
}

const productBox = new ProductBox(productsGrid);

// update title

function updateBasketInfo(productsInBasket) {
  const qtyOfproductInBasket = document.querySelector('.j-basket__qty');
  const costOfproductInBasket = document.querySelector('.j-basket__cost');

  const basketQty = productsInBasket.reduce((cost, product) => cost + product.qty, 0);
  const basketCost = productsInBasket.reduce((cost, product) => cost + product.cost, 0);
  console.log(basketQty, basketCost, 'qty and cost');

  qtyOfproductInBasket.innerText = basketQty;
  costOfproductInBasket.innerText = basketCost;
  console.log(qtyOfproductInBasket.innerText, costOfproductInBasket.innerText, 'qty and cost after');

}