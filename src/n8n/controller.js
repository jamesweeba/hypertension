const pg = require('../utils/pgstream');
const n8nService = require('./service');

async function n8nController(req, res) {

   try {
      // let payload = { ...req.body };
      // console.log("Payload received:", payload);
      let db = await pg.connect();
      let payload = { ...req.body };
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


module.exports = { n8nController };