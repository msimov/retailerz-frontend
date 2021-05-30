import React from "react";
import { Menu } from "semantic-ui-react";
import { SearchResultList } from "../../components/Search";
import { ListLayout } from "../../layouts";

const Search = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Search Results</Menu.Item>
        </Menu>
      }
      list={<SearchResultList />}
    />
  );
};

export default Search;
