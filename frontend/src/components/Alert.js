const Alert = ({text, type}) => {
  return <div className={`container alert alert-${type}`}>{text} </div>;
};
export default Alert;
