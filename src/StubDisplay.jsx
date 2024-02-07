import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const StubDisplay = () => {
  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', fontFamily: 'Monospace', p:5}}>
        <h1 style={{ display: 'block', alignSelf: 'center' }}>Select a note or add a new one.</h1>
        <AdsClickIcon style={{ display: 'block', alignSelf: 'center', fontSize: '5rem', color: 'primary.main' }} />
      </Box>
    </Card>
  );
};

export default StubDisplay;
