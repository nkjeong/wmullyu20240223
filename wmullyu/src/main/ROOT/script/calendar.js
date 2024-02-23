"use strict";
const calendar = document.querySelector('.calendar');
if(calendar){
	async function setCalendar(ele) {
        let data;
        try {
            data = await getFetch(`/calendar/getCalendar`);
            ele.innerHTML = `${data.year}년 ${data.month}월 ${data.date}일 ${data.toDay}`
        } catch (error) {
            console.error('Error setting brand:', error);
        }
    }

    async function runSetCalendar() {
        await setCalendar(calendar);
    }
    runSetCalendar();
}