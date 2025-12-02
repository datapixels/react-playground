import { useEffect } from "react";

import type { IBooking } from "../features/BookingList/BookingList.types";

export default function useBookingList() {
    useEffect(() => {
        // Fetch booking list on mount
        fetchBookings()

    }, []);
}

async function fetchBookings(): Promise<IBooking[]> {
    // Fetch booking list logic here
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Fetched bookings");
            const mockBookings: IBooking[] = [];
            mockBookings.push({
                id: "1",
                customerName: "John Doe",
                fromDate: new Date(),
                toDate: new Date(),
                status: "confirmed",
                guestCount: 2
            });

            mockBookings.push({
                id: "2",
                customerName: "Jane Smith",
                fromDate: new Date(),
                toDate: new Date(),
                status: "pending",
                guestCount: 4
            });


            resolve(mockBookings);
        }, 1000)
    });
}

