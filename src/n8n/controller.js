const pg = require('../utils/pgstream');
const n8nService = require('./service');

const { parsePhoneNumberFromString } = require('libphonenumber-js');



async function n8nController(req, res) {
   try {
      let db = await pg.connect();
      let payload = { ...req.body };
      let { contact } = payload;
      console.log("Phone number received:", contact);
      let number = parseGhanaNumber(contact);
     payload.contact=number.e164
      
      let results = await n8nService.n8nService(db, payload);
      res.status(200).json({
         status: 'success',
         data: results
      });
      pg.commit(db);


   } catch (err) {
      console.error("Error in n8nController:", err);
      return res.status(500).json({
         status: 'error',
         message: 'Internal Server Error'
      });
   }





}





const GH_PREFIXES = [
  "20","23","24","26","27","28",
  "50","52","53","54","55","56","57","58","59"
];

function parseGhanaNumber(phone) {
  const num = parsePhoneNumberFromString(phone, 'GH');
  if (!num || !num.isValid() || num.country !== "GH") {
    return { valid: false, error: "Not a valid Ghana number" };
  }

  // Extract national number (without 0)
  const national = num.nationalNumber;
  // Check valid Ghana prefixes
  const prefix = national.substring(0, 2);
  if (!GH_PREFIXES.includes(prefix)) {
    return { valid: false, error: "Unknown Ghana mobile prefix" };
  }

  return {
    valid: true,
    country: "GH",
    countryCode: "233",
    prefix,
    rawNational: national,
    localFormat: "0" + national,              // 024xxxxxxx
    e164: "233" + national,                   // 23324xxxxxxx
    international: "+233" + national          // +23324xxxxxxx
  };
}

module.exports = { parseGhanaNumber };








module.exports = { n8nController };