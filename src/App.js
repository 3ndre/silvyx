// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';


//wagmi
import {
  chain,
  WagmiConfig,
  createClient,
  configureChains,
} from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'


import { publicProvider } from 'wagmi/providers/public'


import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// ----------------------------------------------------------------------



const { chains, provider, webSocketProvider } = configureChains([chain.polygonMumbai], [
  alchemyProvider({ apiKey: process.env.ALCHEMY_KEY }),
  publicProvider(), //not to use in production
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
})




export default function App() {

  //localstorage clear 24hr

  var hours = 24;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('access_token');
  var parsed = JSON.parse(setupTime)

  if (setupTime !== null) {
    if(now-parsed.expiry > hours*60*60*1000) {
      localStorage.clear()
      window.location.reload()
  }
  }


  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <RtlLayout>
          <MotionLazyContainer>
            <ProgressBarStyle />
            <ScrollToTop />
            <WagmiConfig client={client}>
              <Router />
            </WagmiConfig>
          </MotionLazyContainer>
        </RtlLayout>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
