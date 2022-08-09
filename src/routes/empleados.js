const express = require('express');
const router = express.Router();

const mysqlConnection = require('../db');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
        if(!err) {
            res.json(rows)
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0])
        } else {
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id, name, salary } = req.body;
    const query = `
        CALL empleadosAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Empleado registrado'});
        } else {
            console.log(err);
        }
    });
});

router.put('/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = 'CALL empleadosAddOrEdit(?, ?, ?)';
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: "El empleado ha sido actualizado"})
        } else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json({Status: "El empleado ha sido eliminado"})
        } else {
            console.log(err);
        }
    });
});

//autor: Edgar Zelaya

module.exports = router;