import { useState } from "react";
import FormInput from "../../../../components/form/FormInput";
import {
  BASE_URL,
  QUERY_REQUIRED_ERROR,
  YEAR_DIFFERENCE_ERROR,
} from "../../../../constants";

const InputSection = ({ onSubmit }) => {
  const [search, setSearch] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [yearError, setYearError] = useState("");
  const isFormValid = () => {
    if (!search.length) {
      setSearchError(QUERY_REQUIRED_ERROR);

      return false;
    } else {
      setSearchError("");
    }

    if (!!startYear && !!endYear && startYear > endYear) {
      setYearError(YEAR_DIFFERENCE_ERROR);
      return false;
    } else {
      setYearError("");
    }

    return true;
  };

  const getQueryString = () => {
    let str = BASE_URL + "search?q=" + search;
    str += startYear > 0 ? "&year_start=" + startYear : "";
    str += endYear > 0 ? "&year_end=" + endYear : "";
    str += "&media_type=image ";
    return str;
  };

  const onClick = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const query = getQueryString();
      onSubmit(query);
    }
  };

  return (
    <form>
      <FormInput
        label="Search*"
        placeholder="Search"
        type="text"
        id="query-input"
        className="col-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        inputProps={{
          required: true,
          "data-testid": "query-input",
        }}
        errorMessage={searchError}
      />

      <div className="d-flex flex-row mt-3 justify-content-between col-6">
        <FormInput
          label="Start Year"
          placeholder="Start Year"
          type="number"
          id="start-year"
          className="col-5"
          value={startYear}
          errorMessage={yearError}
          onChange={(e) => setStartYear(e.target.value)}
          inputProps={{
            min: 0,
            "data-testid": "start-year",
          }}
        />
        <FormInput
          label="End Year"
          placeholder="End Year"
          type="number"
          id="end-year"
          data-testid="end-year"
          className="col-5"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          inputProps={{
            min: 0,
            "data-testid": "end-year",
          }}
        />
      </div>
      <div className="col-sm-2  mt-3">
        <input
          onClick={onClick}
          class="btn btn-primary"
          type="submit"
          value="Search"
          data-testid="submit"
        ></input>
      </div>
    </form>
  );
};

export default InputSection;
