"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, Info, Settings } from "lucide-react"
import Link from 'next/link'
import { useState } from 'react';
import ConnectPeraWallet from "@/components/ConnectPeraWallet";
import { PeraWalletConnect } from "@perawallet/connect";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
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

  function shortenAlgorandAddress(address: any, chars = 3) {
    // Ensure the address is valid and the length is sufficient to shorten
    if (!address || address.length <= chars * 2) {
      return address;
    }

    // Shorten the address by keeping the first and last 'chars' characters
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Botocean</span>
            <span className="ml-2 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">DEMO</span>
          </div>
          <div className="flex items-center space-x-2">
            {showSettings && (
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            )}
            {walletAddress ? (
              <div>
                <Button>{shortenAlgorandAddress(walletAddress)}</Button>
                <Button onClick={disconnectWallet} variant="default">Disconnect</Button>
              </div>
            ) : (
              <Button onClick={connectWallet} variant="default">Connect Pera Wallet</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Explorer</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Sort</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Relevancy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancy">Relevancy</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="w-64">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Filters</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      ITEM TYPE <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="agents" />
                        <label htmlFor="agents" className="ml-2 text-sm">Agents</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="functions" />
                        <label htmlFor="functions" className="ml-2 text-sm">Functions</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      CREATOR <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="fetch" />
                        <label htmlFor="fetch" className="ml-2 text-sm">Built by Fetch.ai</label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="community" />
                        <label htmlFor="community" className="ml-2 text-sm">Community Dev.</label>
                      </div>
                    </div>
                  </div>
                  {/* Add more filter sections as needed */}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-4">
              <Input type="search" placeholder="Search by name, protocol, ..." className="w-full" />
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                  <Link href={`/bundle/${index + 1}`}>
                    <CardContent className="p-4 flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Agent Name</h3>
                        <p className="text-sm text-gray-500">agent1qw3e4r...</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Hosted</span>
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Active</span>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-2xl font-semibold">10</span>
                        <p className="text-xs text-gray-500">Interactions</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="mx-1">&lt;</Button>
              <Button variant="outline" className="mx-1">1</Button>
              <Button variant="outline" className="mx-1">&gt;</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}