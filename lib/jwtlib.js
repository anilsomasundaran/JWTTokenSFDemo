const fs = require('fs');
const crypto = require('crypto');
const base64url = require('base64url');
async function getToken(options) {
    let existingString = generatePayload(options);
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(existingString);
    sign.end();
    const signature = sign.sign(options.privateKey);

    const base64EncodedSignature = base64url(signature);
    //console.log(crypto.verify('RSA-SHA256',existingString,options.privateKey,signature));
    //console.log(base64EncodedSignature); 
    return existingString + "." + base64EncodedSignature;
}

function readPrivateKey() {
    let fileName = process.env.PRIVATE_KEY_NAME;
    try {
        const data = fs.readFileSync('server.key').toString('utf8')
        //console.log(data)
        return data;
    } catch (err) {
        console.error(err)
    }

    return '';

}

function generatePayload(tokenOptions) {
    const header = { alg: 'RS256' };
    const claimSet = {
        "iss": tokenOptions.iss, 
        "sub": tokenOptions.sub, 
        "aud": tokenOptions.aud, 
        "exp": Math.floor(Date.now() / 1000) + 60 * 60 * 24
    }
    
    const encodeJWTHeader = base64url(JSON.stringify(header));
    const encodededJWTClaimSet = base64url(JSON.stringify(claimSet));
    console.log(JSON.stringify(claimSet));
    console.log(encodeJWTHeader);
    const existingString = encodeJWTHeader + "." + encodededJWTClaimSet;

    return existingString;
}

module.exports = { getJWTToken : getToken , readPrivateKey} ;