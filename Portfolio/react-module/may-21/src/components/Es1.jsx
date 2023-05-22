import { useState } from 'react';

export default function Es1({ n = 3 }) {
  const [inputValues, setInputValues] = useState(Array(n).fill(''));
  const nonEmptyValues = inputValues.reduce(
    (counter, current) => (current !== '' ? counter + 1 : counter),
    0
  );
  const arr = Array(10).fill(2);
  const objFromArr = arr.reduce((res, current, i) => {
    res[i] = current;
    return res;
  }, {});
  console.log(objFromArr);
  return (
    <>
      <h2>Es 1</h2>
      {Array(3)
        .fill()
        .map((el, i) => (
          <Input
            key={i}
            index={i}
            inputValue={inputValues[i]}
            setInputValues={setInputValues}
          ></Input>
        ))}
      <div>Non empty values: {nonEmptyValues}</div>
      {inputValues.some((el) => el !== '') && (
        <div className="flex gap-4">
          Array:{' '}
          {inputValues.map((el, i) =>
            el !== '' ? (
              <span key={i}>{el},</span>
            ) : (
              <span key={i}>{`<empty cell>,`}</span>
            )
          )}
        </div>
      )}
    </>
  );
}

function Input({ index, inputValue, setInputValues }) {
  function handleOnChange(newValue) {
    setInputValues((inputValues) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = newValue;
      return newInputValues;
    });
  }
  return (
    <input
      value={inputValue}
      className="border-2"
      onChange={(e) => handleOnChange(e.target.value)}
      placeholder={index}
    ></input>
  );
}
