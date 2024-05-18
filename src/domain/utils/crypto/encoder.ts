import CryptoJS from 'crypto-js'

export enum Algorithm {
  Base64 = 'Base64',
  Hex = 'Hex',
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA224 = 'SHA224',
  SHA512 = 'SHA512',
  SHA384 = 'SHA384',
  SHA3 = 'SHA3',
  RIPEMD160 = 'RIPEMD160',
  HmacMD5 = 'HmacMD5',
  HmacSHA1 = 'HmacSHA1',
  HmacSHA256 = 'HmacSHA256',
  HmacSHA224 = 'HmacSHA224',
  HmacSHA512 = 'HmacSHA512',
  HmacSHA384 = 'HmacSHA384',
  HmacSHA3 = 'HmacSHA3',
  HmacRIPEMD160 = 'HmacRIPEMD160',
  AES = 'AES',
  DES = 'DES',
  TripleDES = 'TripleDES',
  Rabbit = 'Rabbit',
  RC4 = 'RC4',
  RC4Drop = 'RC4Drop',
}

export const Encoder = {
  Base64: CryptoJS.enc.Base64,
  Hex: CryptoJS.enc.Hex,
  MD5: CryptoJS.MD5,
  SHA1: CryptoJS.SHA1,
  SHA256: CryptoJS.SHA256,
  SHA224: CryptoJS.SHA224,
  SHA512: CryptoJS.SHA512,
  SHA384: CryptoJS.SHA384,
  SHA3: CryptoJS.SHA3,
  RIPEMD160: CryptoJS.RIPEMD160,
  HmacMD5: CryptoJS.HmacMD5,
  HmacSHA1: CryptoJS.HmacSHA1,
  HmacSHA256: CryptoJS.HmacSHA256,
  HmacSHA224: CryptoJS.HmacSHA224,
  HmacSHA512: CryptoJS.HmacSHA512,
  HmacSHA384: CryptoJS.HmacSHA384,
  HmacSHA3: CryptoJS.HmacSHA3,
  HmacRIPEMD160: CryptoJS.HmacRIPEMD160,
  AES: CryptoJS.AES,
  DES: CryptoJS.DES,
  TripleDES: CryptoJS.TripleDES,
  Rabbit: CryptoJS.Rabbit,
  RC4: CryptoJS.RC4,
  RC4Drop: CryptoJS.RC4Drop,
  Utf8: CryptoJS.enc.Utf8,
}

type Hash = CryptoJS.lib.WordArray | CryptoJS.lib.CipherParams
type Payload = [payload: string, secret: string] | string
type Options = {
  algorithm?: Algorithm,
  hashOptions?: {
    [key: string]: any,
    drop?: number,
    outputLength?: number,
  },
}

export const encodeHash = (payload: Payload, opts: Options = {}): Hash =>{
  if (!opts.algorithm) { opts.algorithm = Algorithm.SHA3 }
  const { algorithm, hashOptions } = opts

  switch(algorithm) {
    case Algorithm.Base64:
    case Algorithm.Hex: {
      return Encoder[algorithm].parse(payload as string)
    }

    case Algorithm.HmacMD5:
    case Algorithm.HmacSHA1:
    case Algorithm.HmacSHA256:
    case Algorithm.HmacSHA224:
    case Algorithm.HmacSHA512:
    case Algorithm.HmacSHA384:
    case Algorithm.HmacSHA3:
    case Algorithm.HmacRIPEMD160: {
      const [str, secret] = payload as [string, string]
      return Encoder[algorithm](str, secret)
    }

    case Algorithm.AES:
    case Algorithm.DES:
    case Algorithm.TripleDES:
    case Algorithm.Rabbit:
    case Algorithm.RC4:
    case Algorithm.RC4Drop: {
      const [str, secret] = payload as [string, string]
      return Encoder[algorithm].encrypt(str, secret, hashOptions)
    }

    case Algorithm.MD5:
    case Algorithm.SHA1:
    case Algorithm.SHA256:
    case Algorithm.SHA224:
    case Algorithm.SHA512:
    case Algorithm.SHA384:
    case Algorithm.SHA3:
    case Algorithm.RIPEMD160:
    default: {
      return Encoder[algorithm](payload as string, hashOptions)
    }
  }
}

export const decodeHash = (encrypted: Hash, secret: string, opts: Options = {}) =>{
  if (!opts.algorithm) { opts.algorithm = Algorithm.AES }
  const { algorithm, hashOptions } = opts

  switch(algorithm) {
    case Algorithm.Base64:
    case Algorithm.Hex: {
      return Encoder[algorithm].stringify(encrypted as CryptoJS.lib.WordArray)
    }

    // case Encoder.HmacMD5:
    // case Encoder.HmacSHA1:
    // case Encoder.HmacSHA256:
    // case Encoder.HmacSHA224:
    // case Encoder.HmacSHA512:
    // case Encoder.HmacSHA384:
    // case Encoder.HmacSHA3:
    // case Encoder.HmacRIPEMD160: {
    //   const [str, secret] = encrypted
    //   return EncoderHash[algorithm](str, secret, hashOptions)
    // }

    case Algorithm.AES:
    case Algorithm.DES:
    case Algorithm.TripleDES:
    case Algorithm.Rabbit:
    case Algorithm.RC4:
    case Algorithm.RC4Drop: {
      return Encoder[algorithm].decrypt(encrypted as any, secret, hashOptions)
    }

    default: {
      return false
    }
  }
}

export const hashPassword = (password: string) => {
  const secretKey = process.env.SECRET_KEY as string
  return encodeHash([password, secretKey], { algorithm: Algorithm.HmacSHA3 }).toString()
}
