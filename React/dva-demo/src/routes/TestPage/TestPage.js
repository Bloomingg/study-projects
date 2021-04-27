import Test from "../../components/Test";
import { connect } from "dva";

const TestPage = (props) => {
  const add = () => {
    console.log(props.data);
    props.dispatch({
      type: "test/addData",
      payload: { id: new Date().getTime(), name: "tn" },
    });
  };
  return (
    <div>
      <Test add={add} data={props.data} />
    </div>
  );
};
const mapStateToProps = (state) => ({ data: state.test.data });
export default connect(mapStateToProps)(TestPage);
