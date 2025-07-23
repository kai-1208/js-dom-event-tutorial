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
            } else if (!emailRegex.test(email)) {
                errorDiv.textContent = 'メールアドレスの形式が正しくありません';
            } else {
                errorDiv.style.color = 'green';
                errorDiv.textContent = '✓ 有効なメールアドレスです';
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function (event) {
            const password = event.target.value;
            const errorDiv = document.getElementById('password-error');
            if (password === '') {
                errorDiv.textContent = '';
            } else if (password.length < 8) {
                errorDiv.textContent = 'パスワードは8文字以上で入力してください';
            } else {
                errorDiv.style.color = 'green';
                errorDiv.textContent = '✓ 有効なパスワードです';
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

    // コードエディター
    (function () {
        const modal = document.getElementById('editor-modal');
        const closeBtn = document.getElementById('editor-close');
        const runBtn = document.getElementById('run-code');
        const insertBtn = document.getElementById('insert-template');
        const errorBox = document.getElementById('editor-error');
        const iframe = document.getElementById('result-frame');

        function buildFrame() {
            const html = document.getElementById('html-code').value;
            const css = `<style>${document.getElementById('css-code').value}</style>`;
            const jsContent = document.getElementById('js-code').value;

            const js = `<script>
            window.addEventListener('DOMContentLoaded', function() {
                    try {
                        ${jsContent}
                    } catch (e) {
                        document.body.innerHTML += '<pre style="color:red;">' + e + '</pre>';
                    }
                });
            <\/script>`;
            return html + css + js;
        }

        function runCode() {
            try {
                const content = buildFrame();
                iframe.srcdoc = content;
                errorBox.textContent = '';
            } catch (e) {
                errorBox.textContent = e.message;
            }
        }

        function insertTemplate() {
            document.getElementById('html-code').value = '<button id="btn">Click</button>';
            document.getElementById('css-code').value = '#btn { color: red; }';
            document.getElementById('js-code').value = `document.getElementById('btn').addEventListener('click', () => {
  alert('クリックされました');
});`;
        }

        function openEditor() {
            modal.classList.remove('hide');
            modal.style.display = 'flex'; // 初期表示（display: none → flex）
            requestAnimationFrame(() => {
                modal.classList.add('show'); // アニメーション開始（opacity: 1）
            });

            errorBox.textContent = '';
            document.getElementById('html-code').value = '';
            document.getElementById('css-code').value = '';
            document.getElementById('js-code').value = '';
        }
        window.openEditor = openEditor;

        runBtn.addEventListener('click', runCode);
        insertBtn.addEventListener('click', insertTemplate);
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            modal.classList.add('hide');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // アニメーション時間と同じ（0.3s）
        });
    })();
});
