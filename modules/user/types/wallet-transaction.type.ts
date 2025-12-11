export interface WalletTransaction {
    id: string;
    amount: number;
    transactionType: 'CREDIT' | 'DEBIT';
    paymentStatus: string;
    date: string;
    category: 'USER_PAYMENT' | 'ADMIN_CREDIT' | 'AGENCY_CREDIT' | 'REFUND' | 'WITHDRAWAL';
    bookingId?: string;
    agencyId?: string;
    // Optional populated fields from backend
    booking?: {
        id: string;
        bookingCode: string;
        travelDate: string;
        package?: {
            id: string;
            itineraryName?: string;
            destination?: string;
        };
    };
    agency?: {
        id: string;
        user?: {
            name: string;
        };
    };
}