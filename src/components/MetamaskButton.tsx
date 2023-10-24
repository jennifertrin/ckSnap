import { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';

const MetamaskButton = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect() as string[] | undefined;
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn('Failed to connect...', err);
    }
  };
  

  return (
    <div className="App">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Connect to Metamask
      </button>
      {connected && (
        <div>
          {chainId && <p>Connected chain: {chainId}</p>}
          {account && <p>Connected account: {account}</p>}
        </div>
      )}
    </div>
  );
};

export default MetamaskButton;
