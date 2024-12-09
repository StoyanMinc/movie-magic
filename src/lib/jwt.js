const util = require('util');
const jwt = require('jsonwebtoken');

//* custum async function
// function sign(paylod, secretOrPrivateKey, options = {}) {
//     const promise = new Promise((resolve, reject) => {
//         jwt.sign(paylod, secretOrPrivateKey, options, (err, token) => {
//             if (err) {
//                 return reject(err);
//             }

//             resolve(token);
//         })
//     });

//     return promise;
// };

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

module.exports = {
    sign,
    verify
};