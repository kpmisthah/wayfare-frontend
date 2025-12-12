export enum PAYMENTSTATUS {
    SUCCEEDED='SUCCEEDED',
    FAILED='FAILED',
    PENDING='PENDING'
}

export interface PaymentSuccessProps {
  booking: {
    id: string,
    startDate: string,
    duration: number,
    title: string,
    destination: string,
    travelers: number,
    totalAmount: number,
    email: string,
    bookingCode: string
  };
  paymentMethod: string
}
