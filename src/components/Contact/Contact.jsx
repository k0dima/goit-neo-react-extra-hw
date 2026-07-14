import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import { IconButton, ListItem, ListItemText, Tooltip } from '@mui/material'

export const Contact = ({ contact, isDeleting, onDelete }) => (
  <ListItem
    divider
    secondaryAction={
      <Tooltip title="Delete contact">
        <span>
          <IconButton
            aria-label={`Delete ${contact.name}`}
            color="error"
            disabled={isDeleting}
            onClick={() => onDelete(contact.id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </span>
      </Tooltip>
    }
  >
    <ListItemText primary={contact.name} secondary={contact.number} />
  </ListItem>
)
