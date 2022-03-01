const elemOrder = document.querySelector('#Order');
const elemButton = document.querySelector('#Button')
const data = [
  {
    'name': '雞腿飯',
    'price': 100
  },
  {
    'name': '焢肉飯',
    'price': 80
  },
  {
    'name': '焢肉飯',
    'price': 70
  },
  {
    'name': '魚排飯',
    'price': 85
  },
]

let subTotal = 0;
let discount = 0.8;
let deliverFee = 30;
let total = 0;
setInit();
function setInit() {
  render();
  setEvent();
}
function render() {
  elemOrder.innerHTML = makeMealList();
}
function makeMealList(str = '') {
  data.forEach((item) => {
    str += `<li class="order__item">
      <div>
        <h2 class="order__name text-md text-bolder">${item.name}</h2>
        <span class="order__price">${item.price}元</span>
      </div>
      <div>
        <label>數量:</label>
        <input type="text" class="order__amount" id="Fish" placeholder="0" value="">
      </div>
    </li>`;
  })
  return str;
}
function setEvent() {
  elemButton.addEventListener('click', atClick)
}
function calcSubtotal(arr) {
  data.forEach((item, index) => {
    subTotal += item.price * arr[index];
  });
}
function renderDetail() {
  document.querySelector('#InformationText').textContent = '以下是您的餐點明細：'
  elemOrder.innerHTML = `
    <li class="order__item">
      <p class="order__name text-md">小計：</p>
      <span class="order__price text-md">${subTotal}</span>
    </li>
    <li class="order__item">
      <p class="order__name text-md">折數：</p>
      <span class="order__price text-md">${discount}</span>
    </li>
    <li class="order__item">
      <p class="order__name text-md">運費：</p>
      <span class="order__price text-md">${deliverFee}</span>
    </li>
    <li class="order__item">
      <p class="order__name text-md">合計：</p>
      <span class="order__price text-lg text-danger">${total}</span>
    </li>`
  elemButton.value = '確認';
}

function atClick(e) {
  let amounts = [];
  let checkSum = 0;
  if (e.target.value === '下一步') {
    elemOrder.querySelectorAll('.order__amount').forEach((item) => {
      if (item.value !== '') { 
        amounts.push(Number(item.value));
      } else {
        amounts.push(0);
      }
    })
    amounts.forEach((el) => {
      checkSum += el;
    })
    if (checkSum === 0) {
      console.log(0)
      alert('請選擇數量！');
    }
    else if (isNaN(checkSum)) {
      alert('您輸入的格式錯誤！');
    } else {
      calcSubtotal(amounts);
      total = subTotal * discount + deliverFee;
      renderDetail();
    }
  } else {
    document.querySelector('#Header').style.display = 'none';
    document.querySelector('#Main').innerHTML = `
      <div class="finish container mx-auto mt-300">CMoney 線上訂餐謝謝您的光臨！！</div>
    `;
  }
}