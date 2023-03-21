import ResultCard from "../../../../components/card/ResultCard";

const ResultsSection = ({ results }) => {
  return (
    <div className="row" data-testid="results-sections">
      {results.map((result, index) => (
        <ResultCard key={index} {...result} />
      ))}
    </div>
  );
};

export default ResultsSection;
