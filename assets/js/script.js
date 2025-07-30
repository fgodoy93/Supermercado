let totalCompra = 0
const descuentoAplicado = 0.2
const precioUmbralDescuento = 25000

let productos = [
    {
        id: 0,
        nombre: "Arroz",
        cantidad: 1,
        precio: 2000,
        imagen: "https://www.conservaslacruz.cl/wp-content/uploads/2020/11/Arroz-G1-Miraflores.png",
    },
    {
        id: 1,
        nombre: "Fetuccini",
        cantidad: 1,
        precio: 1500,
        imagen: "https://www.conservaslacruz.cl/wp-content/uploads/2020/11/FETUCCINI-88-TRATTORIA-1.png",
    },
    {
        id: 2,
        nombre: "Harina",
        cantidad: 1,
        precio: 2000,
        imagen: "https://www.conservaslacruz.cl/wp-content/uploads/2020/11/hARINA-MONT-BANC-1000GR-1.png",
    },
    {
        id: 3,
        nombre: "Mermelada",
        cantidad: 1,
        precio: 3000,
        imagen: "https://www.conservaslacruz.cl/wp-content/uploads/2020/11/mermelada-la-cruz.jpg",
    }, 
    {     
        id: 4,
        nombre: "Aceite de Oliva",
        cantidad: 1,
        precio: 6000,
        imagen: "https://www.conservaslacruz.cl/wp-content/uploads/2020/11/aceite-dr-500.jpg",
    },
    {   
        id: 5,  
        nombre: "Cuscus",
        cantidad: 1,
        precio: 2000,
        imagen: "https://www.conservaslacruz.cl/wp-content/uploads/2020/11/CUS-CUAS-1000GR-1.png",
    },


    
]

$(document).ready(function() {
    let contenedor = $("#contenedor-productos")
    let cliente = prompt("Ingrese su nombre: ")
    let productoSeleccionado = null
    let carrito = []

    // MOSTRAR LAS CARDS
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let card = `
            <div class="col-md-4 mb-5">
                <div class="card">
                    <img src="${producto.imagen}" alt="" class="card-img-top">
                    <div class="card-body text-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary mt-3 añadirAlCarro" data-id="${producto.id}" data-bs-toggle="modal" data-bs-target="#modalReserva">Agregar al Carro</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.append(card);
    }

    // AGREGAR PRODUCTOS AL CARRITO
    $(document).on("click", ".añadirAlCarro", function() {
        let id = parseInt($(this).data("id"));
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === id) {
                productoSeleccionado = productos[i];
                break;
            }
        }
        $("#agregarProducto").text(productoSeleccionado.nombre);
    });


    // CONFIRMAR PRODUCTOS
    $("#confirmarProducto").on("click", function() {
        let cantidad = parseInt($("#cantidad").val());

        if (cantidad === 0) {
            alert("Debes seleccionar al menos 1 unidad.");
            return;
        } 


        // GUARDAR PRODUCTOS SELECCIONADOS DEL CARRITO DE COMPRAS
        carrito.push({
            nombre: productoSeleccionado.nombre,
            cantidad: cantidad,
            precioUnitario: productoSeleccionado.precio,
            subtotal: cantidad * productoSeleccionado.precio
        });

        alert(`${cantidad} unidad(es) de ${productoSeleccionado.nombre} añadidas al carrito.`);

        const modal = bootstrap.Modal.getInstance(document.getElementById("modalReserva"))
        modal.hide()
    });

    // PAGAR COMPRA
    $("#botonPagar").on("click", function() {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        let detalle = `Cliente: ${cliente}\n\nDetalle de productos:\n`;
        totalCompra = 0;

        for (let i = 0; i < carrito.length; i++) {
            let item = carrito[i];
            detalle += `- ${item.nombre} x${item.cantidad} = $${item.subtotal}\n`;
            totalCompra += item.subtotal;
        }

        //DESCUENTO
        if (totalCompra >= precioUmbralDescuento) {
            let descuento = totalCompra * descuentoAplicado;
            let totalConDescuento = totalCompra - descuento;
            detalle += `\nSubtotal: $${totalCompra}\nDescuento: -$${descuento}\nTOTAL A PAGAR: $${totalConDescuento}`;
        } else {
            detalle += `\nTOTAL A PAGAR: $${totalCompra}`;
        }

        alert(detalle);
    });
});
