import React from 'react';

const Pagination = ({itemPerPage, totalItems, paginate}) => {
    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(totalItems/itemPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination" style={{float: 'right', marginRight: '150px'}}>
                {pageNumbers.map(pgNum => (
                    <li key={pgNum} className="page-item">
                        <a onClick= {() => paginate(pgNum)}  href='!#' className="page-link">
                            {pgNum}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination 