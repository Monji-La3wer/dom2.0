//select elements
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
//render products

function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./img/heart2.0.png" class="aa" alt="add to wish list" onclick="favorit(${product.id})" >
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderProdcuts();

let cart =[]
//ADD TO CART
function addToCart(id){
    if (cart.some((item)=> item.id ===id)){
        alert("Product already in cart")
        return;
    }
    else{
        const item = products.find((product)=>product.id===id)
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    uppDateCArt()
}
function uppDateCArt(){
    renderCardItem();
    renderSubtotal()
}
//calculate and render sabtotal
function renderSubtotal(){
    let totalPrice = 0;
    let totalItems=0;
    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits
    });
    subtotalEl.innerHTML=`subtotal (${totalItems} item): ${totalPrice.toFixed(2)}`
    totalItemsInCartEl.innerHTML=totalItems;
}
//renderCArdItem 
function renderCardItem(){
    cartItemsEl.innerHTML =""
    cart.forEach((item)=>{
        cartItemsEl.innerHTML+=`
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
    </div>
    `;})
}
//change number of units for an item
function changeNumberOfUnits(action,id){
    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits
        if(item.id ===id){
            if(action=== "minus" && numberOfUnits>1){
                numberOfUnits--
            }
            else if (action ==="plus" && numberOfUnits< item.instock){
                numberOfUnits++
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    })
    uppDateCArt()

}
//remove item from cart
function removeItemFromCart(id){
    cart = cart.filter((item)=>item.id !==id)
    uppDateCArt()
}
function favorit(id){

    console.log(products[id])
       if(products[id].favorite){
            document.getElementsByClassName("aa")[id].src="img/heart2.0.png"
            products[id].favorite = false;
            return;
        }
        document.getElementsByClassName("aa")[id].src="img/true_heart.png"
        products[id].favorite = true
        return;
    }

