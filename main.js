// Módulo principal de la plataforma Activase

// Simulación de productos (1000 sesiones de productos)
const productosContainer = document.getElementById('productos-container');
const numProductos = 1000;

// Precio global y tarjeta de débito global configurables desde el área de administración
let precioProductoGlobal = 9.99; // valor por defecto
let tarjetaDebito = "1234-4567-8910-1112"; // valor por defecto

function crearProducto(id) {
  const producto = document.createElement('div');
  producto.className = 'producto';
  producto.dataset.id = id;
  
  // Contenido del producto
  producto.innerHTML = `
    <h3>Producto ${id}</h3>
    <p>Precio: $<span class="precio">${precioProductoGlobal.toFixed(2)}</span></p>
    <button class="btn comprar-btn">Comprar</button>
    <button class="btn card-pay-btn">Pagar con Tarjeta</button>
  `;
  
  // Acción de compra (auto-cobro simulado)
  const btnComprar = producto.querySelector('.comprar-btn');
  btnComprar.addEventListener('click', () => {
    registrarTransaccion(`Producto ${id} comprado por $${precioProductoGlobal.toFixed(2)}`);
  });
  
  // Acción de pago con tarjeta
  const btnCardPay = producto.querySelector('.card-pay-btn');
  btnCardPay.addEventListener('click', () => {
    registrarTransaccion(`Producto ${id} pagado con tarjeta de débito (${tarjetaDebito})`);
  });
  
  return producto;
}

// Inicializamos los productos
function inicializarProductos() {
  for (let i = 1; i <= numProductos; i++) {
    productosContainer.appendChild(crearProducto(i));
  }
}

// Actualiza el precio en todos los productos
function actualizarPreciosGlobales() {
  document.querySelectorAll('.producto .precio').forEach(el => {
    el.textContent = precioProductoGlobal.toFixed(2);
  });
}

// Módulo de equipo de trabajo
const equipoForm = document.getElementById('equipo-form');
const listaEquipo = document.getElementById('lista-equipo');
equipoForm.addEventListener('submit', e => {
  e.preventDefault();
  const correoInput = document.getElementById('correo');
  if(correoInput.value){
    const li = document.createElement('li');
    li.textContent = correoInput.value;
    listaEquipo.appendChild(li);
    correoInput.value = '';
  }
});

// Auto Cobro (simulación)
const btnAutoCobro = document.getElementById('btn-auto-cobro');
const autoCobroLog = document.getElementById('auto-cobro-log');
btnAutoCobro.addEventListener('click', () => {
  registrarTransaccion("Auto cobro ejecutado");
});

// Registrar transacciones
function registrarTransaccion(mensaje) {
  const p = document.createElement('p');
  p.textContent = `[${new Date().toLocaleTimeString()}] ${mensaje}`;
  autoCobroLog.prepend(p);
}

// Módulo de Administración (acceso seguro)
// Credenciales personalizadas: cambia estos valores por tu correo y contraseña
const adminLoginForm = document.getElementById('admin-login');
const adminPanel = document.getElementById('admin-panel');
const ADMIN_EMAIL = "tu_correo@ejemplo.com";
const ADMIN_PASS = "tu_contraseña_secreta";

adminLoginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('admin-email').value;
  const pass = document.getElementById('admin-pass').value;
  if(email === ADMIN_EMAIL && pass === ADMIN_PASS){
    adminPanel.classList.remove('hidden');
    adminLoginForm.classList.add('hidden');
  } else {
    alert("Credenciales incorrectas.");
  }
});

// Guardar configuración de la plataforma
const guardarConfigBtn = document.getElementById('guardar-config');
guardarConfigBtn.addEventListener('click', () => {
  const nuevoPrecio = parseFloat(document.getElementById('producto-precio').value);
  if(!isNaN(nuevoPrecio) && nuevoPrecio >= 0){
    precioProductoGlobal = nuevoPrecio;
    actualizarPreciosGlobales();
    alert("Configuración de precio guardada.");
  } else {
    alert("Ingrese un precio válido.");
  }
  
  // Actualizar número de tarjeta de débito
  const nuevaTarjeta = document.getElementById('tarjeta-debito').value;
  if(nuevaTarjeta.trim() !== ""){
    tarjetaDebito = nuevaTarjeta.trim();
    alert("Número de tarjeta de débito actualizado.");
  }
  
  // Simulación de actualización de logo si se subiera
  const logoInput = document.getElementById('logo-upload');
  if(logoInput.files[0]){
    // Aquí se simula que el logo se actualiza en la plataforma
    alert("Logo actualizado (simulación).");
  }
});

// Inicializamos la plataforma
document.addEventListener('DOMContentLoaded', () => {
  inicializarProductos();
});