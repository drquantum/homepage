/*! Copyright 2014 Infocinc (www.infocinc.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/

///////////////////////////////////////////////////////////////////////
// Globals
///////////////////////////////////////////////////////////////////////
var tablet = namespace('ifc.tablet');
var notouch = $('html').hasClass('no-touch');

//////////////////////////////////////////////////////////////////////////////////
// Enquire registering
//////////////////////////////////////////////////////////////////////////////////

function configure_enquire() {
    var _switch = false,
        _animating;

    enquire.register("screen and (min-width:768px)", {

        deferSetup: true,
        setup: function() {
            if (notouch) {
                add_interaction('#footer-contact a, #footer-community a,' +
                    '#footer-nav a', 'hover-underline');
                add_interaction('.center-navigation a', 'navbox-hover');
                add_interaction('#services-wrapper > a', 'service-item-hover');
                add_interaction('#services-wrapper > a', 'icon-text-hover');
                // services template
                add_interaction('.service-item', 'service-item-hover');
                add_interaction('.service-item', 'icon-text-hover');
                add_interaction('.services', function() {
                    if (_animating) {
                        $(_animating).stop();
                    }
                    _animating = this;
                    var _bgPos = parseInt($(this).css('background-position')),
                        _duration = (100 - _bgPos)* 140;

                    $(this).animate({
                        'background-position': '100%'
                    }, {
                        duration: _duration,
                        queue: false,
                        easing: 'linear',
                        complete: function() {
                            _animating = undefined;
                            $(this).css('background-position', '0%');
                        }
                    });
                });
            }
        },
        unmatch: function() {
            _switch = true;
            if (app_config['side-menu']) {
                init_sidemenu();
            }
        },
        match: function() {
            if (_switch || isMobile(MEDIA_STATE['init']) && app_config['side-menu']) {
                init_sidemenu();
            }
        }
    });
}


/////////////////////////////////////////////////////////////////
// Resize handler
/////////////////////////////////////////////////////////////////
tablet.resize = function() {
    mediaState = query_screenwidth(app_config['screenwidth-tag']);
}

tablet.bind_resizehandler = function() {
    window.addEventListener('resize', tablet.resize, false);
}


tablet.detect_features = function(complete) {
    var load = [{
        test: window.matchMedia,
        nope: "/js/vendor/matchMedia.min.js"
    }, {
        test: window.matchMedia.addListener,
        nope: "/js/vendor/matchMedia.addListener.min.js"
    }, {
        both: ['/js/vendor/enquire.min.js'],
        complete: function() {
            complete();
        }
    }];
    Modernizr.load(load);
}


tablet.init = function() {
    //    tablet.bind_resizehandler();

    tablet.detect_features(configure_enquire);

}
