const axios = require('axios');
const querystring = require('querystring');
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:jwt-bearer'
async function requestToken(token) {

    /*axios({
        method: 'get',
        url: 'https://my-json-server.typicode.com/typicode/demo/posts',
        responseType: 'json'
      })
        .then(function (response) {
          console.log(response.data);
        });*/

        /*axios({
            method: 'post',
            url: 'https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9d8..z.hDcPKg7vvvNJZD8_Dd8.IkRu5ygPSWturtklZ4fdisCf7jLJPeeKKQ9AJPh.k5i4mI3g56DQ5w&client_secret=3274372736594750854&username=anilas007@gmail.com&password=SIddhu6845$$fHeAuA43txcFewvXkknXJVvBa'
            
        })
        .then(function (response) {
            console.log(response.data);
        });*/

        /*const request_body = {
            grant_type :"password",
            client_id :"3MVG9d8..z.hDcPKg7vvvNJZD8_Dd8.IkRu5ygPSWturtklZ4fdisCf7jLJPeeKKQ9AJPh.k5i4mI3g56DQ5w",
            client_secret :"3274372736594750854",
            username :"anilas007@gmail.com",
            password :"SIddhu6845$$fHeAuA43txcFewvXkknXJVvBa"
        };
          
        axios({
            method: 'post',
            url: 'https://login.salesforce.com/services/oauth2/token',
            data : querystring.stringify(request_body),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
            
        })
        .then(function (response) {
            console.log(response.data);
        });*/


        const requestBody = {
            grant_type : GRANT_TYPE,
            assertion : token
        }

        console.log(token);

        let accessToken = '';

        await axios({
            method: 'post',
            url: 'https://login.salesforce.com/services/oauth2/token',
            data : querystring.stringify(requestBody),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
            
        })
        .then(function (response) {
            console.log(response.data);
            accessToken = response.data.access_token;
        });
        
        console.log('>>> Access token after the Successful auth : ' + accessToken);
        return accessToken;
}

function query(accessToken, soql) {

    
}


module.exports = {requestToken, query};