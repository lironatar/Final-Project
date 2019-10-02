const express = require ('express');

const router = express.Router();

router.get('/gallery', (req,res)=>{
    res.render('pages/gallery');
});
router.get('/basicgrid', (req,res)=>{
    res.render('pages/basicgrid');
})
router.get('/lsidebar', (req,res)=>{
    res.render('pages/sidebar-left');
})

module.exports = router;