import SpinnerGIF from "../assets/Spinner.gif";

const Spinner = () => {
  return (
    <>
      <img
      alt="spinner"
        src={SpinnerGIF}
        className="d-block m-auto"
        style={{ width: "200px" }}
      />
    </>
  );
};

export default Spinner;
