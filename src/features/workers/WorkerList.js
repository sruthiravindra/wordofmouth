import WorkerCard from "./WorkerCard";
import { selectWorkers } from "../users/usersSlice";
import { useSelector } from "react-redux";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useState } from "react";

const WorkerList = () => {
    const workers = useSelector(selectWorkers);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const pageCount = Math.ceil(workers.length / pageSize);

    const changePage = (e, idx) => {
        e.preventDefault();
        setCurrentPage(idx);
        const searchElement = document.getElementById('search-bar');
        searchElement.tabIndex = -1;
        searchElement.focus();
    }

    return(
        <>
            {
                workers.slice(
                    currentPage * pageSize,
                    (currentPage + 1) * pageSize
                )
                .map((worker) => {
                    return (
                        <WorkerCard worker={worker} key={worker.id}/>
                    )
                })
            }
            <div className='d-flex justify-content-center my-4'>
                <Pagination>
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink first href='#'/>
                    </PaginationItem>
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink 
                            previous 
                            href='#'
                            onClick={e => {
                                changePage(e, currentPage - 1);
                            }}    
                        />
                    </PaginationItem>
                    {
                        [...Array(pageCount)].map((page, idx) => (
                            <PaginationItem active={idx === currentPage} key={idx}>
                                <PaginationLink onClick={e => changePage(e, idx)} href='#'>
                                    {idx + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                
                    <PaginationItem disabled={currentPage >= (pageCount - 1)}> 
                        <PaginationLink 
                            next 
                            href='#'
                            onClick={e => changePage(e, currentPage + 1)}    
                        />
                    </PaginationItem>
                    <PaginationItem disabled={currentPage >= (pageCount -1)}>
                        <PaginationLink
                            last
                            href='#'
                            onClick={e => changePage(e, (pageCount - 1))}
                        />
                    </PaginationItem>
                </Pagination>
            </div>
        </>
    )
};

export default WorkerList;