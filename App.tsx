import * as React from 'react';
import './style.css';
import { data } from './data';

export default function App() {
  const [selectedList, setSelectedList] = React.useState(data);
  const [uselectedList, setUSelectedList] = React.useState(data);
  const [all, setAll] = React.useState(false);
  console.log(uselectedList, 'uselectedList', selectedList);

  const getTotal = uselectedList.reduce((acc, cur) => acc + cur.price, 0) || 0;

  React.useEffect(() => {
    const d = selectedList.filter((item) => item.isChecked);
    setUSelectedList(d);
  }, [selectedList, all]);
  React.useEffect(() => {
    if (selectedList.every((item) => item.isChecked)) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [selectedList, all]);

  const getSelectAll = () => {
    setAll(!all);
    let tempData;
    if (all) {
      tempData = selectedList.map((item) => {
        return { ...item, isChecked: false };
      });
    } else {
      tempData = selectedList.map((item) => {
        return { ...item, isChecked: true };
      });
    }
    setSelectedList(tempData);
  };
  const handleChange = (itemN) => {
    const tempD = selectedList.map((item) => {
      if (item.id === itemN) {
        return { ...item, isChecked: !item.isChecked };
      } else {
        return item;
      }
    });
    setSelectedList(tempD);
  };

  const handleRemove = () => {
    const d = selectedList.filter((item) => !item.isChecked);
    setSelectedList(d);
  };
  return (
    <div>
      <input type="checkbox" onChange={getSelectAll} checked={all} />
      <label>Select all</label>
      {selectedList &&
        selectedList.map((item, i) => {
          return (
            <div>
              <input
                type="checkbox"
                checked={item.isChecked}
                name={item.name}
                onChange={() => handleChange(item.id)}
              />
              <label>
                {item.name}-{item.price}
              </label>
            </div>
          );
        })}
      <hr />
      <p>total-{getTotal}</p>
      {/* {uselectedList.map((item) => {
        return <p>{item.name}</p>;
      })} */}
      <button onClick={handleRemove}>Remove Selected items</button>
    </div>
  );
}
