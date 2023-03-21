import { useState, createContext, useContext } from "react";

export const CollectionContext = createContext(null);

export const CollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <CollectionContext.Provider
      value={{ collection, setCollection, selectedItem, setSelectedItem }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
