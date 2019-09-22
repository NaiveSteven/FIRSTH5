//首页加载
let firstPageRender = (function () {
    let progressBox = document.querySelector('.progressBox'),
        progress = progressBox.querySelector('.progress'),
        firstPage = document.querySelector('.firstPage'),
        runImg = progressBox.querySelector('img'),
        btnBox = document.querySelector('.btnBox');

    //loading动画加载
    let loadingMove = function () {
        let autoTimer = null,
            progressBoxWidth = parseFloat(getComputedStyle(progressBox, null)['width']);
        firstPage.style.display = 'block';

        //动画加载
        let imgLoad = function () {
            let imgLeft = parseFloat(getComputedStyle(runImg, null)['left']),
                progressBoxWidth = parseFloat(getComputedStyle(progressBox, null)['width']);
            autoTimer = setInterval(() => {
                let jumpImg = btnBox.querySelector('img'),
                    progressWidth = parseFloat(getComputedStyle(progress, null)['width']);
                progress.style.width = progressWidth + 2 + 'px';
                runImg.style.left = progressWidth + 2 + imgLeft + 'px';

                //到达底部清楚定时器让下面的wind和跳动的动物出现
                if (progressWidth >= progressBoxWidth) {
                    progress.style.width = progressBoxWidth + 'px';
                    runImg.style.left = progressBoxWidth + imgLeft + 'px';
                    btnBox.style.display = 'block';
                    clearInterval(autoTimer);
                    jumpImg.addEventListener('click', () => {
                        clearAll();
                        secondPageRender.init();
                    });
                }

            }, 17);
            //图片懒加载
            // let arr = ['img/banner-1.jpg', 'img/banner-2.jpg', 'img/banner-3.jpg', 'img/move-1.jpg', 'img/move-2.jpg',
            //         'img/move-3.jpg', 'img/move-4.jpg', 'img/move-5.jpg', 'img/move-6.jpg', 'img/move-7.jpg', 'img/move-8.jpg',
            //         'img/move-9.jpg', 'img/move-10.jpg', 'img/move-11.jpg', 'img/move-12.jpg', 'img/move-13.jpg', 'img/move-14.jpg',
            //         'img/move-15.jpg', 'img/list-1.jpg', 'img/list-2.jpg', 'img/list-3.jpg', 'img/list-5.jpg', 'img/list-6.jpg',
            //         'img/login-bg.jpg',],
            //     numb = 0,
            //     len = arr.length;
            // arr.forEach((item, index) => {
            //     let img = new Image();
            //     img.onload = () => {
            //         numb++;
            //         progress.style.width = numb / len * 100 + '%';
            //         let progressWidth = parseFloat(getComputedStyle(progress, null)['width']);
            //         runImg.style.left = progressWidth + imgLeft + 'px';
            //         img = null;
            //         if (numb === len) {
            //             clearTimeout(autoTimer);
            //             btnBox.style.display = 'block';
            //             //点击图片进入下一页
            //             jumpImg.addEventListener('click', () => {
            //                 clearAll();
            //                 secondPageRender.init();
            //             });
            //         }
            //     };
            //     img.src = item;
            // });

            //设置最大等待时间
            // let maxDelay = function maxDelay() {
            //     autoTimer = setTimeout(() => {
            //         if (numb / len >= 0.9) {
            //             progress.style.width = numb / len * 100 + '%';
            //             runImg.style.left = numb / len * 100 + '%';
            //             return;
            //         }
            //         alert('当前网络状况不佳，请稍后再试');
            //     }, 10000)
            // };
            // maxDelay();
        };

        imgLoad();
    };

    //wind气泡
    let windChat = function () {
        let wind = document.querySelector('.wind'),
            wordBox = wind.querySelector('p'),
            str = '点我会有惊喜哦!',
            wordTimer = null,
            n = 0;
        wordTimer = setInterval(() => {
            wordBox.innerHTML += str[n++];
            if (n >= str.length) {
                clearInterval(wordTimer);
                //当前定时器结束清楚之后停顿一秒，清楚当前文字，并且重新执行函数
                setTimeout(() => {
                    wordBox.innerHTML = '';
                    windChat();
                }, 1000);
            }
        }, 100);
    };

    //动画加载结束，进入第二个页面，清楚第一个页面所有东西
    let clearAll = function () {
        firstPage.style.display = 'none';
    };

    return {
        init: function () {
            loadingMove();
            windChat();
        }
    }
})();

