import { useNavigate } from "react-router-dom";
import { useCollection } from "../../collection.context";

const DetailedResultCard = () => {
  const { selectedItem } = useCollection();
  const navigate = useNavigate();

  const images = selectedItem.links;
  const title = selectedItem.data[0].title;
  const location = selectedItem.data[0].location;
  const description =
    selectedItem.data[0].description || selectedItem.data[0].description_508;
  const keywords = selectedItem.data[0].keywords;
  const date = selectedItem.data[0].date_created;
  const photographer =
    selectedItem.data[0].photographer || selectedItem.data[0].secondary_creator;

  const onClick = () => {
    navigate("/");
  };

  return (
    <div className="m-3">
      <div class=" card col-12 ">
        <div class="card-header">
          <p class="card-text">Title: {title}</p>
        </div>
        <div class="card-body">
          <p class="card-text">Location: {location}</p>
          <p class="card-text">Photographer: {photographer}</p>
          <p class="card-text">Date: {new Date(date).toDateString()}</p>
          <p class="card-text">Description: {description}</p>
          <div className="row">
            <div className="col-2">Keywords:</div>
            <div className="col-4">
              <ul>
                {keywords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>Collection Images:</div>
          <div className="row justify-content-center col-md-6 col-sm-2">
            {images.map((image, index) => (
              <img
                key={"image-" + index}
                class="card-img-top"
                src={image.href}
                alt={"collection image " + index}
              />
            ))}
          </div>
        </div>
      </div>
      <div onClick={onClick} class="btn btn-danger mt-2">
        Back
      </div>
    </div>
  );
};
export default DetailedResultCard;
