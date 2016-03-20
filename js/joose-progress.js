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
        this.duration = this.container.getAttribute('data-duration');
        this.delayProgress = this.container.getAttribute('data-delayed');
        this.stopAt = this.container.getAttribute('data-stop-at');
        this.description = this.container.getAttribute('data-description');

        // perform initial setup of the progress
        this.init();

    };

    // set common properties for progress
    progress.prototype = {

        // show progress
        showProgress: function() {

            var stopAt = parseInt(this.stopAt);

            // if is static progress, get and stop at % or seconds
            if (!this.continuous && '' + stopAt !== 'NaN') {
                
                moveToProgress(stopAt);

            // if continuous decide what is a complete state
            } else {
                
                var completeValue;

                switch (this.description) {
                    case 'time':
                        completeValue = this.duration;
                        break;
                    case 'percentage':
                    default:
                        completeValue = 100;
                        break;
                }

                startContinousProgress(completeValue);

            }
        },

        // move to a certain level of progression
        moveToProgress: function(stopAt) {

            // incrementally adjust visual progress

        },

        // set a continous loop for the progress instance
        startContinousProgress: function(completeValue) {

            var progressInstance = this;

            // progress to 100% of the complete value
            moveToProgress(completeValue);

            // repeat the delayed progress
            progressInstance.continuousProgressTimeout = setTimeout(function() {
                progressInstance.startContinuousProgress(completeValue);
            }, progressInstance.duration);

        },

        // stop progress
        stopContinuousProgress: function() {
            clearTimeout(this.continuousProgressTimeout);
        },

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
            (this.delayProgress === 'true') ? true : false;

            // set default time to 5 seconds also converting to milliseconds
            this.duration = ('' + parseInt(this.duration) !== 'NaN') ? this.duration * 1000 : 5000;

            // if the start of the progress is not delayed, show progress
            if (this.delayProgress) showProgress();
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