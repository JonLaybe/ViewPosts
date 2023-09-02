import { ParserJson } from "./model/ParserJson.js";

class PostBox { // класс для работы с блоком пост
    static #posts = document.getElementById("FieldPosts"); // элемент где храниться все посты

    static GetControllersButton(id, eventButton) {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'controllersButton';
        let openCommentsBtn = document.createElement('button');
        openCommentsBtn.className = 'openCommentsBtn overrideButtonStyle';
        openCommentsBtn.setAttribute('id', `openCommentsBtn_${id}`);
        openCommentsBtn.setAttribute('received', 'false');
        openCommentsBtn.setAttribute('isOpen', 'false');
        openCommentsBtn.addEventListener("click", (event) => {
            eventButton();
        });
        openCommentsBtn.innerHTML += `
        <svg class="overrideIconSvgStyle iconMessage">
            <path
                d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H5.2L4 17.2V4H20V16Z" />
        </svg>`;

        mainDiv.appendChild(openCommentsBtn);

        return mainDiv;
    }

    static CreatePostBox(post, eventButton) {// создает postbox
        let mainDiv = document.createElement('div');
        mainDiv.className = 'postbox';
        mainDiv.setAttribute('id', `postbox_${post.id}`);
        let controllersButton = document.createElement('div');
        controllersButton.className = 'controllersButton';
        let svgBlock = document.createElement('svg');
        svgBlock.className = 'openCommentsBtn';
        let openCommentsBtn = this.GetControllersButton(post.id, eventButton);
        let commentsBox = document.createElement('div');
        commentsBox.className = 'commentsBox';
        commentsBox.setAttribute('id', `commentsBox_${post.id}`);

        svgBlock.appendChild(openCommentsBtn);

        controllersButton.appendChild(svgBlock);
        mainDiv.appendChild(post.GetHtml());
        mainDiv.appendChild(controllersButton);
        mainDiv.appendChild(commentsBox);
        this.#posts.appendChild(mainDiv);

        return mainDiv;
    }
    static AppendComment(id, comment) { // добавляет комментарии
        let commentBox = document.getElementById(`commentsBox_${id}`);
        commentBox.style.display = 'block';
        if (Array.isArray(comment)) {
            comment.forEach(item => {
                let html = commentBox.appendChild(item.GetHtml());
            });
        }
    }
    static Clear(){ // отчищает FieldPosts от постов(postbox)
        while (this.#posts.firstChild) {
            this.#posts.removeChild(this.#posts.firstChild);
        }
    }
}

function PostHTML (parameter) { // Получение блока post, как HTML элемента
    let postDiv = document.createElement('div');
    postDiv.className = 'post';
    let postTitleDiv = document.createElement('div');
    postTitleDiv.className = 'post__title defaultTextPost';
    let postTextDiv = document.createElement('div');
    postTextDiv.className = 'post__text';
    let titleH = document.createElement('h2');
    titleH.className = 'defaultTextTitle';
    titleH.textContent = parameter['title'];
    let textP = document.createElement('p');
    textP.textContent = parameter['textContent'];

    postTitleDiv.appendChild(titleH);
    postTextDiv.appendChild(textP);
    postDiv.appendChild(postTitleDiv);
    postDiv.appendChild(postTextDiv);

    return postDiv;
}

function CommentHTML (parameter) { // Получение блока Comment, как HTML элемента
    let commentDiv = document.createElement('div');
    commentDiv.className = 'commentsBox__comment';
    commentDiv.innerHTML += `
        <div class="comment__header">
            <div class="photo">
                <div class="photo__background"></div>
                <img src="src\\assets\\image\\defaultIcon.jpg" class="photo__icon">
            </div>
            <div class="nameUser">
                <h3 class="name defaultTextTitle">${parameter['name']}</h3>
                <h4 class="email defaultTextTitle">${parameter['email']}</h4>
            </div>
        </div>
        <div class="comment__context">
            <div class="context__text">
                <p class="defaultTextPost">${parameter['textContent']}</p>
            </div>
        </div>
    `;

    return commentDiv;
}

let countPage = 11;
let startPost = 1; // начальный пост
let finishPost = 11; // конечный пост

async function GetPosts(startPost, finishPost) { // Получение постов
    const result = await ParserJson.GetPostsAsync(startPost, finishPost, 'https://jsonplaceholder.typicode.com/posts/', PostHTML);
    result.forEach(async post => {
        PostBox.CreatePostBox(post, async function () {
            let button = document.getElementById(`openCommentsBtn_${post.id}`);
            if (button.getAttribute('received') === 'false') {
                button.setAttribute('received', true);
                let listComments = await ParserJson.GetCommentsAsync(post.id, 'https://jsonplaceholder.typicode.com/comments/', CommentHTML);
                PostBox.AppendComment(post.id, listComments);
            } else {
                let commentBox = document.getElementById(`commentsBox_${post.id}`);
                if (commentBox.style.display === 'block')
                    commentBox.style.display = 'none';
                else if (commentBox.style.display === 'none')
                    commentBox.style.display = 'block';
            }
        });
    });
}

let nextBtn = document.getElementById('nextBtn'); // Кнопка переключения постов вперед
let backBtn = document.getElementById('backBtn'); // Кнопка переключения постов назад 

GetPosts(startPost, finishPost);

nextBtn.addEventListener("click", (event) => {
    if (finishPost < 101) {
        PostBox.Clear();
        startPost += countPage;
        finishPost += countPage;
        GetPosts(startPost, finishPost);
    }
});
backBtn.addEventListener("click", (event) => {
    if (startPost > 1) {
        PostBox.Clear();
        startPost -= countPage;
        finishPost -= countPage;
        GetPosts(startPost, finishPost);
    }
});