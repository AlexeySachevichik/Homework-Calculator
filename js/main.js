var view = {

    display: {
        item: document.getElementById('display'),

        show: function( message ){ // Вывод на дисплей значения
            view.display.item.value = message;
        },
    },


    history: {
        item: document.getElementById('history'),

        show: function(){ // Выводим историю
            view.history.item.innerHTML = model.calculator.history;
        },

        clear: function(){
            view.history.item.innerHTML = '';
        },
    },

    status: {
        item: document.getElementById('status'),

        show: function(message){
            view.status.item.innerHTML = message;
        },

        clear: function(){
            view.status.item.innerHTML = '';
        },
    },

    numbers: {
        n1: document.getElementById('n1'),
        n2: document.getElementById('n2'),
        n3: document.getElementById('n3'),
        n4: document.getElementById('n4'),
        n5: document.getElementById('n5'),
        n6: document.getElementById('n6'),
        n7: document.getElementById('n7'),
        n8: document.getElementById('n8'),
        n9: document.getElementById('n9'),
        n0: document.getElementById('n0'),

        inv: document.getElementById('inv'),
        dot: document.getElementById('dot'),
    },

    arithmetic: {
        division:       document.getElementById('div'),
        multiplication: document.getElementById('mul'),
        subtraction:    document.getElementById('minus'),
        addition:       document.getElementById('plus'),
    },

    control: {
        delete:  document.getElementById('del'),
        pop:     document.getElementById('ce'),
        clear:   document.getElementById('c'),
        equally: document.getElementById('equally'),
    },
};





