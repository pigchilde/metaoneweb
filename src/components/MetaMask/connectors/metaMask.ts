import { MetaMask } from '@web3-react/metamask';
import { Actions } from '@web3-react/types';
import { initializeConnector } from '@web3-react/core';

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions: Actions) => {
    console.log(actions, 565866);
    return new MetaMask(actions);
  },
);
