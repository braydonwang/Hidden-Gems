import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import logoImg from "../../images/logo.png";

export default function DesktopNavbar({
  setMobileMenuOpen,
  user,
  handleLogout,
}) {
  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <img className="h-9 w-auto" src={logoImg} alt="Logo" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Popover.Group className="hidden lg:flex lg:gap-x-14">
        <a
          href="/create"
          className="text-lg font-semibold leading-6 text-gray-900"
        >
          Create a Gem
        </a>
      </Popover.Group>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {!user ? (
          <a
            href="/login"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        ) : (
          <button
            onClick={handleLogout}
            className="text-base font-semibold leading-6 text-gray-900 flex flex-row items-center"
          >
            Log out
            <ArrowLeftOnRectangleIcon
              className="w-5 h-5 ml-1"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </nav>
  );
}
