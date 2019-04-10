import * as functions from 'firebase-functions';
import http = require('http');


const apiKey = '351eb4b7ae19108f601b296a71970c27';



exports.webhook = functions.https.onRequest((req, res) => {
//  response.send("Hellofirebase  from Firebase!");

callWeatherApi('Melbourne').then((output) => {
  res.json({ 'fulfillmentText': output }); // Return the results of the weather API to Dialogflow
}).catch(() => {
  res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });

});

function callWeatherApi (city:string) {

  return new Promise((resolve, reject) => {
    let path = `api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
    console.log(path)

    http.get({path: path}, (resp:any) => {
      console.log('hola')
      let body = ''; // var to store the response chunks
      resp.on('data', (data:any) => { 
        body += data; 
        console.log(body)
      });
   
      resp.on('end', () => {
        let response = JSON.parse(body);
        
        let forecast = response['data']['weather'][0];
        let location = response['data']['request'][0];
        let conditions = response['data']['current_condition'][0];
        let currentConditions = conditions['weatherDesc'][0]['value'];

        // Create response
        let output = `Current conditions in the ${location['type']} 
        ${location['query']} are ${currentConditions} with a projected high of
        ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of 
        ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on 
        ${forecast['date']}.`;

        // Resolve the promise with the output text
        // console.log(output);
        resolve(output);
      });
      res.on('error', (error:string) => {
        console.log(`Error calling the weather API: ${error}`)
        reject();
      });
    });

})
}
});
