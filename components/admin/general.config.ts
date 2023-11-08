export const customStyles = {
  option: (provided: any, state: any) => ({
    backgroundColor: 'black',
    ...provided,
    padding: 5,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    width: "100%",
    height: "100%",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
  }),
  multiValue: () => ({
    backgroundColor: 'rgb(196 139 96 / 0.3)',
    display: "flex",
    borderRadius: '5px',
  })
};
