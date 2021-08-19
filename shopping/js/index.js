window.addEventListener('load', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    var pre = document.querySelector('.pre');
    var next = document.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过focus区域，显示上下页点击按钮
    focus.addEventListener('mouseenter', function () {
        pre.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    // 鼠标离开，隐藏两个按钮
    focus.addEventListener('mouseleave', function () {
        pre.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 因为自动播放轮播图功能与点击右箭头功能类似，可以手动实现点击，从而实现自动播放
            next.click();
        }, 2000);
    });
    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建节点
        var li = document.createElement('li');
        // 给li添加自定义属性--索引号
        li.setAttribute('index', i);
        // 添加节点
        ol.appendChild(li);
        // 默认第一个为当前小圆点
        ol.children[0].className = 'current';
        // 生成小圆点的时候，一并绑定点击事件
        li.addEventListener('click', function () {
            // 排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆点，相应的图片移动，   (移动的是ul)
            // 图片移动：小圆点索引号*图片宽度 ，负值
            var index = this.getAttribute('index');
            // 如果点了li，则将索引号给与点击箭头相关的变量
            num = circle = index;
            animate(ul, -index * focusWidth);
        });
    };
    // 点击左右箭头，实现图片切换
    // 无缝滚动：将第一张图片克隆一张放在最后面，图片移动到最后一张时，再点击则显示克隆的那张，再点击，回到初始位置
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    next.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        // 小圆点变化
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });
    pre.addEventListener('click', function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth);
        // 小圆点变化
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });

    // 自动播放轮播图
    var timer = setInterval(function () {
        // 因为自动播放轮播图功能与点击右箭头功能类似，可以手动实现点击，从而实现自动播放
        next.click();
    }, 2000);
})