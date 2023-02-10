import PropTypes from 'prop-types';
import { Button } from './LoadMore.styled';

export function LoadMore({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};