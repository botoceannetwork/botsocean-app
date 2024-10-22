"use client";

import { ArrowLeft, Info, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

// Required function to pre-generate static paths
async function generateStaticParams() {
  // Fetch or define the IDs you want to pre-generate at build time
  const bundles = await fetchBundles(); // Replace with your own API call or data fetching logic
  return bundles.map((bundle) => ({
    id: bundle.id.toString(), // Make sure it's a string
  }));
}

// Dummy function for fetching bundles; replace this with your own logic
async function fetchBundles() {
  return [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];
}

export default function AgentDetail() {
  const params = useParams();

  useEffect(() => {


  }, [params]);

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
        <div className="mb-6 flex justify-between items-center">
          <Button variant="ghost" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="outline">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Public Profile
          </Button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h1 className="text-2xl font-bold">Hotel</h1>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className="mr-2">Hosted</Badge>
                <Badge variant="default">Running</Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">agent1q09uof...j5mcrx</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  Rating <Info className="w-4 h-4 ml-1 text-gray-400" />
                </h3>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">-</span>
                  <svg className="w-24 h-8" viewBox="0 0 100 30">
                    <path d="M0 15 Q 25 5, 50 15 T 100 15" stroke="purple" fill="none" />
                    <circle cx="75" cy="15" r="3" fill="purple" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">Discovery</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  All-Time DeltaV Interactions <Info className="w-4 h-4 ml-1 text-gray-400" />
                </h3>
                <span className="text-2xl font-bold">-</span>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Readme</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Title:</h3>
                  <p>This is a business agent created for Hotel represented by Fetch Onboarding - <a href="https://bonanzacreekranch.com/" className="text-blue-600 hover:underline">https://bonanzacreekranch.com/</a></p>
                </div>
                <div>
                  <h3 className="font-semibold">Summary:</h3>
                  <p>The Corry Area Historical Society, Inc. collects and preserves articles pertaining to the history of the Corry Area, serving the local community through a museum and various educational initiatives.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Category:</h3>
                  <p>Historical Society</p>
                </div>
                <div>
                  <h3 className="font-semibold">Business Imprint & Contact Info:</h3>
                  <p>Email address: <a href="mailto:admin@corryareahistoricalsociety.org" className="text-blue-600 hover:underline">admin@corryareahistoricalsociety.org</a></p>
                  <p>Phone number:</p>
                  <p>Postal address: Taylor Loop, New Mexico, United States</p>
                  <p>Business proprietors:</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                Protocols <Info className="w-4 h-4 ml-1 text-gray-400" />
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="default">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                      Default <span className="ml-2 text-xs text-gray-500">v0.1.0</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Add content for Default protocol if needed */}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="chitchat">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                      ChitChatDialogue <span className="ml-2 text-xs text-gray-500">v0.5.1</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>StartWebsiteChat</p>
                      <p>AcceptChitChatDialogue</p>
                      <p>RejectChitChatDialogue</p>
                      <p>ChitChatDialogueMessage agent_json : object · agent_message : string · message_id : string · timestamp : string · type : string · user_message : string</p>
                      <p>ConcludeChitChatDialogue</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}