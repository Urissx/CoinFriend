// Simulando una base de datos en un arreglo de objetos
let transacciones = [
    { id: 1, fecha: '2023-11-20', concepto: 'Sueldo', monto: 1000, tipo: 'ingreso' },
    { id: 2, fecha: '2023-11-21', concepto: 'Almuerzo', monto: 20, tipo: 'gasto' }
];

// Función para agregar una nueva transacción
function agregarTransaccion(nuevaTransaccion) {
    transacciones.push(nuevaTransaccion);
    actualizarTabla();
}

// Función para actualizar la tabla en el HTML
function actualizarTabla() {
    const tabla = document.getElementById('tablaTransacciones');
    tabla.innerHTML = ''; // Limpiamos la tabla antes de rellenarla

    transacciones.forEach(transaccion => {
        const fila = tabla.insertRow();
        fila.insertCell().textContent = transaccion.fecha;
        fila.insertCell().textContent = transaccion.concepto;
        fila.insertCell().textContent = transaccion.monto;
        fila.insertCell().textContent = transaccion.tipo;
    });
}

// Ejemplo de uso: Agregar una nueva transacción
const nuevaTransaccion = { id: 3, fecha: '2023-11-22', concepto 'Supermercado', monto: 50, tipo: 'gasto' };
agregarTransaccion(nuevaTransaccion);

function calcularSaldoTotal() {
    let saldoTotal = 0;
    transacciones.forEach(transaccion => {
        if (transaccion.tipo === 'ingreso') {
            saldoTotal += transaccion.monto;
        } else {
            saldoTotal -= transaccion.monto;
        }
    });
    return saldoTotal;
}

// Obtener el saldo total y mostrarlo en la interfaz
const saldo = calcularSaldoTotal();
document.getElementById('saldoTotal').textContent = saldo;
// index.js (Node.js)
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('billetera.db');

// Crear una tabla de transacciones (se ejecuta una vez)
db.run(`CREATE TABLE IF NOT EXISTS transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    monto REAL,
    fecha TEXT
)`);

// Endpoint para obtener todas las transacciones
app.get('/transacciones', (req, res) => {
    db.all('SELECT * FROM transacciones', (err, rows) => {
        res.json(rows);
    });
});

// ... otros endpoints para realizar transacciones, etc.

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});