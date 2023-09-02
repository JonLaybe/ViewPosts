import { Comment } from "./Comment.js";

export class AdapterComment extends Comment { // класс адаптирует Object в Comment
    /*
    obj:Object - объект описывающий комментарий;
    funcPatternCommnet:function -
        Описание:   
            Функция описывающая комментарий HTML кодом.
        Параметры:
            parameter:dictionary - аргументы используемые при построении HTML кода.
        Возврат:
            Object - Функция возвращает HTML элемент.
    */
    constructor(obj, funcPatternCommnet) {
        super(obj.postId, obj.id, obj.name, obj.email, obj.body, funcPatternCommnet);
    }
}