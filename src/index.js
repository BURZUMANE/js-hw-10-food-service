import * as basicLightbox from 'basiclightbox';
// console.log(JSON.parse(localStorage.getItem('cartItems')));
import article from './assets/menu.json'
import articleTemplate from './templates/article.hbs'
import ordersTemplate from './templates/orders.hbs'

import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.css';


const refs = {
    themeToggle: document.querySelector('input.js-switch-input'),
    jsMenu: document.querySelector('.js-menu'),
    jsCart: document.querySelector('.js-cart'),
}

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};


const cart = {
    items:JSON.parse(localStorage.getItem('cartObj')),
    add(input){
        if(this.items === null){
            this.items = {};
            this.items[`${input}`] = 1;
            localStorage.setItem('cartObj', JSON.stringify(this.items));
        }else{
            if([`${input}`] in this.items){
                this.items[`${input}`] += 1;
            }else{
                this.items[`${input}`] = 1;
            }
                localStorage.setItem('cartObj', JSON.stringify(this.items));
                // console.log(this.localStorage.getItem('cartObj'));
        }
        }
    
}

if(localStorage.getItem('theme') === 'light'){
    document.querySelector('body').classList.remove(Theme.DARK) ;
}else if(localStorage.getItem('theme') === 'dark'){ 
    document.querySelector('body').classList.add(Theme.DARK);
    refs.themeToggle.setAttribute('checked', 'true')
}

function markUpStr(arr, callBack){
    return arr.reduce((resStr, strItem) => {
        resStr += callBack(strItem);
        
        return resStr;
    }, '');
};

const markUpInsert = markUpStr(article, articleTemplate);

refs.jsMenu.innerHTML = markUpInsert;
refs.themeToggle.addEventListener('change', HandleThemeSwitch);

function HandleThemeSwitch(e){
    document.querySelector('body').classList.toggle(Theme.DARK);
        if(localStorage.getItem('theme') === 'light'){
            localStorage.setItem('theme', 'dark');
        }else{
            localStorage.setItem('theme', 'light');
        }   
    }
// ADD TO CARD FUNCTIONALITY

refs.jsMenu.addEventListener('click', addToCart);

function addToCart(e){
    const button = e.target
    if(button.nodeName !== 'BUTTON') return;
    // console.log(button.closest('div.card').dataset.id);
    const id = button.closest('div.card').dataset.id;
    cart.add(id);
}

refs.jsCart.addEventListener('click', handleCart);
function handleCart(e){
    const cart = JSON.parse(localStorage.getItem('cartObj'));
    const cartEntries = Object.entries(cart);
    const orderDetails = [];
    for(const elem of cartEntries){
        const item = article.find(item => item.id === elem[0]);
        const foundItem = {
            name:item.name,
            price:item.price,
            quantity:elem[1]
        }
        orderDetails.push(foundItem);
    }
    console.log(orderDetails);
    // const markUpInsert = markUpStr(orderDetails, articleTemplate);
    // const storedCart = localStorage.getItem('cartItems');
    const renderRows = function(arr){
        return arr.reduce((acc, item)=>{
            acc += `
            ${ordersTemplate(item)}
            `
            return acc;
        }, '');
    };

    // const shit = array =>
    // array.reduce(holder, item)
    const instance = basicLightbox.create(`
    <div class="cart-container">
    <table>
        <tr>
            <th>Продукт</th>
            <th>КОЛИЧЕСТВО</th>
            <th>ЦЕНА</th>
        </tr>
        ${renderRows(orderDetails)}
    
    </table>
    <button class="orders-button button">
      <i class="material-icons button__icon">
        shopping_cart
      </i>
      Заказать
    </button>
</div>
`)
    instance.show();
    document.querySelector('.cart-container').addEventListener('click', orderConfirmation);
    function orderConfirmation(e){
        const button = e.target.nodeName === 'BUTTON';
        if(!button) return;
        // console.log(e.currentTarget);
        e.currentTarget.innerHTML = `
        <div class="confirmation">
        <img class="confirmation__img" src="https://www.makeasmilelottery.org.uk/wp-content/uploads/2017/05/blueface-01.png" alt="">
        <p class="confirtmation__title">
          Спасибо за покупку, мне прегодяться вашы денги
        </p>
      </div>
        `;
        localStorage.removeItem('cartObj');
    }
}


// ARRAY VERSION


// import * as basicLightbox from 'basiclightbox';
// // console.log(JSON.parse(localStorage.getItem('cartItems')));
// import article from './assets/menu.json'
// import articleTemplate from './templates/article.hbs'
// import ordersTemplate from './templates/orders.hbs'

// import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
// import './styles.css';


// const refs = {
//     themeToggle: document.querySelector('input.js-switch-input'),
//     jsMenu: document.querySelector('.js-menu'),
//     jsCart: document.querySelector('.js-cart'),
// }

// const Theme = {
//     LIGHT: 'light-theme',
//     DARK: 'dark-theme',
// };

// const cart = {
//     currentCart: JSON.parse(localStorage.getItem('cartItems')),
//     items: [],
//     add(input){
//         const isPresent = this.items.find(items => items.id === input);
//         if(!isPresent){
//             const obj = {
//                 id:input,
//                 quantity:1,
//             };
//             this.items = [...this.items, obj];
//         }else{
//             isPresent.quantity += 1;
//         };
//         const updatedStorage = [...this.currentCart, this.items]
//         localStorage.setItem('cartItems', JSON.stringify(updatedStorage));
//         console.log(this.currentCart)

//     }
// }


// // const cart = {
// //     item: [],
// //     add(id){
// //         const currentItem = article.find(item => item.id = id);
// //         console.log(currentItem);
// //     }
// // }


// if(localStorage.getItem('theme') === 'light'){
//     document.querySelector('body').classList.remove(Theme.DARK) ;
// }else if(localStorage.getItem('theme') === 'dark'){ 
//     document.querySelector('body').classList.add(Theme.DARK);
//     refs.themeToggle.setAttribute('checked', 'true')
// }

// function markUpStr(arr){
//     return arr.reduce((resStr, strItem) => {
//         resStr += articleTemplate(strItem);
        
//         return resStr;
//     }, '');
// };

// const markUpInsert = markUpStr(article);

// refs.jsMenu.innerHTML = markUpInsert;
// refs.themeToggle.addEventListener('change', HandleThemeSwitch);

// function HandleThemeSwitch(e){
//     document.querySelector('body').classList.toggle(Theme.DARK);
//         if(localStorage.getItem('theme') === 'light'){
//             localStorage.setItem('theme', 'dark');
//         }else{
//             localStorage.setItem('theme', 'light');
//         }   
//     }
// // ADD TO CARD FUNCTIONALITY

// refs.jsMenu.addEventListener('click', addToCart);

// function addToCart(e){
//     const button = e.target
//     if(button.nodeName !== 'BUTTON') return;
//     // console.log(button.closest('div.card').dataset.id);
//     const id = button.closest('div.card').dataset.id;
//     cart.add(id);
// }

// refs.jsCart.addEventListener('click', handleCart);
// function handleCart(e){
//     const storedCart = localStorage.getItem('cartItems');

//     const instance = basicLightbox.create(`
//     ${ordersTemplate()}
// `)
//     instance.show();
//     console.log(storedCart);
// }
