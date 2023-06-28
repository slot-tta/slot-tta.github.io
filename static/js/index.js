window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_EX1 = "./static/slot_tta_gifs/ex1_frames";
var INTERP_EX2 = "./static/slot_tta_gifs/ex2_frames";
var INTERP_EX4 = "./static/slot_tta_gifs/ex4_frames";
var INTERP_EX5 = "./static/slot_tta_gifs/ex5_frames";
var INTERP_EX6 = "./static/slot_tta_gifs/ex6_frames";
var INTERP_EX7 = "./static/slot_tta_gifs/ex7_frames";
var INTERP_EX3 = "./static/slot_tta_gifs/ex3_frames";
var NUM_INTERP_FRAMES = 264;
var NUM_INTERP_FRAMES_PC = 130;

var interp_images_ex1 = [];
var interp_images_ex2 = [];
var interp_images_ex3 = [];
var interp_images_ex4 = [];
var interp_images_ex5 = [];
var interp_images_ex6 = [];
var interp_images_ex7 = [];

function preloadInterpolationImages() {
  for (var i = 1; i < NUM_INTERP_FRAMES; i++) {


    var path = INTERP_EX3 + '/frame' + String(i).padStart(4, '0') + '.png';
    interp_images_ex3[i] = new Image();
    interp_images_ex3[i].src = path;        

}}


function setEx3(i) {
    var ex3 = interp_images_ex3[i];
    $('#interpolation-ex3-wrapper')[0].children[0].src = ex3.src
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
    // VerlyRange("range-slider-poster", "#15ff00");

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    const input = document.querySelector("input");
    const label = document.querySelector("label");
    
    input.addEventListener("input", event => {
      const value = Number(input.value) / 100;
      input.style.setProperty("--thumb-rotate", `${value * 720}deg`);
    //   label.innerHTML = Math.round(value * 50);
    });
    


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

    $('#range-slider-poster').on('input', function(event) {
      setEx3(this.value);
    });
    setEx3(1);
    $('#range-slider-poster').prop('max', NUM_INTERP_FRAMES - 1);



    bulmaSlider.attach();


    var slider_poster = document.getElementById("range-slider-poster");
    // Flag to control the automatic movement
    var autoMove = true;
    
    // Function to update slider value every 1 second
    var interval = setInterval(function() {
        if(autoMove) {
            if(slider_poster.value < NUM_INTERP_FRAMES-1) {
                slider_poster.value = parseInt(slider_poster.value) + 1;
            } else {
                slider_poster.value = 1; // reset to 1 when it reaches 100
            }

            // Trigger input event for visual update
            if ("Event" in window) {
                slider_poster.dispatchEvent(new Event("input"));

            } else {
                var evt = document.createEvent("Event");
                evt.initEvent("input", true, true);
                slider_poster.dispatchEvent(evt);
            }
        }
    }, 10); // 1000 ms = 1 second
    
    // Stop automatic movement when the slider is clicked
    slider_poster.addEventListener("mousedown", function() {
        autoMove = false;
    });    

    slider_poster.addEventListener("pointerdown", function() {
        autoMove = false;
    });
    




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

});





