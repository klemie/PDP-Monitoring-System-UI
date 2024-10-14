import ReactFlow, { MarkerType, useEdgesState, useNodesState } from "reactflow";
import Add from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import { FeedSystemStoreContext } from "../../stores/feed-system/FeedSystemStore";
import { useContext, useState } from "react";
import { Box, Container, Paper, useTheme } from "@mui/material";
import TankNode from "./nodes/tank-node/TankNode";
import InstrumentationNode from "./nodes/instrumentation-node/InstrumentationNode";
import PAndIDValveNode from "./nodes/valve-node/ValveNode"

export const FeedSystem: React.FC = () => {
	const theme = useTheme();

    const feedSystemStore = useContext(FeedSystemStoreContext);
    const snapGrid = [5, 5]
	// useHotkeys("ctrl+s", () => onSave());
	// useHotkeys("ctrl+z", () => onRestore());

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [rfInstance, setRfInstance] = useState(null);

    const nodeTypes = {
        Valve: PAndIDValveNode,
        Tank: TankNode,
        Instrumentation: InstrumentationNode
    };

    const speedDialActions = [
        {
            icon: <Add />,
            name: 'Add Node',
            onClick : () => {
                console.log('Add Node clicked');
                
            },
            disabled: false
        },
        {
            icon: <SaveIcon />,
            name: 'Save P&ID',
            onClick : () => {
            },
            disabled: false
        },
        {
            icon: <RestoreIcon />,
            name: 'Restore P&ID',
            onClick: () => {
                
            },
            disabled: false
        },
        {
            icon: <InfoIcon />,
            name: 'P&ID Legend',
            onClick : () => {
                console.log('info clicked');
                // setLegendDrawer(legendDrawer => !legendDrawer);
                // setSpeedDialOpen(false);
                // setHelpDrawer(false);
                // setNodeBuilderDrawer(false);
            },
            disabled: false
        },
        {
            icon: <HelpIcon />,
            name: 'Help',
            onClick: () => {
                console.log('help clicked');
                // setHelpDrawer(helpDrawer => !helpDrawer);
                // setSpeedDialOpen(false);
                // setLegendDrawer(false);
                // setNodeBuilderDrawer(false);
            },
            disabled: false
        }
    ];
    
    return (
        <Box 
            component="main"
            display="flex"
            height="100%"
            width="100%"
        >
            <Box
				component="main"
				sx={{
					flexGrow: 1,
					marginLeft: feedSystemStore.drawers.helpDrawer || feedSystemStore.drawers.legendDrawer || feedSystemStore.drawers.nodeBuilderDrawer ? 42.5 : 0, // Adjust the margin based on the state of the drawer
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
				}}
			>
                <Paper
					component="div"
					sx={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 2,
						boxShadow: 'none',
						border: '1px solid #333',
						padding: 2
					}}
					elevation={2}
				>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        // onConnect={onConnect}
                        snapToGrid={true}
                        snapGrid={snapGrid}
                        fitView
                        attributionPosition="bottom-left"
                        onInit={setRfInstance}
                        defaultEdgeOptions={{
							type: 'smoothstep',
							deletable: true,
							animated: false,
							style: { 
								stroke: '#fff', 
								strokeWidth: 1.5 
							},
							markerStart: {
								type: MarkerType.ArrowClosed,
								color: '#fff',
								strokeWidth: 1.5,
							},
                        }}
                    >
                        
                    </ReactFlow>
                </Paper>
            </Box>
        </Box>
    )

}