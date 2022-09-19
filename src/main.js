import './style/main.scss';
// import './icon/';
console.log('JS loaded!');

const purchaseForm = document.querySelector('#purchase-form');
const formParts = purchaseForm.querySelectorAll('.part');
const btnControl = document.querySelector('#btn-control');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const stepControl = document.querySelector('#step-control');
const steps = stepControl.querySelectorAll('.step');
const cartItems = document.querySelector('#cart-items');
const shippingMethod = document.querySelector('#shipping-method');
const shippingRadioInputs = document.querySelectorAll('input[name="shipment"]');
const cartShippingCost = document.querySelector('#cart-shipping-cost');
const cartTotal = document.querySelector('#cart-total');
const darkmodeToggle = document.querySelector('#menu-darkmode-toggle');

const cartItemsData = [
  {
    id: 'pants001',
    name: '破壞補丁修身牛仔褲',
    img: './src/public/images/item_1.png',
    amount: 1,
    price: 3999
  },
  {
    id: 'pants002',
    name: '刷色直筒牛仔褲',
    img: './src/public/images/item_2.png',
    amount: 1,
    price: 1299
  }
];

let step = 0;
let deliveryFee = 0;

function handleBtnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];
  if (e.target.matches('.next-btn') || e.target.matches('.next-arrow')) {
    const nextStep = steps[step + 1];
    nowStep.classList.remove('active');
    nowStep.classList.add('checked');
    nextStep.classList.add('active');
    formParts[step].classList.toggle('d-none');
    formParts[step + 1].classList.toggle('d-none');
    step += 1;
  } else if (e.target.matches('.prev-btn') || e.target.matches('.prev-arrow')) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove('active');
    prevStep.classList.remove('checked');
    prevStep.classList.add('active');
    formParts[step].classList.toggle('d-none');
    formParts[step - 1].classList.toggle('d-none');
    step -= 1;
  }

  setBtnDisappear();
}

function setBtnDisappear() {
  if (step === 0) {
    prevBtn.classList.add('d-none');
  } else {
    prevBtn.classList.remove('d-none');
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單';
  } else {
    nextBtn.innerHTML = `下一步
          <img src="./src/public/icons/arrow_right.svg" class="arrow-icon next-arrow" alt="">`;
  }
}

function handleItemAmount(e) {
  const targetId = e.target.dataset.productid;
  const itemIndex = cartItemsData.findIndex((item) => item.id === targetId);

  if (e.target.matches('.minus')) {
    if (cartItemsData[itemIndex].amount === 1) return;
    cartItemsData[itemIndex].amount -= 1;
  } else if (e.target.matches('.plus')) {
    cartItemsData[itemIndex].amount += 1;
  }
  renderCartItems();
  handleTotalCost();
}

function handleDeliveryOption() {
  if (this.checked) {
    const deliveryType = this.value;

    if (deliveryType === 'standard') {
      cartShippingCost.innerText = '免費';
      deliveryFee = 0;
    } else if (deliveryType === 'DHL') {
      cartShippingCost.innerText = '$500';
      deliveryFee = 500;
    }

    // setting radio border style

    shippingMethod.children[0].classList.remove('active');
    shippingMethod.children[1].classList.remove('active');
    this.parentElement.classList.add('active');
    handleTotalCost();
  }
}

function handleTotalCost() {
  let itemsSum = 0;
  cartItemsData.forEach((item) => {
    itemsSum += item.amount * item.price;
  });
  const total = deliveryFee + itemsSum;
  cartTotal.innerText = `$${total.toLocaleString('en-US')}`;
}

function renderCartItems() {
  let itemsRawHTML = '';
  cartItemsData.forEach((item) => {
    const itemSum = item.price * item.amount;
    itemsRawHTML += `
          <div class="cart__product" id="${item.id}">
            <img src="${
              item.img
            }" class="product__img" alt="cart product image">
            <div class="product__info">
              <div class="product__info-wrapper">
                <div class="product__info--title">${item.name}</div>
                <div class="product__info--quantity d-flex quantity-control">
                  <button class="count__btn minus" data-productId="${item.id}">
                    <img src="./src/public/icons/minus.svg" class="minus" data-productId="${
                      item.id
                    }" alt="">
                  </button>
                  <span class="count__number count">${item.amount}</span>
                  <button class="count__btn plus" data-productId="${item.id}">
                    <img src="./src/public/icons/plus.svg" class="plus" data-productId="${
                      item.id
                    }" alt="">
                  </button>
                </div>
              </div>
              <div class="product__info--price">$${itemSum.toLocaleString(
                'en-US'
              )}</div>
            </div>
          </div>
  `;
  });

  cartItems.innerHTML = itemsRawHTML;

  // addEventListener on amount btns
  const quantityControls = document.querySelectorAll('.quantity-control');
  quantityControls.forEach((quantityControl) =>
    quantityControl.addEventListener('click', handleItemAmount)
  );
}

function toggleDarkmode(e) {
  const darkmodeIcon = document.getElementById('nav-icon-darkmode');
  const searchIcon = document.getElementById('nav-icon-search');
  const cartIcon = document.getElementById('nav-icon-cart');
  const arrowLeftIcon = document.getElementById('nav-icon-arrowleft');

  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkmodeIcon.src = './src/public/icons/darkMode_sun.svg';
    searchIcon.src = './src/public/icons/search-darkmode.svg';
    cartIcon.src = './src/public/icons/cart-darkmode.svg';
    arrowLeftIcon.src = './src/public/icons/arrow_left-darkmode.svg';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    darkmodeIcon.src = './src/public/icons/darkMode_moon.svg';
    searchIcon.src = './src/public/icons/search.svg';
    cartIcon.src = './src/public/icons/cart.svg';
    arrowLeftIcon.src = './src/public/icons/arrow_left.svg';
  }
}

// global
btnControl.addEventListener('click', handleBtnControlClicked);
darkmodeToggle.addEventListener('change', toggleDarkmode);
for (const radioInput of shippingRadioInputs) {
  radioInput.addEventListener('change', handleDeliveryOption);
}
handleTotalCost();
renderCartItems();
