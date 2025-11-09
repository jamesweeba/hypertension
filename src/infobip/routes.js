const app = require('express');
const router = app.Router();
const controller = require('./controller');

// Define routes
router.post('/voice-status', controller.voiceStatusHandler);


module.exports = router;