import { useMutation,useQueryClient } from "@tanstack/react-query";
import customInstance from "./utils";
import { toast } from "react-toastify";

const SingleItem = ({ item }) => {

  const queryClient = useQueryClient();

  const {mutate: editTask} = useMutation({
    mutationFn: ({taskId, isDone}) => customInstance.patch(`/${taskId}`, {isDone}),
    onSuccess: () =>{
      toast.success("You edited the task"),
      queryClient.invalidateQueries("tasks")
    },
    onError: () =>{console.log(error)},
  });

  const {mutate: deletTask} = useMutation({
    mutationFn: ({taskId}) => customInstance.delete(`/${taskId}`),
    onSuccess: () =>{
      toast.success("You successfully deleted the task")
      queryClient.invalidateQueries("tasks")
    },
    onError: (error) =>{
      console.log(error)
    }
  });

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({taskId: item.id, isDone: !item.isDone})}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={() => deletTask({taskId: item.id})}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
