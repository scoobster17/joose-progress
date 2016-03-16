/*
Joose Progress Component
@author Phil Gibbins

Depends on Joose.utils
*/

;var joose = window.joose || {};
joose.classes = joose.classes || {};
joose.progress = (function(js) {
    
    "use strict";

    // progress constructor
    var progress = function(containerId) {

        // set the container element
        this.container = document.getElementById(containerId);

        // cancel if no container found
        if (!this.container) return false;

        // get further details of the progress instance
        this.direction = this.container.getAttribute('data-direction');
        this.continuous = this.container.getAttribute('data-continuous');
        this.description = this.container.getAttribute('data-description');

        // perform initial setup of the progress
        this.init();

    };

    // set common properties for progress
    progress.prototype = {

        // initialise the progress instance
        init: function() {

            // apply data attribute for styling if not already present
            if (!this.container.hasAttribute('data-component')) {
                this.container.setAttribute('data-component', 'progress');
            };

            // set defaults
            this.continuous = this.continuous === 'true' ? true : false;
            if (this.direction !== 'horizontal' && this.direction !== 'vertical' && this.direction !== 'radial') {
                this.direction = 'horizontal';
            }
            if (this.description !== 'percentage' && this.description !== 'time') {
                this.description = 'percentage';
            }

            // get the progress to show value if not continuous
            if (!this.continuous && description === 'percentage') {
                // get and stop at %
            } else {
                // continuous e.g. timer
            }
        }
    };

    // find any instances of progress on the page, and initialise those found
    var init = function() {

        // make progress constructor publicly available
        joose.classes.progress = progress;

        // find all progress instances on the page not manually initialised
        var progressInstances = document.querySelectorAll('[data-component="progress"]');
        var noOfProgressInstances = progressInstances.length;
        
        // if there are progress we want to initialise them individually
        if (noOfProgressInstances > 0) {

            for (var i=0; i<noOfProgressInstances; i++) {

                // get the progress details
                var progressId = progressInstances[i].getAttribute('id');

                // default the id if none supplied
                if (!progressId) {
                    progressId = 'progress-' + i;
                    progressInstances[i].setAttribute('id', progressId);
                }

                // record instance of progress to variable
                joose.progress[progressId] = new progress(progressId);
            }
        }
    };

    return {
        init: init
    }

})(joose);

// initialise progress functionality
joose.progress.init();

// remove public method
delete joose.progress.init;