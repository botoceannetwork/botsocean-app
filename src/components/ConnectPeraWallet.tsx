// components/ConnectPeraWallet.js
import { useState } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { Button } from './ui/button';

export default function ConnectPeraWallet() {
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const peraWallet = new PeraWalletConnect();

  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      const address = accounts[0];
      setWalletAddress(address);
      console.log('Connected account:', address);

      // Listen for wallet disconnection
      peraWallet.reconnectSession();
    } catch (error) {
      if ((error as any)?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const disconnectWallet = async () => {
    peraWallet.disconnect();
    setWalletAddress(null);
    console.log('Disconnected');
  };

  return (
    <div>
      {walletAddress ? (
        <div>
          <p>Connected Account: {walletAddress}</p>
          <Button onClick={disconnectWallet} variant="default">Disconnect Wallet</Button>
        </div>
      ) : (
        <Button onClick={connectWallet} variant="default">Connect Pera Wallet</Button>
      )}
    </div>
  );
}
