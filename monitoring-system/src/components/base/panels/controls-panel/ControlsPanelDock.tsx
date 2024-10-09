import { Button, ButtonGroup, Chip, FormControl, Paper, Stack, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import ValveControl from '../../../controls/valve-control/ValveControl';
import LoadingButton from '@mui/lab/LoadingButton';
import { observer } from 'mobx-react-lite';
import { SettingStoreContext } from '../../../../stores/SettingStore';


const ControlsPanelDock: React.FC = observer(() => {
    enum ConnectionDotColors {
        CONNECTED = 'success',
        INTERRUPTED = 'error',
        DISCONNECTED = 'default'
    }

    const settingStore = useContext(SettingStoreContext);

    return (
        <Paper
            elevation={2}
            sx={{ 
                padding: 2, 
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
                    {settingStore.controlsList.map((control, index) => (
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
                            <Tooltip title='Controls WebSocket Status'>
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
                            <Tooltip title='Instrumentation WebSocket Status'>
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
})

export default ControlsPanelDock;