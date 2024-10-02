import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({pages}) => {

    const {totalPage, currentPage, next, prev, hasNext, hasPrev } = pages;
    const {pathname} = useLocation();
    const [searchParams] = useSearchParams();   
    const formatUrl =(page) => searchParams.get("name")?`${pathname}?name=${searchParams.get("name")}&page=${page}` : `${pathname}?page=${page}`;

    const renderPagesHtml = (delta = 2) =>{
        const pagesHtml = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for (let i = 1; i<=totalPage;i++ ){
            if(i===1 || i === totalPage || i === currentPage || (i>=left && i<= right)){
                pagesHtml.push(i);
            }
            else if(
                i === left - 1 ||
                i === right + 1

            ){
                pagesHtml.push("...");
            }
        }
        return pagesHtml;
    }
    return (
        <ul className="pagination">
            { 
                hasPrev && <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
            }

            {
                renderPagesHtml().map((value)=>(
                    <li className={`page-item ${currentPage===value && "active"}`}>
                        {
                            value==="..."       
                            ? <span className="page-link">{value}</span>
                            : <Link className="page-link" to={formatUrl(value)}>{value}</Link>
                        }
                        </li>
                
                )
                )
            }
            



            { 
                hasNext && <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang trước</Link></li>
            }
        </ul>
    )
}

export default Pagination;