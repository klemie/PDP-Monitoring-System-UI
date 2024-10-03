import { Button, ButtonGroup, Chip, FormControl, Paper, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { ControlsValveTypes } from '../../../../lib/monitoring-system-types';
import ValveControl from '../../../controls/valve-control/ValveControl';
import LoadingButton from '@mui/lab/LoadingButton';
import { DEFAULT_CONTROLS_CONFIG } from '../../../../lib/configs/configs';


const ControlsPanelDock: React.FC = () => {
    enum ConnectionDotColors {
        CONNECTED = 'success',
        INTERRUPTED = 'error',
        DISCONNECTED = 'default'
    }

    const theme = useTheme();
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
                    {DEFAULT_CONTROLS_CONFIG.map((control, index) => (
                        <ValveControl
                            key={index}
                            valveName={control}
                        />
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
                    <LoadingButton 
                        color='inherit'
                        variant='contained'
                        // loading={true}
                        loadingPosition='start'
                        startIcon={
                            <Tooltip title='Controls Status'>
                                <Chip 
                                    size='small' 
                                    color={ConnectionDotColors.CONNECTED} 
                                    sx={{ borderRadius: '50%', width: 25 }}
                                />
                            </Tooltip>
                        }
                    >
                        Controls
                    </LoadingButton>
                    <LoadingButton 
                        color='inherit'
                        variant='contained'
                        // loading={true}
                        loadingPosition='start'
                        startIcon={
                            <Tooltip title='Instrumentation Status'>
                                <Chip 
                                    size='small' 
                                    color={ConnectionDotColors.INTERRUPTED}
                                    sx={{ borderRadius: '50%', width: 25 }}
                                />
                            </Tooltip>
                        }
                    >
                        Instrumentation
                    </LoadingButton>
                </ButtonGroup>
            </Stack>
        </Paper>
    )
}

export default ControlsPanelDock;