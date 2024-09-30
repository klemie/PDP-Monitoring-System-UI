import { Button, Chip, FormControl, FormControlLabel, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import {  ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from '../../../../lib/monitoring-system-types';
import ValveControl from '../../../controls/valve-control/ValveControl';

const ControlsPanel: React.FC = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const sendAbortCommand = () => {
        const payload: IControlsPacket = {
            identifier: PacketType.CONTROLS,
            command: ControlsCommandTypes.ABORT
        };
        // socketContext.setControlsPacketOut(payload);
    }

    return (
        <Paper
            elevation={2}
            sx={{ padding: 2, width: "fit-content", height: "fit-content"}}
        >
            <FormControl component="fieldset">
                <Stack direction={'row'}>
                    <ValveControl valveName={ControlsValveTypes.N2OFlow} />
                    <ValveControl valveName={ControlsValveTypes.N2OVent} />
                </Stack>
                <Stack direction={'row'}>
                    <ValveControl valveName={ControlsValveTypes.N2Flow} />
                    <ValveControl valveName={ControlsValveTypes.ERV} />
                </Stack>
                <Stack direction={'row'}>
                    <ValveControl valveName={ControlsValveTypes.RTV} />
                    <ValveControl valveName={ControlsValveTypes.NCV} />
                </Stack>
                <ValveControl valveName={ControlsValveTypes.MEV} />
                <FormControlLabel 
                    sx={{ marginTop: 1 }}
                    control={<Chip label="ENERGIZED" color="error" disabled sx={{ width: '100%', borderRadius: 1 }}/>} 
                    label={<Typography alignSelf='start'>Run Tank</Typography>}
                    labelPlacement='top' 
                />
                {isNotMobile ?
                    <Button 
                        fullWidth 
                        variant='contained' 
                        color="error" 
                        sx={{ marginTop: 2, fontSize: 40, fontWeight: 600 }}
                        onClick={() => sendAbortCommand()}
                        // disabled={!socketContext.isSerialOn}
                    >
                        Abort
                    </Button>
                    :
                    <></> 
                }
                
            </FormControl>
        </Paper>
    )
}
export default ControlsPanel;