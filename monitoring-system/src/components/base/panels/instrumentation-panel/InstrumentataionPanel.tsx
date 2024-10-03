import { Grid2, Stack } from "@mui/material"
import { InstrumentationModule } from "../../../instrumentation/instrumentation-module/InstrumentationModule"
import { DEFAULT_INSTRUMENTATION_CONFIG } from "../../../../lib/configs/configs"

export const InstrumentationPanel = () => {
    return (
        <Grid2 
            container 
            spacing={2} 
            width={'100%'}
            sx={{ overflowY: 'scroll' }}
            height={'90vh'}
        >
            <Grid2 size={{ xs: 9 }}>
                <Stack spacing={2}>
                    {
                        DEFAULT_INSTRUMENTATION_CONFIG.map((instrument, index) => {
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
                        DEFAULT_INSTRUMENTATION_CONFIG.map((instrument, index) => {
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
}