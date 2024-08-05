import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

document.addEventListener('DOMContentLoaded', function() {
    let display = document.querySelector(".display");
    let days = document.querySelector(".days");
    let previous = document.querySelector(".left");
    let next = document.querySelector(".right");
    let selected = document.querySelector(".selected");
    let selectedDate;
    let schedule;
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth();

    function displayCalendar() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayIndex = firstDay.getDay();
        const numberOfDays = lastDay.getDate();
        let formattedDate = date.toLocaleString("ja", {
            month: "long",
            year: "numeric"
        });

        display.innerHTML = `${formattedDate}`;

        for (let x = 1; x <= firstDayIndex; x++) {
            const div = document.createElement("div");
            div.innerHTML += "";
            days.appendChild(div);
        }

        for (let i = 1; i <= numberOfDays; i++) {
            let div = document.createElement("div");
            let currentDate = new Date(year, month, i);
            div.dataset.date = currentDate.toDateString();
            div.innerHTML += i;
            days.appendChild(div);
            if (
                currentDate.getFullYear() === new Date().getFullYear() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getDate() === new Date().getDate()
            ) {
                div.classList.add("current-date");
            }
        }
    }

    // Call the function to display the calendar
    displayCalendar();

    previous.addEventListener("click", () => {
        days.innerHTML = "";
        selected.innerHTML = "";
        if (month < 0) {
            month = 11;
            year = year - 1;
        }
        month = month - 1;
        date.setMonth(month);
        displayCalendar();
        displaySelected();
    });

    next.addEventListener("click", () => {
        days.innerHTML = "";
        selected.innerHTML = "";
        if (month > 11) {
            month = 0;
            year = year + 1;
        }
        month = month + 1;
        date.setMonth(month);
        displayCalendar();
        displaySelected();
    });

    function displaySelected() {
        const dayElements = document.querySelectorAll(".days div");
        dayElements.forEach((day) => {
            day.addEventListener("click", (e) => {
                var elements = document.getElementsByClassName('time_tr');
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = '';
                }
                selectedDate = e.target.dataset.date;
                $.ajax({
                    type: 'POST',
                    url: './forms/getSchedule.php',
                    data: { date: selectedDate },
                    success: function(response) {
                        console.log(response);
                        check_dates(JSON.parse(response));
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText);
                    }
                });
                selected.innerHTML = `選択した日付 : ${selectedDate}`;
                const table = document.getElementById('timetable');
                table.style.display = "block";
                const calendarTitle = document.getElementById('calendar_title');
                calendarTitle.style.display = "none";
                const calendarSelectTitle = document.getElementById('calendar_select_title');
                calendarSelectTitle.style.display = "block";
            });
        });
    }

    function check_dates(datas) {
        datas.forEach(function(data) {
            console.log(data['time_column']);
            let time = data['time_column'];
            document.getElementById('time_' + time).style.display = 'none';
        });
    }
    displaySelected();

    window.ontime = function() {
        schedule = document.querySelector('input[name="time"]:checked')?.value;
        const container = document.getElementById('reservation_container');
        container.style.display = 'none';
        const showschedule = document.getElementById('schedule');
        showschedule.style.display = 'block';
        const schedule_data = document.getElementById('schedule_data');
        schedule_data.innerText = `${selectedDate} : ${schedule}`;
    }

    window.onOkay = function() {
        const showschedule = document.getElementById('schedule');
        showschedule.style.display = 'none';
        const schedulecontent = document.getElementById('schedulecontent');
        schedulecontent.style.display = 'block';
        const content1 = document.getElementById('content1');
        content1.innerText = document.getElementById('name1').value;
        const content2 = document.getElementById('content2');
        content2.innerText = document.getElementById('name2').value;
        const content3 = document.getElementById('content3');
        content3.innerText = document.getElementById('phone').value;
        const content4 = document.getElementById('email').value;
        const content5 = document.getElementById('request').value;
        const schedule_Confirmdata = document.getElementById('schedule_Confirmdata');
        schedule_Confirmdata.innerText = `${selectedDate} : ${schedule}`;
    }

    window.onCancel = function() {
        const schedulecontent = document.getElementById('schedule');
        schedulecontent.style.display = 'none';
        const showschedule = document.getElementById('reservation_container');
        showschedule.style.display = 'block';
    }

    window.onConfirm = function() {
        const schedulecontent = document.getElementById('schedulecontent');
        schedulecontent.style.display = 'none';
        const scheduleConfirm = document.getElementById('scheduleConfirm');
        scheduleConfirm.style.display = 'block';
        const confirm1 = document.getElementById('confirm1');
        confirm1.innerText = document.getElementById('name1').value;
        const confirm2 = document.getElementById('name2');
        confirm2.innerText = document.getElementById('name2').value;
        const confirm3 = document.getElementById('phone');
        confirm3.innerText = document.getElementById('phone').value;
        const confirm4 = document.getElementById('email');
        confirm4.innerText = document.getElementById('email').value;
        const confirm5 = document.getElementById('request');
        confirm5.innerText = document.getElementById('request').value;
        const schedule_Reservationdata = document.getElementById('schedule_Reservationdata');
        schedule_Reservationdata.innerText = `${selectedDate} : ${schedule}`;
    }

    window.onInfoCancel = function() {
        const scheduleData = document.getElementById('schedulecontent');
        scheduleData.style.display = 'none';
        const showschedule = document.getElementById('schedule');
        showschedule.style.display = 'block';
    }

    window.onReservation = function() {
        const scheduleData = document.getElementById('scheduleConfirm');
        scheduleData.style.display = 'none';
        const initSchedule = document.getElementById('reservation_container');
        initSchedule.style.display = 'block';

        const firstName = document.getElementById('name1').value;
        const lastName = document.getElementById('name2').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const request = document.getElementById('request').value;
        $.ajax({
            type: 'POST',
            url: './forms/reservation.php',
            data: { date: selectedDate, time: schedule, firstName, lastName, phone, email, request },
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    window.onInfoBack = function() {
        const scheduleData = document.getElementById('scheduleConfirm');
        scheduleData.style.display = 'none';
        const showschedule = document.getElementById('schedulecontent');
        showschedule.style.display = 'block';
    }
});
