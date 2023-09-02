import { Post } from "./Post.js";

export class AdapterPost extends Post { // класс адаптирует Object в Post
    /*
    obj:Object - объект описывающий пост;
    funcPatternPost:function -
        Описание:
            Функция описывающая пост HTML кодом.
        Параметры:
            parameter:dictionary - аргументы используемые при построении HTML кода.
        Возврат:
            Object - Функция возвращает HTML элемент.
    */
    constructor(obj, funcPatternPost) {
        super(obj.userId, obj.id, obj.title, obj.body, funcPatternPost);
    }
}