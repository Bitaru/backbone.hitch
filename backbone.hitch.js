// Backbone.Hitch v0.0.1
// Copyright (c) 2014 Excursiopedia, Bitaru <aiir.diir@gmail.com>

(function (factory) {

    // Set up Hitch appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd)
        define(['lodash', 'Jquery'], factory);

    // Next for Node.js or CommonJS.
    else if (typeof exports === 'object')
        factory(require('lodash'), require('backbone'));

    // Finally, as a browser global.
    else
        factory(_, Backbone);

}(function (_, Backbone) {

    // Backbone.Hitch Namespace
    // --------------------------
    Backbone.hitch = {

        _handlers: {},
        addHandler: function(handlers) {
            // Fill-in default values.
            for(i in handlers){
                handler = handlers[i];
                this._handlers[handler.key+'Handler'] = handler.fn;
            }
        }

    };

    // Backbone.View Mixins
    // --------------------

    _.extend(Backbone.View.prototype, {

          // Default binding methods
          _bindTypes: ['css', 'html', 'val'],
          _bindedElements: [],

          hitch: function(query){
              var block = document.getElementById(query);

              for (var i = 0; i < this._bindTypes.length; i += 1) {
                  var key = this._bindTypes[i],
                      binds = block.querySelectorAll("[data-bind-"+key+"]");
                  bindAttr(binds, key, this);
              }

          }
    });

    // Helpers
    // -------

    toArray = function(str){
        var tmp = [],
            arrays = str.split(',')
        for(var i = 0; i < arrays.length; i +=1){
            tmp.push(arrays[i].split(':'));

        }
        return tmp;
    }

    bindAttr = function(binds, key, self){
        for (var d = 0; d < binds.length; d += 1){
            var index = self.bindedElements.push(binds[d]),
                el = binds[d],
                data = toArray(el.getAttribute("data-bind-"+key).replace(/[\n ]/g, ""))
            subscribe(data, key, index-1, self);
        }
    };

    subscribe = function(data, key, index, self){
        var el = self.bindedElements[index];
        for(var i = 0; i < data.length; i += 1){
            addSubscriber(el, data[i], key, self.model)
        }
    };

    addSubscriber = function(el, data, key, model){
        model.on('change:'+ (data[1] || data[0]), function(m, ch){
            Backbone.hitch._handlers[key+'Handler'](el, data, ch);
        });
    };

    // Default Handlers
    // ----------------

    Backbone.hitch.addHandler([{
        key: 'css',
        fn: function(el, data, value){
            el.style[data[0]] = value;
        }
    },{
        key: 'html',
        fn: function(el, data, value){
            el.innerHTML = value;
        }
    },{
        key: 'val',
        fn: function(el, data, value){
            el.value = value;
        }
    }]);

}));