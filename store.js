if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)  
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName("addToCart")
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}

function removeCartItem(){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
//need to add size selection to this
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName("subtitle")[0].innerText
    let price = shopItem.getElementsByClassName("item-price")[0].innerText
    let imgSrc = shopItem.getElementsByClassName("threads-image")[0].src
    console.log(title, price, imgSrc)
    addItemToCart(title, price, imgSrc)
}

function addItemToCart(title, price, imgSrc) {
    let cartRow = document.createElement('div')
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartRowContents = `
     <div class="cart-item cart-column">
        <img class="cart-item-img" src="imgs/sweatshirts.jpg" width="100" height="100">
        <span class="cart-item-title">Sweatshirt</span>
    </div>
        <span class="cart-price cart-column"> $39.99</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button"> Remove</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        console.log(priceElement, quantityElement)
        var price =  parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)   
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText =  '$' + total
}