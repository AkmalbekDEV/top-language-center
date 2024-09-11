import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";

const Hero = () => {
  const navigation = useNavigate();
  return (
    <section
      id="home"
      className="flex flex-wrap items-center justify-center mt-44 max-sm:mb-[50px]"
    >
      <div className="h-full w-full">
        <h1 className="text-blue-800 font-bold text-4xl font-mono text-center sm:text-7xl mb-16">
          <TypewriterComponent
            options={{
              autoStart: true,
              delay: 60,
              pauseFor: 999999,
              strings: [`404, page not found`],
            }}
          />
        </h1>
      </div>
      <Button
        colorScheme="blue"
        onClick={() => {
          navigation("/");
        }}
      >
        Go Home &nbsp; &rarr;
      </Button>
    </section>
  );
};

export default Hero;
