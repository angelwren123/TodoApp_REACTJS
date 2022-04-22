import React from 'react'

const TaskItem = (props) => {
    const onUpdateStatus = (id) =>{
        var resID = props.tasks.filter((task,index) => {
            return task.id===id
        });
        // console.log(resID[0].id)
        props.onUpdateStatus(resID[0].id)
    }
    const onDelete = (id) =>{
        // console.log(id)
        props.onDelete(id)
    }
    const onUpdate = (data) =>{
        props.onUpdate(data)
    }
    // console.log(props.tasks)
    var elmTask = props.tasks.map((task,index)=>{
        return <tr key={index}>
            <td>{index+1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span className={task.status ? 'label_success' : 'label_danger'}
                onClick={()=>onUpdateStatus(task.id)}
                >
                    {task.status ? 'Chưa xong' : 'Đã xong'}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-dark"
                onClick={()=>onUpdate(task)}>
                    <span className="fa fa-pencil mr-2"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger"
                onClick={()=>onDelete(task.id)}>
                    <span className="fa fa-trash mr-2"></span>Xóa
                </button>
            </td>
        </tr>
        
    })
    return (
        <>
            {elmTask}
        </>
    )
}

export default TaskItem