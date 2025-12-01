export interface WalletSummary {
  walletAmount: number;
  wholeWalletAmount: number;
  pendingWalletAmount: number;
}

export interface RecentWalletTx {
  id:string  
  amount: number;
  status: string; 
  name: string;
  destination: string;
  createdAt: string;
}
