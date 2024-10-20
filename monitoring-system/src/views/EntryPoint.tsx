import { AppBar, Box, Button, IconButton } from '@mui/material';
import { PageContainer, PageContainerToolbar } from '@toolpad/core';
import { Chat, Download, Settings } from '@mui/icons-material';
import ControlsPanelDock from '../components/base/panels/controls-panel/ControlsPanelDock';
import { InstrumentationPanel } from '../components/base/panels/instrumentation-panel/InstrumentataionPanel';
import { SettingPanel } from '../components/base/panels/settings-panel/settings-panel';
import { observer } from 'mobx-react-lite';
import SettingStore from '../stores/SettingStore';
import { FeedSystem } from '../components/feed-system/FeedSystem';
import { ReactFlowProvider } from 'reactflow';



export const EntryPoint = observer(() => {
    

    return (
        <PageContainer 
            slots={{ toolbar: EntryPointToolBar }}
            sx={{
                maxWidth: "100%",
                minWidth: "100%",
                maxHeight: "100vh",
                height: "100vh",
                overflowY: 'hidden',
                paddingX: 10
            }}
        >
            { SettingStore.currentView === 'SETTINGS' && <SettingPanel /> }
            { SettingStore.currentView === 'DASHBOARD' && SettingStore.uiConfiguration.instrumentation.graphs && <InstrumentationPanel /> }
            { SettingStore.currentView === 'DASHBOARD' && SettingStore.uiConfiguration.feedSystem.show && <Box sx={{ height: '60vh' }}>
                <ReactFlowProvider>
                <FeedSystem />
            </ReactFlowProvider>
            </Box> }
            { SettingStore.currentView === 'DASHBOARD' && SettingStore.uiConfiguration.controls.dock && <AppBar 
                position="fixed"
                color="primary" 
                sx={{ 
                    top: 'auto', 
                    bottom: 0,
                }}
            >
                <ControlsPanelDock />
            </AppBar> }
                
        </PageContainer>
    )
});

const EntryPointToolBar = observer(() => {

    return (
        <PageContainerToolbar>
            <Button startIcon={<Download />} color='inherit' disabled>
                export
            </Button>
            <Button startIcon={<Chat />} color='inherit' disabled>
                Logs
            </Button>
            <IconButton
                id="basic-button"
                onClick={() => {
                    SettingStore.updateView('SETTINGS')
                }}
            >
                <Settings  />
            </IconButton>
        </PageContainerToolbar>
    )
})
