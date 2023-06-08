window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE_RGB = "./static/images/stacked_pred_rgb";
var INTERP_BASE_MASK = "./static/images/stacked_pred_mask";
var INTERP_BASE_RGB_LOSS = "./static/images/stacked_recon_loss";
var INTERP_BASE_SEG_ACC = "./static/images/stacked_seg_acc";
var NUM_INTERP_FRAMES = 319;

var interp_images_rgb = [];
var interp_images_mask = [];
var interp_images_rgb_loss = [];
var interp_images_mask_acc = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE_RGB + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images_rgb[i] = new Image();
    interp_images_rgb[i].src = path;

    var path = INTERP_BASE_MASK + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images_mask[i] = new Image();
    interp_images_mask[i].src = path;    

    var path = INTERP_BASE_RGB_LOSS + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images_rgb_loss[i] = new Image();
    interp_images_rgb_loss[i].src = path;    
    
    var path = INTERP_BASE_SEG_ACC + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images_mask_acc[i] = new Image();
    interp_images_mask_acc[i].src = path;        
  }
}

function setInterpolationImage(i) {
  var image = interp_images_rgb[i];
  var mask = interp_images_mask[i];
  var rgb_loss = interp_images_rgb_loss[i];
  var mask_acc = interp_images_mask_acc[i];
  
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper')[0].children[1].src = image.src;
  // $('#interpolation-image-wrapper').empty().append(image);
  $('#interpolation-seg-wrapper')[0].children[1].src = mask.src;
  $('#interpolation-rgbloss-wrapper')[0].children[1].src = rgb_loss.src;
  $('#interpolation-segloss-wrapper')[0].children[1].src = mask_acc.src;  
}


$(document).ready(function() {
    var options = {
			slidesToScroll: 1,
			slidesToShow: 4,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();


    var slider = document.getElementById("interpolation-slider");

    // Flag to control the automatic movement
    var autoMove = false;
    
    // Function to update slider value every 1 second
    var interval = setInterval(function() {
        if(autoMove) {
            if(slider.value < 318) {
                slider.value = parseInt(slider.value) + 1;
            } else {
                slider.value = 1; // reset to 1 when it reaches 100
            }
    
            // Trigger input event for visual update
            if ("Event" in window) {
                slider.dispatchEvent(new Event("input"));
            } else {
                var evt = document.createEvent("Event");
                evt.initEvent("input", true, true);
                slider.dispatchEvent(evt);
            }
        }
    }, 10); // 1000 ms = 1 second
    
    // Stop automatic movement when the slider is clicked
    slider.addEventListener("mousedown", function() {
        autoMove = false;
        $("#hand-pointer").css("display", "none")
    });    

    $('#pointslow')[0].playbackRate = 0.7;


    // bibtex copy
    // https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog.html

    const copyButtonLabel = "copy";

    // use a class selector if available
    let blocks = document.querySelectorAll("pre");

    blocks.forEach((block) => {
        // only add button if browser supports Clipboard API
        if (navigator.clipboard) {
            let button = document.createElement("button");

            button.innerText = copyButtonLabel;
            block.appendChild(button);

            button.addEventListener("click", async () => {
                await copyCode(block, button);
            });
        }
    });

    async function copyCode(block, button) {
        let code = block.querySelector("code");
        let text = code.innerText;

        await navigator.clipboard.writeText(text);

        // visual feedback that task is completed
        button.innerText = "citation copied!";

        setTimeout(() => {
            button.innerText = copyButtonLabel;
        }, 700);
    }    

})





