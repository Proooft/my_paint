$(document).ready(function () {

    var color = $('#color').val();
    var fillcolor = $('#fillcolor').val();
    var painting = false;
    var started = false;
    var width_brush = $('#widthbrush').val();
    var canvas = $("#mycanvas");
    var cursorX, cursorY;
    var tools = 1;
    var fill = 1;
    var fillarc = 1;
    var prevX, prevY;
    var flag = 0;
    var positionX = $('#positionX').val();
    var positionY = $('#positionY').val();
    var fontsize = $('#fontsize').val();

    symVerticale = document.getElementById('verticale');
    symHorizon = document.getElementById('horizon');

    //tools:
    //   1: Pencil
    //   2: line
    //   3: rubber
    //   4: rectangle
    //   5: cercle 
    console.log(width_brush);
    $('.width').text(width_brush);
    $('.positionX').text(positionX);
    $('.positionY').text(positionY);
    $('.fontsize').text(fontsize);
    var context = canvas[0].getContext('2d');
    context.lineJoin = 'round';
    context.lineCap = 'round';


    canvas.mousedown(function (e) {
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        startX = (e.pageX - this.offsetLeft);
        startY = (e.pageY - this.offsetTop);

        switch (tools) {
            case 1:
                painting = true;
                draw(e);

                break;
            case 2:
                started = false;
                drawline();

                break;
            case 3:
                painting = true;

            default:
                break;
        }
    })

    canvas.mouseup(function (e) {

        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        switch (tools) {
            case 1:
                painting = false;
                started = false;
                flag = 1;
                console.log(flag);
                break;
            case 2:
                started = true;
                drawline();

                break;
            case 3:
                painting = false;

                break;
            case 4:
                rectangle();

                break;
            case 5:
                cercle()


            default:
                break;
        }

    })

    canvas.mouseleave(function (e) {
        painting = false;
        flag = 1;
    })
    canvas.mousemove(function (e) {
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);

        switch (tools) {
            case 1:
                if (painting) {
                    draw(e);
                }
                console.log(painting);
                break;
            case 3:
                if (painting) {
                    context.clearRect(cursorX, cursorY, 40, 40);
                }
                default:
                    break;
        }

    })

    function rectangle() {

        var width = cursorX - startX;
        var height = cursorY - startY;
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width_brush;
        context.rect(startX, startY, width, height);
        if (fill === 3) {
            context.fillStyle = fillcolor;
            context.fill();
        }
        context.stroke();

    }

    function cercle() {
        var radius = 1;
        var width = cursorX - startX;
        var height = cursorY - startY;
        if ((width * (-1)) > (height * (-1))) {
            if (Math.sign(width) === -1) {
                radius = (width * (-1)) / 2;
            } else {
                radius = width / 2;
            }
        } else {
            if (Math.sign(height) === -1) {
                radius = (height * (-1)) / 2;
            } else {
                radius = height / 2;
            }
        }
        console.log(width);
        console.log(height);

        if (Math.sign(width) === -1) {
            startX = startX - radius;
        } else {
            startX = startX + radius;
        }

        if (Math.sign(height) === -1) {
            startY = startY - radius;
        } else {
            startY = startY + radius;
        }

        // startX = startX + radius;
        // startY = startY + radius;
        context.beginPath();
        context.lineWidth = width_brush;
        context.strokeStyle = color;
        context.arc(startX, startY, radius, 0, 2 * Math.PI);
        if (fillarc === 3) {
            context.fillStyle = fillcolor;
            context.fill();
        }
        context.stroke();

    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();

    }

    function draw(e) {
        var x = e.offsetX;
        var y = e.offsetY;

        context.strokeStyle = color;
        context.lineWidth = width_brush;
        // console.log(prevX);
        // console.log(prevY);
        if (flag === 1) {
            prevX = e.offsetX;
            prevY = e.offsetY;
            flag = 0
        }

        if (symVerticale.checked == true && symHorizon.checked == true) {
            drawLine(1000 - prevX, 700 - prevY, 1000 - x, 700 - y)
            drawLine(1000 - prevX, prevY, 1000 - x, y)
            drawLine(prevX, prevY, x, y)
            drawLine(prevX, 700 - prevY, x, 700 - y)
        } else if (symHorizon.checked == true) {
            drawLine(prevX, prevY, x, y)
            drawLine(prevX, 700 - prevY, x, 700 - y)

        } else if (symVerticale.checked == true) {
            drawLine(prevX, prevY, x, y)
            drawLine(1000 - prevX, prevY, 1000 - x, y)
        } else {
            drawLine(prevX, prevY, x, y);

        }

        prevX = x;
        prevY = y;

    }



    function drawline() {

        switch (tools) {
            case 2:
                if (!started) {
                    context.beginPath();
                    context.moveTo(cursorX, cursorY);
                    started = true;
                } else {
                    context.lineTo(cursorX, cursorY);
                    context.strokeStyle = color;
                    context.lineWidth = width_brush;
                    context.stroke();
                    started = false;
                }

                default:
                    break;
        }
    }

    function clear_canvas() {
        context.clearRect(0, 0, canvas.width(), canvas.height());
    }

    $('.reset').click(function () {
        clear_canvas();
    })


    $('.ligne').click(function () {

        tools = 2;
        $('button').css({
            "color": "white",
            'border': '3px solid white',
            'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))'
        });
        $('.ligne').css({
            'color': 'rgb(70, 70, 70)',
            'border': '3px solid rgb(70, 70, 70)'
        });


    })
    $('.pencil').click(function () {

        tools = 1;
        $('button').css({
            "color": "white",
            'border': '3px solid white',
            'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))'
        });
        $('.pencil').css({
            'color': 'rgb(70, 70, 70)',
            'border': '3px solid rgb(70, 70, 70)'
        });


    })


    $('.gomme').click(function () {

        tools = 3;
        $('button').css({
            "color": "white",
            'border': '3px solid white',
            'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))'
        });
        $('.gomme').css({
            'color': 'rgb(70, 70, 70)',
            'border': '3px solid rgb(70, 70, 70)'
        });
    })

    $('.rectangle').click(function () {
        tools = 4;
        $('button').css({
            "color": "white",
            'border': '3px solid white',
            'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))'
        });
        if (fill === 2) {
            fill = 3;
            $('.rectangle').css({
                'color': 'white',
                'background': 'black'
            });
        } else if (fill === 1) {
            fill = 2;
            $('.rectangle').css({
                'color': 'rgb(70, 70, 70)',
                'border': '3px solid rgb(70, 70, 70)'
            });
        } else if (fill === 3) {
            fill = 1;
            $('.rectangle').css({
                'color': 'rgb(70, 70, 70)',
                'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))',
                'border': '3px solid rgb(70, 70, 70)'
            });

        }
    })

    // $('.rectangle').css({'color': 'rgb(70, 70, 70)','border':'3px solid rgb(70, 70, 70)'});
    // })
    $('.cercle').click(function () {

        tools = 5;

        $('button').css({
            "color": "white",
            'border': '3px solid white',
            'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))'
        });
        if (fillarc === 2) {
            fillarc = 3;
            $('.cercle').css({
                'color': 'white',
                'background': 'black'
            });
        } else if (fillarc === 1) {
            fillarc = 2;
            $('.cercle').css({
                'color': 'rgb(70, 70, 70)',
                'border': '3px solid rgb(70, 70, 70)'
            });
        } else if (fillarc === 3) {
            fillarc = 1;
            $('.cercle').css({
                'color': 'rgb(70, 70, 70)',
                'background': 'linear-gradient(60deg, rgb(255, 82, 241), rgb(65, 68, 255))',
                'border': '3px solid rgb(70, 70, 70)'
            });

        }
    })

    $("#color").change(function () {
        color = $('#color').val();
    })

    $("#fillcolor").change(function () {
        fillcolor = $('#fillcolor').val();
    })


    $("#widthbrush").on('input', function () {
        width_brush = $('#widthbrush').val();
        $('.width').text(width_brush);

    })
    $("#fontsize").on('input', function () {
        fontsize = $('#fontsize').val();
        $('.fontsize').text(fontsize);

    })

    $("#positionX").on('input', function () {
        positionX = $('#positionX').val();
        $('.positionX').text(positionX);

    })
    $("#positionY").on('input', function () {
        positionY = $('#positionY').val();
        $('.positionY').text(positionY);

    })

    function getWidthOfText(txt, fontname, fontsize) {

        getWidthOfText.e = document.createElement('span');
        document.body.appendChild(getWidthOfText.e);
        getWidthOfText.e.style.fontSize = fontsize;
        getWidthOfText.e.style.fontFamily = fontname;
        getWidthOfText.e.innerText = txt;
        return getWidthOfText.e.offsetWidth;
    }
    $(".textadd").click(function () {
        text = $('#text').val();
        stringfont = fontsize + 'px';
        context.font = stringfont + ' Montserrat';
        console.log(stringfont);
        size = getWidthOfText(text, 'Montserrat', fontsize + 'px');
        $('span').remove();
        context.fillStyle = color;
        context.fillText(text, positionX, positionY);
    })



    var dwn = document.getElementById('save');
    var canvasdl = document.getElementById('mycanvas');

    dwn.onclick = function () {
        download(canvasdl, 'myimage.png');
    }



    function download(canvasdl, filename) {
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'),
            e;
        console.log(canvasdl);
        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;

        /// convert canvasdl content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvasdl.toDataURL("image/png;base64");

        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (event) {
                var img = new Image();
                img.onload = function (event) {
                    context.drawImage(img, 0, 0);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#charger ").change(function () {
        readURL(this);
    });

});