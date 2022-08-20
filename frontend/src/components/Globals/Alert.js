import {useEffect} from "react";

const Alert = ({type, text, setAlert}) => {
  useEffect(() => {
    if (setAlert) {
      setTimeout(() => {
        setAlert({text: "", type: ""});
      }, 2500);
    }
  }, [type, type, setAlert]);

  return <div className={`alert alert-${type} p-1`}>{text} </div>;
};
export default Alert;
