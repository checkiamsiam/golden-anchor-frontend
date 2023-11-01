"use client";
import HeaderBottomBar from "../sectionComponents/Header/HeaderBottomBar";
import HeaderNavigationDesktop from "../sectionComponents/Header/HeaderNavigationDesktop";
import MobileHeader from "../sectionComponents/Header/MobileHeader";

const Header = () => {
  return (
    <div className="pattern-dark">
      <div className="ga-container">
        <div className="py-5">
          <div className="hidden lg:block">
            <HeaderNavigationDesktop />
          </div>
          <div className="block lg:hidden">
            <MobileHeader />
          </div>
          <HeaderBottomBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
