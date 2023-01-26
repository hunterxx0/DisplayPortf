import { TextField } from '@mui/material';
import { Box } from '@mui/system';

const Description = ({ product, setProduct }) => {
  return (
    <div className="mb-10 flex min-w-[50%] flex-col-reverse  gap-10 bg-orange-200 py-8 px-12 font-sans shadow-sm shadow-gray-400 md:flex-row lg:p-0">
      <div className="p-2">
        <div className="flex flex-col items-center gap-y-4">
          <h1
            className="text-md self-start p-2 font-bold uppercase tracking-wide
        after:right-0 after:my-0 after:block after:w-[6rem] after:border-b-4 after:border-black after:pt-1 sm:text-2xl"
          >
            Description
          </h1>
          <Box
            sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: '38ch',
                padding: '1rem .5rem',
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              className=" w-full text-justify font-cairo text-sm leading-loose tracking-widest  text-black lg:text-lg"
              placeholder="product description..."
              fullWidth
              multiline
              value={product.descriptions}
              variant="standard"
              onChange={(e) => {
                e.preventDefault();
                setProduct((prev) => ({
                  ...prev,
                  descriptions: e.target.value,
                }));
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Description;
