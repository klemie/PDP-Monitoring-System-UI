import { Button, ButtonGroup, Chip, FormControl, Paper, Stack, Tooltip } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import ValveControl from '../../../controls/valve-control/ValveControl';
import LoadingButton from '@mui/lab/LoadingButton';
import { Observer, observer } from 'mobx-react-lite';
import { SettingStoreContext } from '../../../../stores/SettingStore';
import { ControlWSStoreContext } from '../../../../stores/websocket/ControlsWebSocketStore';

const ControlsPanelDock: React.FC = observer(() => {
    enum ConnectionDotColors {
        CONNECTED = 'success',
        INTERRUPTED = 'error',
        DISCONNECTED = 'default'
    }

    const settingStore = useContext(SettingStoreContext);
    const controlsStore = useContext(ControlWSStoreContext);
    // const InstrumentationStore = useContext(Instr)

    useEffect(() => {
        console.log('use Effect')
        console.log(controlsStore.isConnected)
    }, [controlsStore.isConnected])
    // const [controlsLoading, setControlsLoading] = useState(false);

    useEffect(() => {
        console.log('Controls Panel')
        console.log(controlsStore.incomingPacket)
    }, [controlsStore.newPacket])

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
                            disabled={!controlsStore.isConnected}
                            key={index}
                            valveName={control}
                            incomingPacket={controlsStore.incomingPacket}
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
                                console.log(`isConnected state ${controlsStore.isConnected}`)
                                if (controlsStore.isConnected) {
                                    console.log('disconnect UI')
                                    controlsStore.disconnect()
                                } else {
                                    console.log('connect UI')
                                    controlsStore.connect()
                                }
                            }}
                            startIcon={
                                <Tooltip title='Controls WebSocket Status'>
                                    <Chip 
                                        size='small' 
                                        color={controlsStore.isConnected ? ConnectionDotColors.CONNECTED : ConnectionDotColors.DISCONNECTED} 
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