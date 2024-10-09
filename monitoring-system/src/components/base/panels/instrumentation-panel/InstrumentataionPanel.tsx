import { Grid2, Stack } from "@mui/material"
import { InstrumentationModule } from "../../../instrumentation/instrumentation-module/InstrumentationModule"
import { DEFAULT_INSTRUMENTATION_CONFIG } from "../../../../lib/configs/configs"
import { observer } from "mobx-react-lite"
import { SettingStoreContext } from "../../../../stores/SettingStore"
import { useContext } from "react"

export const InstrumentationPanel = observer(() => {
    const store = useContext(SettingStoreContext);
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
                        store.instrumentationConfig.map((instrument, index) => {
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
                        store.instrumentationConfig.map((instrument, index) => {
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