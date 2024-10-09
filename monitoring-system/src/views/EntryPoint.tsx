import { AppBar, Button, IconButton, Menu, MenuItem, Select } from '@mui/material';
import { PageContainer, PageContainerToolbar } from '@toolpad/core';
import { Chat, Download, Settings } from '@mui/icons-material';
import ControlsPanelDock from '../components/base/panels/controls-panel/ControlsPanelDock';
import { useContext } from 'react';
import { InstrumentationPanel } from '../components/base/panels/instrumentation-panel/InstrumentataionPanel';
import { SettingPanel } from '../components/base/panels/settings-panel/settings-panel';
import { SettingStoreContext } from '../stores/SettingStore';
import { useDemoRouter } from '@toolpad/core/internals';
import { SegmentKeys } from '../stores/BaseStore';
import { observer } from 'mobx-react-lite';



export const EntryPoint = observer(() => {
    const SettingStore = useContext(SettingStoreContext);

    return (
        <PageContainer 
            slots={{ toolbar: EntryPointToolBar }}
            sx={{
                maxWidth: "100%",
                minWidth: "100%",
                maxHeight: "100vh",
                overflowY: 'hidden',
                paddingX: 10
            }}
        >
            <SettingStoreContext.Provider value={SettingStore}>
                {SettingStore.currentView === 'SETTINGS' && <SettingPanel />}
                { SettingStore.currentView === 'DASHBOARD' && SettingStore.uiConfiguration.instrumentation.graphs && <InstrumentationPanel /> }
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
                
            </SettingStoreContext.Provider>
        </PageContainer>
    )
});

const EntryPointToolBar = observer(() => {

    const SettingStore = useContext(SettingStoreContext);
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
