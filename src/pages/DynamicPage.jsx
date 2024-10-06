import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowRight, BsWatch } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ImPriceTag } from "react-icons/im";

const DynamicPage = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const params = useParams();
  const toast = useToast();

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://fe100a235e57a25f.mokky.dev/courses/${params.id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  const handleData = (e) => {
    e.preventDefault();

    if (number.length < 9) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "The number is invaild",
        description: "The number you entered is invaild",
      });
      return;
    } else if (number.length > 17) {
      toast({
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "The number is invaild",
        description: "The number you entered is invaild",
      });
      return;
    } else
      toast({
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Submitted!",
        description: "Our administrators will contact you soon!",
      });

    const token = "6584768873:AAFzT7T-PPsZIsSKEDtksmqjRq5LwP4ggVI";
    const chat_id = "-4583361696";
    const my_text = `
            NEW CUSTOMER ‼️
            💳 Name: ${name}
            📲 Number: ${number},
            🎛 Course Name: ${data.name}.
        `;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(
      my_text
    )}`;

    axios
      .get(url)
      .then((response) => {
        console.log("Message sent", response.data);
      })
      .catch((error) => {
        console.error("Error sending message", error);
      });

    setName("");
    setNumber("");
    setErrorMsg("");
  };

  return (
    <div className="max-w-[1250px] mx-auto mt-44">
      <div className="flex items-center gap-3 max-sm:ml-8">
        <a href="/" className="hover:underline">
          Asosiy
        </a>
        <p>
          <BsArrowRight />
        </p>
        <a href="" className="hover:underline">
          {data.name}
        </a>
      </div>
      <div className="mt-8 flex items-center gap-10 max-sm:gap-10 max-sm:flex-col max-sm:px-10 max-sm:text-center">
        <img
          src={data.img}
          className="w-[40%] max-sm:w-full shadow shadow-blue-700 rounded-xl"
          alt=""
        />
        <div className="grid gap-10 p-5 rounded-2xl shadow-xl bg-white w-full py-12">
          <p className="text-2xl max-sm:text-lg font-medium flex items-center gap-3">
            <BsWatch size={30} /> Continuity:{" "}
            <span className="text-black">{data.duration} months</span>
          </p>
          <p className="text-2xl max-sm:text-lg font-medium flex items-center gap-3">
            <ImPriceTag size={30} /> Price:{" "}
            <span className="text-black">{data.price} sum</span>
          </p>
          <p className="text-2xl max-sm:text-lg font-medium flex items-center gap-3">
            <GiTeacher size={30} /> Teacher:{" "}
            <span className="text-black">{data.teacher}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <div className="grid gap-5">
          <h1 className="text-4xl font-medium text-center">
            About this course
          </h1>
          <div className="flex justify-center border-b-4 rounded-xl border-blue-700">
            <div className="border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-10 max-sm:flex-col mt-10 max-sm:px-5">
        <div className="p-5 rounded-xl shadow-2xl w-[65%] max-sm:w-full max-sm:text-sm">
          {data.name === "IELTS Top" ? (
            <p className="text-[25px] max-sm:text-xl font-medium">
              {data.desc}
            </p>
          ) : (
            <p className="text-xl font-medium">{data.desc}</p>
          )}
        </div>
        <form
          id="ref"
          onSubmit={handleData}
          className="rounded-xl shadow-xl w-[400px] h-[300px] max-sm:w-full p-5 grid gap-5 bg-blue-700"
        >
          <h1 className="text-center text-2xl font-medium text-white">
            Sign Up For The Course
          </h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            name="name"
            placeholder="Your name..."
            className="w-full py-2 pl-5 text-lg border-2 rounded-xl outline-none"
          />
          <input
            defaultValue={"+998"}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="tel"
            required
            name="number"
            placeholder="Your number..."
            className="w-full py-2 pl-5 text-lg border-2 rounded-xl outline-none"
          />
          <div className="flex justify-center">
            <button className="w-[50%] hover:shadow-md hover:shadow-yellow-500 transition-all rounded-xl text-white text-lg font-medium bg-[#f7b602] py-2">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicPage;
