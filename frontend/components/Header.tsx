"use client";
import Link from "next/link";
import ThemeChanger from "./ThemeSwitch";
import Image from "next/image"
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";

export const Header = () => {
  const navigation = [
    { name: "Summarizer", href: "#summarizer" },
    { name: "History", href: "#history" },
    { name: "Features", href: "#features" },
    { name: "How to Use", href: "#how-to-use" },
  ];

  return (
    <div className="w-full sticky top-0 z-50 bg-white dark:bg-[#171717] border-b border-gray-200 dark:border-[#404040]">
      <nav className="container relative flex flex-wrap items-center justify-between p-3 mx-auto lg:justify-between xl:px-1">
        <div className="flex items-center lg:w-40">
          <Link href="/">
            <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-600 dark:text-gray-100">
              <span>
                <Image
                  src="/logo.svg"
                  width="32"
                  alt="Flatten"
                  height="32"
                  className="w-8"
                />
              </span>
              <span>Flatten</span>
            </span>
          </Link>
        </div>

        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2 lg:w-40 lg:justify-end">
          <ThemeChanger />
        </div>

        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-gray-700 cursor-pointer">
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  {open && (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  )}
                  {!open && (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </DisclosureButton>

              <DisclosurePanel className="flex flex-wrap w-full my-5 lg:hidden">
                <>
                  {navigation.map((item, index) => (
                    <Link key={index} href={item.href} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-700 focus:outline-none">
                      {item.name}
                    </Link>
                  ))}
                </>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        <div className="hidden text-center lg:flex lg:items-center lg:flex-1">
          <ul className="items-center justify-center flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mx-3 nav__item" key={index}>
                <Link href={menu.href} className="inline-block px-4 py-2 text-lg font-normal text-gray-700 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-700">
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </nav>
    </div>
  );
}