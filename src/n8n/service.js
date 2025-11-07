const pg = require('../utils/pgstream');
const publishQueue = require('../publisher/publish');
const languageAudioFiles = require('../utils/audioFile').languageAudioFiles;


function n8nService(db, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `INSERT INTO health_reminder_submissions (email_address,first_name,last_name,date_of_birth,medical_condition,
                       medication_frequency,phone_number,weekly_messages,language) 
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
            let { email, first_name, last_name, dob, medical_condition, frequency_of_medication,
                contact, language, weekly_message
            } = payload;
            let params = [email, first_name, last_name, dob, medical_condition, frequency_of_medication, contact, weekly_message, language];
            let results = await pg.insert(db, sql, params);
            //publish to bull queue for processing
            let data = { id: results.data.items[0].id, phoneNumber: results.data.items[0].phone_number, audioFileUrl: languageAudioFiles[results.data.items[0].language] };
            console.log("publish to queue", data);

            await publishQueue.queueData(data);
            return resolve(results.data);
        } catch (error) {
            return reject(error);
        }
    })


}



module.exports = { n8nService }