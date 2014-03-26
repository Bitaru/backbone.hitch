## Backbone.hitch

*Hitch* - is a simple plugin for backbone, witch provide data-bind logic in html.
Example bindings:
```html
<div id="viewWrap">
  <h2 data-bind-css="color: font_color" data-bind-html="title"></h2>
</div>
```
```javascript
View = Backbone.View.extend({
  initialize: function(){
    this.hitch('viewWrap');
  }
});
new View({model: someModel});
```
So hitch will change html and css in H2 on someModel`s attribute 'title' or 'font_color' update

### Avaible bindings
css - data-bind-css="color: ..., font: ..., etc."
html - data-bind-html="title"
value - data-bind-val="myValue"


