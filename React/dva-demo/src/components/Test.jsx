import { Button } from "antd";
const Test = ({ data = [], add }) => {
  return (
    <div>
      <ul>
        {data.length > 0 ? data.map((v) => <li key={v.id}>{v.name}</li>) : null}
      </ul>
      <Button onClick={add}>insert</Button>
    </div>
  );
};

export default Test;
