# Спортивные объекты россии

Проект для олимпиады «Траектория будущего» (2023)

[Задание](https://docs.google.com/document/d/1WRvwdG5xK0eFVcz1GSATC016I4LniECu/edit#)

## Установка и запуск

NodeJs версии v16.17.0 и выше

Необходимо использовать две консоли для тестового запуска проекта

Для установки компонентов Frontend и последующий запуск
* `cd frontend`
* `npm i`
* `npm start`

Для установки компонентов Backend и последующий запуск
* `cd backend`
* `npm i`
* `node server`

## CI/CD

Представлен GitHub Action'ом<br/>
В файле build.yml реализован тест backend'ом и сборк проекта react в папку build внутри экшена, статус теста и сборки будет показан в истории коммита.

## Test

Для тестирование заполнения информации из csv файлов, также данная процедура выполняется в GitHub Action, в случае ошибки теста покажется в истории коммита.
* `cd backend`
* `npm i`
* `npm test`

## Видео проекта

[На гугл диск](https://drive.google.com/file/d/1j_sY9xmfGGBGIOxs7ml-zC15QkJLw6m_/view?usp=share_link)

## Видео первого запуска

[На гугл диск](https://drive.google.com/file/d/1H0kaf00nrfG9ZjgOkTisjQsLkY24qGTL/view?usp=share_link)

## [Figma](https://www.figma.com/file/VrhlvZ7qEjK7n0wfB0Incf/Untitled?node-id=1%3A2&t=1XyIDhguVdr4XiFU-1)

![Работающий вариант](https://github.com/DaniilMpala/sportFacilily/blob/master/Screen.png)

## [GitHub Action](https://github.com/DaniilMpala/sportFacilily/blob/master/Action.png)

![Работающий вариант](https://github.com/DaniilMpala/sportFacilily/blob/master/Action.png)
