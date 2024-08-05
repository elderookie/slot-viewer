<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservation Calendar</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
</head>
<body>
    <section id="reservation" class="section-bg">
        <div class="container row col-md-6 mx-auto" id="reservation_container">
            <h2 class="text-center" id="calendar_title">空き状況検索</h2>
            <h2 class="text-center" id="calendar_select_title">空き状況</h2>
            <div class="calender_container">
                <div class="calendar">
                    <header>
                        <pre class="left">◀</pre>
                        <div class="header-display">
                            <p class="display"></p>
                        </div>
                        <pre class="right">▶</pre>
                    </header>
                    <div class="week">
                        <div>日</div>
                        <div>月</div>
                        <div>火</div>
                        <div>水</div>
                        <div>木</div>
                        <div>金</div>
                        <div>土</div>
                    </div>
                    <div class="days"></div>
                </div>
            </div>
            <p class="text-center mt-5">希望日を選択してください</p>
            <div class="display-selected" id="timetable">
                <p class="selected"></p>
                <table style="width: 100%">
                    <tr id="time_10" class="time_tr">
                        <td class="border">10:00-11:00</td>
                        <td class="border">
                            <input type="radio" value="10" name="time" />
                        </td>
                    </tr>
                    <!-- Additional time slots here -->
                </table>
                <button class="reservation_Btn mt-3" onclick="ontime()">
                    次へ
                </button>
            </div>
        </div>
        <!-- Include other sections here if needed -->
    </section>
    <script src="{{ mix('js/app.js') }}"></script>
    <script src="{{ mix('js/reservation.js') }}"></script>
</body>
</html>
