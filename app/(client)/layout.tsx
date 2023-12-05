import Footer from "@components/layout/client-layout/Footer";
import Header from "@components/layout/client-layout/Header";
import Hotline from "@components/layout/client-layout/Hotline";
import TopFooter from "@components/layout/client-layout/Items/TopFooter";
import OnTop from "@components/layout/client-layout/OnTop";
import React from "react";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const layout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="font-LexendDeca font-extralight">
      <Header />
      <div className="">{children}</div>
      {/* <OnTop />
      <Hotline /> */}

      <Footer />
    </div>
  );
};

export default layout;
