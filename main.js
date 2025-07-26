document.addEventListener('DOMContentLoaded', () => {
    // クリックカウンター
    let clickCount = 0;
    const clickDemo = document.getElementById('click-demo');
    if (clickDemo) {
        clickDemo.addEventListener('click', function () {
            clickCount++;
            document.getElementById('click-count').textContent = clickCount;
        });
    }

    // DOM操作
    window.changeText = function () {
        const element = document.getElementById('demo-element');
        element.textContent = 'テキストが変更されました！';
    };

    window.changeStyle = function () {
        const element = document.getElementById('demo-element');
        element.style.backgroundColor = '#ffcdd2';
        element.style.color = '#d32f2f';
        element.style.fontWeight = 'bold';
        element.style.transform = 'scale(1.05)';
    };

    window.resetElement = function () {
        const element = document.getElementById('demo-element');
        element.textContent = 'この要素を操作してみましょう';
        element.style.backgroundColor = '#e3f2fd';
        element.style.color = '#333';
        element.style.fontWeight = 'normal';
        element.style.transform = 'scale(1)';
    };

    // 動的要素追加
    window.addElement = function () {
        const container = document.getElementById('dynamic-container');
        const newElement = document.createElement('div');
        newElement.style.padding = '10px';
        newElement.style.margin = '5px 0';
        newElement.style.backgroundColor = '#e8f5e8';
        newElement.style.borderRadius = '4px';
        newElement.style.border = '1px solid #4caf50';
        newElement.textContent = `要素 ${container.children.length}`;
        container.appendChild(newElement);
    };

    window.removeElement = function () {
        const container = document.getElementById('dynamic-container');
        if (container.children.length > 1) {
            container.removeChild(container.lastElementChild);
        }
    };

    window.clearContainer = function () {
        const container = document.getElementById('dynamic-container');
        while (container.children.length > 1) {
            container.removeChild(container.lastElementChild);
        }
    };

    // イベントログ
    function logEvent(eventType, detail) {
        const eventList = document.getElementById('event-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${new Date().toLocaleTimeString()}: ${eventType} - ${detail}`;
        eventList.appendChild(listItem);
        if (eventList.children.length > 10) {
            eventList.removeChild(eventList.firstChild);
        }
    }

    const textInput = document.getElementById('text-input');
    if (textInput) {
        textInput.addEventListener('input', (event) => {
            logEvent('input', `入力: "${event.target.value}"`);
        });
        textInput.addEventListener('focus', () => {
            logEvent('focus', 'テキストフィールドにフォーカス');
        });
        textInput.addEventListener('blur', () => {
            logEvent('blur', 'テキストフィールドからフォーカスが外れました');
        });
    }

    const selectDemo = document.getElementById('select-demo');
    if (selectDemo) {
        selectDemo.addEventListener('change', function (event) {
            logEvent('change', `選択: "${event.target.value}"`);
        });
    }

    const hoverBox = document.getElementById('hover-demo');
    if (hoverBox) {
        hoverBox.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#764ba2';
            this.style.transform = 'scale(1.1)';
            logEvent('mouseenter', 'ボックスにマウスオーバー');
        });
        hoverBox.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '#667eea';
            this.style.transform = 'scale(1)';
            logEvent('mouseleave', 'ボックスからマウスアウト');
        });
    }

    // フォームバリデーション
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    if (emailInput) {
        emailInput.addEventListener('input', function (event) {
            const email = event.target.value;
            const errorDiv = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === '') {
                errorDiv.textContent = '';
                errorDiv.classList.remove('valid', 'invalid');
            } else if (emailRegex.test(email)) {
                errorDiv.textContent = '✓ 有効な形式です';
                errorDiv.classList.add('valid');
                errorDiv.classList.remove('invalid');
            } else {
                errorDiv.textContent = 'メールアドレスの形式が正しくありません';
                errorDiv.classList.add('invalid');
                errorDiv.classList.remove('valid');
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function (event) {
            const password = event.target.value;
            const errorDiv = document.getElementById('password-error');

            if (password === '') {
                errorDiv.textContent = '';
                errorDiv.classList.remove('valid', 'invalid');
            } else if (password.length >= 8) {
                errorDiv.textContent = '✓ 8文字以上です';
                errorDiv.classList.add('valid');
                errorDiv.classList.remove('invalid');
            } else {
                errorDiv.textContent = 'パスワードは8文字以上で入力してください';
                errorDiv.classList.add('invalid');
                errorDiv.classList.remove('valid');
            }
        });
    }

    const form = document.getElementById('validation-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('フォームが送信されました！（実際の送信はされません）');
        });
    }

    // ToDoリスト
    let todoCount = 0;
    window.addTodo = function () {
        const input = document.getElementById('todo-input');
        const todoText = input.value.trim();
        if (todoText === '') {
            alert('タスクを入力してください');
            return;
        }
        const todoList = document.getElementById('todo-list');
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span>${todoText}</span>
            <div>
                <button onclick="toggleTodo(this)" style="margin-right: 5px;">完了</button>
                <button onclick="deleteTodo(this)">削除</button>
            </div>`;
        todoList.appendChild(todoItem);
        input.value = '';
        todoCount++;
    };

    window.toggleTodo = function (button) {
        const todoItem = button.closest('.todo-item');
        todoItem.classList.toggle('completed');
        button.textContent = todoItem.classList.contains('completed') ? '取消' : '完了';
    };

    window.deleteTodo = function (button) {
        const todoItem = button.closest('.todo-item');
        todoItem.remove();
    };

    window.clearCompleted = function () {
        const completedItems = document.querySelectorAll('.todo-item.completed');
        completedItems.forEach(item => item.remove());
    };

    window.clearAll = function () {
        document.getElementById('todo-list').innerHTML = '';
    };

    const todoInput = document.getElementById('todo-input');
    if (todoInput) {
        todoInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addTodo();
            }
        });
    }

    // プログレスバー
    let progressInterval;
    window.startProgress = function () {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        let progress = 0;
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(progressInterval);
                return;
            }
            progress += 2;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        }, 100);
    };

    window.resetProgress = function () {
        clearInterval(progressInterval);
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        progressFill.style.width = '0%';
        progressText.textContent = '0%';
    };

    // コードコピー関数
    window.copyCode = function (button) {
        const pre = button.closest('.code-block')?.querySelector('pre');
        if (!pre) {
            alert('コードブロックが見つかりませんでした');
            return;
        }

        const code = pre.textContent;
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = '✓ コピーしました';
            setTimeout(() => button.textContent = 'コピー', 1500);
        }).catch(err => {
            console.error('コピーに失敗しました:', err);
            alert('コピーに失敗しました');
        });
    };

    // CodeMirrorの初期化
    const editorOptions = {
        lineNumbers: true,
        tabSize: 2,
        theme: 'lucario',
        lineWrapping: true,
    };

    const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
        ...editorOptions,
        mode: 'xml',
    });
    const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
        ...editorOptions,
        mode: 'css',
    });
    const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
        ...editorOptions,
        mode: 'javascript',
    });

    // 各デモのHTML, CSS, JSコードを格納するデータソース
    const demoCodes = {
        'dom-manipulation': {
            html: `<div id="demo-element">
    この要素を操作してみましょう
</div>
<button onclick="changeText()">テキスト変更</button>
<button onclick="changeStyle()">スタイル変更</button>
<button onclick="resetElement()">リセット</button>`,
            css: `/* CSSでスタイルを定義すると、より管理しやすくなります */
#demo-element {
    padding: 20px;
    background: #e3f2fd;
    border-radius: 8px;
    margin: 10px 0;
    transition: all 0.3s ease; /* アニメーション効果 */
}`,
            js: `// 要素の取得
