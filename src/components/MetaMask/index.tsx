import { useEffect } from 'react';
import { hooks, metaMask } from './connectors/metaMask';
import { ConnectWithSelect } from '../ConnectWallet';
import { Accounts } from '../Accounts';
import { CHAINS } from '@/utils/chains';
const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  const name = chainId ? CHAINS[chainId]?.name : undefined;
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <>
      <div>
        <b>MetaMask</b>
        <div>
          {error ? (
            <>
              🔴 {error.name ?? 'Error'}
              {error.message ? `: ${error.message}` : null}
            </>
          ) : isActivating ? (
            <>🟡 Connecting</>
          ) : isActive ? (
            <>🟢 Connected</>
          ) : (
            <>⚪️ Disconnected</>
          )}
        </div>
        <div style={{ marginBottom: '1rem' }} />
        {name ? (
          <div>
            Chain:{' '}
            <b>
              {name} ({chainId})
            </b>
          </div>
        ) : (
          <div>
            Chain Id: <b>{chainId}</b>
          </div>
        )}
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
    </>
  );
}
