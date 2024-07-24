import SmoothScroll from "../components/SmoothScroll";
import Header from "../components/Header";
import Nav from "../components/Nav";

import indexStyles from "../styles/index.module.scss";

import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Home - Portfolio",
//   description: "Marius S. Portfolio Home Page",
// };

const Home: React.FC = () => {
  return (
    <main className={indexStyles.container}>
      <SmoothScroll />
      <Header />
      <Nav />
    </main>
  );
};

export default Home;
