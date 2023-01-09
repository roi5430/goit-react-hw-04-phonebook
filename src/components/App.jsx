import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { NameContactsList } from './NameContactsList/NameContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const searchContact = evt => setFilter(evt.currentTarget.value);

  const deleteContact = contactsId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactsId)
    );
  };

  const addContact = (name, number) => {
    const checkName = contacts
      .map(contact => contact.name.toLowerCase())
      .some(contact => contact === name.toLowerCase());
    if (!checkName) {
      setContacts(prevContact => [{ id: nanoid(), number, name }, ...contacts]);
    } else {
      window.alert(`${name} is already in contacts`);
    }
  };

  useEffect(() => {
    const mekeContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (mekeContacts !== null) {
      setContacts(contacts);
    }

    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <section>
      <h1>Phonebook</h1>
      <PhonebookForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={searchContact} value={filter} />
      <NameContactsList
        filter={filter}
        items={contacts}
        onDelete={deleteContact}
      />
    </section>
  );
};
