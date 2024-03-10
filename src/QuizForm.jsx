import React, { useState } from 'react'
import { QuestionsData } from './Questions'

const QuizForm = () => {

    const [pageNo, setpageNo] = useState(0);
    const [questionsData, setquestionsData] = useState(QuestionsData ? QuestionsData : []);
    const [selectedQuestion, setselectedQuestion] = useState(1);
    const [selectedAnswer, setselectedAnswer] = useState(questionsData ? questionsData.find((ques) => ques.qno === selectedQuestion)?.selectedAnswer : "");
    const [selectedAnswerIndex, setselectedAnswerIndex] = useState(-1);
    const [showScore, setshowScore] = useState(false);


    const handleSubmitAnswer = () => {
        if (pageNo === QuestionsData.length - 1) {
            setshowScore(true);
        }

        if (selectedAnswerIndex !== -1) {
            setquestionsData((prev) => (prev.map((ques) => {
                if (ques.qno === selectedQuestion) {
                    return { ...ques, selectedAnswer: selectedAnswer };
                } else {
                    return ques;
                }
            })))
            setpageNo((prev) => prev + 1);
            setselectedAnswerIndex(-1)
        }else{
            alert("Make a selection!")
        }
    }

    function calculatePercentage() {
        let totalQuestions = QuestionsData.length - 1;
        let eachQuestionPercentageVal = 100 / totalQuestions;
        let numberOfCorrectAnswers = 0;
        for (let item of questionsData) {
            if (item.selectedAnswer === item.correctAnswer) {
                numberOfCorrectAnswers++
            }
        }
        return numberOfCorrectAnswers * eachQuestionPercentageVal
    }
    return (
        <div className='quiz__form__wrapper'>

            {/* Render Questions */}
            <div>
                {
                    !showScore && questionsData && questionsData.slice(pageNo, pageNo + 1).map((question) => {
                        return (
                            <div className='question_wrapper'>
                                <h2>Question {question.qno}: {question.question}</h2>
                                <div className='answer__option__wrapper'>
                                    {question.optionsList.map((answerOption, answerOptionIndex) => {
                                        return (
                                            <>
                                                <span className={`answer__option ${question.selectedAnswerIndex === answerOptionIndex && "selected"}`} onClick={() => {
                                                    setselectedAnswerIndex(answerOptionIndex)
                                                    setquestionsData((prev) => prev.map(ques => {
                                                        if (ques.qno === question.qno) {
                                                            return { ...ques, selectedAnswerIndex: answerOptionIndex }
                                                        } else {
                                                            return ques;
                                                        }
                                                    }))
                                                    setselectedAnswer(answerOption)
                                                    setselectedQuestion(question.qno)
                                                }}>{answerOption}</span>
                                            </>
                                        )
                                    })}

                                </div>
                            </div>
                        )
                    })
                }

                {/* Show Percentage Scored */}
                {
                    !!showScore && (
                        <div>
                            <h1>Percentage : {
                                calculatePercentage() + "%"
                            } </h1>

                        </div>
                    )
                }
            </div>

            {
                !showScore && (
                    <>

                        <div className='button__segment'>
                            <button
                                disabled={pageNo === 0}
                                onClick={() => {
                                    setpageNo((prev) => prev - 1)
                                    setselectedAnswer("")
                                    setselectedAnswerIndex(-1)
                                }}>Previous</button>
                            <button
                                disabled={pageNo === QuestionsData.length - 1}
                                onClick={() => {

                                    if (selectedAnswerIndex !== -1) {
                                        handleSubmitAnswer()
                                    } else {
                                        if (pageNo === QuestionsData.length - 1) {
                                            setshowScore(true)
                                        }
                                        setselectedAnswer("")
                                        setselectedAnswerIndex(-1)
                                        setpageNo((prev) => prev + 1)
                                    }
                                }}>Next</button>
                            <button onClick={handleSubmitAnswer}>Submit</button>

                        </div>
                    </>
                )
            }



            {/* Linear Progress */}
            <div className='progress__bar'>
                {
                    questionsData.map((question) => {
                        return (
                            <>
                                <div style={{
                                    width: (100 / questionsData.length - 1),
                                    backgroundColor: question.selectedAnswer === question.correctAnswer ? "green" : "red",
                                    height: "100%",
                                }} />
                            </>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default QuizForm
