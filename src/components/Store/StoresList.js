import { LoadScript } from "@react-google-maps/api";
import React, { useState, useEffect, useContext } from "react";
import { Card } from "semantic-ui-react";
import { StoreCard } from ".";
import { AuthUserContext } from "../../context";
import { StoreService } from "../../services";
import { ErrorMessage } from "../Error";

const StoresList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    StoreService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setStores(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  const deleteStore = (storeId) => {
    setIsDeleting(true);
    StoreService.deleteByStoreId(storeId, authUser.token)
      .then(() => {
        setIsDeleting(false);
        setStores((stores) =>
          stores.filter((store) => store.storeId !== storeId)
        );
      })
      .catch((err) => {
        setIsDeleting(false);
        if (typeof err.data === "string") {
          setDeleteError(err.data);
        } else {
          setDeleteError(err.data.message);
        }
      });
  };

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Card.Group centered>
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_API_KEY}`}>
        {stores &&
          stores.map((store, index) => (
            <StoreCard
              key={index}
              store={store}
              deleteStore={deleteStore}
              isDeleting={isDeleting}
              deleteError={deleteError}
            />
          ))}
      </LoadScript>
    </Card.Group>
  );
};

export default StoresList;
