import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export const ContactItem = ({ item: { name, number, id }, onDelete }) => {
  return (
    <div className={css.item__content}>
      {name}: {number}
      <button
        className={css.contacts__btn}
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func,
};
