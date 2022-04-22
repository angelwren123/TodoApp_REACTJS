import React from 'react'
import { useState, useEffect } from 'react'
const TaskForm = (props) => {
    // console.log(props.onCloseForm)
    // console.log(props.taskEditing);
    const dataForm = {
        name: '',
        status: true,
    }
    const [stateInputForm, setStateInputForm] = useState(dataForm)
    useEffect(() => {
        if(props.taskEditing){
            setStateInputForm({
                id: props.taskEditing.id,
                name: props.taskEditing.name,
                status: props.taskEditing.status,
            })
        }
    }, [])
    useEffect(()=>{
        if(props && props.taskEditing){
            setStateInputForm({
                id: props.taskEditing.id,
                name: props.taskEditing.name,
                status: props.taskEditing.status,
            })
        }else if(!props.taskEditing){
            setStateInputForm({
                name: '',
                status: true,
            })
        }
    },[props])
    
    
    const onCloseForm = () => {
        props.onCloseForm(false)
    }
    const onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        if(name === 'status'){
            value = event.target.value === 'true' ? true : false
        }
        console.log(name + ': ' + value)
        setStateInputForm({
            ...stateInputForm,
            [name]: value
        })
    }
    const onSubmit = (event) => {
        // console.log(stateInputForm);
        event.preventDefault();
        props.valueForm(stateInputForm);
        onClear();
        // onCloseForm();
        
    }
    const onClear = () =>{
        setStateInputForm({
            name:'',
            status:true,
        })
    }
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                    {stateInputForm.id === undefined ? 'Thêm Công Việc ' : 'Cập Nhật Công Việc '}
                    <span
                        className="fa fa-times-circle text-right close_icon"
                        onClick={() => onCloseForm()}
                    />
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={(event) => onSubmit(event)}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            value={stateInputForm.name}
                            onChange={(event) => onChange(event)} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control"
                        name="status"
                        value={stateInputForm.status}
                        onChange={(event) => onChange(event)}
                    >
                        <option value={true}>Chưa xong</option>
                        <option value={false}>Đã xong</option>
                    </select>
                    <br />
                    <div className="text-center">
                        <button type="submit" className="btn btn-dark">
                            <span className="fa fa-plus mr-2" />Lưu Lại
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-outline-dark"
                        onClick={()=>onClear()}>
                            <span className="fa fa-close mr-2" />Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm