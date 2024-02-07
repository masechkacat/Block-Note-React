import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const WelcomePage = () => {
  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center', fontFamily: 'Monospace' }}>
        <h1 style={{ display: 'block', alignSelf: 'center' }}>Welcome</h1>
        <FilePresentIcon style={{ fontSize: '5rem', alignSelf: 'center' }} />
        <p style={{ padding: '0 21%' }}>I&apos;m glad you&apos;re here. This is a simple note-taking app. Here you can create, edit, and delete notes with markdown. To get started, click the &quot;Add New Note&quot; button on the left.</p>
      </Box>
    </Card>
  );
};

export default WelcomePage;
