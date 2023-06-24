import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api';
import { useNavigate, useParams} from 'react-router-dom';


export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

 const navigate = useNavigate();

    const params = useParams()
    console.log(params)

  /* Create or delete */
  const onSubmit = handleSubmit(async (data) => {
    if (params.id){
        await updateTask(params.id,data)
    } else {
        await createTask(data);
    }

    navigate("/tasks")
  });


  /* Edit a task */
  useEffect(()=>{
        async function loadTask(){
            if (params.id){
                const res = await getTask(params.id)
                setValue('tittle', res.data.tittle)
                setValue('description', res.data.description)
                //console.log(res)
        }
    }
    loadTask()
  },[])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="tittle"
          {...register('tittle', { required: true })}
        />
        {errors.tittle && <span>Title is required.</span>}

        <textarea
          rows="3"
          placeholder="Description"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>Description is required.</span>}

        <button>Save</button>
      </form>
    {/* Delete a task */}
    {params.id  &&
          <button onClick={async ()=> {
            const accepted = window.confirm("Are you sure")

            if (accepted){
                await deleteTask(params.id)
                navigate("/tasks")
            }
          }}>
          Delete
        </button>}

    </div>
  );
}
