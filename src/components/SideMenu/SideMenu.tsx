import { Box, Drawer, Typography } from "@mui/material";
import { useSideMenu } from "./useSideMenu";

export function SideMenu() {
    const stack = useSideMenu((state) => state.stack);
    return (
        <Drawer
            variant="persistent"
            open={stack.length > 0}
            anchor="right"
            sx={{

            }}
            slotProps={{
                paper: {
                    sx: {
                        top: "4rem",
                        bottom: "0",
                        height: "auto"
                    }
                }
            }}
        >
            {
                stack.map((item) => {
                    return <Box key={item.key} sx={{ height: "100%", display: stack[stack.length - 1].key == item.key ? "unset" : "none" }}>
                        {item.content}
                    </Box>
                })
            }

        </Drawer>
    )

}