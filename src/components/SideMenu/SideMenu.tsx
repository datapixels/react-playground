import { Box } from "@mui/material";
import { useSideMenu } from "./useSideMenu";

export function SideMenu() {
    const stack = useSideMenu((state) => state.stack);

    return (
        stack.map((item) => {
            
            return <Box key={item.key} sx={{display: stack[stack.length-1].key == item.key? "unset": "none"}}>
               
                {item.content}
                 {stack.length}
            </Box>
        }
        ))

}