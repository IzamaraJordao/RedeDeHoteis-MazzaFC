var Redoc = require('redoc');


Redoc.init('/public/openAPI.yml', { scrollYOffset: 50 },
document.getElementById('redoc-container'))