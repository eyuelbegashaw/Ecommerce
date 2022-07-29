import {useEffect} from "react";

const Alert = ({type, text, setAlert}) => {
  useEffect(() => {
    if (setAlert) {
      setTimeout(() => {
        setAlert({text: "", type: ""});
      }, 2500);
    }
  }, [type, type, setAlert]);

  return <div className={`container alert alert-${type}`}>{text} </div>;
};
export default Alert;
