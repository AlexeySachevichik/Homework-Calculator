var view = {

    display: {
        item: document.getElementById('display'),

        refresh: function(){ // Выводим текущее значение
            view.display.item.innerHTML = model.calculator.current;
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

            view.display.refresh();         // Обновляем дисплей
            view.status.clear();            // Очищаем статус
        },
    },

    calculator: {

        current: 0,
        memomy: 0,
        limit: 15,

        // currentStr: '',
        // currentArr: [],
        
        length: function(){
            return (model.calculator.current + '').replace('.', '').replace('-', '').length;
        },
        

        push: function(i){
            if( model.calculator.length() < model.calculator.limit ){
                
                if( model.calculator.current === 0 ){
                    model.calculator.current = i;
                    view.display.refresh();         // Обновляем дисплей
                    view.status.clear();            // Очищаем статус
                }
                else {
                    model.calculator.current = +( '' + model.calculator.current + '' + i );
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

            if( model.calculator.current !== 0 ){
                var str = model.calculator.current + '';
                str = str.slice(0, str.length - 1);

                if( str == NaN || str == 0 || str == '' || str == '-' || str == undefined ){
                    model.calculator.current = 0;
                }
                else{
                    model.calculator.current = +str;
                };

                view.display.refresh();    // Обновляем дисплей
                view.status.clear();       // Очищаем статус
            }
            else{
                view.status.show("Очистка завершена");
            };
            
        },

        inversion: function(){
            if( model.calculator.current !== 0 ){
                model.calculator.current = model.calculator.current * -1;
                view.display.refresh();    // Обновляем дисплей
                view.status.clear();       // Очищаем статус
            }
            else{
                view.status.show("Нулю не может быть присвоен никакой знак");
            };
        },
    },
};



var controller = {

    numbers: {
        push: function(e){
            var i = +e.target.innerHTML;    // Получим значение с кнопки
            model.calculator.push(i);       // Добавляем значение к текущему числу 
        },

        inversion: function(){
            model.calculator.inversion();   // Меняем знак на противоположный
        },
    },

    control: {
        delete: function(){
            model.calculator.delete();     // Удаляем последний символ
        },

        clear: function(){
            model.display.clear();      // Сброс значений
        },
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


            view.control.clear.addEventListener('click', controller.control.clear );
            view.control.delete.addEventListener('click', controller.control.delete );
        },
    };

    app.init();
})();