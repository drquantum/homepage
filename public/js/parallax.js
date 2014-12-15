var lax = namespace('ifc.lax'),
    parallax = {
        selector: $('.parallax'),
        ctx: [],
        c: [],
        bg: [],
        velocity: []
    },
    ticker = {
        selector: $('.ticker'),
        c: $('.ticker').get(0),
        ct: $('.ticker').get(0).getContext('2d'),
        widths: [],
        msg: textmsg
    },
    img = new Image();


lax.init = function(options) {
    var p = parallax,
        ps = parallax.selector,
        pre = options && options.pre ? options.pre : null;

    img.src = '/images/portfolio/bg-desktop.png';

    lax.resize(pre);

    $(window).on('resize', function() {
    	lax.resize(pre);
    });

    ps.each(function(i) {
        p.ctx[i] = this.getContext('2d');
        p.velocity[i] = {
            'direction': Math.pow(-1, i),
            'speed': 20 + Math.random() * 20
        };
        p.bg[i] = $(this).css('background', '#281928');
    });

    ticker.msg.forEach(function(value, index) {
        ticker.widths[index] = ticker.ct.measureText(value).width;
    });
    ticker.ct.textAlign = 'left';
    ticker.ct.textBaseline = 'middle';
    ticker.ct.fillStyle = 'yellow';

    img.onload = function() {
        ps.each(function() {
            lax.drawBackground(this, this.getContext('2d'), 0);
        });

        setTimeout(function() {
            var startTime = (new Date()).getTime();
            ps.each(function(i) {
                lax.repaintBg(
                    this,
                    this.getContext('2d'),
                    startTime,
                    p.velocity[i]['speed'],
                    p.velocity[i]['direction'],
                    0
                );
            });
            lax.repaintText(ticker.c, ticker.ct, startTime, ticker.c.width, 300, 1, 0);
        }, 10);
    }
}


lax.resize = function(pre, post) {
    var h = $('header').height(),
        w = $(window).width(),
        ps = parallax.selector,
        ts = ticker.selector,
        tct = ticker.ct;

    ticker.midpoint = h / 2;

    if (pre) {
        pre();
    }

    ps.each(function(i) {
        $(this).attr({
            'width': w,
            'height': h / ps.length
        });
    });

    ts.attr({
        'width': w,
        'height': h
    });
    tct.font = h / 5 + 'px Time Square';
    ticker.ct.fillStyle = 'yellow';
}

lax.repaintText = function(c, ct, lastTime, tx, speed, direction, index) {
    var now = (new Date()).getTime(),
        delta = speed * (now - lastTime) / 1000,
        tx = tx - delta;

    ct.clearRect(0, 0, c.width, c.height);

    if (tx + ticker.widths[index] > 0) {
        ct.fillText(ticker.msg[index], tx, ticker.midpoint);
    } else {
        tx = c.width;
        index = (index + 1) % textmsg.length;
    }

    requestAnimFrame(function() {
        lax.repaintText(c, ct, now, tx, speed, direction, index)
    });
}

lax.repaintBg = function(c, ct, lastTime, speed, direction,tx) {
    var now = (new Date()).getTime(),
        tx = (speed*now / 1024) % c.width;

    ct.clearRect(0, 0, c.width, c.height);
    lax.drawBackground(c, ct, direction * tx);
    requestAnimFrame(function() {
        lax.repaintBg(c, ct, now, speed, direction,tx)
    });
}


lax.drawBackground = function(c, ct, tx) {
    var cw = c.width,
        ch = c.height,
        x = tx,
        y = 0,
        w = img.width,
        h = img.height,
        ix = 0,
        iw = w,
        rw = w,
        rx = 0,
        reset,
        paint = true;

    while (paint) {
        if (x + w > cw) {
            rx = iw = cw - x;
            rw = (x + w) - cw;
        }
        if (reset) {
            if (x >= tx) {
                paint = false;
            } else if (x + iw > tx) {
                iw = tx - x;
            }
        }
        if (paint) {
            ct.drawImage(img, ix, 0, iw, h, x, y, iw, h);
            x = x + iw;
            iw = w;
            ix = 0;
        }
        if (x == cw) {
            reset = true;
            x = 0;
            ix = rx;
            iw = rw;
        }
    }
}
