import CryptoJS from 'crypto-js';
let min = 1;
let max = 20;
const id = Math.floor(Math.random() * (max - min + 1)) + min;
const iv = CryptoJS.enc.Base64.parse('eU6D3jhq3zFZuvpmMhBbMQ==');
import constants from "../../constants/envConstants";

const encryptData = (data) => {
  let enckey = '';
  if(id == 1){

    enckey = constants.VITE_ENCRYPTION_1;

  }else if(id == 2){

    enckey = constants.VITE_ENCRYPTION_2;

  }else if(id == 3){

    enckey = constants.VITE_ENCRYPTION_3;

  }else if(id == 4){

    enckey = constants.VITE_ENCRYPTION_4;

  }else if(id == 5){

    enckey = constants.VITE_ENCRYPTION_5;

  }else if(id == 6){

    enckey = constants.VITE_ENCRYPTION_6;

  }else if(id == 7){
    
    enckey = constants.VITE_ENCRYPTION_7;

  }else if(id == 8){

    enckey = constants.VITE_ENCRYPTION_8;

  }else if(id == 9){

    enckey = constants.VITE_ENCRYPTION_9;

  }else if(id == 10){

    enckey = constants.VITE_ENCRYPTION_10;

  }else if(id == 11){

    enckey = constants.VITE_ENCRYPTION_11;

  }else if(id == 12){

    enckey = constants.VITE_ENCRYPTION_12;

  }else if(id == 13){

    enckey = constants.VITE_ENCRYPTION_13;

  }else if(id == 14){

    enckey = constants.VITE_ENCRYPTION_14;

  }else if(id == 15){

    enckey = constants.VITE_ENCRYPTION_15;

  }else if(id == 16){

    enckey = constants.VITE_ENCRYPTION_16;

  }else if(id == 17){

    enckey = constants.VITE_ENCRYPTION_17;

  }else if(id == 18){

    enckey = constants.VITE_ENCRYPTION_18;

  }else if(id == 19){

    enckey = constants.VITE_ENCRYPTION_19;

  }else if(id == 20){

    enckey = constants.VITE_ENCRYPTION_20;

  }

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    enckey,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  return { encryptedData: encrypted.toString(), id: id};
};

export default encryptData;
