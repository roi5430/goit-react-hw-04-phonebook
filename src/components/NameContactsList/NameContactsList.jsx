import css from './NameContactsList.module.css';
import PropTypes from 'prop-types';

import { ContactItem } from 'components/ContactItem/ContactItem';

export const NameContactsList = ({ filter, items, onDelete }) => {
  const normalizedFilter = filter.toLocaleLowerCase();
  const visibleContacts = items.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizedFilter)
  );
  return (
    <div className={css.contacts}>
      <ul className={css.contacts__list}>
        {visibleContacts.map(item => {
          const { id } = item;
          return (
            <li key={id} id={id}>
              <ContactItem onDelete={onDelete} item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

NameContactsList.propTypes = {
  filter: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func,
};
