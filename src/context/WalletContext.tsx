'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { listAccounts, isNimiqPayAvailable } from '@/lib/nimiq';

export interface ProfileData {
  handle: string;
  walletAddress: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  accentColor: string;
  productCount: number;
  totalSales: number;
  totalNimEarned: number;
  totalUsdtEarned: number;
}

interface WalletContextType {
  walletAddress: string | null;
  sessionToken: string | null;
  handle: string | null;
  profile: ProfileData | null;
  isConnected: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshProfile: () => Promise<void>;
  formatAddress: (addr?: string | null) => string;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  sessionToken: null,
  handle: null,
  profile: null,
  isConnected: false,
  isLoading: true,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  refreshProfile: async () => {},
  formatAddress: () => '',
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [handle, setHandle] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfileByWallet = async (addr: string) => {
    try {
      const res = await fetch(`/api/profile/wallet/${encodeURIComponent(addr)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
          setHandle(data.profile.handle);
          localStorage.setItem('atelier_handle', data.profile.handle);
        }
      }
    } catch (e) {
      console.warn('Could not fetch profile for wallet:', e);
    }
  };

  const refreshProfile = async () => {
    if (walletAddress) {
      await fetchProfileByWallet(walletAddress);
    } else if (handle) {
      try {
        const res = await fetch(`/api/profile/${encodeURIComponent(handle)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.profile) setProfile(data.profile);
        }
      } catch (e) {
        console.warn('Could not fetch profile:', e);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedWallet = localStorage.getItem('atelier_wallet');
    const savedSession = localStorage.getItem('atelier_session');
    const savedHandle = localStorage.getItem('atelier_handle');

    if (savedWallet) {
      setWalletAddress(savedWallet);
      setIsConnected(true);
      if (savedSession) setSessionToken(savedSession);
      if (savedHandle) setHandle(savedHandle);
      fetchProfileByWallet(savedWallet);
    }
    setIsLoading(false);
  }, []);

  const connectWallet = async () => {
    try {
      let addr = 'NQ40 7PTF 8888 1111 2222 3333 4444 5555 9QRN';

      const hasPay = await isNimiqPayAvailable();
      if (hasPay) {
        const accounts = await listAccounts();
        if (accounts && accounts.length > 0) {
          addr = accounts[0];
        }
      }

      const mockSession = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      setWalletAddress(addr);
      setSessionToken(mockSession);
      setIsConnected(true);

      localStorage.setItem('atelier_wallet', addr);
      localStorage.setItem('atelier_session', mockSession);

      await fetchProfileByWallet(addr);
    } catch (err) {
      console.warn('Wallet connection error, setting fallback connected state:', err);
      const fallback = 'NQ40 7PTF 8888 1111 2222 3333 4444 5555 9QRN';
      const mockSession = `session_${Date.now()}`;
      setWalletAddress(fallback);
      setSessionToken(mockSession);
      setIsConnected(true);
      localStorage.setItem('atelier_wallet', fallback);
      localStorage.setItem('atelier_session', mockSession);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setSessionToken(null);
    setHandle(null);
    setProfile(null);
    setIsConnected(false);

    localStorage.removeItem('atelier_wallet');
    localStorage.removeItem('atelier_session');
    localStorage.removeItem('atelier_handle');
  };

  const formatAddress = (addr?: string | null) => {
    const target = addr || walletAddress;
    if (!target) return '';
    const clean = target.replace(/\s+/g, '');
    if (clean.length < 10) return target;
    return `${clean.substring(0, 4)} ${clean.substring(4, 8)}...${clean.substring(clean.length - 4)}`;
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        sessionToken,
        handle,
        profile,
        isConnected,
        isLoading,
        connectWallet,
        disconnectWallet,
        refreshProfile,
        formatAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
