$( document ).ready(function() {

    // ====================================LIVE COMMENTS

    let commentIds = JSON.parse(localStorage.getItem('commentIds') || '[]');


    let randomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const addClass = (item, className) => (item.classList.add(className));
    const removeClass = (item, className) => (item.classList.remove(className));

    $('.answer-wrap').each(function () {
        const answerId = this.getAttribute('data-id');
        if (commentIds.includes(answerId)) {
            addClass(this, 'already-typed');
            removeClass(this.closest('.siblings-wrap'), 'line-hider');
        }
    });

    $('.answer-wrap:not(.typing, .just-typed, .already-typed)').one('inview', (event, isInView) => {
        const itemWrap = event.target.closest('.siblings-wrap');
        const item = event.target;
        const answerId = item.getAttribute('data-id');
        if (isInView && !commentIds.includes(answerId)) {
            commentIds.push(answerId);
            localStorage.setItem('commentIds', JSON.stringify(commentIds));
            const firstTicker = randomInt(1200, 4700);
            const secondTicker = randomInt(3600, 9500);
            setTimeout(() => {
                addClass(item, 'typing');
                removeClass(itemWrap, 'line-hider');
            }, firstTicker);
            setTimeout(() => {
                addClass(item, 'just-typed');
                removeClass(item, 'typing');
            }, firstTicker + secondTicker);
        }
    });





    // ====================================LIVE-EMOJI


    let emojiCountersData = JSON.parse(localStorage.getItem('emojiCounters') || '[]');


    const setStorageEmoji = (item, name) => {
        const itemSelector = item.querySelector(name).classList;
        if (!itemSelector.contains('active')) {
            itemSelector.add('active');
        }
    }

    document.querySelectorAll('.emoji-box.active').forEach(item => {
        emojiCountersData.forEach(storageItem => {
            const likesIdValue = item.getAttribute('emoji-id');

            if (likesIdValue === storageItem.id) {
                item.querySelector('.emoji-box__like-count').innerHTML = storageItem.count;
                if (storageItem.count < 5) {
                    setStorageEmoji(item, '.like-ico');
                } else {
                    setStorageEmoji(item, '.like-ico');
                    setStorageEmoji(item, '.heart-ico');
                    setStorageEmoji(item, '.wow-ico');
                }
            }
        })
    })


    const emojiCounterInc = (event, counterValue) => {
        return event.target.querySelector('.emoji-box__like-count').innerHTML = parseInt(counterValue + 1);
    }

    const targetEmoji = (event, name) => {
        const emojiSelector = event.target.querySelector(name).classList;
        if (emojiSelector.contains('active')) {
            emojiSelector.remove('active');
            setTimeout(() => {
                emojiSelector.add('active');
            }, 100);
        } else
            emojiSelector.add('active');
    }

    const emojiAdd = (event, name, counterValue, emojiId) => {
        targetEmoji(event, name);
        emojiCounterInc(event, counterValue);

        const comment = {
            id: emojiId,
            count: counterValue
        };

        const found = emojiCountersData.some(function (el) {
            return el.id === emojiId;
        });

        if (found) {
            emojiCountersData.forEach(function(item){
                if (item.id === emojiId) {
                    item.count = counterValue;
                    localStorage.setItem('emojiCounters', JSON.stringify(emojiCountersData));
                }
            })
        } else {
            emojiCountersData.push(comment);
            localStorage.setItem('emojiCounters', JSON.stringify(emojiCountersData));
        }
    }

    let ticker = true;
    const tickerReset = () => {
        setTimeout( () => {
            ticker = true;
        }, 10000);
    };

    $('.emoji-box.active').on('inview', (event, isInView) => {
        const emojiId = event.target.getAttribute('emoji-id');
        let counterValue = parseInt(event.target.querySelector('.emoji-box__like-count').innerHTML);
        if (!counterValue) {
            counterValue = 0;
        }

        if (isInView && ticker) {
            const randomTicker = randomInt(550, 2555);
            let randomEmoji = randomInt(1, 3);
            setTimeout(() => {
                switch (randomEmoji) {
                    case 1:
                        emojiAdd(event, '.like-ico', counterValue, emojiId);
                        break;
                    case 2:
                        emojiAdd(event, '.heart-ico', counterValue, emojiId);
                        break;
                    case 3:
                        emojiAdd(event, '.wow-ico', counterValue, emojiId);
                        break;
                    default:
                        break;
                }
                ticker = false;
                tickerReset();
            }, randomTicker);
        }
    });


})