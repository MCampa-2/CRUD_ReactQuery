import { useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import customInstance from './utils';

const Items = () => {
 const {data, isLoading, isError} = useQuery({
  queryKey: ["tasks"],
  queryFn:  () => customInstance("/")
 });

 if(isLoading){
  return <p>Loading...</p>
 }

  return (
    <div className='items'>
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
