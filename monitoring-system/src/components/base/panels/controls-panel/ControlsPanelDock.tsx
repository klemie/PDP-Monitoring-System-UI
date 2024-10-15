import { Button, ButtonGroup, Chip, FormControl, Paper, Stack, Tooltip } from '@mui/material';
import React from 'react';
import ValveControl from '../../../controls/valve-control/ValveControl';
import LoadingButton from '@mui/lab/LoadingButton';
import { Observer, observer } from 'mobx-react-lite';
import ControlsStore from '../../../../stores/websocket/ControlsWebSocketStore';
import settingStore from '../../../../stores/SettingStore';

const ControlsPanelDock: React.FC = observer(() => {
    enum ConnectionDotColors {
        CONNECTED = 'success',
        INTERRUPTED = 'error',
        DISCONNECTED = 'default'
    }


    return (
        <Observer>{() =>
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
                            disabled={!ControlsStore.isConnected}
                            key={index}
                            valveName={control}
                            incomingPacket={ControlsStore.incomingPacket}
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
                >
                    Abort
                </Button>
                <ButtonGroup orientation='horizontal'>
                    
                        <LoadingButton 
                            color='inherit'
                            variant='contained'
                            // loading={controlsStore.isConnected}
                            loadingPosition='start'
                            onClick={() => {
                                console.log(`isConnected state ${ControlsStore.isConnected}`)
                                if (ControlsStore.isConnected) {
                                    console.log('disconnect UI')
                                    ControlsStore.disconnect()
                                } else {
                                    console.log('connect UI')
                                    ControlsStore.connect()
                                }
                            }}
                            startIcon={
                                <Tooltip title='Controls WebSocket Status'>
                                    <Chip 
                                        size='small' 
                                        color={ControlsStore.isConnected ? ConnectionDotColors.CONNECTED : ConnectionDotColors.DISCONNECTED} 
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
                                    color={false ? ConnectionDotColors.CONNECTED : ConnectionDotColors.DISCONNECTED}
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
        }</Observer>
    )
})

export default ControlsPanelDock;