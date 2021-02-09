import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { RecommendedProductsList } from "../components/recommendedProductsList.component";
import { SearchForm } from "../components/searchForm.component";
import { SearchList } from "../components/searchList.component";

const Search = ({match}) => {

    const [products, setProducts] = useState([]);
    let query = new URLSearchParams(useLocation().search)
    console.log(query.get('text'))
    return(
        <div>
            <SearchList products={products} />
        </div>
    )
        
};

export default Search;
