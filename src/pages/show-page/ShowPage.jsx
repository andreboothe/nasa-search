import { useCollection } from "../../collection.context";
import DetailedResultCard from "../../components/card/DetailedResultCard";
import ErrorLabel from "../../components/form/ErrorLabel";

const ShowPage = () => {
  const { selectedItem } = useCollection();
  if (!selectedItem)
    return <ErrorLabel message={"No item has been selected"} />;
  return <DetailedResultCard />;
};

export default ShowPage;
