import { useState } from 'react';

const WithToggle = (Component) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => setIsVisible((prev) => !prev);

  return (props) => (
    <Component {...props} toggle={toggle} isVisible={isVisible} />
  );
};
// const useWithToggle = (Component) => WithToggle(Component)

export default WithToggle;
