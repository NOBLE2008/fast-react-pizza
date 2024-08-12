import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="px-4 divide-y-2 space-y-2">
      {menu.map((item) => {
        return <MenuItem pizza={item} key={item.id} />;
      })}
    </ul>
  );
}

export async function loader() {
  const data = await getMenu();

  return data;
}

export default Menu;
