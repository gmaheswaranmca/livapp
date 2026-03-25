import { useParams } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import TrainerForm from "../components/TrainerForm";

const EditTrainer = () => {
  const { id } = useParams();

  return (
    <>
      <PrivateNavbar />
      <TrainerForm mode="edit" id={id} />
    </>
  );
};

export default EditTrainer;