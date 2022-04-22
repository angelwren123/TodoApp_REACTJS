import React, { useState } from 'react'

const Search = (props) => {
    const keyword = {
        valueKeyword:''
    }
    const [keyWord, setKeyWord] = useState(keyword)
    const  onChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setKeyWord({
            ...keyWord,
            [name]:value
        })
    }
    const onSearch = () =>{
        // console.log(keyWord)
        props.onSearch(keyWord)
    }
    return (
        <div className="input-group">
            <input type="text"
              className="form-control"
              placeholder="Nhập từ khóa..."
              name='valueKeyword'
              value={keyWord.valueKeyword}
              onChange={onChange}
             />
            <span className="input-group-btn">
                <button className="btn btn-dark"
                 type="button"
                 onClick={onSearch} >
                    <span className="fa fa-search mr-2"></span>Tìm
                </button>
            </span>
        </div>
    )
}

export default Search