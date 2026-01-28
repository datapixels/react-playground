import { Grid, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material"
import { Close, MoreVert, Refresh } from "@mui/icons-material"
import { act, useState, type MouseEvent } from "react"
import { fa } from "zod/v4/locales"

export type ModelHeaderActions = {
    icon?: React.ReactNode,
    label: string,
    disabled?: boolean,
    hidden?: boolean,
    onClick: ()=> void
}

export type ModalHeaderProps = {
    title: string,
    secondaryInfoNode?: React.ReactNode
    primaryActions?: ModelHeaderActions[]
    secondaryActions?: ModelHeaderActions[]
}

export function ModalHeader({ title, secondaryInfoNode, primaryActions, secondaryActions }: ModalHeaderProps) {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const openMenu = (event: MouseEvent<HTMLElement>)=> {
        setAnchorElement(event.currentTarget)
    }

    const closeMenu = ()=> setAnchorElement(null);

    return (
        <>
            <Grid container spacing={2}>
                <Grid size="grow">
                    {secondaryInfoNode}
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Grid>
                <Grid>
                    {
                        secondaryActions && (
                            <>
                                <IconButton onClick={openMenu}>
                                    <MoreVert/>
                                </IconButton>
                                <Menu open={Boolean(anchorElement)} anchorEl={anchorElement} onClose={closeMenu}>
                                    {secondaryActions.map((action, index)=> {
                                        return (
                                        action.hidden != true && <MenuItem 
                                            key={index}
                                            disabled={action.disabled ?? false}
                                            onClick={()=>{
                                                action.onClick();
                                            }}
                                        >
                                            {action.label}
                                        </MenuItem>
                                        )
                                    })}
                                </Menu>
                            </>
                        ) 
                    }
                    {primaryActions && (
                        primaryActions.map((action, index)=> {
                            return (
                                <Tooltip title={action.label}>
                                    <IconButton onClick={action.onClick}>
                                        {action.icon}
                                    </IconButton>
                                </Tooltip>
                            )
                        })
                    )}
                    <IconButton>
                        <Close/>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    )
}