
const putLogin = async ()=> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "username": "", //Input Pixellot API username
    "password": "" //Input Pixellot API password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://api.pixellot.tv/v1/login", requestOptions);
  const json = await response.json();

  return json.token
}

const getEvents = async (token) =>{


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  //const response_events = await fetch("https://api.pixellot.tv/v1/events?limit=10&sort={ \"start$date\": -1 }&criteria={\"venue\": {\"_id\": \"61d7127c403c263e36e9d503\"}}", requestOptions);
  //const response_events = await fetch("https://api.pixellot.tv/v1/events?limit=50&sort={ \"start$date\": -1 }", requestOptions);
  const response_events = await fetch("https://api.pixellot.tv/v1/events?limit=10&sort={ \"start$date\": -1 }&criteria={\"venue\": {\"_id\": \"5dd2966df08c6007922ed4ce\"}}", requestOptions);
  const json_events = await response_events.json();

  return json_events;
}
