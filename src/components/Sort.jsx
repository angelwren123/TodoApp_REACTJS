import React from 'react'
import { useState } from 'react'
const Sort = (props) => {
  const sort = {
    by: '',
    value: 1,
  }
  const [stateSort, setStateSort] = useState(sort)  
  const onClick = (sortBy, sortValue) =>{
    // console.log(sortBy, sortValue)
    setStateSort({
      by:sortBy,
      value:sortValue,
    })
    props.onSort(sortBy, sortValue)
  }
  return (
    <>
      <div className="dropdown">
        <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
          Sắp xếp
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className={stateSort.by === 'name' && stateSort.value === 1 ? 'dropdown-item sort_selected' : 'dropdown-item'} href="#" onClick={()=>onClick('name',1)}>Tên: A-Z</a>
          <a className={stateSort.by === 'name' && stateSort.value === -1 ? 'dropdown-item sort_selected' : 'dropdown-item'} href="#" onClick={()=>onClick('name',-1)}>Tên: Z-A</a>
          <a className={stateSort.by === 'status' && stateSort.value === 1 ? 'dropdown-item sort_selected' : 'dropdown-item'} href="#" onClick={()=>onClick('status',1)}>Trạng thái: Chưa xong</a>
          <a className={stateSort.by === 'status' && stateSort.value === -1 ? 'dropdown-item sort_selected' : 'dropdown-item'} href="#" onClick={()=>onClick('status',-1)}>Trạng thái: Đã xong</a>

        </div>
      </div>
    </>
  )
}

export default Sort