import { AdapterPost } from "./AdapterPost.js";
import { AdapterComment } from "./AdapterComment.js";

export class ParserJson { // парсит сайт с json объектами
    /*
    Описание:
        Функция получения постов.
    Параметры:
        startId:int - стартовый id поста;
        endId:int - последний id поста (не включительно);
        url:string - сслыка на сайт с json объектами;
        funcPatternPost:function -
            Описание:
                Функция описывающая пост HTML кодом.
            Параметры:
                parameter:dictionary - аргументы используемые при построении HTML кода.
            Возврат:
                Object - Функция возвращает HTML элемент.
    Возврат:
        Array<Post> - Функция возвращает массив экземпляров Post.
    */
    static async GetPostsAsync(startId, endId, url, funcPatternPost) {
        let listPosts = [];
        for (let i = startId; i < endId; i++) {
            const response = await fetch(`${url}/${i}`);
            if (!response.ok){
                break;
            }
            const data = await response.json();
            listPosts.push(new AdapterPost(data, funcPatternPost));
        }

        return listPosts;
    }
    /*
    Описание:
        Функция получения комментариев.
    Параметры:
        idPost:int - id поста;
        url:string - сслыка на сайт с json объектами;
        funcPatternPost:function -
            Описание:
                Функция описывающая комментарий HTML кодом.
            Параметры:
                parameter:dictionary - аргументы используемые при построении HTML кода.
            Возврат:
                Object - Функция возвращает HTML элемент.
    Возврат:
        Array<Post> - Функция возвращает массив экземпляров Post.
    */
    static async GetCommentsAsync(idPost, url, funcPatternCommnet) {
        let listComments = [];

        await fetch(`${url}/?postId=${idPost}`).then(response => response.json()).then(data => {
            if (typeof data === 'object' && data !== null)
                if (Array.isArray(data))
                    data.forEach(item => {
                        listComments.push(new AdapterComment(item, funcPatternCommnet));
                    });
            });

        return listComments;
    }
}