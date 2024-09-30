import { Container, Grid2, Stack } from "@mui/material"
import { InstrumentationModule } from "../../../instrumentation/instrumentation-module/InstrumentationModule"


export const InstrumentationPanel = () => {
    return (
        <Container 
            sx={{
                width: "100%",
                height: "80vh",
                overflowY: 'scroll',
            }}
        >
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 9 }}>
                    <Stack spacing={2}>
                        <InstrumentationModule title='Test' />
                        <InstrumentationModule title='Test' />
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 3 }} gap={1}>
                    <Stack spacing={2}>
                        <InstrumentationModule title='Test' />
                        <InstrumentationModule title='Test' />
                        <InstrumentationModule title='Test' />
                        <InstrumentationModule title='Test' />
                    </Stack>
                </Grid2>
            </Grid2>
        </Container>
    )
}