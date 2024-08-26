// ==UserScript==
// @name         一键直播
// @namespace    https://github.com/sanhuoO/bilibili-onekey-live
// @version      0.1
// @description  自动选b站开播分区，可一键弹窗关闭
// @author       sanhuo
// @match        https://link.bilibili.com/p/center/index*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function retry(cb) {
        return new Promise((res, rej) => {
            const f = () => {
                try {
                    const r = cb()
                    if (r) {
                        res(r)
                    } else {
                        setTimeout(f, 500)
                    }
                } catch (e) {
                    rej(e)
                }
            }
            f()
        })
    }

    retry(() => {
        const b = document.querySelector('.btn.live-btn')
        if (!b) return
        if (b.textContent === '关闭直播') {
            //return b

            var r=confirm("正在直播，要停止直播吗？");
            if (r==true){
                return b
            }
            else{
                throw new Error('already live')
            }
        } else {
            throw new Error('already live')
        }
    }).then(btn => {
        console.log('btn', btn)
        btn.click()
     })

    retry(() => {
        const b = document.querySelector('.blink.blue.category-toggle')
        if (!b) return
        if (b.textContent === '选择分类') {
            return b
        } else {
            throw new Error('already select')
        }
    }).then(btn => {
        console.log('btn', btn)
        btn.click()
        return retry(() => {
            const b = document.querySelector('.p-relative.latest .p-relative')
            if (!b) return
            return b
        })
    }).then(btn => {
        btn.click()

            return retry(() => {
            const b = document.querySelector('.btn.live-btn')
            if (!b) return
            console.log('btn', btn)
            if (b.textContent === '开始直播') {
                console.log('b', b)
                return b
            } else {
                throw new Error('already started')
            }
        })
    }).then(btn => {
        btn.click()

    })
})();
