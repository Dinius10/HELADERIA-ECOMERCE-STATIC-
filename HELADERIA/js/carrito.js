// Obtener los productos, el carrito, el botón de carrito, y el campo de descuento
const products = document.querySelectorAll('.btn_anadir_carrito');
const cartElement = document.getElementById('cart');
const cartElementResponsive = document.getElementById('cart-responsive');
const carritoProductos = document.getElementById('carrito_productos');
const confirmarPago = document.getElementById('confirmar_pago');
const cartCountElement = document.getElementById('cart-count');


let discount = 0;

// Función para añadir un producto al carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productData = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: parseFloat(product.dataset.price),
        quantity: 1
    };

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productData.id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar cantidad si ya existe
    } else {
        cart.push(productData); // Agregar nuevo producto
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Función para mostrar el carrito
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartElement.innerHTML = '';
    cartElementResponsive.innerHTML = '';
    confirmarPago.innerHTML = '';
    pagoTabla.innerHTML = '';

    if (cart.length === 0) {
        cartElementResponsive.innerHTML = '<h1 style="width: 100%; color: #E6A4B4; text-align: center;">ESTÁ VACÍO</h1>';
        return;
    }

    let subtotal = 0;

    cart.forEach(product => {
        const totalProductPrice = product.price * product.quantity;
        subtotal += totalProductPrice;

        cartElement.innerHTML += `
            <tr>
                <td>
                    <img src="img/HELADO${product.id}.png" class="campo_img">
                </td>
                <td>
                    <p class="campo_producto">${product.name}</p>
                </td>
                <td>
                    <p class="campo_precio">${product.price}Bs.</p>
                </td>
                <td>
                    <div class="campo_cantidad">
                    <p class="campo_cantidad_menos" onclick="changeQuantity('${product.id}', -1)">-</p>
                    <p class="campo_cantidad_numero">${product.quantity}</p>
                    <p class="campo_cantidad_mas" onclick="changeQuantity('${product.id}', 1)">+</p>
                    </div>
                </td>
                <td>
                    <p class="campo_total">${totalProductPrice.toFixed(2)}Bs.</p>
                </td>
                <td>
                    <button class="campo_eliminar" onclick="removeFromCart('${product.id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
        cartElementResponsive.innerHTML += `
            <div class="cart-tabla-responsive">
                <div class="dato-foto">
                    <p class="campo-foto">
                    <img src="img/HELADO${product.id}.png" class="campo_img">
                    </p>
                </div>
                <div class="dato">
                    <span>PRODUCTO:</span>
                    <P>${product.name}</P>
                </div>
                <div class="dato">
                    <span>PRECIO:</span>
                    <P>${product.price}Bs.</P>
                </div>
                <div class="dato">
                    <span>CANTIDAD:</span>
                    <div class="campo_cantidad">
                    <p class="campo_cantidad_menos" onclick="changeQuantity('${product.id}', -1)">-</p>
                    <p class="campo_cantidad_numero">${product.quantity}</p>
                    <p class="campo_cantidad_mas" onclick="changeQuantity('${product.id}', 1)">+</p>
                    </div>
                </div>
                <div class="dato">
                    <span>TOTAL:</span>
                    <P>${totalProductPrice.toFixed(2)}Bs.</P>
                </div>
                <div class="tabla-botones">
                    <i class="fa-solid fa-trash" onclick="removeFromCart('${product.id}')"></i>
                </div>
            </div>   
        `;
        pagoTabla.innerHTML += `
            <tr>
                <td>
                <p class="campo_precio" id="pagoCant">${product.quantity} x</p>
                </td>
                <td>
                <p class="campo_precio" id="pagoProd">${product.name}</p>
                </td>
                <td>
                <p class="campo_precio" id="pagoSubTotal">${totalProductPrice.toFixed(2)}Bs.</p>
                </td>
            </tr>
        `;
    });

    // Calcular y mostrar el descuento aplicado
    const discountAmount = subtotal * (discount / 100);
    // Calcular y mostrar el total con descuento
    const totalWithDiscount = subtotal - discountAmount;
    // Mostrar Confirmar pago
    confirmarPago.innerHTML = `
        <div class="confirmar_pago">
            <h3>TU COMPRA:</h3>
            <div>
            <p>Subtotal: <span>${subtotal.toFixed(2)}Bs.</span></p>
            <p>Descuento: <span>-${discountAmount.toFixed(2)}Bs.</span></p>
            <div id="discount-section">
              <input type="text" id="discount-code" placeholder="Código de descuento">
              <button onclick="applyDiscount()">Aplicar descuento</button>
            </div>
            </div>
            <p class="confirmar_pago_total">Total: <span>${totalWithDiscount.toFixed(2)}Bs.</span></p>
        </div>
        <button class="confirmar_pago_button abrir-modal" data-modal="modal-pedido">COMPRAR</button>
    `;
    //MODALES---------------------------
    const btnAbrirModal = document.querySelectorAll(".abrir-modal");
    const btnCerrarModal = document.querySelectorAll(".cerrar-modal");

    // Función para abrir el modal correspondiente
    btnAbrirModal.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.classList.remove("modal--fadeout");
            modal.showModal();
        });

    });

    // Función para cerrar los modales
    btnCerrarModal.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            modal.classList.add("modal--fadeout");
            modal.close();

        });
    });
    
    document.getElementById("pagoDescuento").textContent = "- "+ discountAmount.toFixed(2)+"Bs.";
    document.getElementById("pagoTotal").textContent = totalWithDiscount.toFixed(2)+"Bs.";
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            if (confirm("¿Deseas eliminar este producto del carrito?")) {
                removeFromCart(productId);
                return;
            } else {
                product.quantity = 1;
            }
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Función para actualizar el conteo del carrito en el botón
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Función para aplicar un descuento
function applyDiscount() {
    const discountCodeInput = document.getElementById('discount-code');
    const code = discountCodeInput.value.trim();
    if (code === "DESCUENTO10") {
        discount = 10; // 10% de descuento
    } else if (code === "DESCUENTO20") {
        discount = 20; // 20% de descuento
    } else {
        alert("Código de descuento inválido");
        discount = 0;
    }
    displayCart();
}

// Añadir eventos a los botones de añadir al carrito
products.forEach(product => {
    product.addEventListener('click', () => {
        addToCart(product);
    });
});



// Mostrar el carrito y actualizar el conteo al cargar la página
displayCart();
updateCartCount();

function limpiarCarrito(){
    localStorage.clear();
}

