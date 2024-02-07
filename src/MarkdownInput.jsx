/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import { useState } from 'react';
import NoteDisplay from './NoteDisplay';

export default function MarkdownInput({ saveNote, selectedNote, onCancelEdit}) {
  // Инициализация состояний на основе selectedNote
  const [title, setTitle] = useState(selectedNote?.title || 'Title');
  const [markdown, setMarkdown] = useState(selectedNote?.markdown || '#### write your note here');

  function handleBtnClear() {
    setMarkdown('');
    setTitle('');
  }

  function handleBtnSave() {
    saveNote(title, markdown);
    setMarkdown('#### write your note here');
    setTitle('Title');
  }

  return (
    <>
    <Box component={'div'} sx={{ flexDirection: 'column', m: 3 }}>
    <NoteDisplay markdown={markdown} title={title} />
      <Card  sx={{ display: 'flex', flexDirection: 'column' }} variant="outlined">
        <FormControl  sx={{ m: 3 }} variant="outlined">
          <OutlinedInput sx={{ mb: 3 }} value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <TextField
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          multiline // Enable multiline
          rows={6} // Set the number of visible rows
        />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', m: 3 }}>
        <Button sx={{mr: 3}} variant="contained" onClick={handleBtnSave}>Save</Button>
        <Button sx={{mr: 3}} variant="outlined" onClick={handleBtnClear}>Clear</Button>
        <Button variant="text" onClick={onCancelEdit}>Close</Button>
        </Box>
      </Card>
    </Box>
    </>
  );
}
