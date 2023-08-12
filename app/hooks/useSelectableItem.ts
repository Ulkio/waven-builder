import { useState } from "react";

export function useSelectableItem<T>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelectedItemChange = (selected: T) => {
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem === selected) {
        return null; // Deselect if the same item is clicked again
      } else {
        return selected; // Otherwise, select the new item
      }
    });
  };

  return { selectedItem, handleSelectedItemChange };
}
