import axios from "axios";
import { useEffect, useState } from "react";

// Cache untuk menyimpan fetched questions
let cachedQuestions = null;

const getData = async () => {
  try {
    // get data question dari api opentdb
    const response = await axios.get("https://opentdb.com/api.php?amount=20&category=21&type=multiple");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getQuestions = () => {
  // membuat state untuk menyimpan data hasil get data dari api
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (cachedQuestions) {
        setQuestions(cachedQuestions);
      } else {
        // Fetch data
        const data = await getData();
        if (data.results) {
          cachedQuestions = data.results; // Cache the questions
          setQuestions(data.results);
        }
      }
    };

    fetchQuestions();
  }, []);

  return questions;
};