var model = {

    current: 0,         // Текущее значение
    memomy: 0,          // Результат предыдущих операций
    result: 0,          // Результат
    limit: 15,          // Лимит на использование знаков
    operation: '',      // Последняя операция
    history: '',        // Строка со значениями и операциями
    firstStep: true,    // Флаг первого использования операции
    
    

    isNumeric: function(i){ // Проверка на число
        
        return !isNaN(parseFloat(i)) && isFinite(i);
    },

    reset: function(){ // Сброс всех значений, обновление дисплея и истории

        model.current = 0;
        model.memory = 0;
        model.result = 0;
        model.operation = '';
        model.firstStep = true;

        view.display.show( model.current ); // Выводим текущее значение
        view.status.clear();                // Очищаем статус
        model.log.clear();                  // Очищаем переменную истории
        view.history.clear();               // Очищаем историю 
    },

    resetCurrent: function(){ // Сброс текущего значения
        model.current = 0;

        view.display.show( model.current );  // Выводим текущее значение
        view.status.clear();                 // Очищаем статус
    },

    length: function(){ // Посчитаем количество цифр в текущем значении

        return (model.current + '').length;
        // return (model.current + '').replace('.', '').replace('-', '').length;
    },

    push: function(i){ // Добавим цифру к текущему значению

        if( model.length() < model.limit ){

            // Если текущее число равно нулю
            if( model.current == 0 ){

                // то просто заменим значение на переданное
                model.current = i;
            }
            else {

                // Текущее значение преобразуем в строку
                // и в конец добавим переданную цифру
                model.current = model.current + '' + i;
            };

            view.display.show( model.current ); // Обновляем дисплей
            view.status.clear();                // Очищаем статус
        }
        else view.status.show("Ограничение колличества знаков");
    },

    delete: function(){ // Удалим последнюю цифру текущего значения

        // Если текущее значенее отлично от нуля или не пустое
        if( model.current != 0 || model.current != '' ){

            // Текущее значение переведем в строку
            // и удалим последний символ, и преобразуем обратно в число
            var str = (model.current + '').slice(0, model.length() - 1);

            // Проверим на возможные ошибки
            if( isNaN(str) ) model.current = 0;
            // else if( +str == 0 && str.length > 1) model.current = str.slice(0, str.length - 1);
            else model.current = str;

            view.display.show( model.current ); // Обновляем дисплей
            view.status.clear();                // Очищаем статус
        }
        else{
            view.status.show("Очистка завершена");
        };
    },

    inversion: function(){ // Замена на противоположный знак

        // Если текущее значенее отлично от нуля
        if( model.current != 0 ){

            // Текущее значение умножаем на минус один
            model.current *= -1;

            view.display.show( model.current ); // Обновляем дисплей
            view.status.clear();                // Очищаем статус
        }
        else view.status.show("Нулю не может быть присвоен никакой знак");
    },

    decimal: function(){ // Установка десятичного разделителя

        // Если в текущем значении нет разделителя то добавим его
        if( (model.current + '').indexOf('.') == -1 ){

            model.current += '.';

            view.display.show( model.current ); // Обновляем дисплей
            view.status.clear();                // Очищаем статус
        }
        else view.status.show("Число уже имеет десятичный знак");
    },

    log: {
        add: function(symbol){ // Добавим значение в переменную истории
            
            // Если текущее значение отрицательное, то обвернем его в скобки
            if( model.current < 0 ) model.history += '(' + model.current + ') ' + symbol + ' ';
            else model.history += model.current + ' ' + symbol + ' ';
        },

        edit: function(symbol){ // Смена знака операции
            var str = model.history.slice(0, model.history.length - 2);
            model.history = str + symbol + ' ';
        },

        finish: function(){ // Добавим текущее значение в историю и покажем результат
            var str = model.history.slice(0, model.history.length - 2);
            model.history = str + ' = <b>' + model.result + '</b>';
        },

        clear: function(){ // Очистим переменную истории
            
            model.history = '';
        },
    },





    equally: function(){

        model.calculator.firstStep = true;    // Сброс флага

        if( model.calculator.operation != 'equally' ){

            model.history.add('');    // Добавим к истории

            if( model.calculator.operation == 'addition' ){
                model.calculator.result  += model.calculator.current;
            }

            else if( model.calculator.operation == 'subtraction' ){
                model.calculator.result  -=  model.calculator.current;
            };

            model.calculator.memomy  = 0;
            model.calculator.current = model.calculator.result;

            model.history.finish(); // Закончим историю
            view.display.refresh(); // Обновляем дисплей
            view.history.show();    // Покажем историю
            model.history.clear();  // Очистим значение истории

            model.calculator.operation = 'equally';    // Установим последнее действие
        };
    },





    arithmetic: {
        division: function(){ // Деление
            console.log('division');
        },

        multiplication: function(){ // Умножение
            console.log('multiplication');
        },

        subtraction: function(){ // Вычитание
            console.log("----Вычитание--------------------------------");
            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy, model.calculator.result);
            
            // Если запустили в первый раз
            if( model.calculator.firstStep ){

                model.history.add('-');        // Добавим к истории
                view.history.show();           // Покажем историю

                // В памать передадим текущее занчение
                model.calculator.memomy = model.calculator.current;

                // Сбросим текущее значение
                model.calculator.current = 0;           
            }

            // Если предидущая операция была вычетание
            else if( model.calculator.operation == 'subtraction' ){

                model.history.add('-');        // Добавим к истории
                view.history.show();           // Покажем историю

                // К значению памяти прибавим текущее занчение
                model.calculator.memomy -= model.calculator.current;

                // Сбросим текущее значение
                model.calculator.current = 0;
            }

            // Если до этого была другая операция
            else {

                console.log('Другая операция');

                model.history.edit('-');       // Меняем последний знак

                if(  model.calculator.current != 0 ){
                    model.history.add('-');        // Добавим к истории

                    // К значению памяти прибавим текущее занчение
                    model.calculator.memomy -= model.calculator.current;

                    // Сбросим текущее значение
                    model.calculator.current = 0;
                };

                view.history.show();           // Покажем историю
            };

            model.calculator.operation = 'subtraction';    // Установим последнее действие
            model.calculator.firstStep = false;         // Установим флаг, что не первая операция

            view.display.refresh();    // Обновляем дисплей
            view.status.clear();       // Очищаем статус

            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy, model.calculator.result);
            console.log("---------------------------------------------");
        },


        addition: function(){ // Сложение
            console.log("----Сложение---------------------------------");
            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy, model.calculator.result);
            
            // Если запустили в первый раз
            if( model.calculator.firstStep ){

                model.history.add('+');        // Добавим к истории
                view.history.show();           // Покажем историю

                // В памать передадим текущее занчение
                model.calculator.memomy = model.calculator.current;

                // Сбросим текущее значение
                model.calculator.current = 0;
            }

            // Если предидущая операция было сложене
            else if( model.calculator.operation == 'addition' ){

                model.history.add('+');        // Добавим к истории
                view.history.show();           // Покажем историю

                // К значению памяти прибавим текущее занчение
                model.calculator.memomy += model.calculator.current;

                // Сбросим текущее значение
                model.calculator.current = 0;
            }

            // Если до этого была другая операция
            else {

                console.log('Другая операция');

                model.history.edit('+');       // Меняем последний знак

                if(  model.calculator.current != 0 ){
                    model.history.add('+');        // Добавим к истории

                    // К значению памяти прибавим текущее занчение
                    model.calculator.memomy += model.calculator.current;

                    // Сбросим текущее значение
                    model.calculator.current = 0;
                };

                view.history.show();           // Покажем историю
            };

            model.calculator.operation = 'addition';    // Установим последнее действие
            model.calculator.firstStep = false;         // Установим флаг, что не первая операция

            view.display.memory();    // Обновляем дисплей
            view.status.clear();      // Очищаем статус

            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy, model.calculator.result);
            console.log("---------------------------------------------");
        },
    },
};





