import { useMemo } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { getDesignTokens } from './theme'
import { EntryPoint } from '../views/EntryPoint';
import { AppProvider } from '@toolpad/core';
import { useDemoRouter } from '@toolpad/core/internals';
import { SegmentKeys } from '../stores/BaseStore';

export type breadcrumbs = {
  segment: string;
  title: string;
  children?: {
    segment: string;
    title: string;
  }[];
} 

const nav:  breadcrumbs[] = [
  { 
    segment: SegmentKeys.DASHBOARD, 
    title: 'Dashboard', 
    children: [
      { segment: SegmentKeys.INSTRUMENTATION_ONLY, title: 'Instrumentation' },
      { segment: SegmentKeys.CONTROLS_ONLY, title: 'Controls' }
    ] },
  { segment: SegmentKeys.SETTINGS, title: 'Settings' },
  { segment: SegmentKeys.REPLAY, title: 'Replay' }
]

function App() {
  const mode = 'dark';
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const router = useDemoRouter(`/${SegmentKeys.DASHBOARD}`);

  return (
    <AppProvider navigation={nav} router={router}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EntryPoint />
      </ThemeProvider>
    </AppProvider>
  )
}

export default App