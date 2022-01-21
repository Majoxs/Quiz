'use strict'

const main = document.querySelector('.main');
const selection = document.querySelector('.selection');
const title = document.querySelector('.main__title');

const getData = () => {
  const dataBase = [
    {
      id: '01',
      theme: 'Тема01 Тестовая',
      result: [
        [40, 'Есть задатки, нужно развиваться'],
        [80, 'Очень хорошо, но есть пробелы'],
        [100, 'Отличный результат']
      ],
      list: [
        {
          type: 'checkbox',
          question: 'Вопрос1',
          answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
          correct: 2
        },
        {
          type: 'radio',
          question: 'Вопрос2',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
        },
        {
          type: 'checkbox',
          question: 'Вопрос3',
          answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
          correct: 2
        },
        {
          type: 'radio',
          question: 'Вопрос4',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
        },
        {
          type: 'checkbox',
          question: 'Вопрос5',
          answers: ['правильный', 'неправильный', 'неправильный', 'неправильный'],
          correct: 1
        },
        {
          type: 'radio',
          question: 'Вопрос6',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
        },
        {
          type: 'checkbox',
          question: 'Вопрос7',
          answers: ['правильный1', 'правильный2', 'правильный3', 'неправильный'],
          correct: 3
        },
        {
          type: 'checkbox',
          question: 'Вопрос8',
          answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
          correct: 2
        },
      ]
    },
    {
      id: '02',
      theme: 'Тема02',
      result: [
        [30, 'Есть задатки, нужно развиваться'],
        [60, 'Очень хорошо, но есть пробелы'],
        [100, 'Отличный результат']
      ],
      list: [
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный']
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
          correct: 2
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
          correct: 2
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
          correct: 1
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный1', 'неправильный', 'неправильный', 'неправильный'],
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный1', 'правильный2', 'правильный3', 'неправильный'],
          correct: 3
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный1', 'правильный2', 'неправильный', 'неправильный'],
          correct: 2
        },
      ]
    }
  ];

  return dataBase;
};

const hideElem = elem => {
  let opacity = getComputedStyle(elem).getPropertyValue('opacity');

  const animation = () => {
    opacity -= 0.03;
    elem.style.opacity = opacity;

    if (opacity > 0) {
      requestAnimationFrame(animation);
    } else {
      elem.style.display = 'none';
    }
  };

  requestAnimationFrame(animation);
};

const renderTheme = themes => {
  const list = document.querySelector('.selection__list');
  list.textContent = '';

  const buttons = [];

  for (let i = 0; i < themes.length; i++) {
    const li = document.createElement('li');
    li.className = 'selection__item';

    const button = document.createElement('button');
    button.className = 'selection__theme';
    button.dataset.id = themes[i].id;
    button.textContent = themes[i].theme;

    li.append(button);
    list.append(li);

    buttons.push(button);
  }

  return buttons;
};

const createAnswer = data => {
  const type = data.type;

  return data.answers.map(item => {
    const label = document.createElement('label');
    label.className = 'answer';

    const input = document.createElement('input');
    input.type = type;
    input.name = 'answer';
    input.className = `answer__${type}`;

    const text = document.createTextNode(item);

    label.append(input, text);

    return label;
  });
}

const renderQuiz = quiz => {
  hideElem(title);
  hideElem(selection);

  const questionBox = document.createElement('div');
  questionBox.className = 'main__box main__box--question';

  main.append(questionBox);

  let questionCount = 0;

  const showQuestion = () => {
    const data = quiz.list[questionCount];
    questionCount++;

    questionBox.textContent = '';

    const form = document.createElement('form');
    form.className = 'main__form-question';
    form.dataset.count = `${questionCount}/${quiz.list.length}`;

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.className = 'main__subtitle';
    legend.textContent = data.question;

    const answers = createAnswer(data);

    const button = document.createElement('button');
    button.className = 'main__btn question__next';
    button.type = 'submit';
    button.textContent = 'Подтвердить';


    fieldset.append(legend, ...answers);
    form.append(fieldset, button);
    questionBox.append(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let ok = false;
      const answer = [...form.answer].map(input => {
        if (input.checked) ok = true;
        return input.checked ? input.value : false;
      });

      if (ok) {
        console.log(answer);
      } else {
        console.log('не выбран не один ответ');
      }
    })

  };

  showQuestion();
};

const addClick = (buttons, data) => {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const quiz = data.find(item => item.id === btn.dataset.id);
      renderQuiz(quiz);
    });
  })
};

const initQuiz = () => {

  const data = getData();
  const buttons = renderTheme(data);

  addClick(buttons, data);
};

initQuiz();