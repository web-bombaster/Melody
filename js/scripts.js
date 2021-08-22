$(document).ready(function () {

	var currentFloor = 02; // 02 - начальное положение активного этажа, а далее хранение текущего положения этажа
	var floorPath = $('.main-image path'); // каждый отдельный этаж в svg
	var counterTop = $('.counter-top'); // кнопка увеличения счетчика этажей
	var counterBottom = $('.counter-bottom'); // кнопка уменьшения счетчика этажей
	var modal = $('.modal');
	var modalCloseButton = $('.modal-close');
	var viewFlatsButton = $('.view-flats');
	var flatNumberLink = $('.flat-link'); // ссылка для подсветки квартиры в svg
	var flatNumberPath = $('.modal-image path'); // каждая отдельная квартира в svg

	// Меняем счетчик по наведению на этаж
	floorPath.on('mouseover', function () {
		floorPath.removeClass('current-floor'); // удаляем активный класс у этажей
		currentFloor = $(this).attr('data-floor'); // считываем атрибут data-floor
		$('.counter').text(currentFloor); // помещаем значение атрибута data-floor в счетчик
	});

	// Меняем счетчик и подсветку этажа по клику на стрелку вверх
	counterTop.on('click', function () {
		if (currentFloor < 18) { // если этаж меньше максимального
			currentFloor++; // увеличиваем этаж
			usCurrentFloor = currentFloor.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }); // записываем в usCurrentFloor значение нового положения и приводим к нужному формату (двузначному) вывода числа, чтобы было 01, а не 1
			$('.counter').text(usCurrentFloor); // меняем значение счетчика на новое
			floorPath.removeClass('current-floor'); // удаляем активный класс у ранее активных этажей
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor'); // добавляем класс активного этажа для подсветки
		}
	});

	// Меняем счетчик и подсветку этажа по клику на стрелку вниз
	counterBottom.on('click', function () {
		if (currentFloor > 2) { // если этаж больше минимального
			currentFloor--; // уменьшаем этаж
			usCurrentFloor = currentFloor.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }); // записываем в usCurrentFloor значение нового положения и приводим к нужному формату (двузначному) вывода числа, чтобы было 01, а не 1
			$('.counter').text(usCurrentFloor); // меняем значение счетчика на новое
			floorPath.removeClass('current-floor'); // удаляем активный класс у ранее активных этажей
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor'); // добавляем класс активного этажа для подсветки
		}
	});

	function toggleModal() {
		modal.toggleClass('is-open');
	}

	floorPath.on('click', toggleModal); // при клике на этаж вызвать окно
	modalCloseButton.on('click', toggleModal); // закрытие всплывающего окна
	viewFlatsButton.on('click', toggleModal); // при клике на кнопку "Смотреть квартиры на этаже" вызвать окно

	// Меняем подсветку квартир на этаже при наведении на текст квартиры
	flatNumberLink.on('mouseover', function () {
		flatNumberPath.removeClass('activ'); // удаляем активный класс у ранее подсвеченных квартир
		currentFlat = $(this).attr('data-flat'); // считываем атрибут data-flat
		$(`.modal-image [data-flat=${currentFlat}]`).addClass('activ'); // находим соответствующую квартиру с нужным data-атрибутом
		flatNumberLink.removeClass('activ'); // удаляем активный класс у других ссылок
	});

	// Меняем подсветку текста квартиры при наведении на квартику этажа
	flatNumberPath.on('mouseover', function () {
		flatNumberLink.removeClass('activ'); // удаляем активный класс у ранее подсвеченных ссыдлк
		currentFlat = $(this).attr('data-flat'); // считываем атрибут data-flat
		$(`.flat-list [data-flat=${currentFlat}]`).addClass('activ'); // находим соответствующую ссылку на квартиру с нужным data-атрибутом
		flatNumberPath.removeClass('activ'); // удаляем активный класс у других квартир
	});

});
