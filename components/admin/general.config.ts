export const customStyles = {
  option: (provided: any, state: any) => ({
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
};
