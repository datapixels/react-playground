import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import type { IBooking } from "./BookingList.types";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function BookingItem(booking: IBooking) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemAvatar>
                    <Box
                        sx={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            backgroundColor: "grey.300",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography component="span" variant="h6" sx={{ lineHeight: "1rem" }}>
                            3
                        </Typography>
                        <Typography
                            component="span"
                            variant="caption"
                            sx={{ lineHeight: "0.5rem" }}
                        >
                            days
                        </Typography>
                    </Box>
                </ListItemAvatar>
                <ListItemText primary={booking.customerName} secondary={
                    <SecondaryContent {...booking                } />
                } />
               
            </ListItemButton>
        </ListItem>
    );
}


function SecondaryContent(booking: IBooking) {
    return (
        <>
            <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
                <PersonIcon sx={{ mr: 0.5 }} fontSize="small" />
                <Typography component="span" variant="body1">{booking.guestCount}</Typography>
            </Box>
        </>)
}