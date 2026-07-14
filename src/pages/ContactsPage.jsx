import { useEffect } from "react";
import { Alert, Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { ContactForm } from "../components/ContactForm/ContactForm";
import { ContactList } from "../components/ContactList/ContactList";
import { Loader } from "../components/Loader/Loader";
import { SearchBox } from "../components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import {
  selectContactsError,
  selectContactsLoading,
} from "../redux/contacts/selectors";

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography component="h1" variant="h4">
          Contacts
        </Typography>
        <Typography color="text.secondary">
          Add, find, and remove contacts from your phonebook.
        </Typography>
      </Box>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography component="h2" gutterBottom variant="h6">
          Add a contact
        </Typography>
        <ContactForm />
      </Paper>
      <Divider />
      <Stack spacing={2}>
        <Typography component="h2" variant="h6">
          Find contacts
        </Typography>
        <SearchBox />
        {isLoading ? (
          <Loader label="Loading contacts…" />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <ContactList />
        )}
      </Stack>
    </Stack>
  );
};
