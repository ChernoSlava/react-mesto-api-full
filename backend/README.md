[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

## Описание работы
### Описание прошлой версии
Это 13 проектная работа на курсе Яндекс.Практикум Черногорова Вячеслава.

В финальной версии он должен представлять социальную сеть, где пользователь может редактировать свой аккаунт, добавлять картинки, описывать их и лайкать понравившиеся.

В этом проекте мы самостоятельно пишем базовый backend для нашего приложения.

### Описание данной версии
Это 14 проектная работа на курсе Яндекс.Практикум Черногорова Вячеслава.

В финальной версии он должен представлять социальную сеть, где пользователь может редактировать свой аккаунт, добавлять картинки, описывать их и лайкать понравившиеся.

В этом проекте мы добавляем возможность авторизоваться и зарегистрироваться.

---

## Особенности проекта 13:

1. С самого начала устанавливаем и используем Eslint
2. Создаём схемы и модели для карточек и пользователей
3. Создаём контроллеры и роуты для карточек и пользователей
4. Используя Postman, через запрос создаём пользователя и с помощью его id реализуем временное решение авторизации
5. Правильно обрабатываем и выводим ошибки


## Особенности проекта 14:

1. Подключаем в проект авторизацию и регистрацию. 
2. Используем валидацию.
3. Правильно ловим ошибки.
---
 
## В проекте 13 использованы

* Node js 
* Express js 
* MongoDB 
* Mongoose

## В проекте 14 использованы

* Dotenv
* Helmet 
* Express rate lımıt 
* Celebrate
* Middlewares
---
---
## Ссылка на репозиторий с проектом
## https://github.com/ChernoSlava/express-mesto-gha
---
---
## Основные директории в проекте

- `/routes` — папка с файлами роутера  
- `/controllers` — папка с файлами контроллеров пользователя и карточки   
- `/models` — папка с файлами описания схем пользователя и карточки  
  
#### Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
___

## Сылки на прошлые версии проекта

### Репозиторий с проектом на чистом JavaScript => [Mesto: Vanilla JS](https://github.com/ChernoSlava/Mesto)

### Репозиторий с Frontend частью проекта => [Mesto: Frontend](https://github.com/ChernoSlava/react-mesto-auth)

{   
    "name": "Slava",
    "email": "slava@mail.ru",
    "password": "1234"
}

{
    "_id": "63b454dd2f759e66e805cd7b",
    "name": "Slava",
    "email": "slava@mail.ru",
    "__v": 0
}

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I0NTRkZDJmNzU5ZTY2ZTgwNWNkN2IiLCJpYXQiOjE2NzI3NjI2OTAsImV4cCI6MTY3MzM2NzQ5MH0.pxtYRhisiUq5JrZ7cAsaPGjIWjdegaPFy3-3l6gP6ws"

{   
    "country": "Russia",
    "director": "Slava",
    "duration": 120,
    "year": "1994",
    "description": "Adventure to Russia",
    "image": "https://img3.akspic.ru/previews/9/6/1/9/6/169169/169169-ty_zasluzhivaesh_vsyacheskogo_schastya-schaste-strah-voda-polety_na_vozdushnom_share-500x.jpg",
    "trailerLink": "https://www.youtube.com/watch?v=6DR1SqPYWCo",
    "thumbnail": "https://img3.akspic.ru/previews/9/6/1/9/6/169169/169169-ty_zasluzhivaesh_vsyacheskogo_schastya-schaste-strah-voda-polety_na_vozdushnom_share-500x.jpg",
    "movieId": 16,
    "nameRU": "Приключение в Россию",
    "nameEN": "Adventure to Russia"
}

movie
{
    "_id": "63b46482e14f7f01309f12a6",
    "country": "Russia",
    "director": "Slava",
    "duration": 120,
    "year": "1994",
    "description": "Adventure to Russia",
    "image": "https://img3.akspic.ru/previews/9/6/1/9/6/169169/169169-ty_zasluzhivaesh_vsyacheskogo_schastya-schaste-strah-voda-polety_na_vozdushnom_share-500x.jpg",
    "trailerLink": "https://www.youtube.com/watch?v=6DR1SqPYWCo",
    "thumbnail": "https://img3.akspic.ru/previews/9/6/1/9/6/169169/169169-ty_zasluzhivaesh_vsyacheskogo_schastya-schaste-strah-voda-polety_na_vozdushnom_share-500x.jpg",
    "movieId": 16,
    "nameRU": "Приключение в Россию",
    "nameEN": "Adventure to Russia",
    "owner": "63b454dd2f759e66e805cd7b",
    "__v": 0
}



 {
        "_id": "63b466a4e14f7f01309f12af",
        "country": "USA2",
        "director": "Slavaaaa, you should stop222!!!",
        "duration": 12020,
        "year": "20232",
        "description": "Adventure to California",
        "image": "https://img3.akspic.ru/previews/9/6/1/9/6/169169/169169-ty_zasluzhivaesh_vsyacheskogo_schastya-schaste-strah-voda-polety_na_vozdushnom_share-500x.jpg",
        "trailerLink": "https://www.youtube.com/watch?v=6DR1SqPYWCo",
        "thumbnail": "https://img3.akspic.ru/previews/9/6/1/9/6/169169/169169-ty_zasluzhivaesh_vsyacheskogo_schastya-schaste-strah-voda-polety_na_vozdushnom_share-500x.jpg",
        "movieId": 22,
        "nameRU": "Приключение в Калифорнии",
        "nameEN": "Adventure to California",
        "owner": "63b454dd2f759e66e805cd7b",
        "__v": 0
    }
