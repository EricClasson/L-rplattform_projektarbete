import { useState } from "react";
import { db, p_formCollection } from "../../firebase";
import { addDoc } from "firebase/firestore";

export interface Name {
  name: string;
}

const AddItem = () => {
  const [itemName, setItemName] = useState("");

  const handleSave = async () => {
    const newItem: Name = {
      name: itemName,
    };

    try {
      await addDoc(p_formCollection, newItem);
      setItemName("");
      console.log("yaaay u got something in the database daaawg");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={itemName}
        placeholder="Item"
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
export default AddItem;
