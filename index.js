const page = document.title; //Title страницы

// Header для всех страниц (кроме Авторизации)
if (page !== 'Авторизация - Кинотеатр им. Горького') {
  const openButton = document.querySelector('#open-sidebar-button');
  const navbar = document.querySelector('.header__menu');

  const media = window.matchMedia('(max-width: 767px)');

  media.addEventListener('change', (event) => updateNavbar(event));

  function updateNavbar(event) {
    const isMobile = event.matches;
    if (isMobile) {
      navbar.setAttribute('inert', '');
    }
    else {
      navbar.removeAttribute('inert');
    }
  }

  function openSidebar() {
    navbar.classList.toggle('show');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
  }

  function closeSidebar() {
    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('inert', '');
  }

  updateNavbar(media);
}

// Баннер для Главной страницы
if (page === 'Кинотеатр им. Горького') {

  const slider = document.querySelector(".slider")
  const trail = document.querySelector(".trail").querySelectorAll("div")
  
  let value = 0
  let trailValue = 0
  let interval = 10000
  
  const slide = (condition) => {
    clearInterval(start)
    condition === "increase" ? initiateINC() : initiateDEC()
    move(value, trailValue)
    animate()
    start = setInterval(() => slide("increase"), interval);
  }
  
  const initiateINC = () => {
    trail.forEach(cur => cur.classList.remove("is-active"))
    value === 80 ? value = 0 : value += 20
    trailUpdate()
  }
  
  const initiateDEC = () => {
    trail.forEach(cur => cur.classList.remove("is-active"))
    value === 0 ? value = 80 : value -= 20
    trailUpdate()
  }
  
  const move = (S, T) => {
    slider.style.transform = `translateX(-${S}%)`
    trail[T].classList.add("is-active")
  }
  
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
  
  const animate = () => tl.restart()
  
  const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0
    } else if (value === 20) {
        trailValue = 1
    } else if (value === 40) {
        trailValue = 2
    } else if (value === 60) {
        trailValue = 3
    } else {
        trailValue = 4
    }
  }   
  
  let start = setInterval(() => slide("increase"), interval)
  
  document.querySelectorAll("svg").forEach(cur => {
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"))
  })
  
  const clickCheck = (e) => {
    clearInterval(start)
    trail.forEach(cur => cur.classList.remove("is-active"))
    const check = e.target
    check.classList.add("is-active")
  
    if(check.classList.contains("trail__item_1")) {
        value = 0
    } else if (check.classList.contains("trail__item_2")) {
        value = 20
    } else if (check.classList.contains("trail__item_3")) {
        value = 40
    } else if (check.classList.contains("trail__item_4")) {
        value = 60
    } else {
        value = 80
    }
    trailUpdate()
    move(value, trailValue)
    animate()
    start = setInterval(() => slide("increase"), interval)
  }
  
  trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)))
  
  const touchSlide = (() => {
    let start, move, change, sliderWidth
  
    slider.addEventListener("touchstart", (e) => {
        start = e.touches[0].clientX
        sliderWidth = slider.clientWidth/trail.length
    })
    
    slider.addEventListener("touchmove", (e) => {
        e.preventDefault()
        move = e.touches[0].clientX
        change = start - move
    })
  
    const mobile = (e) => {
        change > (sliderWidth/4)  ? slide("increase") : null;
        (change * -1) > (sliderWidth/4) ? slide("decrease") : null;
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    slider.addEventListener("touchend", mobile)
  })()

}

