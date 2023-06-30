import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="h-[--admin-aside-header-height]">
      <div className="w-full h-full relative flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={54}
          style={{
            objectFit: "contain", // cover, contain, none
          }}
        />
      </div>
    </div>
  );
};

export default Logo;
