import { Button, ButtonGroup, Chip, FormControl, Paper, Stack, useTheme } from '@mui/material';
import React from 'react';
import {  ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from '../../../../lib/monitoring-system-types';
import ValveControl from '../../../controls/valve-control/ValveControl';

const ControlsPanelDock: React.FC = () => {
    const theme = useTheme();
    const valves = [
        ControlsValveTypes.N2OFlow,
        ControlsValveTypes.N2OVent,
        ControlsValveTypes.N2Flow,
        ControlsValveTypes.ERV,
        ControlsValveTypes.RTV,
        ControlsValveTypes.NCV,
        ControlsValveTypes.MEV
    ];
    return (
        <Paper
            elevation={2}
            sx={{ 
                padding: 1, 
                width: "100%", 
                height: "fit-content",
            }}
        >
            <FormControl component="fieldset" fullWidth>
                <Stack 
                    minWidth={'100%'}
                    direction={'row'} 
                    justifyContent={'space-between'}

                >
                    {valves.map((valve) => (
                        <ValveControl valveName={valve} />
                    ))}
                </Stack>
            </FormControl>
            <Stack direction={'row'} sx={{ marginTop: 1 }} spacing={2}>
                <Button 
                    fullWidth 
                    variant='contained' 
                    color="error" 
                    sx={{ fontSize: 24, fontWeight: 600 }}
                    // onClick={() => sendAbortCommand()}
                    // disabled={!socketContext.isSerialOn}
                >
                    Abort
                </Button>
                <ButtonGroup orientation='horizontal'>
                    <Button 
                        color='inherit'
                        startIcon={<Chip size='small' color='success' sx={{ borderRadius: '50%', width: 25 }}/>}
                    >
                        Controls
                    </Button>
                    <Button 
                        color='inherit'
                        startIcon={<Chip size='small' color='success' sx={{ borderRadius: '50%', width: 25 }}/>}
                    >
                        Instrumentation
                    </Button>
                </ButtonGroup>
            </Stack>
        </Paper>
    )
}

export default ControlsPanelDock;