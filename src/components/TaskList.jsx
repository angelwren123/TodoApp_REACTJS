import React from 'react'
import TaskItem from './TaskItem'
import { useState } from 'react';
const TaskList = (props) => {
    // console.log(props.stateTasks.tasks)
    var { tasks } = props.stateTasks;
    // console.log(tasks)
    const filter = {
        filterStatusValue: -1,
        filterNameValue: '',
    }
    const [stateFilter, setStateFilter] = useState(filter);// Tất cả: -1, Kích hoạt: 0, Ẩn: 1

    const onFilter = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        // console.log(name +': '+value)
        props.onFilter(
            name === 'filterNameValue' ? value : stateFilter.filterNameValue,
            name === 'filterStatusValue' ? value : stateFilter.filterStatusValue
        )
        setStateFilter({
            ...stateFilter,
            [name]: value
        })
    }

    return (
        <table className="table table-bordered table-hover mt-10">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text"
                            className="form-control"
                            name='filterNameValue'
                            value={stateFilter.filterNameValue}
                            onChange={(event) => onFilter(event)} />
                    </td>
                    <td>
                        <select className="form-control"
                            name='filterStatusValue'
                            value={stateFilter.filterStatusValue}
                            onChange={(event) => onFilter(event)}>
                            <option value="-1">Tất Cả</option>
                            <option value="0">Chưa xong</option>
                            <option value="1">Đã xong</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <TaskItem
                    tasks={tasks}
                    onUpdateStatus={props.onUpdateStatus}
                    onDelete={props.onDelete}
                    onUpdate={props.onUpdate} />
            </tbody>
        </table>
    )
}

export default TaskList