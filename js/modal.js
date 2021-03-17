const modalBackgroundClass = 'j-basket-modal-container';
const modal = document.querySelector(`.${modalBackgroundClass}`);
const toggleModalBtn = document.querySelector('.j-open-basket-btn');
const hiddenClass = 'd-none';
const sendButtonClass = 'basket-modal__btn';
const inputs = modal.querySelectorAll('input');
const inputErrorClass = 'basket-modal__input--error';

const modalActions = [
    { class: sendButtonClass, actionName: 'sendMessage' },
    { class: modalBackgroundClass, actionName: 'closeModal' },
  ];

toggleModalBtn.addEventListener('click', () => {
    const isOpenModal = modal.classList.contains(hiddenClass);

    isOpenModal ? modal.classList.remove(hiddenClass) : modal.classList.add(hiddenClass) 
})

class Modal {
    constructor(modal) {
      this.elem = modal;
      this.isValidForm = true;
      modal.onclick = this.onClick.bind(this);
    }

    validateForm() {
        this.cleanValidation();

        inputs.forEach(input => {
            const inputValue = input.value.trim();
            console.log(inputValue)

            if (!inputValue) { 
                this.isValidForm = false;
                input.classList.add(inputErrorClass);
            }
        })
    }

    cleanValidation() {
        this.isValidForm = true;
        inputs.forEach(input => input.classList.contains(inputErrorClass) && input.classList.remove(inputErrorClass))
    }

    sendMessage() {
        this.validateForm();

        if (this.isValidForm) this.successfulEnd();
    }

    successfulEnd() {
        alert('success');
        console.log(productBox)
        productBox.cleanBasket();
        productBox.checkDisabledOrderBtn();
        this.closeModal();
    }

    closeModal() {
        modal.classList.add(hiddenClass)
    }

    onClick(event) {
        const clickedElement = event.target;
        const hasButton = modalActions.find(input => {
          return clickedElement.classList.contains(input.class)
        })
    
        if (hasButton) {
          this[hasButton.actionName](clickedElement);
        }
      };
}

new Modal(modal);