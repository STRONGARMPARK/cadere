import React, { useEffect, useState } from 'react'
import { useGetClothes } from '../api/useClothing';
import { Button } from '../components/Button';

interface InventoryProps {

}

export const Inventory: React.FC<InventoryProps> = () => {
  const [clothes, setClothes] = useState<any[]>();
  const { data, loading, error } = useGetClothes();

  useEffect(() => {
    setClothes(data);
    console.log(data);
  }, [data])

  return (
    <div>
      <p>Inventory</p>
      <Button onClick={() => {}}>
        Add Item
      </Button>
      <input placeholder="Name" type="text" />
    </div>
  );
}