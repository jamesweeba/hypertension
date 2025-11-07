let express=require('express');
let router=express.Router();
let controller=require('./controller');

// Health check route
router.post('/n8n',controller.n8nController);

module.exports = router;