const element = document.getElementById('demo-element');

// テキストを変更する関数
window.changeText = function () {
    element.textContent = 'テキストが変更されました！';
};

// スタイルを変更する関数
window.changeStyle = function () {
    element.style.backgroundColor = '#ffcdd2';
    element.style.color = '#d32f2f';
    element.style.fontWeight = 'bold';
    element.style.transform = 'scale(1.05)';
};

// 元に戻す関数
window.resetElement = function () {
    element.textContent = 'この要素を操作してみましょう';
    element.style.backgroundColor = '#e3f2fd';
    element.style.color = '#333';
    element.style.fontWeight = 'normal';
    element.style.transform = 'scale(1)';
};`
        },
        'dynamic-elements': {
            html: `<div id="dynamic-container">
    <p>ここに要素が追加されます</p>
</div>
<button onclick="addElement()">要素追加</button>
<button onclick="removeElement()">要素削除</button>
<button onclick="clearContainer()">全削除</button>`,
            css: `.new-item {
    padding: 10px;
    margin: 5px 0;
    background-color: #e8f5e8;
    border-radius: 4px;
    border: 1px solid #4caf50;
}`,
            js: `const container = document.getElementById('dynamic-container');

window.addElement = function () {
    const newElement = document.createElement('div');
    newElement.className = 'new-item'; // CSSクラスを適用
    newElement.textContent = \`追加された要素 \${container.children.length}\`;
    container.appendChild(newElement);
};

window.removeElement = function () {
    if (container.children.length > 1) {
        container.removeChild(container.lastElementChild);
    }
};

window.clearContainer = function () {
    // 最初の子要素(pタグ)以外をすべて削除
    while (container.children.length > 1) {
        container.removeChild(container.lastElementChild);
    }
};`
        },
        'event-listener-basic': {
            html: `<button id="click-demo">クリックしてください</button>
<div id="click-result">
    クリック回数: <span id="click-count">0</span>
</div>`,
            css: `#click-result {
    margin-top: 10px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
}`,
            js: `const clickDemo = document.getElementById('click-demo');
const clickCountSpan = document.getElementById('click-count');
let clickCount = 0;

clickDemo.addEventListener('click', function () {
    clickCount++;
    clickCountSpan.textContent = clickCount;
});`
        },
        'event-listener-various': {
            html: `<input type="text" id="text-input" placeholder="ここに入力してください">
<select id="select-demo">
    <option value="">選択してください</option>
    <option value="option1">オプション1</option>
    <option value="option2">オプション2</option>
</select>
<div class="demo-box" id="hover-demo" title="マウスオーバーしてください"></div>
<div id="event-log">
    <strong>イベントログ:</strong>
    <ul id="event-list"></ul>
</div>`,
            css: `.demo-box {
    width: 100px;
    height: 50px;
    background-color: #667eea;
    border-radius: 8px;
    margin-top: 10px;
    transition: all 0.2s ease;
    cursor: pointer;
}
#event-log {
    margin-top: 10px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;
}
#event-list {
    list-style: none;
    padding: 0;
    margin: 0;
}`,
            js: `function logEvent(eventType, detail) {
    const eventList = document.getElementById('event-list');
    const listItem = document.createElement('li');
    listItem.textContent = \`\${new Date().toLocaleTimeString()}: \${eventType} - \${detail}\`;
    eventList.prepend(listItem); // 新しいログを上に追加
    if (eventList.children.length > 10) {
        eventList.removeChild(eventList.lastChild);
    }
}

document.getElementById('text-input').addEventListener('input', (e) => {
    logEvent('input', \`入力: "\${e.target.value}"\`);
});
document.getElementById('select-demo').addEventListener('change', (e) => {
    logEvent('change', \`選択: "\${e.target.value}"\`);
});
const hoverBox = document.getElementById('hover-demo');
hoverBox.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#764ba2';
    logEvent('mouseenter', 'マウスオーバー');
});
hoverBox.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#667eea';
    logEvent('mouseleave', 'マウスアウト');
});`
        },
        'form-validation': {
            html: `<form id="validation-form">
    <div>
        <label>メールアドレス:</label><br>
        <input type="email" id="email-input" placeholder="example@example.com">
        <div id="email-error" class="error-message"></div>
    </div>
    <div style="margin-top: 10px;">
        <label>パスワード:</label><br>
        <input type="password" id="password-input" placeholder="8文字以上">
        <div id="password-error" class="error-message"></div>
    </div>
    <button type="submit" style="margin-top: 10px;">送信</button>
</form>`,
            css: `.error-message {
    font-size: 0.9em;
    min-height: 1.2em; /* エラーメッセージでレイアウトが崩れないように */
}
.error-message.invalid {
    color: red;
}
.error-message.valid {
    color: green;
}`,
            js: `const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

emailInput.addEventListener('input', (event) => {
    const email = event.target.value;
    const errorDiv = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errorDiv.textContent = '';
        errorDiv.className = 'error-message';
    } else if (emailRegex.test(email)) {
        errorDiv.textContent = '✓ 有効な形式です';
        errorDiv.className = 'error-message valid';
    } else {
        errorDiv.textContent = 'メールアドレスの形式が正しくありません';
        errorDiv.className = 'error-message invalid';
    }
});
passwordInput.addEventListener('input', (event) => {
    const password = event.target.value;
    const errorDiv = document.getElementById('password-error');
    if (password === '') {
        errorDiv.textContent = '';
        errorDiv.className = 'error-message';
    } else if (password.length >= 8) {
        errorDiv.textContent = '✓ 8文字以上です';
        errorDiv.className = 'error-message valid';
    } else {
        errorDiv.textContent = 'パスワードは8文字以上で入力してください';
        errorDiv.className = 'error-message invalid';
    }
});

document.getElementById('validation-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('フォームが送信されました！ (実際の送信は行いません)');
});`
        },
        'todo-app': {
            html: `<div>
    <input type="text" id="todo-input" placeholder="新しいタスクを入力">
    <button onclick="addTodo()">追加</button>
</div>
<div id="todo-list"></div>
<div style="margin-top: 10px;">
    <button onclick="clearCompleted()">完了済みを削除</button>
    <button onclick="clearAll()">全て削除</button>
</div>`,
            css: `.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}
.todo-item.completed span {
    text-decoration: line-through;
    color: #aaa;
}
.todo-item button {
    padding: 3px 8px;
    font-size: 0.9em;
    border-radius: 5px;
}`,
            js: `const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

window.addTodo = function() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = \`
        <span>\${todoText}</span>
        <div>
            <button onclick="toggleTodo(this)" style="margin-right: 5px;">完了</button>
            <button onclick="deleteTodo(this)">削除</button>
        </div>\`;
    todoList.appendChild(todoItem);
    todoInput.value = '';
}
window.toggleTodo = function(button) {
    const todoItem = button.closest('.todo-item');
    todoItem.classList.toggle('completed');
    button.textContent = todoItem.classList.contains('completed') ? '取消' : '完了';
}
window.deleteTodo = function(button) {
    button.closest('.todo-item').remove();
}
window.clearCompleted = function() {
    document.querySelectorAll('.todo-item.completed').forEach(item => item.remove());
}
window.clearAll = function() {
    todoList.innerHTML = '';
}
todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});`
        },
        'progress-bar': {
            html: `<div class="progress-bar">
    <div class="progress-fill" id="progress-fill"></div>
</div>
<div style="margin-top: 10px;">
    <button onclick="startProgress()">開始</button>
    <button onclick="resetProgress()">リセット</button>
    <span id="progress-text">0%</span>
</div>`,
            css: `.progress-bar {
    width: 100%;
    height: 20px;
    background: #e9ecef;
    border-radius: 10px;
    overflow: hidden;
}
.progress-fill {
    height: 100%;
    background: var(--main-color, #3A50A0);
    width: 0%;
    transition: width 0.1s linear;
}`,
            js: `let progressInterval;
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

window.startProgress = function () {
    let progress = 0;
    clearInterval(progressInterval); // 既に動いていればリセット
    progressInterval = setInterval(() => {
        progress += 1;
        if (progress > 100) {
            clearInterval(progressInterval);
            return;
        }
        progressFill.style.width = \`\${progress}%\`;
        progressText.textContent = \`\${progress}%\`;
    }, 50); // 50ミリ秒ごとに実行
};

window.resetProgress = function () {
    clearInterval(progressInterval);
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
};`
        }
    };

    /**
     * 指定されたデモのコードをコードエディタに読み込む関数
     * @param {string} demoId - 読み込むデモのID
     */
    function loadDemoInEditor(demoId) {
        const codes = demoCodes[demoId];
        if (!codes) {
            console.error('指定されたデモIDのコードが見つかりません:', demoId);
            alert('デモコードの読み込みに失敗しました。');
            return;
        }

        openEditor();

        htmlEditor.setValue(codes.html);
        cssEditor.setValue(codes.css);
        jsEditor.setValue(codes.js);
    }
    window.loadDemoInEditor = loadDemoInEditor;

    // コードエディター
    (function () {
        const modal = document.getElementById('editor-modal');
        const closeBtn = document.getElementById('editor-close');
        const runBtn = document.getElementById('run-code');
        const insertBtn = document.getElementById('insert-template');
        const errorBox = document.getElementById('editor-error');
        const iframe = document.getElementById('result-frame');
        
        const scrollableArea = document.querySelector('.scrollable-editor-area');
        let scrollTimer;

        if (scrollableArea) {
            scrollableArea.addEventListener('scroll', function() {
                iframe.style.pointerEvents = 'none';

                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function() {
                    iframe.style.pointerEvents = 'auto';
                }, 150);
            });
        }

        function buildFrame() {
            const html = htmlEditor.getValue();
            const css = cssEditor.getValue();
            const jsContent = jsEditor.getValue();

            return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        html {
            height: 100%;
        }
        body {
            min-height: 100vh; 
            margin: 0;
            padding: 15px;
            box-sizing: border-box;
            font-family: sans-serif;
        }
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        try {
            ${jsContent}
        } catch (e) {
            document.body.innerHTML = '<pre style="color:red;">' + e + '</pre>';
        }
    </script>
</body>
</html>`;
        }

        function runCode() {
            try {
                const content = buildFrame();
                iframe.src = 'about:blank';
                setTimeout(() => {
                    iframe.srcdoc = content;
                }, 50);
                errorBox.textContent = '';
            } catch (e) {
                errorBox.textContent = e.message;
            }
        }

        function insertTemplate() {
            htmlEditor.setValue('<button id="btn">Click Me</button>');
            cssEditor.setValue('#btn { color: red; }');
            jsEditor.setValue(`document.getElementById('btn').addEventListener('click', () => {
    alert('Clicked!');
});`);
        }

        function openEditor() {
            modal.style.display = 'flex';
            modal.classList.remove('hide');
            requestAnimationFrame(() => {
                modal.classList.add('show');
            });

            errorBox.textContent = '';

            htmlEditor.setValue('');
            cssEditor.setValue('');
            jsEditor.setValue('');
            setTimeout(() => {
                htmlEditor.refresh();
                cssEditor.refresh();
                jsEditor.refresh();
            }, 10);
        }
        window.openEditor = openEditor;

        function closeEditor() {
            modal.classList.remove('show');
            modal.classList.add('hide');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

        runBtn.addEventListener('click', runCode);
        insertBtn.addEventListener('click', insertTemplate);
        closeBtn.addEventListener('click', closeEditor);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeEditor();
            }
        });
    })();
});
