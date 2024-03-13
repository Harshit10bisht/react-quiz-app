import { useCallback, useState } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary';

export default function Quiz() {
    // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState('');

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }

    return (
        <div id='quiz'>
            <div id='question'>
                <Question 
                    key={activeQuestionIndex}
                    index={activeQuestionIndex}
                    onSelectAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}
                />
            </div>
        </div>
    )
}

    /* 
    Using useCallback bcoz effect fxn executes again if surrounding fxn executes again 
    or dependencies value changes, but for timeout, it is always 10000, so why only 
    timeout is executing again, and not interval, so it must be handleSelectAnswer fxn
    on every skip of answer, Quiz component refreshes and do same for handleSelectAnswer fxn 
    And StrictMode re-executes com. multipel times to help with errors, and an ideal program should
    also work on multiple comp. execution correctly, which is identified.

    On skip, prorgess bar was not showing from 2nd onwards, bcoz Quiz component was updating
    But QuestionTimer was not unmounted/removed from DOM or changed anything.  
    That's why used key in QTImer, it helps in unmount and remount on every question.
    again we used key while creating Answers comp. and using key in it which helped in shuffing error.
    */