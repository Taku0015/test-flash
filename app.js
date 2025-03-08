document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('startScreen');
  const numberDisplay = document.getElementById('numberDisplay');
  const answerScreen = document.getElementById('answerScreen');
  const startButton = document.getElementById('startButton');
  const initialNumberInput = document.getElementById('initialNumber');
  const userAnswerInput = document.getElementById('userAnswer');
  const checkAnswerButton = document.getElementById('checkAnswer');
  const resultText = document.getElementById('result');

  let numbers = [];
  let totalSum = 0;

  startButton.addEventListener('click', () => {
    const initialNumber = parseInt(initialNumberInput.value);
    if (isNaN(initialNumber) || initialNumber <= 0) {
      alert('正しい数字を入力してください！');
      return;
    }

    startScreen.classList.add('hidden');
    numbers = generateNumbers(initialNumber);
    totalSum = numbers.reduce((sum, num) => sum + num, 0);

    displayNumbers(numbers);
  });

  function generateNumbers(total) {
    const numbers = [];
    let sum = 0;

    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * (total / 2)) + 1;
      numbers.push(randomNum);
      sum += randomNum;
    }

    numbers.push(total - sum);
    return numbers;
  }

  function displayNumbers(numbers) {
    let delay = 0;

    numbers.forEach((num, index) => {
      setTimeout(() => {
        numberDisplay.textContent = num;
        numberDisplay.classList.remove('hidden');
        numberDisplay.style.display = 'flex'; // 確実に表示するために追加
        numberDisplay.style.color = 'black';

        setTimeout(() => {
          numberDisplay.classList.add('hidden');
          numberDisplay.style.display = 'none'; // 確実に非表示に
          if (index === numbers.length - 1) {
            showAnswerScreen();
          }
        }, 1000);
      }, delay);

      delay += 1500;
    });
  }

  function showAnswerScreen() {
    answerScreen.classList.remove('hidden');
  }

  checkAnswerButton.addEventListener('click', () => {
    const userAnswer = parseInt(userAnswerInput.value);

    if (userAnswer === totalSum) {
      resultText.textContent = '正解！';
    } else {
      resultText.textContent = `不正解！ 正しい答えは ${totalSum} です`;
    }
  });
});
