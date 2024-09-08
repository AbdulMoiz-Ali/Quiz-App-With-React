import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [questionNum, setQuestionNum] = useState(0)
  const [submitted, setSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [isSectionAVisible, setIsSectionAVisible] = useState(true);
  const checkedAnswer = useRef([]);
  // const checkedInput = useRef([]);
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  function toggleSection() {
    setIsSectionAVisible(prevState => !prevState);
  };

  //crrrect answer

  const calculateScore = () => {
    let score = 0;
    data.forEach((q, index) => {
      if (selectedValue[index] === q.correctAnswer) { // Use correctAnswer from API response
        score++;
      }
    });

    const totalQuestions = data.length;
    return totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  };

  //shuffle array

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
  let selectedVal;
  function nextQuestion() {
    const checkedButton = checkedAnswer.current.find(input => input.checked);
    if (!checkedButton) {
      alert("put")
    } else {
      selectedVal = checkedButton.value;
      console.log("Selected answer:", selectedVal);
      questionNum < 9 ? setQuestionNum(questionNum + 1) : toggleSection()
    }
    setSelectedValue(answer => ({
      ...answer,
      [questionNum]: selectedVal
    }));

    if (questionNum < data.length - 1) {
      setQuestionNum(questionNum + 1);
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  }
  return (
    <>
      <section className="main bg-center">
        <div style={{ display: isSectionAVisible ? 'block' : 'none' }} className="px-4 mx-auto max-w-screen-xl text-center">
          <h1 style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quiz App</span></h1>
          {data.length > 0 ? <div>
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-4xl">Q{questionNum + 1}  :  {data[questionNum].question.text}</h1>
            <ul className='mcqs-div'>
              {shuffleArray([...data[questionNum].incorrectAnswers, data[questionNum].correctAnswer]).map((item, index) => {
                return <li key={index} className="li flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                  <input id={item} value={item} ref={e => (checkedAnswer.current[index] = e)} type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor={item} className="mcqs-text w-full font-extrabold py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
                </li>
              })}
            </ul>
            {/* <button onClick={nextQuestion} disabled={submitted}>Next</button> */}
            <button onClick={nextQuestion} className="btn-next inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Next
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div> : <h1>Loading...</h1>}
        </div>
        <div className='result' style={{ display: !isSectionAVisible ? 'flex' : 'none' }}>
          <h1 style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quiz App</span></h1>
          <h2 className='className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-4xl"'>Your score: {calculateScore()}%</h2>
          <a href="./" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
            Restart  Now
          </a>
        </div>
      </section>
      {/*  */}
      {/*  */}
      {/* bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] */}


      {/* <section class="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply">
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Quiz</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
            <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
            </a>
          </div>
        </div>
      </section> */}

    </>
  )
}

export default App