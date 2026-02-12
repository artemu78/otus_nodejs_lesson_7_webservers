# Express Image Server

Простое приложение на Express.js для загрузки и получения изображений.

## Установка и Запуск

1.  **Установите зависимости:**
    ```bash
    npm install
    ```

2.  **Запустите сервер:**
    ```bash
    npm start
    ```
    Сервер запустится на порту 3000 (по умолчанию).

## API

### 1. Загрузка изображения (`POST /setImage`)

Загружает изображение на сервер. Обратите внимание, что сервер принимает **только** сырые бинарные данные (raw binary), а не `multipart/form-data`.

**Использование с cURL:**

Замените `path/to/image.jpg` на путь к вашему файлу изображения.

```bash
curl -v -H "Content-Type: application/octet-stream" --data-binary @path/to/image.jpg http://localhost:3000/setImage
```

**Ответ:**
-   `201 Created`: Image uploaded
-   `400 Bad Request`: Если отправлен multipart запрос или пустое тело.

### 2. Получение последнего изображения (`GET /getImage`)

Возвращает последнее загруженное изображение из папки `public/images`.

**Пример вызова:**

Открыть в браузере: `http://localhost:3000/getImage`

Или через curl:
```bash
curl http://localhost:3000/getImage --output latest.jpg
```

### 3. Приветствие по имени (`GET /names/:name`)

Возвращает приветственное сообщение.

**Пример:** `http://localhost:3000/names/World`
**Ответ:** `Hello World`

### 4. Главная страница (`GET /`)

Отображает стандартную страницу приветствия Express.

**URL:** `http://localhost:3000/`