var controller = {

    numbers: {
        push: function(e){
            var i = e.target.innerHTML;    // Получим значение с кнопки
            model.push(i);                 // Добавляем значение к текущему числу 
        },
        inversion: function(){ model.inversion(); },    // Меняем знак на противоположный
        decimal:   function(){ model.decimal(); },      // Добавляем десятичную запятую
    },

    control: {
        delete:  function(){ model.delete(); },         // Удаляем последний символ
        pop:     function(){ model.resetCurrent(); },   // Сбрасываем текущее значение
        clear:   function(){ model.reset(); },          // Сброс всех значений
        equally: function(){ model.equally(); },        // Подсчет результатов
    },

    arithmetic: {
        division:       function(){ model.arithmetic.division(); },         // Деление
        multiplication: function(){ model.arithmetic.multiplication(); },   // Умножение
        subtraction:    function(){ model.arithmetic.subtraction();  },     // Вычитание
        addition:       function(){ model.arithmetic.addition(); },         // Сложение
    },
};





(function(){
    var app = {
        /**
         * ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
         */
        init: function(){
            model.reset();  // Сброс значений
            this.event();   // Инициализация событий
        },
        event: function(){

            view.numbers.n1.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n2.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n3.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n4.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n5.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n6.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n7.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n8.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n9.addEventListener('click', function(e){ controller.numbers.push(e) } );
            view.numbers.n0.addEventListener('click', function(e){ controller.numbers.push(e) } );

            view.numbers.inv.addEventListener('click', controller.numbers.inversion );
            view.numbers.dot.addEventListener('click', controller.numbers.decimal );


            view.arithmetic.division.addEventListener('click',       controller.arithmetic.division );
            view.arithmetic.multiplication.addEventListener('click', controller.arithmetic.multiplication );
            view.arithmetic.subtraction.addEventListener('click',    controller.arithmetic.subtraction );
            view.arithmetic.addition.addEventListener('click',       controller.arithmetic.addition );


            view.control.delete.addEventListener('click',  controller.control.delete );
            view.control.pop.addEventListener('click',     controller.control.pop );
            view.control.clear.addEventListener('click',   controller.control.clear );
            view.control.equally.addEventListener('click', controller.control.equally );
        },
    };

    app.init();
})();