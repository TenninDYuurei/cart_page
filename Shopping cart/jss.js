// cart
// let document = document.querySelector;

let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// let addedToCart;

cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

// if (document.readyState == "loading") {
//     document.addEventListener("DOMContentLoaded", ready)
// } else {
//     ready();
// }

// function ready() {
//     let removeCartButtons = document.querySelectorAll('.cart-remove');
//     for (let i = 0; i < removeCartButtons.length; i++){
//         let button = removeCartButtons[i];
//         button.addEventListener('click', removeCartItem);
//     }

//     let quantityInputs = document.querySelectorAll('.cart-quantity');
//     // console.log(quantityInputs);
//     for (let i = 0; i < quantityInputs.length; i++){
//         let input = quantityInputs[i];
//         input.addEventListener('change', quantityChange);
//     }
    
//     // console.log(addCart);

//     updateTotal();
// }

let addCart = document.getElementsByClassName("add-cart");
for (i = 0; i < addCart.length; i++){
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
} 




function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChange(event) {
    let input = event.target;
    if (isNaN(input) || input.value <= 0) {
        let remove = window.prompt("You are removing this item from your cart, proceed?");
        if (remove.toLowerCase()== "yes") {
            let tbr = input.parentElement;
            tbr.parentElement.remove();
        }
        else input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    let shopProducts = event.target.parentElement;
    let title = shopProducts.querySelector('.product-title').innerText;
    let price = shopProducts.querySelector(".price").innerHTML;
    let image = shopProducts.getElementsByTagName('img')[0].src;
    addToCart(title, price, image);
    updateTotal();
}

function addToCart(title, price, image) {
    alert("Do you want to add this item to cart?");

    let newCart = document.createElement('div');
    newCart.classList.add('cart-box');
    newCart.innerHTML = `       
                        <img src=${image} alt="" class="cart-img image">
                        <div>
                        <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">

                        </div>
                    <!--REMOVE-->
                            <img src="../resources/linea ecommerce/_SVG/ecommerce_cart_remove.svg" alt="" class="icon cart-remove">
                    `;
    document.querySelector('.cart-content').append(newCart);
    newCart.querySelector(".cart-quantity").addEventListener("change", quantityChange);
    newCart.querySelector(".cart-remove").addEventListener("click", removeCartItem);

}










function updateTotal() {
    let cartContent = document.querySelector('.cart-content');
    let cartBoxes = cartContent.querySelectorAll('.cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        console.log(price);
        let quantityElement = cartBox.querySelector('.cart-quantity');
        console.log(quantityElement);
        total = total + (price * (quantityElement.value));
    }
    console.log(total);
    total = Math.round(total);
    document.querySelector(".total-price").innerHTML = "$" + total;

}
document.querySelector('#btn-buy').addEventListener("click", buyBtnClicked);
document.querySelector('#clear-btn').addEventListener("click", clearBtnClicked);


function buyBtnClicked() {
    alert('You have bought the items');
    let cartBought = document.getElementsByClassName('cart-content')[0];
    while (cartBought.hasChildNodes()) {
            cartBought.removeChild(cartBought.firstChild);
    }
    updateTotal();
}

function clearBtnClicked() {
    // ans = window.prompt('Do you want to clear cart? (yes/no)');
    // if (ans.toLowerCase == "yes") {
        let cartBought = document.getElementsByClassName('cart-content')[0];
        while (cartBought.hasChildNodes()) {
            cartBought.removeChild(cartBought.firstChild);
        // }
        updateTotal();
    }
}