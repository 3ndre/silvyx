// @mui
import { styled } from '@mui/material/styles';


// components
import Page from '../components/Page';

// sections
import HomeBanner from "./home/HomeBanner";
import HomeBanner2 from "./home/HomeBanner2";




// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Silvyx | Bankless Payment Network">
      <RootStyle>
      
        <ContentStyle>

          <HomeBanner />

          <HomeBanner2 />

          
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
