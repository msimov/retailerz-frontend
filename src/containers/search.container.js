import React, { useState } from "react";
import { RecommendedProductsList } from "../components/recommendedProductsList.component";
import { SearchForm } from "../components/searchForm.component";
import { SearchList } from "../components/searchList.component";

const Search = () => {

    const [products, setProducts] = useState([]);

    return(
        <div>
            <SearchForm setProducts={setProducts} />
            <SearchList products={products} />
            <RecommendedProductsList />
        </div>
    )
        
};

export default Search;
