import { useLoaderData, useNavigate } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="space-y-2 divide-y-2 px-4">
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
