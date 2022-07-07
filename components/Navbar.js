import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeSwitcher from "../components/ThemeSwitcher";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div class="navbar bg-base-100 border-b border-gray-500">
      <link
        href="https://fonts.googleapis.com/css2?family=Comforter&family=Poppins:wght@300&family=Supermercado+One&display=swap"
        rel="stylesheet"
      />

      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <div className={styles.fontSet}>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/upload">Upload</a>
              </li>
              <li>
                <a href="/search">Search</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.fontSet}>
          <a class="btn btn-ghost normal-case text-xl" href="/">
            Web3.me
          </a>
        </div>
      </div>
      <div className={styles.fontSet}>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/upload">Upload</a>
            </li>
            <li>
              <a href="/search">Search</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-end">
        <div class="mr-2">
          <ThemeSwitcher />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
