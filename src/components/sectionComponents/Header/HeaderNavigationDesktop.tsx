import { Flex } from "antd";
import Link from "next/link";
import ProductsPopoverContent from "./ProductsPopoverContent";

const HeaderNavigationDesktop = () => {
  return (
    <div>
      <Flex align="center" gap={25} style={{ color: "white" }}>
        <Link href="/" className="text-white uppercase hover:text-primary">
          Home
        </Link>

        <ProductsPopoverContent />

        <Link href="/" className="text-white uppercase hover:text-primary">
          Brands
        </Link>
        <Link href="/" className="text-white uppercase hover:text-primary">
          Faqs
        </Link>
        <Link href="/" className="text-white uppercase hover:text-primary">
          About golden anchor
        </Link>
        <Link href="/" className="text-white uppercase hover:text-primary">
          Vacancies
        </Link>
        <Link href="/" className="text-white uppercase hover:text-primary">
          Contact us
        </Link>
      </Flex>
    </div>
  );
};

export default HeaderNavigationDesktop;
