const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log("This is the Private Key", toHex(privateKey));
//Private key Is generated
// Now generate the public key from the private key
const publicKey = secp.getPublicKey(privateKey);
console.log("This is the public key Generated from the private key", toHex(publicKey));