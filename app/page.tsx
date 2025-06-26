"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSwipeable } from "react-swipeable";
import { LuDownload } from "react-icons/lu";

const Home = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isModal, setIsModal] = useState(false);
  const [num, setNum] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const swipeControls = useAnimationControls();
  const [swiped, setSwiped] = useState(false);

  const animateSwipe = async (direction: "left" | "right") => {
    if (isAnimating) return;

    setIsAnimating(true);

if (direction === "left") {
      setNum((prevNum) => (prevNum + 1) % 33);
    } else {
      setNum((prevNum) => (prevNum - 1 + 33) % 33);
    }

    await swipeControls.start({
      x: direction === "left" ? -dimensions.width : dimensions.width,
      transition: { duration: 0.4, delay: 0.2 },
    });

    

    setSwiped(true);

    swipeControls.set({
      x: direction === "left" ? dimensions.width : -dimensions.width,
    });

    await swipeControls.start({
      x: 0,
      transition: { duration: 0.2 },
    });

    setIsAnimating(false);
  };
  const handler = useSwipeable({
    onSwipedLeft: () => animateSwipe("left"),
    onSwipedRight: () => animateSwipe("right"),
  });
  const array = [];
  for (let i = 0; i < 33; i++) {
    array.push(i);
  }

  useEffect(() => {
    if (isModal) {
      swipeControls.set({ x: 0 });
      setIsAnimating(false);
    }
  }, [isModal, swipeControls]);

  useEffect(() => {
    setDimensions({
      width: screen.width,
      height: screen.height,
    });
  }, []);
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center mb-6 `}
    >
      {array.map((item, index) => (
        <div
          key={item}
          className="w-[90%] h-96 relative bg-black flex flex-col  justify-between rounded-md overflow-hidden"
          onClick={() => {
            setIsModal(true);
            setNum(index);
          }}
        >
          <motion.div
            className="flex justify-end p-2"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href={`/meerkat_meme${item}.jpg`}
              download={true}
              className=" w-fit  p-4 font-bold"
            >
              <LuDownload color="white" size={20} />
            </Link>
          </motion.div>
          <motion.div
            className="w-full h-72 relative"
            whileHover={{ scale: 1.05 }}
          >
            <Image src={`/meerkat_meme${item}.jpg`} alt="meme" fill />
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {isModal && (
          <motion.div
            variants={{
              initial: { opacity: 0, y: dimensions.height },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: dimensions.height },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            className="w-10/10  h-full top-0 bg-gray-500/95 fixed  left-0 grid place-items-center md:hidden"
          >
            <button
              className="text-3xl absolute top-4 left-4 bg-white p-1 rounded-full font-medium"
              onClick={() => {
                setIsModal(false);
                setSwiped(false);
              }}
            >
              <IoIosArrowRoundBack />
            </button>
            <motion.div {...handler} animate={swipeControls}>
              <Image
                src={`/meerkat_meme${num}.jpg`}
                width={dimensions.width}
                height={dimensions.height}
                // fill
                alt="meme"
                className="object-cover mt-4"
              />
            </motion.div>
            <button>{num + 1} of 33</button>
            {!swiped && (
              <p className="text-white">Swipe left or right to navigate</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Home;
