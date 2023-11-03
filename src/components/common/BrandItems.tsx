import Image from "next/image";
import Link from "next/link";

const BrandItems = ({ icon, link }: { icon: string; link: string }) => {
  return (
    <div>
      <div className="p-5 flex justify-center items-center">
        <Link href={link} className="grayscale hover:grayscale-0 transition duration-300 ease-in-out">
          <Image src={icon} alt="" width={300} height={300} className="w-full h-full " />
        </Link>
      </div>
    </div>
  );
};

export default BrandItems;
