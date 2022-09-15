import { Client, Environment } from "square";
import crypto from "crypto";

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox
});

const terminalApi = client.terminalApi;

const new_deviceId = '9fa747a2-25ff-48ee-b078-04381f7c828f';
const new_ideKey = crypto.randomUUID();
//console.log('key',ideKey)

const checkoutApi = async (req, res) => {
  switch (req.method) {
    case 'POST' : {
      try {
        var data = req.body
        //console.log("deviceId",data.checkout.deviceOptions.deviceId)
        data.idempotencyKey = new_ideKey;
        data.checkout.deviceOptions.deviceId = new_deviceId;
        console.log(data)
        //var deviceId = 
        const response = await terminalApi.createTerminalCheckout(data)
        //console.log(response)
        if(response.statusCode !== 200){
          throw new Error(response.body);
        }
        const responseData = JSON.parse(response.body);
        res.status(200).json(responseData)
      }catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
    }
  }
}

export default checkoutApi;