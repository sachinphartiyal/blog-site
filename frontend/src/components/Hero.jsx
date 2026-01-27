import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="my-6 flex justify-center items-center">
      <img
        src={assets.hero}
        alt="Hero Banner"
        className="w-[100%] h-[400px] object-cover rounded-2xl"
      />
    </div>
  );
};

export default Hero;
