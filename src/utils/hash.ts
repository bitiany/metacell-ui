import CryptoJS,{AES} from 'crypto-js'
const seed = 131;
const placeholder = "1"
export const bkdr_hash = (str: string) => {
  let hash = 0
  for (let ch of str) {
    hash = (hash * seed) + ch.charCodeAt(0)
  }
  return hash & 0x7FFFFFFF
}

export const aes = (password: string, saltKey: string)=>{
  let key = bkdr_hash(saltKey) + ""
  const iv = key.length >=16 ? key.substring(0,16) : key + Array(17 - key.length).join(placeholder)
  const aesKey = CryptoJS.enc.Utf8.parse(iv)
  let encrypted = AES.encrypt(password, aesKey, {iv: aesKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
  return encrypted.toString().replace(/\+/g, '%2B')
}

