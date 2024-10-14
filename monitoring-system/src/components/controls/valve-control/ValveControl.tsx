import React, { useContext, useEffect, useState } from 'react';
import { ControlsActionTypes, ControlsCommandTypes, IControlsPacket, PacketType } from '../../../lib/monitoring-system-types';
import { Chip, FormControlLabel, Stack, Switch, Typography, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ControlWSStoreContext } from '../../../stores/websocket/ControlsWebSocketStore';

interface IValveControlProps {
    valveName: string;
    disabled?: boolean;
    onFlip?: () => void;
    incomingPacket: object;
}

const ValveControl = observer((props: IValveControlProps) => {
    const { valveName, disabled, onFlip, incomingPacket } = props;
    const [feedBackColor, setFeedBackColor] = useState<any>("default");
    const [feedBackLabel, setFeedBackLabel] = useState<string>("CLOSED");
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
    const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);
    const [name, setName] = useState<string>(valveName);
    const controlsStore = useContext(ControlWSStoreContext)

    useEffect(() => {
        setName(valveName);
    }, [valveName]);

    useEffect(() => {
        console.log(incomingPacket)
    }, [incomingPacket])

    const sendCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        // default closed
        const payload: IControlsPacket = {
            identifier: PacketType.CONTROLS,
            command: ControlsCommandTypes.CONTROL,
            valve: name,
            action: ControlsActionTypes.CLOSE
        };

        console.log('send controls packet')
        console.log(payload)

        setIsSwitchChecked(event.target.checked);
        // console.log(`switch ${valveName}: ${event.target.checked}`);
        if (event.target.checked) {
            payload.action = ControlsActionTypes.OPEN;
        }
        // checked = !checked;
    
        onFlip && onFlip();
        controlsStore.sendCommand(payload);
    }

    useEffect(() => {
        // Feedback logic
        console.log(incomingPacket)
        if (incomingPacket['valve'] == valveName) {
            const action: string = incomingPacket['action'];
            setFeedBackLabel(action);
            if (action == "OPEN") {
                setFeedBackColor("success");
                if (!isSwitchChecked) {
                    setIsSwitchChecked(true);
                }
            } else if (action == "TRANSIT") {
                setFeedBackColor("primary");
            } else if (action == "CLOSE") {
                setFeedBackColor("default");
                if (isSwitchChecked) {
                    setIsSwitchChecked(false);
                }
            }
        }

    }, [incomingPacket]);


    const ComputerView = (props: { valveName: string }) => {
        const { valveName } = props;
        return (
            <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
                <FormControlLabel 
                    sx={{ width: "fit-content" }} 
                    control={<Switch 
                        onChange={sendCommand}
                        disabled={disabled}
                    />} 
                    label={<Typography variant='button'>{valveName}</Typography>} 
                    labelPlacement='end' 
                />
                <Chip 
                    color="default"
                    size="small" 
                    label="CLOSED" 
                    sx={{ width: "90%", borderRadius: 1 }}
                />
            </Stack>
        );
    }

    return (
        <>
            {!isNotMobile ? <ValveControl.PhoneView valveName={name} /> : <ComputerView valveName={name} />}
        </>
    );
})


ValveControl.PhoneView = (props: { valveName: string }) => {
    const { valveName } = props;
    return (
        <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
            <Typography>{valveName}</Typography>
            <Chip 
                color="default"
                size="small" 
                label="CLOSED" 
                sx={{ width: "90%", borderRadius: 1 }}
            />
        </Stack>
    );
}

export default ValveControl;