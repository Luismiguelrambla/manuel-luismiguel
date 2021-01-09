const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const {nombre, localidad, direccion} = req.body;
    const newLink = {
        nombre,
        localidad,
        direccion
    };
    
    await pool.query('INSERT INTO hoteles set ?', [newLink]);
    req.flash('success', 'Hotel guardado')
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const hoteles = await pool.query('SELECT * FROM hoteles');
    res.render('links/list', {hoteles});
});

router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM hoteles WHERE IdHotel = ?', [id]);
    req.flash('success', 'Hotel eliminado')
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const hotel = await pool.query('SELECT * FROM hoteles WHERE IdHotel = ?', [id])
    res.render('links/edit', {hotel: hotel[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {nombre, localidad, direccion} = req.body;
    const newLink = {
        nombre,
        localidad,
        direccion
    };
    
    await pool.query('UPDATE hoteles set ? WHERE IdHotel = ?', [newLink, id]);
    req.flash('success', 'Hotel actualizado')
    res.redirect('/links');
});

module.exports = router;