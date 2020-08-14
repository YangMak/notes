/**
    Source URL : https://letswrite.tw/intersection-oserver-basic/
    WebSite : Let's Write ( https://letswrite.tw/ )
    Email : letswritetw@gmail.com
    Author : Augustus

*/

// new IntersectionObserver = 觀察器
// new IntersectionObserver 的 callback 會產生 IntersectionObserverEntry，就是被獵物
/*
  3步驟：
    1 建立觀察器（observer），如果觀察器的鏡頭（root）沒有指定，就是指 window：
      const observer = new IntersectionObserver(callback, [option])
    2 指定觀察器要觀察的目標： observer.observe(el)
    2 用callback看觀察目標進入到觀察器了沒？
      entry[0].isIntersecting || !entry[0].isIntersecting
    3 目標進入後，要不要停止觀察目標？ observer.unobserve(el)
*/


// 直接 console.log IntersectionObserver
console.log(new IntersectionObserver(callback))
    // 上面那一行 console.log 出以下，可以在 option 中改變，主要改的就是觀察器 root
var IntersectionObserver_console = {
    delay: 0,
    root: null, // null 代表 window

    // 改變鏡頭(root)的邊界(margin)，4個值跟 css 的 margin 一樣，就是上、右、下、左
    rootMargin: "0px 0px 0px 0px",

    // 什麼時候要觸發callback。[0, 0.25, 0.5, 0.75, 1]就表示當目標元素0%、25%、50%、75%、100%可見時，都會觸發一次callback。
    // 看圖片比較好懂：https://developers.google.com/web/updates/images/2016/04/intersectionobserver/threshold.gif
    threshold: [0],
    trackVisibility: false
};



// 建立觀察器
const observer = new IntersectionObserver(callback)

// 開始觀察 observer.observe(el);
// 取消觀察 observer.unobserve(el);
// 關閉觀察器 observer.disconnect();

// 多個觀察，要用迴圈
const all_img = document.querySelectorAll('img');
Array.prototype.forEach.call(all_img, img => {
    observer.observe(img);
})



// 來看 callback 會有什麼，主要看的就是被觀察的目標
function callback(entry) {

    // console.log(entry) 得到以下：
    // IntersectionObserverEntry，就是獵物
    var IntersectionObserverEntry_console = [{

        // ReadOnly
        // 目標元素的矩形區域的信息
        boundingClientRect: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 1389,
            top: 0,
            width: 1389,
            x: 0,
            y: 0
        },

        // 獵物的可見比例
        // 看這個圖比較好懂：https://developers.google.com/web/updates/images/2016/04/intersectionobserver/intersectratio.png
        intersectionRatio: 1,

        // ReadOnly
        // 獵物與視口（或根元素）的交叉區域的信息
        intersectionRect: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 1920,
            top: 0,
            width: 1920,
            x: 0,
            y: 0
        },

        // 是否出現在鏡頭(root))中，如果 root 為 null 時就是指 window，為 true 時就代表目標出現在視窗中
        isIntersecting: true,

        isVisible: false,

        // ReadOnly：
        // 鏡頭(root)的資訊，getBoundingClientRect()方法的返回值，如果沒有設root，就返回null代表視窗本身
        rootBounds: {
            bottom: 946,
            height: 946,
            left: 0,
            right: 1920,
            top: 0,
            width: 1920,
            x: 0,
            y: 0
        },

        // 獵物本身，是一個 DOM 節點，這不好表示，所以用 ' 包著，可以直接看console.log
        target: 'div#box.box',

        time: 4668.460000000778 // 毫秒
    }];

    // 確認獵物進入了沒，因為是entry陣列，所以要用迴圈看
    Array.prototype.forEach.call(entry, e => {
        if (e.isIntersecting) {
            console.log('enter: ' + e.target.id);

            // 取消觀察
            observer.unobserve(e.target);
        }
    });

}