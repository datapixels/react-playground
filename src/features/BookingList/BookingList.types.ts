export interface IBooking {
    id: string;
    customerName: string;
    fromDate: Date;
    toDate: Date;
    status: 'confirmed' | 'pending' | 'canceled';
    guestCount: number;
 }