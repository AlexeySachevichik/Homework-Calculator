var view = {

    display: {
        item: document.getElementById('display'),

        refresh: function(){ // Выводим текущее значение
            view.display.item.innerHTML = model.calculator.current;
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
        division: document.getElementById('div'),
        multiplication: document.getElementById('mul'),
        subtraction: document.getElementById('minus'),
        addition: document.getElementById('plus'),
    },

    control: {
        delete: document.getElementById('del'),
        pop: document.getElementById('ce'),
        clear: document.getElementById('c'),
        equally: document.getElementById('equally'),
    },
};





var model = {

    display: {
        clear: function(){
            model.calculator.current = 0;
            model.calculator.memomy = 0;
            model.calculator.result = 0;
            model.calculator.operation = '';
            model.calculator.history = '';

            view.display.refresh();         // Обновляем дисплей
            view.status.clear();            // Очищаем статус
            view.history.clear();            // Очищаем историю
        },
    },

    history: {
        add: function(s){ // Добавим значение в историю
            if( model.calculator.current < 0 ){
                model.calculator.history += '(' + model.calculator.current + ') ' + s + ' ';
            }
            else{
                model.calculator.history += model.calculator.current + ' ' + s + ' ';
            };
        },

        finish: function(){ // Добавим последнее значение в историю и покажем результат
            var h = model.calculator.history.slice(0, model.calculator.history.length - 2);
            model.calculator.history = h + ' = <b>' + model.calculator.current + '</b>';
        },

        edit: function(s){ // Добавим значение в историю с заменой знака
            var h = model.calculator.history.slice(0, model.calculator.history.length - 2);
            model.calculator.history = h + s + ' ';
        },

        clear: function(){ // Очистим историю
            model.calculator.history = '';
        },
    },

    calculator: {

        current: 0,
        memomy: 0,
        result: 0,
        firstStep: true,
        operation: '',
        history: '',
        limit: 15,

        length: function(){

            return (model.calculator.current + '').replace('.', '').replace('-', '').length;
        },

        push: function(i){
            if( model.calculator.length() < model.calculator.limit ){
                
                if( model.calculator.current === 0 ){
                    model.calculator.current = +i;
                    view.display.refresh();         // Обновляем дисплей
                    view.status.clear();            // Очищаем статус
                }
                else {
                    model.calculator.current = +(model.calculator.current + '' + i);
                    view.display.refresh();         // Обновляем дисплей
                    view.status.clear();            // Очищаем статус
                };
            }
            else {
                view.status.show("Ограничение колличества знаков");
            };
        },

        pop: function(){
            model.calculator.current = 0;

            view.display.refresh();        // Обновляем дисплей
            view.status.clear();           // Очищаем статус
        },

        delete: function(){

            if( model.calculator.current != 0 ){
                var str = (model.calculator.current + '').slice(0, model.calculator.length() - 1);

                model.calculator.current = +str;

                if( model.calculator.current == NaN ||
                    model.calculator.current == 0 ||
                    model.calculator.current == false ||
                    model.calculator.current == '' ||
                    model.calculator.current == '-' ||
                    model.calculator.current == undefined
                ){
                    model.calculator.current = 0;
                };

                view.display.refresh();    // Обновляем дисплей
                view.status.clear();       // Очищаем статус
            }
            else{
                view.status.show("Очистка завершена");
            };
            
        },

        inversion: function(){
            if( model.calculator.current != 0 ){
                model.calculator.current *= -1;
                view.display.refresh();    // Обновляем дисплей
                view.status.clear();       // Очищаем статус
            }
            else{
                view.status.show("Нулю не может быть присвоен никакой знак");
            };
        },

        decimal: function(){
            if( (model.calculator.current + '').indexOf('.') == -1 ){
                model.calculator.current += '.';
                view.display.refresh();    // Обновляем дисплей
                view.status.clear();       // Очищаем статус
            }
            else{
                view.status.show("Число уже имеет десятичный знак");
            };
        },

        equally: function(){

            model.calculator.firstStep = true;    // Сброс флага

            if( model.calculator.operation != 'equally' ){

                model.history.add('');    // Добавим к истории

                console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy, model.calculator.result);

                if( model.calculator.operation == 'addition' ){
                    model.calculator.result  = model.calculator.memomy + model.calculator.current;
                }

                else if( model.calculator.operation == 'subtraction' ){
                    model.calculator.result  = model.calculator.memomy - model.calculator.current;
                };

                model.calculator.memomy  = 0;
                model.calculator.current = model.calculator.result;

                console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy, model.calculator.result);

                model.history.finish(); // Закончим историю
                view.display.refresh(); // Обновляем дисплей
                view.history.show();    // Покажем историю
                model.history.clear();  // Очистим значение истории

                model.calculator.operation = 'equally';    // Установим последнее действие
            };
        },
    },

    arithmetic: {
        division: function(){ // Деление
            console.log('division');
        },

        multiplication: function(){ // Умножение
            console.log('multiplication');
        },

        subtraction: function(){ // Вычитание

            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy);
            
            if( model.calculator.operation == 'subtraction' ||
                model.calculator.operation == 'equally' ||
                model.calculator.operation == ''
            ){
                model.history.add('-');        // Добавим к истории
                view.history.show();               // Покажем историю

                if( model.calculator.firstStep ) model.calculator.memomy = model.calculator.current;
                else   model.calculator.memomy = model.calculator.memomy - model.calculator.current;

                model.calculator.firstStep = false;     // Установим флаг, что не первая операция
                model.calculator.current = 0;           // Сброс текущего значения
            }
            else{
                model.history.edit('-');       // Меняем последний знак
                model.history.add('-');        // Добавим к истории
                view.history.show();               // Покажем историю
            };

            model.calculator.operation = 'subtraction';    // Установим последнее действие

            view.display.refresh();    // Обновляем дисплей
            view.status.clear();       // Очищаем статус

            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy);
        },


        addition: function(){ // Сложение
            
            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy);
            
            if( model.calculator.operation == 'addition' ||
                model.calculator.operation == 'equally' ||
                model.calculator.operation == ''
            ){
                model.history.add('+');        // Добавим к истории
                view.history.show();           // Покажем историю

                if( model.calculator.firstStep ) model.calculator.memomy = model.calculator.current;
                else   model.calculator.memomy = model.calculator.memomy + model.calculator.current;

                model.calculator.firstStep = false;     // Установим флаг, что не первая операция
                model.calculator.current = 0;           // Сброс текущего значения
            }
            else {
                model.history.edit('+');       // Меняем последний знак
                // model.history.add('+');        // Добавим к истории
                view.history.show();           // Покажем историю
            };

            model.calculator.operation = 'addition';    // Установим последнее действие

            view.display.refresh();    // Обновляем дисплей
            view.status.clear();       // Очищаем статус

            console.log( model.calculator.firstStep, model.calculator.current, model.calculator.memomy);
        },
    },
};





var controller = {

    numbers: {
        push: function(e){
            var i = e.target.innerHTML;    // Получим значение с кнопки
            model.calculator.push(i);       // Добавляем значение к текущему числу 
        },
        inversion: function(){ model.calculator.inversion(); },     // Меняем знак на противоположный
        decimal: function(){ model.calculator.decimal(); },         // Добавляем десятичную запятую
    },

    control: {
        delete:  function(){ model.calculator.delete(); },   // Удаляем последний символ
        pop:     function(){ model.calculator.pop(); },      // Удаляем текущее значение
        clear:   function(){ model.display.clear(); },       // Сброс значений
        equally: function(){ model.calculator.equally(); },  // Подсчет результатов
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
            model.display.clear();      // Сброс значений

            this.event();
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
            view.control.pop.addEventListener('click',  controller.control.pop );
            view.control.clear.addEventListener('click',   controller.control.clear );
            view.control.equally.addEventListener('click', controller.control.equally );
        },
    };

    app.init();
})();