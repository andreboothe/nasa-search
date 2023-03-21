import { useState } from "react";
import { useFecth } from "../../hooks";
import InputSection from "./sections/input-section/InputSection";
import ResultsSection from "./sections/results-section/ResultsSection";
import { useCollection } from "../../collection.context";
import ErrorLabel from "../../components/form/ErrorLabel";
import Spinner from "../../components/loading/Spinner";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { collection, setCollection } = useCollection();
  const { loading, error } = useFecth(query, setCollection);

  const onSubmit = async (queryString) => {
    setQuery(queryString);
  };

  return (
    <div>
      <InputSection onSubmit={onSubmit} />

      {loading && <Spinner />}
      {!loading && error.length ? (
        <ErrorLabel message={error} />
      ) : (
        <ResultsSection results={collection} />
      )}
    </div>
  );
};

export default SearchPage;
