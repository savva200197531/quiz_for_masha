document.addEventListener('DOMContentLoaded', function () {
  const questions = [
    {
      emoji: '❤️',
      question: 'Я тебе нравлюсь?',
      answers: ['Да', 'Очень']
    },
    {
      emoji: '🪑',
      question: 'Есть 2 стула...',
      answers: ['Сяду на хуи', 'Нет', 'Иди нахуй']
    },
    {
      emoji: '🐾',
      question: 'Имя моего первого домашнего животного?',
      answers: ['Андрей', 'Окей', 'Пейрис Хилтон']
    },
    {
      emoji: '🏆',
      question: 'Сколько тайтлов за плечами?',
      answers: ['+-10', '+-50', '100+']
    },
    {
      emoji: '🍥',
      question: 'Наруто или Саске?',
      answers: ['Наруто', 'Саске', 'Нахуй иди']
    },
    {
      emoji: '🌆',
      question: 'В каком городе я родился?',
      answers: ['Барнаул', 'Белгород', 'Батайск']
    },
    {
      emoji: '√',
      question: 'Корень из 16',
      answers: ['4', '3', '2']
    },
    {
      emoji: '❓',
      question: "Чему равно значение выражения: 3 + 2 * 4?",
      answers: ["11", "15", "9"]
    },
    {
      emoji: '❓',
      question: "Какой результат операции: 16 / (4 * 2)?",
      answers: ["2", "4", "8"]
    },
    {
      emoji: '❓',
      question: "Сколько корней имеет уравнение x^2 - 4x + 4 = 0?",
      answers: ["1", "2", "3"]
    },
    {
      emoji: '❓',
      question: "Чему равно значение: 5! (факториал числа 5)?",
      answers: ["120", "60", "20"]
    },
    {
      emoji: '❤️',
      question: "Я тебе все еще нравлюсь?",
      answers: ["Да", "Очень"]
    },
    {
      emoji: '❓',
      question: "Как тебе викторина?",
      answers: ["Круто!", "Залупа, лучше бы цветы подарил"]
    },
  ];

  const quizInner = document.querySelector('.quiz__inner');

  questions.forEach(function (question, index) {
    const div = document.createElement('div');
    div.classList.add(`quiz__step--${index + 1}`);
    div.classList.add('quiz__step');
    if (index === 0) {
      div.classList.add('quiz__step--current');
    }
    div.setAttribute('data-question', index + 1);

    const emojiDiv = document.createElement('div');
    emojiDiv.classList.add('question__emoji');
    emojiDiv.textContent = question.emoji;

    const questionHeading = document.createElement('h1');
    questionHeading.classList.add('quiz__question');
    questionHeading.textContent = question.question;

    div.appendChild(emojiDiv);
    div.appendChild(questionHeading);

    const answersDiv = document.createElement('div');
    answersDiv.classList.add('answers');

    question.answers.forEach(function (answerText, answerIndex) {
      const answerDiv = document.createElement('div');
      answerDiv.classList.add('answer');

      const input = document.createElement('input');
      input.classList.add('answer__input');
      input.type = 'radio';
      input.id = 'question_' + (index + 1) + '_answer_' + (answerIndex + 1);
      input.name = 'question_' + (index + 1);
      input.value = answerText;

      const label = document.createElement('label');
      label.classList.add('answer__label');
      label.setAttribute('for', 'question_' + (index + 1) + '_answer_' + (answerIndex + 1));
      label.textContent = answerText;

      answerDiv.appendChild(input);
      answerDiv.appendChild(label);

      answersDiv.appendChild(answerDiv);
    });

    div.appendChild(answersDiv);

    quizInner.appendChild(div);
  });


  quizInner.insertAdjacentHTML('beforeend', `
  <div data-question="${questions.length + 1}" class="quiz__step--${questions.length + 1} quiz__step quiz__summary">

      <h1 class="quiz__question">Summary</h1>
      <div id="summary"></div>
      <div class="submit__container">
        <a href="#" class="submit">Submit</a>
      </div>
    </div>
  `)

  const numberSteps = document.querySelectorAll('.quiz__step').length - 1;
  let disableButtons = false;
  const tick = '<div class="answer__tick"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></div>';
  let thanks = '<div class="thanks"><div class="thanks__tick">✔ </div><h1 class="thanks__title">Спасибо за прохождения викторины, ты ответила правильно на все вопросы, тут должен быть qr код с билетами в сочи парк, но я не знаю в какие даты ты свободна. Так что прошу сообщить об этом создателю квиза (Савве Кашину)</h1></div>';

  // document.querySelectorAll('.answer__input').forEach(function (input) {
  //   input.addEventListener('change', function (e) {
  //     // if (this.nextElementSibling.querySelector('.answer__tick')) {
  //     //   return false;
  //     // }
  //     // this.nextElementSibling.insertAdjacentHTML('beforeend', tick);
  //   });
  // });

  document.querySelector('.navigation__btn--right').addEventListener('click', function (e) {
    let currentIndex = parseInt(document.querySelector('.quiz__step--current').getAttribute('data-question'));
    if (document.querySelectorAll('.quiz__step--current input:checked').length === 0) {
      return false;
    }
    if (currentIndex === numberSteps + 1 || disableButtons) {
      return false;
    }
    if (currentIndex + 1 === numberSteps + 1) {
      this.classList.add('navigation__btn--disabled');
    }
    if (currentIndex === numberSteps) {
      document.querySelectorAll('.summary__item').forEach(function (item) {
        item.remove();
      });
      document.querySelectorAll('.quiz__step:not(.quiz__summary)').forEach(function (item) {
        let icon = item.querySelector('.question__emoji').textContent;
        let answer = item.querySelector('.answer input:checked').value;
        let node = '<div class="summary__item"><div class="question__emoji">' + icon + '</div>' + answer + '</div>';
        document.querySelector('#summary').insertAdjacentHTML('beforeend', node);
      });
    }
    const percentage = (currentIndex * 100) / numberSteps;
    document.querySelector('.progress__inner').style.width = percentage + '%';
    document.querySelector('.quiz__step--current').style.display = 'none';
    document.querySelector('.quiz__step--current').classList.remove('quiz__step--current');
    document.querySelector('.quiz__step--' + (currentIndex + 1)).style.display = 'block';
    document.querySelector('.quiz__step--' + (currentIndex + 1)).classList.add('quiz__step--current');
    currentIndex = parseInt(document.querySelector('.quiz__step--current').getAttribute('data-question'));
    if (currentIndex > 1) {
      document.querySelector('.navigation__btn--left').classList.remove('navigation__btn--disabled');
    }
  });

  document.querySelector('.navigation__btn--left').addEventListener('click', function (e) {
    let currentIndex = parseInt(document.querySelector('.quiz__step--current').getAttribute('data-question'));
    if (currentIndex === 1 || disableButtons) {
      this.classList.add('navigation__btn--disabled');
      return false;
    }
    document.querySelector('.navigation__btn--right').classList.remove('navigation__btn--disabled');
    document.querySelector('.quiz__step--current').style.display = 'none';
    document.querySelector('.quiz__step--current').classList.remove('quiz__step--current');
    document.querySelector('.quiz__step--' + (currentIndex - 1)).style.display = 'block';
    document.querySelector('.quiz__step--' + (currentIndex - 1)).classList.add('quiz__step--current');
    currentIndex = parseInt(document.querySelector('.quiz__step--current').getAttribute('data-question'));
    if (currentIndex === 1) {
      this.classList.add('navigation__btn--disabled');
    }
    const percentage = ((currentIndex - 1) * 100) / numberSteps + 1;
    document.querySelector('.progress__inner').style.width = percentage + '%';
  });

  document.querySelector('.submit').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.quiz').remove();
    document.querySelector('.container').insertAdjacentHTML('beforeend', thanks);
    disableButtons = true;
    document.querySelectorAll('.navigation__btn').forEach(function (btn) {
      btn.classList.add('navigation__btn--disabled');
    });
  });
});