//主页加载
let secondPageRender = (function () {

    //第二页出现
    let block = function () {
        let secondPage = document.querySelector('.secondPage');
        secondPage.style.display = 'block';
    };

    //音乐功能
    let musicClick = function () {
        let musicBox = document.querySelector('.music'),
            music = musicBox.querySelector('.magic');
        music.play();
        musicBox.className += ' active';
        //点击播放 或者点击暂停并且不再旋转
        musicBox.addEventListener('click', () => {
                //记录当前旋转的角度，让它在当前旋转结束的角度停止
                let deg = getComputedStyle(musicBox, null)['transform'];
                if (music.paused) {
                    music.play();
                    musicBox.className += ' active';
                    return;
                }
                music.pause();
                musicBox.style.transform = deg;
                musicBox.className = 'music iconfont icon-yinle';
            }
        );

    };

    //菜单栏点击缩放
    let menuClick = function () {
        let menu = document.querySelector('.menu'),
            menuContent = document.querySelector('.menuContent');
        menu.addEventListener('click', () => {
            if (menuContent.className === 'menuContent') {
                menuContent.className += ' menuActive';
                return;
            }
            //菜单栏出现
            menuContent.className = 'menuContent';
        })
    };

    //轮播图
    let banner = function () {
        let bannerBox = document.querySelector('.bannerBox'),
            wrapper = bannerBox.querySelector('.wrapper'),
            imgList = wrapper.querySelectorAll('img'),
            index = 0,
            autoTimer = null,
            autoTemp = null;

        //自动移动
        let autoMove = function () {
            //在三张图片后面再加一张和第一张相同的图片
            // let clone = imgList[0].cloneNode(true),//深度克隆 将所有的内容都克隆一份
            //     fragment = document.createDocumentFragment();//创建文档碎片
            // wrapper.appendChild(fragment.appendChild(clone));
            // fragment = null;

            //wrapper根据当前移动的图片数决定top值
            let auto = () => {
                if (index === 2) {
                    //当index为2的时候让它立即回到第一张，top值变为0，index值也变为0
                    index = 0;
                    wrapper.style.top = 0;
                    return;
                }
                // imgList = wrapper.querySelectorAll('img');//重新获取一遍img 因为queryselector不是映射的
                let height = getComputedStyle(imgList[index + 1], null)['height'],
                    n = height.indexOf('p');
                height = Math.round(height.substr(0, n)) + 2;
                wrapper.style.top = -height * (index + 1) + 'px';//计算wrapper需要移动的top值
                index++;
            };
            auto();
        };

        //小圆点自动和图片对齐 点击对齐
        let autoCircle = function () {
            let circleBox = document.querySelector('.button'),
                circle = document.querySelectorAll('span');
            //随着图片切换，下方小圆点自动切换
            [].forEach.call(circle, (item, num) => {
                item.className = ''; //清除所有小圆点上的样式
                //如果当前index是三，让第一个小圆点亮
                // if (index === 2) {
                //     circle[0].className = 'active';
                // }
                //item：当前循环的circle也就是当前的span小圆点， circle[index]当前运动到的图片对应的点
                if (item === circle[index]) {
                    item.className += 'active';
                }

                item.addEventListener('click', function () {
                    [].forEach.call(circle, nowCircle => {
                        nowCircle.className = '';
                    });
                    clearInterval(autoTimer);
                    clearInterval(autoTemp);
                    this.className = 'active';
                    index = num - 1;
                    autoMove();
                });
            });
        };

        autoTimer = setInterval(autoMove, 2000);
        autoTemp = setInterval(autoCircle, 2000);
    };

    //跑马灯
    let horseLight = function () {
        let horseLightBox = document.querySelector('.horseLightBox'),
            imgs = horseLightBox.querySelectorAll('img'),
            autoRun = null,
            fragment = document.createDocumentFragment(),
            boxWidth = parseFloat(getComputedStyle(horseLightBox, null)['width']);

        //复制一份原有的放到末尾
        [].forEach.call(imgs, item => {
            fragment.appendChild(item.cloneNode(true));
        });
        horseLightBox.style.width = boxWidth * 2 + 'px';
        horseLightBox.appendChild(fragment);
        fragment = null;
        horseLightBox = document.querySelector('.horseLightBox');

        //跑马灯自动向左运动
        let width = parseFloat(getComputedStyle(imgs[0], null)['width']);
        setInterval(() => {
            //下面这行当初出bug，必须实时获取当前horseLightBox的left值，所以必须写在定时器里面
            let leftMove = parseFloat(getComputedStyle(horseLightBox, null)['left']);
            //当horseLightBox运动到一半的时候，让他立即回到第一个也就是left值为0
            if (Math.abs(leftMove) >= boxWidth) {
                horseLightBox.style.left = 0 + 'px';
                return;
            }
            leftMove -= 1;
            horseLightBox.style.left = leftMove + 'px';
        }, 17);
    };

    //列表区域数据获取成功后，绑定数据，绑定数据成功后，绑定点击事件
    let bindHtml = function () {
        let curPage = 1,
            isLoad = true;

        //获取list.json文件中的数据
        let bindData = function () {
            return new Promise(resolve => {
                let xhr = new XMLHttpRequest,
                    data = null;
                xhr.open('GET', 'json/list.json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        data = JSON.parse(xhr.responseText);
                        resolve(data);
                    }
                };
                xhr.send(null);
            });
        };

        //获取数据成功之后绑定数据，绑定数据成功之后，给爱心绑定点击事件
        let promise = bindData();
        promise.then((result) => {
            let containerBox = document.querySelector('.containerBox'),
                str = ``;
            for (let key in result) {
                let {img, desc, page} = result[key];
                if (curPage === page) {
                    str += `<a href="javascript:;">
                <img src="${img}" alt="">
                <p>${desc}</p>
                <i class="iconfont icon-icon-test"></i></a>`;
                }
            }
            containerBox.innerHTML = str;
            curPage++;
            isLoad = false;

            //绑定数据成功，执行绑定点击数据的任务
        }).then(function () {
            let containerBox = document.querySelector('.containerBox'),
                aBox = containerBox.querySelector('a'),
                icon = containerBox.querySelectorAll('i');

            //爱心点击切换是否实心
            icon.forEach(item => {
                item.addEventListener('click', function () {
                    if (this.className === 'iconfont icon-aixin') {
                        this.className = 'iconfont icon-icon-test';
                        return;
                    }
                    this.className = 'iconfont icon-aixin';
                });
            });
        }).then(() => {
            window.addEventListener('scroll', () => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,//被卷曲的高度
                    curHeight = document.documentElement.clientHeight || document.body.clientHeight,//当前窗口的高度
                    allTop = document.documentElement.scrollHeight || document.body.scrollHeight;//页面的总高度
                // （包括滚动条）

                //被卷曲的高度大于窗口高度减去被卷曲的高度减去2 就执行获取数据的函数和绑定数据的函数
                if (scrollTop >= allTop - curHeight - 2 && isLoad === false) {
                    let pro = bindData();
                    pro.then((result) => {
                        let containerBox = document.querySelector('.containerBox'),
                            str = ``;
                        for (let key in result) {
                            let {img, desc, page} = result[key];

                            //当前页面和获取的数据的页面相等，就就将它绑定到页面中
                            if (curPage === page) {
                                str += `<a href="javascript:;">
                <img src="${img}" alt="">
                <p>${desc}</p>
                <i class="iconfont icon-icon-test"></i></a>`;
                            }
                        }

                        //绑定的页面跟随在最先绑定的页面的后面
                        containerBox.innerHTML += str;
                        curPage++;
                        isLoad = false;

                        //绑定数据成功，执行绑定点击数据的任务
                    }).then(function () {
                        let containerBox = document.querySelector('.containerBox'),
                            aBox = containerBox.querySelector('a'),
                            icon = containerBox.querySelectorAll('i');

                        //爱心点击切换是否实心
                        icon.forEach(item => {
                            item.addEventListener('click', function () {
                                if (this.className === 'iconfont icon-aixin') {
                                    this.className = 'iconfont icon-icon-test';
                                    return;
                                }
                                this.className = 'iconfont icon-aixin';
                            });
                        });
                    });
                    isLoad = true;
                }

                //被卷曲的高度超过头部导航栏的长度就给头部导航栏加入fix类名
                let header = document.querySelector('header'),
                    headerWidth = parseFloat(getComputedStyle(header, null)['height']);
                if (scrollTop >= headerWidth) {
                    header.className = 'fix';
                    return;
                }
                header.className = '';
            });
        });
    };

    //人物头像点击进入登录页面
    let peopleClick = function () {
        let people = document.querySelector('.icon-renwu-tuandui'),
            home = document.querySelector('.secondPage'),
            thirdPage = document.querySelector('.thirdPage');
        people.addEventListener('click', () => {
            home.style.display = 'none';

            thirdPageRender.init();
        });
    };

    return {
        init: function () {
            block();
            musicClick();
            menuClick();
            banner();
            horseLight();
            bindHtml();
            peopleClick();
        }
    }
})();

//登录页加载
let thirdPageRender = (function () {

    //执行thirdPageRender函数就将login页面显示
    let appear = function () {
        let three = document.querySelector('.thirdPage');
        three.style.display = 'block';
    };

    //点击返回按钮返回主页
    let back = function () {
        let third = document.querySelector('.thirdPage'),
            returnBtn = third.querySelector('.iconfont'),
            second = document.querySelector('.secondPage');
        returnBtn.addEventListener('click', () => {
            third.style.display = 'none';
            second.style.display = 'block';
        });
    };

    return {
        init: function () {
            appear();
            back();
        }
    }
})();

//根据传入的url地址显示不同的页面
(function () {
    let url = window.location.href,
        well = url.indexOf('#') !== -1 ? url.indexOf('#') : null,
        content = url.substr(well + 1);
    switch (content) {
        case 'loading':
            firstPageRender.init();
            break;
        case 'pic':
            secondPageRender.init();
            break;
        case 'login':
            thirdPageRender.init();
            break;
        default:
            firstPageRender.init();
    }
})();

