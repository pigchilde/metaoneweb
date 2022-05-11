import { JSEncrypt } from 'jsencrypt';

const defaultPubKey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVxQIoVQQFgdVZGGIALfhzRsvjTHx8MGE9V/e5j3VZ7wHWBn6uMDb0xE47hxOLBc482w2UZsPylTid2jW0icoGt+2n4zquM2QUpXvBswJYMAHnxcn3WZF4CRgDEp27WjTDtbrUb8lL2vOdZu2aaLZuFBaHtBBu32ToUN/he+nThmOKdO5JK4dzELs4Jh70RAmOxLlzf6W0iiD6Eg24wsO0+XgTGWCltAePQnUV+C+dJct0M/nO6go7Qj0njfg6/MvDilyxLyVrx92HPBW95Sb/Jr+Ai8huAV6OY7796zM8gGrojzLEQWFJ3vyMb990R5ZrDNFks0/atdWriP2thvxQIDAQAB';

export function encryptedData(data: string, publicKey = defaultPubKey) {
  // 新建JSEncrypt对象
  const encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);

  const d = encryptor.encrypt(data);
  return d;
}

// 解密
export function decryptData(data: string, privateKey: string) {
  // 新建JSEncrypt对象
  const decrypt = new JSEncrypt();
  // 设置私钥
  decrypt.setPrivateKey(privateKey);
  // 解密数据
  return decrypt.decrypt(data);
}
