<h1>CI for Build</h1>


<h2>Запуск server</h2>

`npm i` <br />

`npm start` <br />

[Перейти по ссылке](http://localhost:4003/)

<h2>Запуск agent</h2>

`npm i` <br />

`npm start` <br />

<h2>Как пользоваться</h2>

1) Чтобы сбилдить проект нужно ввести команду для билда и ветка в которой хотите сбилдеть, если ветка нужна по дефолту, то можно не вводить название ветки. <br />

2) После того как сбилдется, то на странице появится номер билда и его статус. По ссылке можно перейти и там будет вся информация о билде. Так же эта информация хранится в файле на сервере.<br />

<h2>Не реализовал</h2>

1) Запуск нескольких агентов(не успел, постараюсь до проверки успеть)

2) Статус агента о его занятости. В данный момент одному агенту можно отправлять данные и он будет выполнять в отдельном процессе параллельно.(есть наработки. Не успел доделать)

3) На странице информации о билде, в данный момент показывается инфо только до выключения сервера. Если сервер выключить то билды которые были до этого не работают. (Сначала сделал так как сейчас, а потом начала запоминать инфо в файлы. Не успел переделать)
