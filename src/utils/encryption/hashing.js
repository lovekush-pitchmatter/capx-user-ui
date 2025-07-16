import CryptoJS from 'crypto-js';
const algorithm = 'sha256';
import constants from "../../constants/envConstants";

export default function hashing(data, id) {

  let reqkey = '';
  if (id == 1) {

    reqkey = constants.VITE_HASH_1;

  } else if (id == 2) {

    reqkey = constants.VITE_HASH_2;

  } else if (id == 3) {

    reqkey = constants.VITE_HASH_3;

  } else if (id == 4) {

    reqkey = constants.VITE_HASH_4;

  } else if (id == 5) {

    reqkey = constants.VITE_HASH_5;

  } else if (id == 6) {

    reqkey = constants.VITE_HASH_6;

  } else if (id == 7) {

    reqkey = constants.VITE_HASH_7;

  } else if (id == 8) {

    reqkey = constants.VITE_HASH_8;

  } else if (id == 9) {

    reqkey = constants.VITE_HASH_9;

  } else if (id == 10) {

    reqkey = constants.VITE_HASH_10;

  } else if (id == 11) {

    reqkey = constants.VITE_HASH_11;

  } else if (id == 12) {

    reqkey = constants.VITE_HASH_12;

  } else if (id == 13) {

    reqkey = constants.VITE_HASH_13;

  } else if (id == 14) {

    reqkey = constants.VITE_HASH_14;

  } else if (id == 15) {

    reqkey = constants.VITE_HASH_15;

  } else if (id == 16) {

    reqkey = constants.VITE_HASH_16;

  } else if (id == 17) {

    reqkey = constants.VITE_HASH_17;

  } else if (id == 18) {

    reqkey = constants.VITE_HASH_18;

  } else if (id == 19) {

    reqkey = constants.VITE_HASH_19;

  } else if (id == 20) {

    reqkey = constants.VITE_HASH_20;

  }

  if ((reqkey == "" || reqkey == undefined || reqkey == null)) {
    reqkey = constants.VITE_HASH_4;
  }
  const algorithm = CryptoJS.algo.SHA256;
  const finaldata = JSON.stringify(data) + reqkey;
  const hash = algorithm.create().update(finaldata).finalize().toString();
  return { reqdata: hash };
}

