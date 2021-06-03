import { useState } from 'react';

const useForm = (action) => {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    action(values);
  };

  const handleChange = e => {
    console.log([e.target.name], e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [
    handleSubmit,
    handleChange,
    values
  ]
}

export default useForm;
