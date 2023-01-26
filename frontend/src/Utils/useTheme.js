import { createTheme } from '@mui/material';
import { orange, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[200],
    },
    secondary: {
      main: purple[200],
    },
  },
});
const useTheme = () => {
  return { theme };
};

export default useTheme;
