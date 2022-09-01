import { Client, Environment } from "square";

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox
});

const terminalApi = client.terminalApi;

const checkoutApi = async (req, res) => {
  switch (req.method) {
    case 'POST' : {
      try {
        var data = req.body
        console.log(data)
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