export class Comment { // класс описывающий коментарий
    #_postId; // id пост
    #_id; // id
    #_name; // имя
    #_email; // почта
    #_body; // текст комментария
    /*
    Описание:
        Функция описывающая комментарий HTML кодом.
    Параметры:
        parameter:dictionary - аргументы используемые при построении HTML кода.
    Возврат:
        Object - Функция возвращает HTML элемент.
    */
    #_funcPatternCommnet;

    constructor(postId, id, name, email, body, funcPatternCommnet) {
        this.#_postId = postId;
        this.#_name = name;
        this.#_email = email;
        this.#_body = body;
        this.#_funcPatternCommnet = funcPatternCommnet;
    }

    get postId() { return this.#_postId; }
    get id() { return this.#_id; }
    get name() { return this.#_name; }
    get email() { return this.#_email; }
    get body() { return this.#_body; }

    /*
    Описание:
        Функция описывающая комментарий HTML кодом.
    Возврат:
        Object - Функция возвращает HTML элемент.
    */
    GetHtml() {
        return this.#_funcPatternCommnet({ 'name': this.#_name, 'email': this.#_email, 'textContent': this.#_body });
    }
}