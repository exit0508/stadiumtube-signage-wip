import Console from "console";
import crypto from "crypto";

const NOTIFICATION_URL = 'https://fbf1-221-240-10-194.jp.ngrok.io/api/getwebhook';
const SIGNATURE_KEY = process.env.SQUARE_SIGNATURE_KEY;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

const isFromSquare = function(signature, body) {
  const bodyToString = toString(body);
  const hmac = crypto.createHmac('sha256', toString(SIGNATURE_KEY));
  hmac.update(NOTIFICATION_URL + bodyToString);
  const hash = hmac.digest('base64');
  console.log('hash: ', hash)
  console.log('signature: ', signature)

  return hash === signature;
}

const requestHandler = async (req, res) => {
  switch(req.method) {
    case 'POST' : {
      try {
        console.log('req',req.body)
        var data = req.body;
        //console.log(data);
        const signature = req.headers['x-square-hmacsha256-signature'];
        //console.log('signature: ', typeof(signature)) //string
        console.log(isFromSquare(signature, data))
        // if(isFromSquare(signature, DatatoString)){
        //   // Signature is valid. Return 200 OK.
        //   console.log("request body: " + data);
        //   res.status(200).json();          
        // } else {
        //   res.status(403).json(); 
        // }
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
    }
  }
  // let body = '';
  // request.setEncoding('utf8');
  // console.log(request, typeof(request))
  // request.on('data', function(chunk){
  //   body += chunk;
  // });

  // request.on('end', function(){
  //   const signature = request.headers['x-square-hmacsha256-signature'];
  //   if(isFromSquare(signature, body)){
  //     // Signature is valid. Return 200 OK.
  //     response.writeHead(200);
  //     console.log("request body: " + body);
  //   } else {
  //     // Signature is invalid. Return 403 Forbidden.
  //     response.writeHead(403);
  //   }
  // })
}







export default requestHandler;