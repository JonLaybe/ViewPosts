export class Post { // класс описывает пост
    #_userId; // id пользователя
    #_id; // id
    #_title; // Заголовок поста
    #_body; // Текст поста
    /*
    Описание:
        Функция описывающая пост HTML кодом.
    Параметры:
        parameter:dictionary - аргументы используемые при построении HTML кода.
    Возврат:
        Object - Функция возвращает HTML элемент.
    */
    #_funcPatternPost;
    constructor(userId, id, title, body, funcPatternPost) {
        this.#_userId = userId;
        this.#_id = id;
        this.#_title = title;
        this.#_body = body;
        this.#_funcPatternPost = funcPatternPost;
    }

    get userId() { return this.#_userId; }
    get id() { return this.#_id; }
    get title() { return this.#_title; }
    get body() { return this.#_body; }
    
    /*
    Описание:
        Функция описывающая пост HTML кодом.
    Возврат:
        Object - Функция возвращает HTML элемент.
    */
    GetHtml() {
        return this.#_funcPatternPost({ 'title': this.#_title, 'textContent': this.#_body });
    }
}