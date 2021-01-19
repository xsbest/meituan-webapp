//不经过webpack构建的 所以需要直接用ES5
(function(){
    var docEl = document.documentElement
    
    function setRemUnit(){
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    window.addEventListener('resize',setRemUnit);
})();