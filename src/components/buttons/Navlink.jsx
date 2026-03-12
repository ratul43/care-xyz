// NavItem.jsx (a reusable component for individual links)

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? 'text-blue-500 font-bold' : 'text-gray-500 hover:text-blue-600'}
    >
      {children}
    </Link>
  );
}
