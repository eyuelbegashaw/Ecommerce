const Spinner = () => {
  return (
    <div className="d-flex justify-content-center my-2">
      <div className="spinner-border" style={{width: 40, height: 40}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
