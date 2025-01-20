interface Window {
    ethereum: {
        isMetaMask?: boolean;
        request: (args: { method: string; params?: any[] }) => Promise<any>;
        on: (eventName: string, callback: (...args: any[]) => void) => void;
        // Add other methods and properties as needed
      };
}