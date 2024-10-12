import axios from "axios";
import { useEffect, useState } from "react";

const getData = async () => {
  try {
    // get data question dari api opentdb
    const response = await axios.get("https://opentdb.com/api.php?amount=20&category=21&type=multiple");
    return response.data.results;
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
      const data = await getData(); // get data
      
      // jika data ada maka set nilai question dengan data dari api
      if (data) {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, []);

  return questions;
};