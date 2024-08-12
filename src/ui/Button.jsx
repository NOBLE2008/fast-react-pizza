import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  type = 'primary',
}) {
  const base =
    'rounded-full text-xs md:text-sm bg-yellow-500 font-semibold uppercase self-end transition-colors duration-300 hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2';
  // const styles = `
  //   ${base} ${type === 'primary' ? 'px-4 py-2': type === 'secondary' ? 'px-3 py-[0.375rem] md:px-4 md:py-2': ''}
  // `;
  const styles = {
    primary: `${base} px-4 py-2`,
    small: `${base} px-3 py-[0.375rem] md:px-4 md:py-2`,
    outlinepr: `rounded-full border-stone-200 border px-4 py-2 text-xs md:text-sm bg-transparent font-semibold uppercase self-end transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2`,
    outlinesm: `rounded-full border-stone-200 border px-3 py-[0.375rem] md:px-4 md:py-2 text-xs md:text-sm bg-transparent font-semibold uppercase self-end transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2`,
    deletepr: `rounded-full border-red-400 border px-4 py-2 text-xs md:text-sm bg-transparent font-semibold uppercase self-end transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2`,
    deletesm: `rounded-full border-red-400 border px-3 py-[0.375rem] md:px-4 md:py-2 text-xs md:text-sm bg-transparent font-semibold uppercase self-end transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2`,
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button className={styles[type]}>
      {children}
    </button>
  );
}
