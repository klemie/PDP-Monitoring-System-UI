import { Grid2, Stack } from "@mui/material"
import { InstrumentationModule } from "../../../instrumentation/instrumentation-module/InstrumentationModule"
import { observer } from "mobx-react-lite"
import SettingsStore from "../../../../stores/SettingStore"

export const InstrumentationPanel = observer(() => {
    return (
        <Grid2 
            container 
            spacing={2} 
            width={'100%'}
            sx={{ 
                overflowY: 'scroll', 
                paddingBottom: 20
            }}
            height={'80vh'}
        >
            <Grid2 size={{ xs: 9 }}>
                <Stack spacing={2}>
                    {
                        SettingsStore.instrumentationConfig.map((instrument, index) => {
                            if (instrument.display && instrument.size === 9) {
                                return <InstrumentationModule 
                                    key={index}
                                    title={instrument.label}
                                    type={instrument.type}
                                    defaultView={instrument.visualizationType}
                                />
                            }
                        })
                    }                
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 3 }} gap={1}>
                <Stack spacing={2}>
                    {
                        SettingsStore.instrumentationConfig.map((instrument, index) => {
                            if (instrument.display && instrument.size === 3) {
                                return <InstrumentationModule 
                                    key={index}
                                    title={instrument.label}
                                    type={instrument.type}
                                    defaultView={instrument.visualizationType}
                                />
                            }
                        })
                    }     
                </Stack>
            </Grid2>
        </Grid2>
    )
})