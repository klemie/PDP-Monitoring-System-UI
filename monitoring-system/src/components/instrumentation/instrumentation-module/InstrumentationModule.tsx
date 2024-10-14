import { Box, IconButton, ListItemIcon, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { instrumentationModuleConfigMap, InstrumentationType } from "./Instrumentation-module-types";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Brush } from 'recharts';
import { useContext, useEffect, useState } from "react";
import { Check, MoreVert } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { InstrumentationStoreContext } from "../../../stores/websocket/InstrumentationWebSocketStore";

type InstrumentationModuleProps = {
    title: string;
    type: InstrumentationType;
    reading?: number;
    phone?: boolean;
    defaultView?: 'graph' | 'value' | 'both';
}

export const InstrumentationModule = (props: InstrumentationModuleProps) => {
    const { title, type, reading, phone, defaultView } = props;
    const [moduleVisualizationType, setModuleVisualizationType] = useState(defaultView || 'value');
    
    useEffect(() => {
        console.log(type)
     }, [type])
    
    return (
        <Paper
            elevation={2}
            sx={{ 
                padding: 1, 
                width: "100%", 
                height: "fit-content" 
            }}
        >
            <Stack spacing={1}>
                <InstrumentationModule.Header 
                    title={title} 
                    type={type}
                    setModuleVisualizationType={(type: string) => setModuleVisualizationType(type)}
                    moduleVisualizationType={moduleVisualizationType}
                />
                { moduleVisualizationType === 'graph' || moduleVisualizationType === 'both' ? <InstrumentationModule.Graph /> : null }
                { moduleVisualizationType === 'both' ? <Box sx={{ height: 10 }} /> : null }
                { moduleVisualizationType === 'value' || moduleVisualizationType === 'both' ? <InstrumentationModule.Value type={type} /> : null }
            </Stack>
        </Paper>
    )
}

InstrumentationModule.Header = (props: { 
    title: string, 
    type: InstrumentationType,
    setModuleVisualizationType: (type: string) => void,
    moduleVisualizationType: string
}) => {
    const { title, type, setModuleVisualizationType, moduleVisualizationType} = props;
 

    const typeColor = instrumentationModuleConfigMap[type].color;
    const typeLabel = instrumentationModuleConfigMap[type].label;
    // const 

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack
            direction={'row'} 
            justifyContent={'space-between'} 
            alignItems={'center'}
            padding={1}
            borderRadius={1}
            sx={{ backgroundColor: '#121212' }}
        >
            <Typography variant={'h6'}>{title}</Typography>
            <Stack direction={'row'}>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVert/>
                </IconButton>
                <Box
                    sx={{ 
                        backgroundColor: typeColor,
                        color: 'white',
                        borderRadius: 1,
                        padding: 1,
                        width: 40,
                        height: 40
                        
                    }}
                    alignContent={'center'}
                    justifyContent={'center'}
                >
                    <Typography 
                        margin={0} 
                        sx={{ fontWeight: "bold" }} 
                        textAlign={'center'}
                        color="inherit"
                    >
                        {typeLabel}
                    </Typography>
                </Box>
            </Stack>
            <InstrumentationModule.ConfigurationMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                setModuleVisualizationType={setModuleVisualizationType}
                moduleVisualizationType={moduleVisualizationType}
            />
        </Stack>
    )
}

type ConfigurationMenuProps = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    setModuleVisualizationType: (type: string) => void;
    moduleVisualizationType: string;
} 

InstrumentationModule.ConfigurationMenu = (props: ConfigurationMenuProps) => {
    const { anchorEl, open, handleClose, setModuleVisualizationType, moduleVisualizationType } = props;
    
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
            <MenuItem onClick={() => {
                setModuleVisualizationType('graph');
                handleClose();
            }}>
                <ListItemIcon>
                {(moduleVisualizationType === 'graph') ? <Check /> : null }
                </ListItemIcon>
                Graph
            </MenuItem>
            <MenuItem onClick={() => {
                setModuleVisualizationType('value');
                handleClose();
            }}>
                <ListItemIcon>
                    {(moduleVisualizationType === 'value') ? <Check /> : null }
                </ListItemIcon>
                Value
                </MenuItem>
            <MenuItem onClick={() => {
                setModuleVisualizationType('both');
                handleClose();
            }}>
                <ListItemIcon>
                {(moduleVisualizationType === 'both') ? <Check /> : null }
                </ListItemIcon>
                Graph and Value
            </MenuItem>
        </Menu>
    )
}

InstrumentationModule.Graph = observer(() => {
    const instrumenationStoreContext = useContext(InstrumentationStoreContext)
    const [packetCount, setPacketCount] = useState(0)
    const [data, setData] = useState<{ 
        packetNumber: number,
        reading: number
    }[]>([])
    useEffect(() => {
        instrumenationStoreContext.onMessage()
        setPacketCount((p) => p += 1)
        setData((prevData) => [...prevData, {
            packetNumber: packetCount,
            reading: instrumenationStoreContext.data
        }])
    }, [instrumenationStoreContext.data])

    return (
        <ResponsiveContainer 
            width='100%' 
            height={200}
        >
            <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <Line 
                    type="monotone" 
                    dataKey="reading" 
                    stroke={"#515356"}
                    strokeWidth={3} 
                    activeDot={{r: 5}}
                    isAnimationActive={false}
                />
                <XAxis dataKey={'packetNumber'} />
                <YAxis />
                <Brush 
                    height={15}
                    fill='#22272E'
                    stroke='#22272E'
                />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
})

InstrumentationModule.Value = (
    props: { type: InstrumentationType }
) => {
    const typeUnit = instrumentationModuleConfigMap[props.type].unit;
    return (
        <Box
            sx={{ 
                backgroundColor: '#121212',
                color: 'white',
                borderRadius: 1,
                padding: 1,
            }}
        >
            <Stack justifyContent={'space-between'} direction={'row'} marginX={1}>
                <Typography margin={0} sx={{ fontWeight: "bold" }}>{'—'}</Typography>
                <Typography margin={0} sx={{ fontWeight: "bold" }}>{typeUnit}</Typography>
            </Stack>
        </Box>
    )
}