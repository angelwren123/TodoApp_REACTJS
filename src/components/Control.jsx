import React from 'react'
import Search from './Search'
import Sort from './Sort'

const Control = (props) => {
    return (
        <>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Search onSearch={props.onSearch} />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Sort onSort={props.onSort} />
            </div>
        </>
    )
}

export default Control