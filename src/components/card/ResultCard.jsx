import { useNavigate } from "react-router-dom";
import { useCollection } from "../../collection.context";

const ResultCard = (result) => {
  const { setSelectedItem } = useCollection();
  const navigate = useNavigate();

  const imageSrc = result.links[0].href;
  const title = result.data[0].title;
  const location = result.data[0].location;
  const photographer =
    result.data[0].photographer || result.data[0].secondary_creator;

  const onClick = () => {
    setSelectedItem(result);
    navigate("/show");
  };

  return (
    <div class="result-card card col-md-3 col-sm-6 m-3">
      <img class="card-img-top" src={imageSrc} alt="Card image cap" />
      <div class="card-body">
        <p class="card-text">Title: {title}</p>
        <p class="card-text">Location: {location}</p>
        <p class="card-text">Photographer: {photographer}</p>
        <div onClick={onClick} class="btn btn-primary">
          See more details
        </div>
      </div>
    </div>
  );
};
export default ResultCard;
