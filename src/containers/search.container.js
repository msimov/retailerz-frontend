import React from "react";
import { useLocation } from "react-router-dom";
import { SearchList } from "../components/searchList.component";

const Search = ({match}) => {

    let query = new URLSearchParams(useLocation().search)
    console.log(query.get('text'))
    return(
        <div>
            <SearchList />
        </div>
    )
        
};

export default Search;
