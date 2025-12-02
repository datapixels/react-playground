import List from "@mui/material/List";
import type { IBooking } from "./BookingList.types";
import BookingItem from "./BookingItem";
import Box from "@mui/material/Box";

export default function BookingList({ bookings }: { bookings: IBooking[] }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List sx={{ flex: 1, width: '100%', overflow: 'auto' }}>
                {bookings.map((booking) => (
                    <BookingItem {...booking} key={booking.id} />
                ))}
            </List>
        </Box>
    );
}
