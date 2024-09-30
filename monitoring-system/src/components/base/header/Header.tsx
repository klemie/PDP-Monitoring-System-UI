import React from 'react';

import MonitoringSystemLogo from "../../../assets/MonitoringSystemLogo.svg"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ViewKeys, BaseStore } from '../../../stores/BaseStore';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';

const breadcrumbs: Breadcrumb[] = [
    {
        name: 'Dashboard',
        viewKey: ViewKeys.DASHBOARD,
        active: true
    },
    {
        name: 'Settings',
        viewKey: ViewKeys.SETTINGS,
        active: false
    },
    {
        name: 'Replay',
        viewKey: ViewKeys.REPLAY,
        active: false
    }
];

export type Breadcrumb = {
    name: string;
    viewKey: ViewKeys;
    active: boolean;
};

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
};

const Header: React.FC = () => {
    const baseStore = new BaseStore();
    
    const breadcrumbLinks = breadcrumbs.map((breadcrumb) => {
        if (!breadcrumb.active) {
            return (
                <Link
                    key={breadcrumb.name} 
                    sx={{ cursor: 'pointer' }}
                    underline="hover"
                    color="inherit"
                    variant="h5"
                    fontWeight={600}
                    onClick={() => {
                        baseStore.setViewKey(breadcrumb.viewKey);
                    }}
                >
                    { breadcrumb.name }
                </Link>
            );
        } else {
            return (
                <Typography
                    key={ breadcrumb.viewKey } 
                    color="text.primary"
                    variant="h5"
                    fontWeight={600}
                >
                    { breadcrumb.name }
                </Typography>
            );
        } 
    });

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center" 
        >
            <img 
                src={MonitoringSystemLogo} 
                alt="Icon" 
                height={45} 
                onClick={() => baseStore.setViewKey(ViewKeys.DASHBOARD)}
            />
            <Breadcrumbs 
                onClick={handleClick}
                separator={<NavigateNextIcon fontSize="small" />}
            >
                { breadcrumbLinks }
            </Breadcrumbs>
        </Stack>
    );
}

export default Header;
