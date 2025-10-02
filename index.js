import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const quizData = [
    {
        question: '什麼是血糖？',
        options: [
            'A. 血液中的蛋白質',
            'B. 血液中的葡萄糖濃度',
            'C. 血液中的脂肪',
            'D. 血液中的氧氣',
        ],
        correctAnswerIndex: 1,
        explanation: '血糖是身體的主要能量來源，糖尿病患者需監測以維持正常水平。',
    },
    {
        question: '糖尿病患者每天應該測量血糖幾次？',
        options: [
            'A. 每小時一次',
            'B. 至少1-2次，視醫生建議',
            'C. 每週一次',
            'D. 每月一次',
        ],
        correctAnswerIndex: 1,
        explanation: '定期測量有助於及時調整飲食或藥物，避免血糖過高或過低。',
    },
    {
        question: '吃太多甜食會對糖尿病患者造成什麼影響？',
        options: [
            'A. 增強免疫力',
            'B. 降低血壓',
            'C. 使血糖快速升高',
            'D. 改善視力',
        ],
        correctAnswerIndex: 2,
        explanation: '甜食含高糖分，應控制攝取量以防血糖失控。',
    },
    {
        question: '運動對血糖控制有什麼好處？',
        options: [
            'A. 增加食慾',
            'B. 提高血糖數值',
            'C. 幫助降低血糖數值',
            'D. 減少睡眠時間',
        ],
        correctAnswerIndex: 2,
        explanation: '運動促進肌肉使用葡萄糖，但需在醫生指導下進行。',
    },
    {
        question: '糖尿病有哪些主要類型？',
        options: [
            'A. A型糖尿病和B型糖尿病',
            'B. 第1型糖尿病和第2型糖尿病',
            'C. 急性和慢性',
            'D. 遺傳性和非遺傳性',
        ],
        correctAnswerIndex: 1,
        explanation: '第1型糖尿病是胰島素缺乏，第2型糖尿病是胰島素抵抗，常與生活習慣相關。',
    },
    {
        question: '高血糖的常見症狀有哪些？',
        options: [
            'A. 頭痛、發燒、咳嗽',
            'B. 口渴、多尿、疲勞',
            'C. 胃痛、腹瀉、嘔吐',
            'D. 皮膚乾燥、掉髮',
        ],
        correctAnswerIndex: 1,
        explanation: '這些症狀提示血糖過高，需立即測量並求醫。',
    },
    {
        question: '低血糖時應該怎麼辦？',
        options: [
            'A. 喝咖啡',
            'B. 吃含糖食物，如糖果或果汁',
            'C. 吃高脂肪食物',
            'D. 立即睡覺',
        ],
        correctAnswerIndex: 1,
        explanation: '低血糖可能危及生命，之後需吃正餐穩定血糖。',
    },
    {
        question: '糖尿病患者適合喝什麼飲料？',
        options: [
            'A. 汽水',
            'B. 果汁',
            'C. 水、無糖茶或低糖飲料',
            'D. 酒精飲料',
        ],
        correctAnswerIndex: 2,
        explanation: '含糖飲料會導致血糖波動，應避免。',
    },
    {
        question: '胰島素在身體中扮演什麼角色？',
        options: [
            'A. 幫助消化脂肪',
            'B. 幫助細胞吸收血糖，提供能量',
            'C. 促進血液凝固',
            'D. 增強骨骼強度',
        ],
        correctAnswerIndex: 1,
        explanation: '胰島素缺乏或抵抗是糖尿病的核心問題。',
    },
    {
        question: '如何預防糖尿病惡化？',
        options: [
            'A. 多吃甜食',
            'B. 減少運動',
            'C. 維持健康飲食、定期運動和遵醫囑',
            'D. 增加壓力',
        ],
        correctAnswerIndex: 2,
        explanation: '均衡飲食和體重控制是預防惡化的關鍵。',
    },
];

const App = () => {
    const [gameState, setGameState] = useState('home');
    const [currentLevel, setCurrentLevel] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleAnswerClick = (index) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer(index);
        const isCorrect = index === quizData[currentLevel].correctAnswerIndex;

        if (isCorrect) {
            setFeedback('答對了！你好棒！');
            setTimeout(() => {
                if (currentLevel < quizData.length - 1) {
                    setCurrentLevel(currentLevel + 1);
                    resetLevelState();
                } else {
                    setGameState('complete');
                }
            }, 2500);
        } else {
            setFeedback('不對喔！');
            setTimeout(() => {
                resetLevelState();
            }, 1500);
        }
    };

    const resetLevelState = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        setFeedback('');
    };
    
    const handleRestart = () => {
        setCurrentLevel(0);
        setGameState('quiz');
        resetLevelState();
    };

    const handleStartGame = () => {
        setGameState('quiz');
    };

    const currentQuestion = quizData[currentLevel];
    
    if (gameState === 'home') {
        return React.createElement("div", { className: "quiz-container home-screen" },
            React.createElement("h1", null, "歡迎參加我們的糖尿病控糖知識大挑戰！"),
            React.createElement("p", null, "透過10個簡單問題，測試您對血糖控制的了解，學習如何更好地管理糖尿病。"),
            React.createElement("p", null, "準備好了嗎？"),
            React.createElement("button", { className: "start-btn", onClick: handleStartGame }, "開始遊戲！"),
            React.createElement("p", { className: "designer-credit" }, "遊戲設計：彰化基督教醫院 內分泌暨新陳代謝科 張桐瑋管理師")
        );
    }
    
    if (gameState === 'complete') {
        return React.createElement("div", { className: "quiz-container completion-screen" },
            React.createElement("h2", null, "您真的是控糖達人！"),
            React.createElement("p", null, "彰化基督教醫院 內分泌暨新陳代謝科 關心您的健康"),
            React.createElement("button", { className: "restart-btn", onClick: handleRestart }, "重新挑戰"),
            React.createElement("p", { className: "designer-credit" }, "遊戲設計：彰化基督教醫院 內分泌暨新陳代謝科 張桐瑋管理師")
        );
    }

    return React.createElement("div", { className: "quiz-container" },
        React.createElement("h1", null, "糖尿病控糖知識大挑戰"),
        React.createElement("div", { className: "level-indicator" }, `關卡 ${currentLevel + 1} / ${quizData.length}`),
        React.createElement("p", { className: "question-text" }, currentQuestion.question),
        React.createElement("div", { className: "options-grid" },
            currentQuestion.options.map((option, index) => {
                let buttonClass = 'option-btn';
                if (isAnswered) {
                    if (index === currentQuestion.correctAnswerIndex) {
                        buttonClass += ' correct';
                    } else if (index === selectedAnswer) {
                        buttonClass += ' incorrect';
                    }
                }
                return React.createElement("button", {
                    key: index,
                    className: buttonClass,
                    onClick: () => handleAnswerClick(index),
                    disabled: isAnswered,
                    "aria-pressed": selectedAnswer === index
                }, option);
            })
        ),
        React.createElement("div", { className: "feedback-container" },
            feedback && React.createElement(React.Fragment, null,
                React.createElement("p", { className: `feedback-message ${feedback === '答對了！你好棒！' ? 'correct-text' : 'incorrect-text'}` }, feedback),
                feedback === '答對了！你好棒！' && React.createElement("p", { className: "explanation-text" }, currentQuestion.explanation)
            )
        ),
        React.createElement("p", { className: "designer-credit" }, "遊戲設計：彰化基督教醫院 內分泌暨新陳代謝科 張桐瑋管理師")
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App));
