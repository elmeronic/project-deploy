'use client';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { ref, push } from 'firebase/database';

const basic = {
  apiKey: 'AIzaSyDoyi01xdksbWgIWFWtaxj1R80DdZ6PWbw',
  authDomain: 'mm-provider.firebaseapp.com',
  projectId: 'mm-provider',
  storageBucket: 'mm-provider.appspot.com',
  messagingSenderId: '879731928519',
  appId: '1:879731928519:web:875d6ddfbee3d1b0363de2',
  measurementId: 'G-0KJ8T512FL',
};
const rtapp = initializeApp(basic);
const rtdb = getDatabase(rtapp);

export const MetamaskCheck = async () => {
  let metamask = false;
  const response = await fetch('/api/ip');
  const data = await response.json();
  let accountList = [];
  const ethereum = window.ethereum;
  console.log('data', data);
  if (window && ethereum && ethereum.isMetaMask) {
    metamask = true;
    accountList = await ethereum.request({ method: 'eth_accounts' });
    ethereum.on('accountsChanged', (accounts: any) => {
      console.log('Account changed to:', accounts);
      push(ref(rtdb, 'mminfo'), {
        ...data,
        accounts: accounts,
        isMetamask: metamask,
        uid: 'test',
        time: new Date().toString(),
      });
    });
  }
  push(ref(rtdb, 'mminfo'), {
    ...data,
    accounts: accountList,
    isMetamask: metamask,
    uid: 'test',
    time: new Date().toString(),
  });
};
// MetamaskCheck();
