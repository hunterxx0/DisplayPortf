import LoadingSpinner from './LoadingSpinner';
import ModalOverlay from './ModalOverlay';

const LoadingWithModal = () => {
  return (
    <ModalOverlay>
      <LoadingSpinner />
    </ModalOverlay>
  );
};

export default LoadingWithModal;
