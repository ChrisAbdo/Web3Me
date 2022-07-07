import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Web3.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="/">
            Web3.me!
          </a>
        </h1>
        <p className="text-5xl">your personal on-chain portfolio </p>
        <p className="text-3xl mt-6">get started by connecting your wallet </p>
      </main>
    </div>
  );
};

export default Home;