// Переход на страницу фильмов
if (
  page === 'Кинотеатр им. Горького' || 
  page === 'Скоро - Кинотеатр им. Горького'
) {
  
  let movies = {
    sonic_3: {
      title: 'Соник 3',
      poster: './images/movie/sonic_3/poster.png',
      start: 'c 27 декабря 2024',
      country: 'США,Япония',
      genre: 'фантастика, фэнтези, боевик, комедия, приключения, семейный',
      director: 'Джефф Фаулер',
      script: 'Джон Уиттингтон, Патрик Кейси, Джош Миллер',
      starring: 'Бен Шварц, Коллин О’Шонесси, Идрис Эльба, Киану Ривз, Тика Самптер, Том Батлер, Джеймс Марсден, Элайла Браун, Джим Керри, Ли Мадждуб',
      age: '6',
      duration: '109 ',
      description: 'Соник, Наклз и Тейлз воссоединяются против нового могущественного противника, Ежа Шэдоу, таинственного злодея с силами, не похожими ни на что, с чем они сталкивались раньше. С их способностями, превосходящими во многих отношениях, команда Соника вынуждена создать неожиданный союз в надежде остановить Шэдоу и защитить планету.',
      trailer: 'https://www.youtube.com/embed/Mdsn1TSTHGY?si=R6oAFvoKeVaA2kvK',
      session: {
        '23 января': {
          time1: '9:20',
          time2: '14:40',
          time3: '11:20',
        },
        '24 января': {
          time1: '9:50',
          time2: '12:20',
        },
        '25 января': {
          time1: '11:20',
          time2: '14:00',
        }
      },
      comments: {
        1 : {
          name: 'Александр',
          text: 'Весёлый и динамичный фильм с крутыми спецэффектами и отличной игрой актёров. Шэдоу понравился, а Джим Керри, как всегда, на высоте!',
        },
        2 : {
          name: 'Степан',
          text: 'Свет выключили на половине фильма. Жаль!',
        },
      },
    },

    the_wizard_of_oz: {
      title: 'Волшебник Изумрудного города',
      poster: './images/movie/the_wizard_of_oz/poster.png',
      start: 'с 02 января, 2025',
      country: 'Россия',
      genre: '	фэнтези, приключения, семейный',
      director: 'Игорь Волошин',
      script: 'Тимофей Декин, Роман Непомнящий, Александр Волков',
      starring: '	Екатерина Червова, Юрий Колокольников, Евгений Чумак, Артур Ваха, Светлана Ходченкова, Василина Маковцева, Дмитрий Чеботарёв, Сергей Епишев, Денис Власенко, Егор Корешков',
      age: '6',
      duration: '103',
      description: 'В далёком городе живёт девочка Элли. Однажды злая колдунья Гингема наколдовала ураган, который унёс Элли и ее собачку Тотошку в страну Жевунов. Чтобы вернуться домой, Элли вместе с друзьями — Страшилой, Железным Дровосеком и Трусливым Львом — отправится по желтой кирпичной дороге в Изумрудный город на поиски Волшебника, который исполнит их заветные желания.',
      trailer: 'https://www.youtube.com/embed/PJbYbHaUAW0?si=NBtvgsbk15RD6Tbj',
      session: {
        '23 января': {
          time1: '9:20',
          time2: '14:40',
          time3: '11:20',
        },
        '24 января': {
          time1: '9:50',
          time2: '12:20',
        },
        '25 января': {
          time1: '11:20',
          time2: '14:00',
        }
      },
      comments: {
        1 : {
          name: 'Оксана',
          text: 'Актёры сыграли отлично, а спецэффекты на высоте. Классическая история, но в новом свете. Подходит для всей семьи!',
        },
      },
    },

    ivan_tsarevich_and_the_gray_wolf_6: {
      title: 'Иван Царевич и Серый Волк 6',
      poster: './images/movie/ivan_tsarevich_and_the_gray_wolf_6/poster.png',
      start: 'с 26 декабря, 2024',
      country: 'Россия',
      genre: 'мультфильм, приключения, фэнтези',
      director: 'Дарина Шмидт, Константин Феоктистов',
      script: 'Александр Боярский, Александра Шоха',
      starring: 'Никита Ефремов, Александр Боярский',
      age: '6',
      duration: '85',
      description: 'По щучьему велению, по царскому хотению Иван и его верные друзья отправляются на волшебную выставку чудес со всего сказочного мира — других посмотреть и себя показать. На кону честь Тридевятого царства, а исполняющая желания Щука — как назло, возьми да исчезни. Спасать положение, как всегда, приходится Ивану, Серому Волку и Василисе. Там, на неведомых дорожках, им предстоит встретить Колобка, отыскать рыбу их мечты и потягаться в смекалке с коварным волшебником. А главное, доказать всему сказочному миру, что самое важное в любой сказке — это смелость, дружба и, конечно, любовь.',
      trailer: 'https://www.youtube.com/embed/w5Jdg40n6gM?si=CyIGgfudlZs5O-JJ',
      session: {
        '23 января': {
          time1: '10:20',
          time2: '13:50',
        },
        '24 января': {
          time1: '8:40',
          time2: '11:30',
        },
        '25 января': {
          time1: '12:00',
        }
      },
      comments: {
        1 : {
          name: 'Иван',
          text: 'Намного лучше 4 и 5 части, но хуже первых трёх.',
        },
      },
    },

    the_last_ronin: {
      title: 'Последний ронин',
      poster: './images/movie/the_last_ronin/poster.png',
      start: 'с 26 декабря, 2024',
      country: 'Россия',
      genre: 'фантастика, приключения',
      director: 'Макс Шишкин',
      script: 'Макс Шишкин',
      starring: 'Юрий Колокольников, Диана Енакаева, Даниил Воробьев, Тихон Жизневский, Александр Мизев',
      age: '16',
      duration: '120',
      description: 'Действие разворачивается в будущем, где из-за изменений климата, приведших к глобальной ядерной войне, цивилизация практически уничтожена. Земли выжжены, города разрушены, техника не работает, бензин перестал быть основным топливом. Главная валюта в этом мире — два патрона: 9 и 7,62 мм от АК-47.',
      trailer: 'https://www.youtube.com/embed/IEpdZ_eGjkc?si=leCsvqMVEhtqhLax',
      session: {
        '23 января': {
          time1: '10:20',
          time2: '13:50',
        },
        '24 января': {
          time1: '8:40',
          time2: '11:30',
        },
        '25 января': {
          time1: '12:00',
        }
      },
      comments: {
        1 : {
          name: 'Алексей',
          text: 'Фильм с классной атмосферой и крутыми боевыми сценами, но сюжет слишком предсказуем. Актёры играют неплохо, но каких-то сильных эмоций не вызывают. Визуально фильм красивый, но в целом оставляет ощущение, что можно было бы сделать намного интереснее. Если любите постапокалипсис и боевики — посмотрите, но особо не ждите чего-то неожиданного.',
        },
      },
    },

    mufasa_the_lion_king: {
      title: 'Муфаса: король лев',
      poster: './images/movie/mufasa_the_lion_king/poster.png',
      start: 'с 19 декабря, 2024',
      country: 'США',
      genre: 'мультфильм, мюзикл, фэнтези, драма, приключения, семейный',
      director: 'Барри Дженкинс',
      script: 'Джефф Натансон, Линда Вулвертон, Ирен Меччи',
      starring: 'Аарон Пьер, Дональд Гловер, Келвин Харрисон мл., Сет Роген, Билли Айкнер, Джон Кани, Мадс Миккельсен, Тандиве Ньютон, Блу Айви Картер, Кит Дэвид',
      age: '6',
      duration: '120',
      description: 'Осиротевший Муфаса знакомится с наследником королевских кровей по имени Така. Вместе они отправляются в судьбоносное опасное путешествие, которое проверит их дружбу на прочность.',
      trailer: 'https://www.youtube.com/embed/v46jwQKUnsY?si=NPn_-UueB7pKscY9',
      session: {
        '23 января': {
          time1: '10:20',
          time2: '13:50',
        },
        '24 января': {
          time1: '8:40',
          time2: '11:30',
        },
        '25 января': {
          time1: '12:00',
        }
      },
      comments: {
        1 : {
          name: 'Ульяна',
          text: 'Графика шикарная, музыка хорошая, но сюжет предсказуемый и слишком простой. В целом, неплохой, но до оригинала не дотягивает.',
        },
      },
    },

    craven_the_hunter: {
      title: 'Крейвен‑Охотник',
      poster: './images/movie/craven_the_hunter/poster.png',
      start: 'с 12 декабря, 2024',
      country: 'США',
      genre: 'боевик, триллер',
      director: 'Джей Си Чендор',
      script: 'Джефф Натансон, Линда Вулвертон, Ирен Меччи',
      starring: 'Аарон Тейлор-Джонсон, Рассел Кроу, Кристофер Эбботт, Фред Хекинджер, Ариана Дебоуз, Алессандро Нивола, Леви Миллер',
      age: '16',
      duration: '127',
      description: 'Русский иммигрант Сергей Кравинофф должен доказать, что он величайший охотник в мире.',
      trailer: 'https://www.youtube.com/embed/9eF3kupk-yg?si=aU34Lt5LbEhnb1FH',
      session: {
        '23 января': {
          time1: '10:20',
          time2: '13:50',
        },
        '24 января': {
          time1: '8:40',
          time2: '11:30',
        },
        '25 января': {
          time1: '12:00',
        }
      },
      comments: {
        1 : {
          name: 'Станислав',
          text: 'С одной стороны, экшен крутой, главного героя показали брутальным и безжалостным, как и ожидалось. Аарон Тейлор-Джонсон отлично справился с ролью. Но сюжет довольно простой и предсказуемый, местами не хватало динамики. Некоторые сцены показались слишком затянутыми. В целом, фильм нормальный, но ожидал большего. Если любите фильмы про антигероев — можно глянуть, но шедевра не ждите.',
        },
      },
    },

    the_three_cats_winter_vacation: {
      title: 'Три кота. Зимние каникулы',
      poster: './images/movie/the_three_cats_winter_vacation/poster.png',
      start: 'с 12 декабря, 2024',
      country: 'Россия',
      genre: 'мультфильм',
      director: 'Дмитрий Высоцкий',
      script: 'Дарина Шмидт, Дмитрий Высоцкий',
      starring: 'Аарон Тейлор-Джонсон, Рассел Кроу, Кристофер Эбботт, Фред Хекинджер, Ариана Дебоуз, Алессандро Нивола, Леви Миллер',
      age: '0',
      duration: '68',
      description: 'Коржик, Карамелька и Компот мечтают о ярком и необычном праздновании Нового года, это их главная цель. Но когда появляется котенок Леденец, они переключаются на него и вынуждены спасать Леденца и его родителей. И внезапно Новый год получается еще лучше, чем они ожидали.',
      trailer: 'https://www.youtube.com/embed/VoIFN58bVkg?si=si3ygeeWBpyrqk6-',
      session: {
        '23 января': {
          time1: '10:20',
          time2: '13:50',
        },
        '24 января': {
          time1: '8:40',
          time2: '11:30',
        },
        '25 января': {
          time1: '12:00',
        }
      },
      comments: {
        1 : {
          name: 'Анна',
          text: 'Посмотрели с детьми «Три кота. Зимние каникулы» — очень добрый и уютный мультфильм! Много смешных и интересных моментов, а ещё понравилось, что в нём есть поучительные моменты, но без занудства. Рисовка яркая, персонажи всё такие же милые. Детям понравилось, да и взрослым было интересно смотреть. Отличный вариант для семейного просмотра в праздники!',
        },
      },
    },

    another_world_year_of_the_wolf: {
      title: 'Другой мир: Год волка',
      poster: './images/movie/another_world_year_of_the_wolf/poster.png',
      start: 'с 5 декабря, 2024',
      country: 'США',
      genre: 'экшн, хоррор, фантастика',
      director: 'Стивен С. Миллер',
      script: 'Мэттью Кеннеди',
      starring: 'Фрэнк Грилло, Катрина Ло, Лу Даймонд Филлипс, Ильфенеш Хадера, Сэм Дэйли',
      age: '18',
      duration: '94',
      description: 'Человечество переживает новую эпидемию, которая раз в два года превращает обычных людей в оборотней. Миллиарды уже заражены, остальные живут в страхе за себя и своих близких. Близится еще одна судная ночь, когда каждый может оказаться в свете Кровавой Луны и превратиться в чудовище из древних легенд.',
      trailer: 'https://www.youtube.com/embed/O35U4CCNAyw?si=Tgf-UoknjERJVDbe',
      session: {
        '23 января': {
          time1: '10:20',
          time2: '13:50',
        },
        '24 января': {
          time1: '8:40',
          time2: '11:30',
        },
        '25 января': {
          time1: '12:00',
        }
      },
      comments: {
        1 : {
          name: 'Никита',
          text: 'Фильм, который вызвал смешанные чувства. С одной стороны, идея с суперлунием, превращающим людей в оборотней, показалась интересной. Однако реализация подвела: спецэффекты оставляют желать лучшего, а сюжет предсказуем. Ожидал большего от франшизы «Другой мир», но, к сожалению, фильм не оправдал надежд. Рекомендую к просмотру только ярым поклонникам жанра.',
        },
      },
    },
  }
  
  document.addEventListener('click', function(event) {
    const movieElement = event.target.closest('[data-movie]');
  
    if (movieElement) {
      const movieName = movieElement.getAttribute('data-movie');
      
      localStorage.setItem('selectedMovie', JSON.stringify(movies[movieName]));
      
      window.location.href = `movie.html`;
    }
  });
}

