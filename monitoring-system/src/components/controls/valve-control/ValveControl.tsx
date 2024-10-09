import React, { useEffect, useState } from 'react';
import { ControlsActionTypes, ControlsCommandTypes, ControlsValveTypes, IControlsPacket, PacketType } from '../../../lib/monitoring-system-types';
import { Chip, FormControlLabel, Stack, Switch, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IValveControlProps {
    valveName: string;
    disabled?: boolean;
    onFlip?: () => void;
}

const ValveControl = (props: IValveControlProps) => {
    const { valveName, disabled, onFlip } = props;
    const [feedBackColor, setFeedBackColor] = useState<any>("default");
    const [feedBackLabel, setFeedBackLabel] = useState<string>("CLOSED");
    const theme = useTheme();
    const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
    const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);
    const [name, setName] = useState<string>(valveName);

    useEffect(() => {
        setName(valveName);
    }, [valveName]);


    const sendCommand = (event: React.ChangeEvent<HTMLInputElement>) => {
        // default closed
        const payload: IControlsPacket = {
            identifier: PacketType.CONTROLS,
            command: ControlsCommandTypes.CONTROL,
            valve: name,
            action: ControlsActionTypes.CLOSE
        };
        setIsSwitchChecked(event.target.checked);
        // console.log(`switch ${valveName}: ${event.target.checked}`);
        if (event.target.checked) {
            payload.action = ControlsActionTypes.OPEN;
        }
        // checked = !checked;
    
        // onFlip && onFlip();
    }

    // useEffect(() => {
    //     // Feedback logic
    //     if (socketContext.controlsPacketIn['valve'] == valveName) {
    //         const action: string = socketContext.controlsPacketIn['action'];
    //         setFeedBackLabel(action);
    //         if (action == "OPEN") {
    //             setFeedBackColor("success");
    //             if (!isSwitchChecked) {
    //                 setIsSwitchChecked(true);
    //             }
    //         } else if (action == "TRANSIT") {
    //             setFeedBackColor("primary");
    //         } else if (action == "CLOSE") {
    //             setFeedBackColor("default");
    //             if (isSwitchChecked) {
    //                 setIsSwitchChecked(false);
    //             }
    //         }
    //     }

    // }, [socketContext.controlsPacketIn]);

    return (
        <>
            {!isNotMobile ? <ValveControl.PhoneView valveName={name} /> : <ValveControl.ComputerView valveName={name} />}
        </>
    );
} 

ValveControl.ComputerView = (props: { valveName: string }) => {
    const { valveName } = props;
    return (
        <Stack direction="column" spacing={0} alignItems={'center'} minWidth={140} marginY={0.5}>
            <FormControlLabel 
                sx={{ width: "fit-content" }} 
                control={<Switch />} 
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