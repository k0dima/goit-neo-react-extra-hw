import { useState } from "react";
import toast from "react-hot-toast";
import { List, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleContacts } from "../../redux/filters/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import { Contact } from "../Contact/Contact";

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (contactId) => {
    setDeletingId(contactId);

    try {
      await dispatch(deleteContact(contactId)).unwrap();
      toast.success("Contact deleted.");
    } catch (error) {
      toast.error(String(error));
    } finally {
      setDeletingId(null);
    }
  };

  if (contacts.length === 0) {
    return (
      <Typography color="text.secondary">
        No contacts match your search.
      </Typography>
    );
  }

  return (
    <Paper variant="outlined">
      <List disablePadding aria-label="Contacts">
        {contacts.map((contact) => (
          <Contact
            contact={contact}
            isDeleting={deletingId === contact.id}
            key={contact.id}
            onDelete={handleDelete}
          />
        ))}
      </List>
    </Paper>
  );
};