if (page === 'Страница фильма - Кинотеатр им. Горького') {

  document.addEventListener('DOMContentLoaded', function () {
    const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
  
    if (movieData) {
      // Название фильма
      document.querySelector('[data-movie-title]').textContent = movieData.title;
      // Постер фильма
      document.querySelector('[data-movie-poster]').setAttribute('src', movieData.poster);
      // Основные данные
      document.querySelector('[data-movie-start]').textContent = `СТАРТ: ${movieData.start}`;
      document.querySelector('[data-movie-country]').textContent = `СТРАНА: ${movieData.country}`;
      document.querySelector('[data-movie-genre]').textContent = `ЖАНР: ${movieData.genre}`;
      document.querySelector('[data-movie-director]').textContent = `РЕЖИССЕР: ${movieData.director}`;
      document.querySelector('[data-movie-script]').textContent = `СЦЕНАРИЙ: ${movieData.script}`;
      document.querySelector('[data-movie-starring]').textContent = `В РОЛЯХ: ${movieData.starring}`;
      document.querySelector('[data-movie-age]').textContent = `ВОЗРАСТ: ${movieData.age}+`;
      document.querySelector('[data-movie-duration]').textContent = `ПРОДОЛЖИТЕЛЬНОСТЬ: ${movieData.duration} мин`;
      document.querySelector('[data-movie-description]').textContent = `ОПИСАНИЕ: ${movieData.description}`;
      
      // Трейлер
      document.querySelector('[data-movie-trailer]').setAttribute('src', movieData.trailer);

      // Сеансы
      const datePicker = document.querySelector('.session__date-picker');
      const sessionKeys = Object.keys(movieData.session);
      const dateCount = Math.min(sessionKeys.length, 3); 

      for (let i = 0; i < dateCount; i++) {
        const sessionDate = sessionKeys[i];
        const button = document.createElement('button');
        button.textContent = sessionDate;
        button.setAttribute('data-session-date', sessionDate);
        button.classList.add('session__date-button', 'btn', 'btn_available');
        datePicker.appendChild(button);
      }

      const firstButton = datePicker.querySelector('.session__date-button');
      if (firstButton) {
        firstButton.classList.add('is-active');
        updateSessions(firstButton.getAttribute('data-session-date')); 
      }

      datePicker.addEventListener('click', function (event) {
        if (event.target.matches('.session__date-button')) {
          const allButtons = datePicker.querySelectorAll('.session__date-button');
          allButtons.forEach(button => button.classList.remove('is-active'));

          event.target.classList.add('is-active');

          const selectedDate = event.target.getAttribute('data-session-date');
          updateSessions(selectedDate);
        }
      });

      function updateSessions(date) {
        const sessionsForSelectedDate = movieData.session[date];

        const sessionWrapper = document.querySelector('.session__wrapper');
        sessionWrapper.innerHTML = '';

        if (sessionsForSelectedDate) {
          Object.values(sessionsForSelectedDate).forEach(sessionTime => {
            const sessionItem = document.createElement('div');
            sessionItem.classList.add('session__item');
            sessionItem.innerHTML = `
              <div class="session__time">Сеанс: ${sessionTime}</div>
              <button class="session__buy-btn btn btn_available">Купить билеты</button>
            `;
            sessionWrapper.appendChild(sessionItem);
          });
        } else {
          sessionWrapper.innerHTML = '<p>Сеансов на выбранную дату нет.</p>';
        }
      }

      // Покупка билета
      const buyBtns = document.querySelectorAll('.session__buy-btn');
      buyBtns.forEach(btn => {
          btn.addEventListener('click', function () {
              document.getElementById('modal-ticket').style.display = 'flex';
          });
      });

      document.getElementById('modal-close').addEventListener('click', function () {
          document.getElementById('modal-ticket').style.display = 'none';
      });

      const seats = document.querySelectorAll('.seat');
      let totalPrice = 0;
      seats.forEach(seat => {
          seat.addEventListener('click', function () {
              if (seat.classList.contains('seat_selected') ) {
                  seat.classList.remove('seat_selected');
                  totalPrice -= getPrice(seat);
              } else {
                  seat.classList.add('seat_selected');
                  totalPrice += getPrice(seat);
              }
              document.getElementById('total-price').textContent = totalPrice;
          });
      });

      function getPrice(seat) {
          if (seat.classList.contains('seat_green') || seat.classList.contains('seat_blue')) {
              return 40; 
          }
          if (seat.classList.contains('seat_red')) {
              return 45;
          }
          return 0;
      }

      document.getElementById('confirm-ticket').addEventListener('click', function () {
        alert(`Вы купили билеты на сумму ${totalPrice} ₽`);
        
        localStorage.removeItem('selectedSeats');
        totalPrice = 0;
        document.getElementById('total-price').textContent = totalPrice;
    
        document.getElementById('modal-ticket').style.display = 'none';
    
        seats.forEach(seat => seat.classList.remove('seat_selected'));
      });
        
      // Комментарии
      if (movieData.comments && Object.keys(movieData.comments).length > 0) {
        const commentsList = document.querySelector('.comments__list');
        
        commentsList.innerHTML = '';
      
        Object.values(movieData.comments).forEach(comment => {
          const commentItem = document.createElement('div');
          commentItem.classList.add('comments__item');
          
          const authorDiv = document.createElement('div');
          authorDiv.classList.add('comments__author');
          authorDiv.textContent = comment.name;
      
          const textDiv = document.createElement('div');
          textDiv.classList.add('comments__text');
          textDiv.textContent = comment.text;
      
          commentItem.appendChild(authorDiv);
          commentItem.appendChild(textDiv);
      
          commentsList.appendChild(commentItem);
        });
      }
    }
  });
}


