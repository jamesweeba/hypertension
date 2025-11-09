pg = require('../utils/pgstream');
function updateVoiceStatus(dbConnection, data) {
    return new Promise(async (resolve, reject) => {
        try {
            let { results } = data || [];
            let sql = `Update health_reminder_submissions set status=$1,
                             callback=$2 where id=$3 RETURNING*`;
            let params = [
                results[0]?.status?.groupName || 'Unknown',
                JSON.stringify(results[0]),
                results[0]?.callbackData
            ];
            let resultsDb = await pg.update(dbConnection, sql, params);
            return resolve(resultsDb.data);
        } catch (error) {
            return reject(error);
        }
    });

}

module.exports = { updateVoiceStatus }