import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customInstance from './utils';
import {toast} from "react-toastify";

const Form = () => {
  const [newItemName, setNewItemName] = useState('');
  const queryClient = useQueryClient();

  const {mutate: createTask} = useMutation({
    mutationFn: (newitem) => customInstance.post("/", {title: newitem}),
    onSuccess: () =>{
      toast.success("New task added!");
      queryClient.invalidateQueries("tasks");
      setNewItemName("");
    },
    onError: (error) =>{
      toast.error(error.response.data.msg);
    }
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>Todo App</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn'>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
