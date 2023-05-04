import { useState } from "react";
import axios from "axios";

const AddWilder = ({
  setLastUpdate,
}: {
  setLastUpdate: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [wilderName, setName] = useState("");
  const [city, setCity] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/wilder", {
          name: wilderName,
          city: city,
        });
        setLastUpdate(new Date().getTime());
      }}
    >
      <h3>Add Wilder</h3>
      <label>Name </label>
      <input
        value={wilderName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label>City </label>
      <input
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default AddWilder;