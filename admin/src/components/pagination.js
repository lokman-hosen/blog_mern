import React from "react";

function Pagination({totalRecord, paginate, currentPage}){
        let pageNumbers =[];
        //if total record 24 then made page 3
        let totalPageNumber = Number.isInteger(totalRecord/10) ? totalRecord/10 : totalRecord/10 +1;
        // if page is 3.4 then made this 3 for lst page
        //setLastPage(Number.isInteger(totalPageNumber) ? totalPageNumber : totalPageNumber.toString().split(".")[0])
        let lastPageNumber = Number.isInteger(totalPageNumber) ? totalPageNumber : totalPageNumber.toString().split(".")[0];
        // create page number array to generate pagination
        for (let i = 1; i <= totalPageNumber; i++) {
            pageNumbers.push(i);
        }
    return(
        <ul className="pagination pagination-sm m-0 float-right">
            <li className="page-item"><a className="page-link" onClick={()=> paginate(1)}>«</a></li>
            {
                pageNumbers.map((page) =>
                    <li className={`page-item ${page == currentPage ? 'active' : ''}`} key={page}>
                        <a className="page-link active" onClick={()=> paginate(page)}>{page}</a>
                    </li>
                )
            }
            <li className="page-item"><a className="page-link" onClick={()=> paginate(lastPageNumber)}>»</a></li>
        </ul>
    )
}

export default Pagination