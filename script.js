import { menuArray } from "./data.js";

const menus = document.getElementById('menus')
const orderSummary = document.getElementById('order-summary')
const orders = document.getElementById('order-list')
const totalPriceValue = document.getElementById('total-price')
const completeOrder = document.getElementById('complete-order')
const paymentDetails = document.getElementById('payment-details')
const payOrder = document.getElementById('pay-order')
const thanksMessage = document.getElementById('thanks-message')

let orderList = []
let totalPrice = 0
let itemIndex = 0

renderMenus()

menus.addEventListener('click', function(e){
    if(e.target.dataset.id){
        addItemOrder(e.target.dataset.id)
    }
})

orderSummary.addEventListener('click', function(e){
    if(e.target.dataset.index){
        removeItem(e.target.dataset.index)
    }
})

completeOrder.addEventListener('click', function(){
    paymentDetails.style.display = 'block'
})

payOrder.addEventListener('click', function(e){
    e.preventDefault()
    paymentDetails.style.display = 'none'
    orderSummary.style.display = 'none'
    thanksMessage.style.display = 'flex'
    orderList = []
    itemIndex = 0
    totalPrice = 0
})

function addItemOrder(id){
    const menu = menuArray.find(menu =>  menu.id.toString() === id)
    orderList.push({
        index: itemIndex++,
        item : menu
        }  
    )
    totalPrice += menu.price
    totalPriceValue.innerText=`$${totalPrice}`
    orderSummary.style.display = 'flex'
    thanksMessage.style.display = 'none'
    renderOrderList(orderList)
}

function removeItem(id){
    const rmOrderPrice = orderList.find(order => order.index.toString() == id).item.price
    console.log(rmOrderPrice)
    totalPrice -= rmOrderPrice
    totalPriceValue.innerText=`$${totalPrice}`
    orderList = orderList.filter(order => order.index != id)
    if(orderList.length == 0){
        orderSummary.style.display = 'none'
    } else {
        renderOrderList(orderList)
    }
}

function renderOrderList(orderList){
    const totalOrdersList = orderList.map(order => {
        const menu = order.item
        return `
        <div class="orders">
            <p>${menu.name}</p>
            <p class="order-remove" data-index="${order.index}">remove</p>
            <p class="align-right">$${menu.price}</p>
        </div>
        `
    }).join('')
    orders.innerHTML = totalOrdersList

}
function renderMenus(){
    
    const menuHtml = menuArray.map(menu => {
        const { name, ingredients, price, emoji, id } = menu
        return `
            <section class="menu">
                <p class="menu-img">${emoji}</p>
                <div class="menu-details">
                    <h3>${name}</h3>
                    <p class="ingredients">${ingredients}</p>
                    <p class="cost">$${price}</p>
                </div>
                <p class="add-item align-right" data-id="${id}">+</p>

            </section>
        `
    }).join('')
    menus.innerHTML = menuHtml
}