import type { Web3ReactHooks } from '@web3-react/core';
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { useCallback, useState } from 'react';
import { CHAINS, getAddChainParameters, URLS } from '@/utils/chains';

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  const isNetwork = connector instanceof Network;
  const displayDefault = !isNetwork;
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId),
  );

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? 1 : -1,
  );

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return;

      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(
          desiredChainId === -1 ? undefined : desiredChainId,
        );
      } else {
        await connector.activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId),
        );
      }
    },
    [connector, chainId],
  );

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() =>
            connector instanceof WalletConnect || connector instanceof Network
              ? void connector.activate(
                  desiredChainId === -1 ? undefined : desiredChainId,
                )
              : void connector.activate(
                  desiredChainId === -1
                    ? undefined
                    : getAddChainParameters(desiredChainId),
                )
          }
        >
          Try Again?
        </button>
      </div>
    );
  } else if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={() => connector.deactivate()}>Disconnect</button>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() => {
            return connector instanceof WalletConnect ||
              connector instanceof Network
              ? connector.activate(
                  desiredChainId === -1 ? undefined : desiredChainId,
                )
              : connector.activate(
                  desiredChainId === -1
                    ? undefined
                    : getAddChainParameters(desiredChainId),
                );
          }}
          // disabled={isActivating}
        >
          Connect
        </button>
      </div>
    );
  }
}
