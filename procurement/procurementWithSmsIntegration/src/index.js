const accountSid = process.env.ACCOUNT_SID || '';
const authToken = process.env.AUTH_TOKEN || '';
const twilioNumber = process.env.TWILIO_NUMBER || '';
const verifiedNumber = process.env.VERIFIED_NUMBER || '';

const client = require('twilio')(accountSid, authToken);

exports.sendSms = async(request, response) => {
   try {
      const { workspace } = request.query;
      const result = await client.messages
         .create({
            body: `You were assigned to a new task. Visit https://${workspace}.smartmate.io/tasks to work on it.`,
            from: twilioNumber,
            to: verifiedNumber,
         });
      response.status(200).send(result);
   } catch(error) {
      response.status(500).send(error);
   }
};