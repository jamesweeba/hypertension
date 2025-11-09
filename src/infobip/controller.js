const pg = require('../utils/pgstream');
const voiceStatusData = require('./service');
async function voiceStatusHandler(req, res) {
    try {
        let db = await pg.connect();
        const payload = { ...req.body };
        console.log("Voice status payload received:",JSON.stringify (payload));
        let results = await voiceStatusData.updateVoiceStatus(db, payload);
        res.status(200).json({
            status: 'success',
            data: results
        });
        pg.commit(db);
    } catch (error) {
        console.error("Error in n8nController:", err);
        pg.rollback(db);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });

    }
}

module.exports = {
    voiceStatusHandler
};