/////////////////////////
// Animation setup
/////////////////////////
var velocities = [{
        'direction': -1,
        'speed': 20
    }, {
        'direction': -1,
        'speed': 50
    }],
    translateY = [0, 0];

var scene = {
    'container': '#form-wrapper',
    'background': 'rgb(0,0,0)',
    'sourceSet': [
        '/images/contact/stardust.png',
        '/images/contact/stardust.png'
    ],
    'refresh': function(index, c, ct, now, lastTime) {
        var o = {},
            v = velocities[index],
            delta = now - lastTime;

        translateY[index] += v.speed * delta / 1024;
        if (index == 0) {
            var color = 20 + Math.floor(Math.sin(Math.PI / 8 * now / 1000) * 30);
            $(c).css('background', 'rgb(' + 20 + ',' + (color) + ',' + color + ')');
        }
        drawBackground(index, c, ct, 0, v.direction * translateY[index]);
    }
}

$(document).ready(function() {
    initScene(scene);
});

//////////////////////
// Client-side FORM Validation 
//////////////////////

$.validator || document.write('<script src="/js/vendor/jquery.validate.min.js"><\/script>')
$.validator.addMethod("cRequired", $.validator.methods.required, required)
$.validator.addMethod("cMaxLength", $.validator.methods.maxlength, maxlength)
$.validator.addMethod("cTextAreaMaxLength", $.validator.methods.maxlength, textareamaxlength)
$.validator.addClassRules("constrained", {
    cRequired: true,
    cMaxLength: 50
})
$.validator.addClassRules("msg-constrained", {
    cRequired: true,
    cTextAreaMaxLength: 2000
})

$('#formContact').validate({
    messages: {
        "email": validemail
    },
    success: function(label, element) {
        $(element).removeClass('has-error');
        $(element).addClass('has-success');
    },
    errorPlacement: function(error, element) {
        $(element).addClass('has-error');
        $(element).closest("div").append(error);
        resize(scene.container);
    },
    errorElement: "span"
})

