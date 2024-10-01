import React from "react";
import {Link} from "react-router-dom"
import { getCategories } from "../../../services/Api";

const Menu = () => {

    const [categories, setCategories] = React.useState([]);
    React.useEffect(()=>{
        getCategories({}).then(({data})=> {
            setCategories(data.data.docs);
        })
    }, [])

    return (
        <>
            <nav>
                <div id="menu" className="collapse navbar-collapse">
                    <ul>
                        {
                            categories.map((item)=>
                                <Link to={`/Category-${item._id}`}><li className="menu-item">{item.title}</li></Link>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Menu;