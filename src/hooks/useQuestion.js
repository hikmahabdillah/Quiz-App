import axios from "axios";
import { useEffect, useState } from "react";

const getData = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=20&category=21&type=multiple");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getData();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return questions;
};