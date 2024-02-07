import { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NotesList from './NoteList'; // Импортируем новый компонент списка заметок
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WelcomePage from './WelcomePage'; // Импортируем новый компонент приветственного сообщения
import NoteDisplay from './NoteDisplay'; // Импортируем новый компонент отображения заметки
import StubDisplay from './StubDisplay';
import SuccessAlert from './SuccesAlert';
import AlertDialog from './DialogAlert';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // Добавим состояние для отслеживания выбранной заметки
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Состояние для контроля отображения алерта
  const [openDialog, setOpenDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || []; // Получаем заметки из localStorage
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes)); // Сохраняем заметки в localStorage
  }, [notes]);

  const handleOpenDialog = (noteId) => {
    setNoteToDelete(noteId);
    setOpenDialog(true);
  };

  const handleDeleteNote = (noteId) => {
    // Фильтруем notes, оставляя только те, чьи ID не совпадают с удаляемым
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    setOpenDialog(false); // Закрываем диалог после удаления
    setNoteToDelete(null); // Сбрасываем ID удаляемой заметки
    // Если удаляемая заметка сейчас выбрана, сбрасываем выбранную заметку
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
    }
  };

  const saveNote = (title, markdown) => {
    if (selectedNote && selectedNote.id) {
      // Обновление существующей заметки
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id ? { ...note, title, markdown } : note
      );
      setNotes(updatedNotes);
    } else {
      // Добавление новой заметки
      const newNote = { id: Date.now(), title, markdown };
      setNotes([...notes, newNote]);
    }
    setIsEditing(false);
    setSelectedNote(null); // Сброс текущей заметки
    setShowAlert(true); // Показываем алерт
    setTimeout(() => setShowAlert(false), 3000); // Автоматически скрываем алерт через 3 секунды
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedNote(null); // Сброс выбранной заметки для выхода в "чистое" состояние
  };

  const handleEditNote = () => {
    setIsEditing(true); // Включаем режим редактирования
  };

  const handleAddNoteClick = () => {
    setSelectedNote({ id: null, title: '', markdown: '' }); // Подготавливаем пустую заметку
    setIsEditing(true); // Включаем режим редактирования
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 3fr', // Update the gridTemplateColumns property
          bgcolor: 'text.disabled',
          boxShadow: 1,
          borderRadius: 1,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            p: 2,
            borderRight: 3,
            borderColor: 'primary.main',
          }}
        >
          <Button onClick={handleAddNoteClick} variant="contained" color="primary" disabled={isEditing}>
            Add New Note
          </Button>
          <NotesList notes={notes} setSelectedNote={setSelectedNote} setIsEditing={setIsEditing} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          {showAlert && <SuccessAlert message="Your note has successfully been saved!" severity="info" />}{' '}
          {isEditing ? (
            <MarkdownInput saveNote={saveNote} selectedNote={selectedNote} onCancelEdit={handleCancelEdit} />
          ) : notes.length === 0 ? (
            <WelcomePage /> // Отображаем приветственное сообщение по умолчанию, если нет заметок
          ) : (
            // Если есть выбранная заметка, показываем ее; иначе показываем сообщение о выборе заметки
            selectedNote ? (
              <NoteDisplay
                markdown={selectedNote.markdown}
                title={selectedNote.title}
                onEdit={handleEditNote}
                showEditButton={true} // Теперь кнопка "Edit" будет отображаться
                onRemove={() => handleOpenDialog(selectedNote.id)} // Передаем функцию удаления в компонент NoteDisplay
              />
            ) : (
              <StubDisplay />
            )
          )}
          <AlertDialog open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={() => handleDeleteNote(noteToDelete)} />
        </Box>
      </Box>
    </>
  );
}

