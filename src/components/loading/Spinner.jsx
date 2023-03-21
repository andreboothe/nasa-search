const Spinner = () => {
  return (
    <div
      data-testid="spinner-loader"
      className="row justify-content-center align-items-center "
    >
      <div class="spinner-border text-success" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
