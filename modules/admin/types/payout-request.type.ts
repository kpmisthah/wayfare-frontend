import { PayoutStatus } from "./payout-status.enum";

  export type PayoutRequest = {
    id: string;
    amount: string;
    status: PayoutStatus;
    bankDetails: {
      accountName: string;
      accountNumber: string;
      ifscCode: string;
      bankName: string;
      branch: string;
    };
    agencyInfo:{
      name:string,
      phone:string,
      email:string
    }
  };