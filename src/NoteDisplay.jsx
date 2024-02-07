/* eslint-disable react/prop-types */
import Markdown from 'marked-react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';

export default function NoteDisplay({ markdown, title, onEdit, onRemove, showEditButton = false }) {
  const maxTitleLength = 10; // Maximum length for the title
  const maxMarkdownLength = 50; // Maximum length for the markdown text

  const truncatedTitle = title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title;

  const truncatedMarkdown = markdown.length > maxMarkdownLength ? markdown.slice(0, maxMarkdownLength) + '...' : markdown;

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', p: 1, my: 1}} variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column', '& h3': { margin: 0, marginBottom: 1, color: 'info.main' }, '& > div': { marginTop: 1 } }}>

        <h3>{truncatedTitle}</h3>
        <Markdown>{truncatedMarkdown}</Markdown>
      </Box>
      <Box sx={{ display: 'flex',  justifyContent: 'space-between', alignItems: 'flex-start' }}>
      {showEditButton && <Tooltip title="Edit this note"><BorderColorIcon onClick={onEdit} sx={{ color: 'action.active', cursor: 'pointer', pr: 2 }} /></Tooltip>}
      {showEditButton && <Tooltip title="Delete this note"><DeleteForeverIcon onClick={onRemove} sx={{ color: 'error.main', cursor: 'pointer' }} /></Tooltip>}
      </Box>
    </Card>
  );
}
