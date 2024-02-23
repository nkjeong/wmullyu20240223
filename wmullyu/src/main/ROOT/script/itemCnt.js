"use strict";
const itemAll = document.querySelector('.item-all');
const itemNew = document.querySelector('.item-new');
const itemSoldout = document.querySelector('.item-soldout');
const itemExtinction = document.querySelector('.item-extinction');
if(itemAll && itemNew && itemSoldout && itemExtinction){
	async function setCnt(ele) {
		const query = ele.dataset.query;
        let data;
        try {
            data = await getFetch(`/item/cnt?mode=${query}`);
			ele.innerHTML = data.cnt;
        } catch (error) {
            console.error('Error setting brand:', error);
        }
    }

    async function runSetCnt() {
        await setCnt(itemAll);
        await setCnt(itemNew);
        await setCnt(itemSoldout);
        await setCnt(itemExtinction);
    }
    runSetCnt();
}