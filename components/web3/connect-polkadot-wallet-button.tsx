"use client";

import { useEffect, useState } from "react";
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Button } from "@/components/ui/button";
import { Wallet, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const APP_NAME = "SONAR Music Platform";

interface ConnectPolkadotWalletButtonProps {
  onConnect?: (address: string, name?: string) => void;
  onDisconnect?: () => void;
  compact?: boolean;
}

export default function ConnectPolkadotWalletButton({ 
  onConnect, 
  onDisconnect,
  compact = false 
}: ConnectPolkadotWalletButtonProps) {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);
    
    try {
      const extensions = await web3Enable(APP_NAME);
      if (extensions.length === 0) {
        setError(
          "No Polkadot wallet extension found. Please install Polkadot.js or Talisman."
        );
        return;
      }

      const allAccounts = await web3Accounts();
      if (allAccounts.length === 0) {
        setError(
          "No accounts found. Please create an account in your Polkadot wallet extension."
        );
        return;
      }

      setAccounts(allAccounts);
      
      // If only one account, select it automatically
      if (allAccounts.length === 1) {
        await selectAccount(allAccounts[0]);
      }
    } catch (err) {
      console.error("Error connecting Polkadot wallet:", err);
      setError(
        err instanceof Error ? err.message : "Unknown error occurred."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const selectAccount = async (account: InjectedAccountWithMeta) => {
    console.log("🔥 ConnectPolkadot: selectAccount called with:", account.address, account.meta.name)
    setSelectedAccount(account);
    console.log("🔥 ConnectPolkadot: Polkadot account connected:", account.address);
    
    // Call onConnect immediately after selecting account
    if (onConnect) {
      console.log("🔥 ConnectPolkadot: Calling onConnect callback...")
      onConnect(account.address, account.meta.name);
      console.log("🔥 ConnectPolkadot: onConnect callback completed")
    }
    
    // Sign a message to prove ownership (optional, for enhanced security)
    try {
      console.log("🔥 ConnectPolkadot: Starting message signing...")
      const message = await signMessage(account);
      console.log("🔥 ConnectPolkadot: Message signed successfully:", message)
    } catch (err) {
      console.error("🚨 ConnectPolkadot: Error signing message (non-critical):", err);
      // Don't set error here as the connection was successful
    }
  };

  const signMessage = async (account: InjectedAccountWithMeta) => {
    const injector = await web3FromSource(account.meta.source);
    const signRaw = injector?.signer?.signRaw;

    if (!signRaw) {
      throw new Error("Unable to sign messages with this wallet");
    }

    const message = `Authenticate with SONAR: ${Date.now()}`;
    const { signature } = await signRaw({
      address: account.address,
      data: message,
      type: 'bytes'
    });
    
    console.log("Message signed:", message, "Signature:", signature);
    return { message, signature };
  };

  const handleDisconnect = () => {
    setSelectedAccount(null);
    setAccounts([]);
    setError(null);
    if (onDisconnect) {
      onDisconnect();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!selectedAccount) {
    if (compact) {
      return (
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Wallet className="h-5 w-5" />
        </Button>
      );
    }

    return (
      <div className="space-y-2">
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Polkadot Wallet"}
        </Button>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }

  // Connected state
  if (accounts.length === 1) {
    // Single account - simple display
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">{selectedAccount.meta.name}</p>
              <p className="text-xs text-muted-foreground">{formatAddress(selectedAccount.address)}</p>
            </div>
          </div>
          <Button
            onClick={handleDisconnect}
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  // Multiple accounts - dropdown
  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm">
                {selectedAccount.meta.name} ({formatAddress(selectedAccount.address)})
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>Polkadot Accounts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.address}
              onClick={() => selectAccount(account)}
              className={account.address === selectedAccount.address ? "bg-muted" : ""}
            >
              <div className="flex items-center gap-2 w-full">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{account.meta.name}</p>
                  <p className="text-xs text-muted-foreground">{formatAddress(account.address)}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect}>
            <span className="text-destructive">Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
} 