import PrivateNavbar from "../components/PrivateNavbar";
import TrainerForm from "../components/TrainerForm";

const NewTrainer = () => {
  return (
    <>
      <PrivateNavbar />
      <TrainerForm mode="new" />
    </>
  );
};

export default NewTrainer;