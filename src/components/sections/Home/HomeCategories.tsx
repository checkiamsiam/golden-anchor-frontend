import SectionHeader from "@/components/common/SectionHeader";
import HomeCategoriesMap from "@/components/sectionComponents/HomeCategories/HomeCategoriesMap";
import GAButton from "@/components/ui/GAButton";
import Link from "next/link";

const HomeCategories = () => {
  return (
    <div className="bg-secondary">
      <div className="ga-container">
        <div className="py-10">
          <SectionHeader title="Our Products" color="white" subtitle="The best of the best categories of our products" />
          <div className="p-5 mt-5">
            <HomeCategoriesMap />
          </div>
          <div className="flex justify-center mt-5">
            <Link href="/categories">
              <GAButton arrow>Request price quotation</GAButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