// Форма Контакты
if (page === 'Контакты - Кинотеатр им. Горького') {

  const form = document.querySelector('.contacts__form');
  const inputs = form.querySelectorAll('.input');
  const submitButton = form.querySelector('.btn');

  function checkFormValidity() {
    const allValid = Array.from(inputs).every(input => input.value.trim() !== '' && input.checkValidity());
    if (allValid) {
      submitButton.classList.remove('btn__disabled'); 
      submitButton.classList.add('btn__available'); 
      submitButton.disabled = false; 
    } else {
      submitButton.classList.remove('btn__available'); 
      submitButton.classList.add('btn__disabled'); 
      submitButton.disabled = true;
    }
  }

  inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
  });

  form.addEventListener('reset', () => {
    submitButton.classList.remove('btn__available');
    submitButton.classList.add('btn__disabled');
    submitButton.disabled = true;
  });

  document.addEventListener('DOMContentLoaded', checkFormValidity);

}

// Форма Авторизации
if (page === 'Авторизация - Кинотеатр им. Горького') {

  function showLogin() {
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('register-form').style.display = 'none';

    document.querySelectorAll('.auth__tab').forEach(tab => {
      tab.classList.remove('is-active');
    });
    document.querySelector('.auth__tab:nth-child(1)').classList.add('is-active');
  }

  function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'flex';

    document.querySelectorAll('.auth__tab').forEach(tab => {
      tab.classList.remove('is-active');
    });
    document.querySelector('.auth__tab:nth-child(2)').classList.add('is-active');
  }

}



