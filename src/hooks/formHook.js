import { useState } from 'react';

const useForm = (action) => {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    action(values);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [
    handleSubmit,
    handleChange,
    values
  ]
}

export default useForm;
