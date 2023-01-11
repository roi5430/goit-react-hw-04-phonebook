import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { NameContactsList } from './NameContactsList/NameContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const mekeContacts = localStorage.getItem('contacts');
    if (mekeContacts !== null) {
      const parse = JSON.parse(mekeContacts);
      return parse;
    }
    return [];
  });

  const searchContact = evt => setFilter(evt.currentTarget.value);

  const deleteContact = contactsId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactsId)
    );
  };

  const addContact = (name, number) => {
    const checkName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!checkName) {
      setContacts(prevContact => [
        { id: nanoid(), number, name },
        ...prevContact,
      ]);
    } else {
      window.alert(`${name} is already in contacts`);
    }
  };

  useEffect(() => {
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
