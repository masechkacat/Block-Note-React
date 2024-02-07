/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import NoteDisplay from './NoteDisplay';

const NotesList = ({ notes, setSelectedNote, setIsEditing }) => {
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsEditing(false); // Выход из режима редактирования
  };

  return (
    <Box sx={{ overflowY: 'auto' }}>
      {notes.map((note) => (
        <Box key={note.id} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }}} onClick={() => handleNoteClick(note)}>
          <NoteDisplay title={note.title} markdown={note.markdown} />
        </Box>
      ))}
    </Box>
  );
};

export default NotesList;

