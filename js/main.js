document.addEventListener('DOMContentLoaded', function () {
    var namesArray = ['Miran', 'Amiran', 'Mikael', 'Liam', 'Kemal'];
    var cityArray = ['Kyiv', 'epvnf', 'test'];
    var alert = document.querySelector('.alert');
    var alertName = alert.querySelector('.alert__name');
    var alertCity = alert.querySelector('.alert__city');
    var alertCount = alert.querySelector('.alert__count');
    var clsAlertShow = 'alert--show';
    var alertInterval = null;
    alertInterval = setInterval(intervalHandler, getRandom(26000, 34000));

    function intervalHandler() {
        if (alert.classList.contains(clsAlertShow)) {
            clearInterval(alertInterval);
            alertInterval = setInterval(intervalHandler, getRandom(26000, 34000));
            return;
        }
        createAlertMessage();
        alertShow();
        setTimeout(function () {
            alertHidden();
        }, 10000);
    }

    function createAlertMessage() {
        var name = namesArray[getRandom(0, namesArray.length - 1)];
        var city = cityArray[getRandom(0, cityArray.length - 1)];
        var count = getRandom(2, 4);
        alertName.textContent = name;
        alertCity.textContent = city;
        alertCount.textContent = count;
    }

    function alertShow() {
        alert.classList.add(clsAlertShow);
    }

    function alertHidden() {
        alert.classList.remove(clsAlertShow);
    }

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});