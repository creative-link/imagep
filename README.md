imagep
======

Small javascript placeholder for broken images

Usage
--------------
 - Connect library

```html
    <script type="text/javascript" src="imagep.js"></script>
```

 - Call **imagep.initPlaceholder** with parameters

```javascript
    var options = {
        // for any custom style
        style: {
            color: "#bbb"
        },
        // min placeholder width and height
        minWidth: 80,
        minHeight: 80
    };

    imagep.initPlaceholder(options);
```

Preview on [JsFiddle](http://jsfiddle.net/CreativeLink/ep4cq066/)