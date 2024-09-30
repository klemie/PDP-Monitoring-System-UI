import { AppBar, Button, Container, Grid2, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { PageContainer, PageContainerToolbar } from '@toolpad/core';
import { Download, Settings } from '@mui/icons-material';
import ControlsPanelDock from '../components/base/panels/controls-panel/ControlsPanelDock';
import React, { useState, MouseEvent } from 'react';
import { InstrumentationPanel } from '../components/base/panels/instrumentation-panel/InstrumentataionPanel';


export const EntryPoint = () => {
    return (
        <PageContainer 
            slots={{ toolbar: EntryPoint.ToolBar }}
            sx={{
                marginX: 0,
                maxWidth: "100%",
                minWidth: "100%",
            }}
        >
            <InstrumentationPanel />
            <AppBar 
                position="fixed" 
                color="primary" 
                sx={{ top: 'auto', bottom: 0 }}
            >
                <ControlsPanelDock />
            </AppBar>
        </PageContainer>
    )
};

EntryPoint.ToolBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <PageContainerToolbar>
             <Button startIcon={<Download />} color='inherit' disabled>
                export
            </Button>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Settings  />
            </IconButton>
            <EntryPoint.Menu 
                anchorEl={anchorEl} 
                open={open} 
                handleClose={handleClose} 
            />
        </PageContainerToolbar>
    )
}

type MenuProps = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
}

EntryPoint.Menu = (props: MenuProps) => {
    const { anchorEl, open, handleClose } = props;
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>UI Configuration</MenuItem>
            {/* <MenuItem onClick={handleClose}>Instrumentation</MenuItem> */}
        </Menu>
    )
}