import React, { useEffect, useState } from 'react'
import { useGetClothes, usePostClothes } from '../api/useClothing';
import { Button } from '../components/Button';

interface InventoryProps {

}

export const Inventory: React.FC<InventoryProps> = () => {
  const [clothingName, setClothingName] = useState<string>("");


  const [clothes, setClothes] = useState<any[]>([]);
  const { data, loading } = useGetClothes();
  useEffect(() => {
    setClothes(data);
  }, [data])

  const clothingItems = clothes.map((clothingItem) => (
    <li key={clothingItem._id}>{clothingItem.name}</li>
  ));

  // setClothes(usePostClothes(clothingName).data);

  const HandleClick = () => {
    setClothingName("");
  }

  return (
    <div>
      <p>Inventory</p>
      <Button onClick={HandleClick}>
        Add Item
      </Button>
      {loading ? <Button onClick={() => {}}>LOADING</Button> : clothingItems}
      < input
        placeholder="Name"
        value={clothingName}
        type="text"
        onChange={e => setClothingName(e.target.value)} />
    </div >
  );
}