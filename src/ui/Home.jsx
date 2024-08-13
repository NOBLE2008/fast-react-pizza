import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { Link } from "react-router-dom";

function Home() {
  const username = useSelector((state) => state.user.username)
  return (
    <div className="text-center mx-3 my-10">
      <h1 className="text-center font-semibold md:text-3xl text-yellow-500 dark:text-white mb-10">
        <span className="text-stone-700">The best pizza.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {username ? <Link to={'/menu'}><Button>Continue Shopping</Button></Link>: <CreateUser />}
    </div>
  );
}

export default Home;
