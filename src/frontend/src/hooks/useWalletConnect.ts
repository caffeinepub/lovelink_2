import { useCallback, useState } from "react";

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
}

export function useWalletConnect() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setState((prev) => ({
        ...prev,
        error:
          "No wallet detected. Please install MetaMask or a compatible wallet.",
      }));
      return null;
    }

    setState((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      const accounts: string[] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0] || null;
      setState({ address, isConnecting: false, error: null });
      return address;
    } catch (err: any) {
      setState({
        address: null,
        isConnecting: false,
        error: err?.message || "Failed to connect wallet",
      });
      return null;
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({ address: null, isConnecting: false, error: null });
  }, []);

  const truncatedAddress = state.address
    ? `${state.address.slice(0, 6)}...${state.address.slice(-4)}`
    : null;

  return {
    address: state.address,
    truncatedAddress,
    isConnecting: state.isConnecting,
    error: state.error,
    isConnected: !!state.address,
    connect,
    disconnect,
  };
}
