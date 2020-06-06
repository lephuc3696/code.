const cart = {}

function addToCart(event) {
    const btn = event.target
    const cardBody = btn.parentNode
    const name = cardBody.querySelector('h5').innerText
    let price = cardBody.querySelector('p').innerText
    price = price.replace(/,/g, '')
        .replace(' vnđ', '')
    price = Number(price)
    const id = btn.getAttribute('data-id')

    const product = {
        id: id,
        name: name,
        price: price,
        total: 1
    }

    if (cart[id]) { 
        const currentProductInCart = cart[id]
        currentProductInCart.total++
    } else { 
        cart[id] = product
    }
    render()
    console.log(cart)
}

function render() {
    const ol = document.getElementById('cart-list')
    let html = ''
    let totalPrice = 0
    for (let key in cart) {
        if (cart.hasOwnProperty(key)) {
            const currentProductInCart = cart[key]
            const total = currentProductInCart.price * currentProductInCart.total
            totalPrice += total
            html += `
                <li>
                    <p>Id: ${currentProductInCart.id}</p>
                    <p>Tên sp: ${currentProductInCart.name}</p>
                    <p>Giá: ${currentProductInCart.price}</p>
                    <p>Số lượng: ${currentProductInCart.total}</p>
                    <button>Giảm</button>
                    <button>Tăng</button>
                    <button onclick="deleteProduct('${currentProductInCart.id}')">Xóa</button>
                    <input onchange="updateTotalProduct(event, '${currentProductInCart.id}')" type="number" value="${currentProductInCart.total}"/>
                    <p>Tổng tiền: ${total} vnđ</p>
                    <hr>
                </li>
            `
        }
    }
    html += `
        <hr>
        <strong>
            <p>Tổng giá trị đơn hàng: ${totalPrice}vnđ</p>
        </strong>
    `
    ol.innerHTML = html
}

function updateTotalProduct(event, id) {
    const value = event.target.value
    cart[id].total = value
    render()
}

function deleteProduct(id) {
    if (cart[id]) {
        const result = confirm('Bạn có chắc chắn muốn xóa ko?')
        if (result) {
            delete cart[id]
        }
    }
    render()
}