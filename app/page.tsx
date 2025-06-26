"use clent";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      <button className="flex items-center justify-center gap-4 bg-[#18181b] my-8 text-[#fafafa] whitespace-nowrap text-sm font-medium rounded-xl w-56 h-11">
        <FaPlus />
        Create your meme
      </button>

      <h2 className="text-2xl font-semibold mb-6">Community Memes (0)</h2>
    </div>
  );
};
export default Home;
