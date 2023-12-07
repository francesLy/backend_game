
let Base64 = require('js-base64').Base64;
export const base64 = {
    decode: (str) => {
        return Base64.decode(str);
    },
    encode: (str) => {
        return Base64.encode(str);
    }
}