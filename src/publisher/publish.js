

const Queue = require('bull');
const dataQueue = new Queue('voice-message', {
    redis: {
        host: '44.198.162.244',
        port: 6339,
        password: 'H0r6C0rpA3w0RED1S'
    }
});

async function queueData(payload) {
    try {
        // console.log("Adding job to queue with payload:", payload);
         const job = await dataQueue.add('process',payload);
        console.log(`✅ Job added with ID: payload`,job.id);

    } catch (error) {
        console.error("Error adding job to queue:", error);
    }
   
     


    
}

// queueData();







module.exports = {
    queueData
}