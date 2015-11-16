var BigSite = (function(){
    this.old = null;
    this.width = 100;

    var $ = (function(elm){
        return document.querySelector(elm);
    }), $create = (function(tag, id){
        var tag = document.createElement(tag);
        if(id) tag.id = id;
        return tag;
    }), $add = (function(elm, parent){
        (parent || document.body).appendChild(elm);
    }), $populate = (function(view){
        var ids = document.querySelectorAll("[id]"); // http://stackoverflow.com/a/7115083/754471
        for(var i in ids){
            var a = $create("a");
            a.href = "#" + ids[i].id;
            a.innerHTML = "#" + ids[i].id;
            a.addEventListener("click", function(){
                setTimeout(function(){
                    $(window.location.hash).className += " bigSiteSelected";
                    if(this.old){
                        var classNames = $(this.old).className;
                        $(this.old).className = classNames.replace(/( bigSiteSelected)/g, "");
                    }
                    this.old = window.location.hash;
                }, 0);
            });
            $add(a, view);
        }
        return ids;
    });

    var currentData = $("body").innerHTML,
        bigData = $create("div", "bigSite");
    $("body").innerHTML = "";
    bigData.innerHTML = currentData;
    $add(bigData);

    var minimap = $create("div", "minimap"),
        resizer = $create("div", "resizer"),
        holder = $create("div", "holder"),
        title = $create("h1"),
        view = $create("div", "view"),
        clear = $create("div", "bigClear");
    title.innerHTML = $("head title").innerHTML.substr(0, 14);
    $populate(view);
    $add(resizer, minimap);
    $add(title, holder);
    $add(view, holder);
    $add(clear, holder);
    $add(holder, minimap);
    $add(minimap);

    minimap.style.width = this.width + "px";
    resizer.style.height = minimap.clientHeight + "px";
    bigData.style.width = "calc(100% - " + minimap.style.width + ")";

    return {
        width: this.width,
        mousedown: this.mousedown,
        resizer: resizer,
        resizeWindow: function(){},
        resizeSelf: function(x){
            resizer.style.height = holder.clientHeight + "px";

            minimap.style.width = (document.body.clientWidth - x) + "px";
            bigData.style.width = "calc(100% - " + minimap.style.width + ")";
        },
        removeSelf: function(){
            $("body").innerHTML = $("#bigSite").innerHTML;
        }
    };
});

if(bigSite == undefined){
    var bigSite = new BigSite();
    window.addEventListener("resize", bigSite.resizeWindow);
    bigSite.resizer.addEventListener("mousedown", function(){
        bigSite.mousedown = true;
    });
    bigSite.resizer.addEventListener("mouseup", function(){
        bigSite.mousedown = false;
    });
    window.addEventListener("mousemove", function(e){
        e.preventDefault();
        if(bigSite.mousedown) bigSite.resizeSelf(e.clientX);
    });
}else{
    bigSite.removeSelf();
    bigSite = undefined;
}
