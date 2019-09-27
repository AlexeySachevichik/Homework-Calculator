var view = {

    variables: {
        item: document.getElementById('variables'),

        show: function() {
            var table = '<table>';
            table += '<tr><td><b>length</b></td><td>' + model.length() + '</td><td>&#60;' + typeof(model.length()) + '&#62;</td></tr>';
            for (var key in model.variables) {
                table += '<tr><td><b>' + key + '</b></td><td>' + model.variables[key] + '</td><td>&#60;' + typeof(model.variables[key]) + '&#62;</td></tr>';
            }
            table += '</table>';
            view.variables.item.innerHTML = table;
        },
    },

    display: {
        item: document.getElementById('display'),

        show: function(message) {
            view.display.item.value = message;
        },
    },

    history: {
        item: document.getElementById('history'),

        show: function() {
            view.history.item.innerHTML = model.variables.history;
        },

        clear: function() {
            view.history.item.innerHTML = '';
        },
    },

    status: {
        item: document.getElementById('status'),

        show: function(message){
            view.status.item.innerHTML = message;
        },

        clear: function() {
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

    variables: {
        current: 0,         // Текущее значение
        memory: 0,          // Результат предыдущих операций
        result: 0,          // Результат
        limit: 14,          // Лимит на использование знаков
        operation: '',      // Последняя операция
        history: '',        // Строка со значениями и операциями
        firstStep: true,    // Флаг первого использования операции
    },

    // Проверка на число
    isNumeric: function(number) { 
        return !isNaN(parseFloat(number)) && isFinite(number);
    },

    // Сброс всех значений, обновление дисплея и истории
    reset: function() {

        model.variables = {
            current: 0,
            memory: 0,
            result: 0,
            limit: 14,
            operation: '',
            history: '',
            firstStep: true
        };
        
        view.history.clear();
        model.resetCurrent();
    },

    // Сброс текущих значений кроме истории
    resetCurrent: function() {
        model.variables.current = 0;
        view.status.clear();
        view.display.show(model.variables.current);
        view.variables.show(); 
    },

    // Длина текущего значения
    length: function() {
        return (model.variables.current + '').replace('.', '').replace('-', '').length;
    },

    // Добавим цифру к текущему значению
    push: function(i) {
        if (model.length() < model.variables.limit) {
            model.variables.current = ( model.variables.current === 0 || model.variables.current == '0' ) ? i : model.variables.current + '' + i;
            view.display.show( model.variables.current );
            view.status.clear();
        }
        else view.status.show("Ограничение колличества знаков");
        view.variables.show();
    },

    // Замена на противоположный знак
    inversion: function() {
        if( model.variables.current != 0 || model.variables.current != '0' ){

            if (typeof(model.variables.current) == "number") {
                model.variables.current *= -1;

            } else if (typeof(model.variables.current) == "string") {

                if( model.variables.current[0] == '-' ){
                    model.variables.current = model.variables.current.slice(1);
                
                } else model.variables.current = '-' + model.variables.current;
            }

            view.display.show( model.variables.current );
            view.status.clear();
        }
        else view.status.show("Нулю не может быть присвоен никакой знак");
        view.variables.show();
    },

    // Установка десятичного разделителя
    decimal: function() {
        if ((model.variables.current + '').indexOf('.') == -1) {
            model.variables.current += '.';
            view.display.show(model.variables.current);
            view.status.clear();
        }
        else view.status.show("Число уже имеет десятичный знак");
        view.variables.show();
    },

    // Удалим последнюю цифру текущего значения
    delete: function() {
        if( model.variables.current != 0 || model.variables.current != '0' ){
            var str = (model.variables.current + '').slice(0, model.variables.current.length - 1);
            if( isNaN(str) || str == "") model.variables.current = 0;
            else model.variables.current = str;
            view.display.show( model.variables.current );
            view.status.clear();
        
        } else view.status.show("Очистка завершена");
        view.variables.show();
    },

    log: {

        // Добавим значение в переменную истории
        add: function(symbol) {
            if (model.variables.current < 0) model.variables.history += '(' + model.variables.current + ') ' + symbol + ' ';
            else model.variables.history += model.variables.current + ' ' + symbol + ' ';
        },

        // Смена знака операции
        delete: function(symbol) {
            var str = model.variables.history.slice(0, model.variables.history.length - 2);
            model.variables.history = str + symbol + ' ';
        },

        // Добавим текущее значение в историю и покажем результат
        finish: function() {
            var str = model.variables.history.slice(0, model.variables.history.length - 2);
            model.variables.history = str + ' = <b>' + model.variables.result + '</b>';
        },

        // Очистим переменную истории
        clear: function() {
            model.variables.history = '';
        },
    },

    equally: function() {

        model.calculator.firstStep = true;    // Сброс флага

        if( model.calculator.operation != 'equally' ){

            model.history.add('');    // Добавим к истории

            if( model.calculator.operation == 'addition' ){
                model.calculator.result  += model.calculator.current;
            }

            else if( model.calculator.operation == 'subtraction' ){
                model.calculator.result  -=  model.calculator.current;
            };

            model.calculator.memory  = 0;
            model.calculator.current = model.calculator.result;

            model.history.finish(); // Закончим историю
            view.display.refresh(); // Обновляем дисплей
            view.history.show();    // Покажем историю
            model.history.clear();  // Очистим значение истории

            model.calculator.operation = 'equally';    // Установим последнее действие
        };
    },

    arithmetic: {

        // Сложение
        addition: function() {
            
            // Если запустили в первый раз
            if (model.variables.firstStep) {
                model.log.add('+');
                view.history.show();
                model.variables.memory = +model.variables.current;
                model.variables.current = 0;
            }

            // Если предыдущая операция была сложение
            else if (model.variables.operation == 'addition' && model.variables.current !== 0) {
                model.log.add('+');
                view.history.show();
                model.variables.memory += +model.variables.current;
                model.variables.current = 0;
            }

            // Если до этого была другая операция
            else {
                model.log.delete('+');

                if (model.variables.current != 0) {
                    model.log.add('+');
                    model.variables.memory += +model.variables.current;
                    model.variables.current = 0;
                }
                view.history.show();
            }

            model.variables.operation = 'addition';
            model.variables.firstStep = false;
            view.display.show(model.variables.memory);
            view.status.clear();
            view.variables.show();
        },

        // Вычитание
        subtraction: function() {
            
            // Если запустили в первый раз
            if (model.variables.firstStep) {
                model.log.add('-');
                view.history.show();
                model.variables.memory = model.variables.current;
                model.variables.current = 0;

            // Если предидущая операция была вычетание
            } else if (model.variables.operation == 'subtraction' && model.variables.current !== 0) {
                model.log.add('-');
                view.history.show();
                model.variables.memory -= model.variables.current;
                model.variables.current = 0;
            
            // Если до этого была другая операция
            } else {
                model.log.delete('-');

                if (model.variables.current != 0) {
                    model.log.add('-');
                    model.variables.memory -= model.variables.current;
                    model.variables.current = 0;
                }
                view.history.show();
            }

            model.variables.operation = 'subtraction';
            model.variables.firstStep = false; 
            view.display.show(model.variables.memory);
            view.status.clear();
            view.variables.show();
        },

        // Деление
        division: function() {
            console.log('division');
        },

        // Умножение
        multiplication: function() {
            console.log('multiplication');
        }
    },
};





var controller = {

    numbers: {
        push: function(e) {
            var i = e.target.innerHTML;    // Получим значение с кнопки
            model.push(i);                 // Добавляем значение к текущему числу 
        },
        inversion: function() { model.inversion(); },    // Меняем знак на противоположный
        decimal:   function() { model.decimal(); },      // Добавляем десятичную запятую
    },

    control: {
        delete:  function() { model.delete(); },         // Удаляем последний символ
        pop:     function() { model.resetCurrent(); },   // Сбрасываем текущее значение
        clear:   function() { model.reset(); },          // Сброс всех значений
        equally: function() { model.equally(); },        // Подсчет результатов
    },

    arithmetic: {
        division:       function() { model.arithmetic.division(); },         // Деление
        multiplication: function() { model.arithmetic.multiplication(); },   // Умножение
        subtraction:    function() { model.arithmetic.subtraction();  },     // Вычитание
        addition:       function() { model.arithmetic.addition(); },         // Сложение
    },
};





(function(){
    var app = {

        init: function() {
            model.reset();  // Сброс значений
            this.event();   // Инициализация событий
        },

        event: function(){
            view.numbers.n1.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n2.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n3.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n4.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n5.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n6.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n7.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n8.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n9.addEventListener('click', function(e){ controller.numbers.push(e); } );
            view.numbers.n0.addEventListener('click', function(e){ controller.numbers.push(e); } );

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