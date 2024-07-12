$(document).ready(function() {

    // Image change functionality for 'OUR PROJECT' section
    $('.content-item').on('click', function() {
        var newImageSrc = $(this).data('image');
        $('#project-image').attr('src', newImageSrc);
        
        $('.content-item').removeClass('bg-danger text-white');
        $(this).addClass('bg-danger text-white');
    });

    // Carousel functionality
    const $slider = $('.services-slider');
    const $services = $('.service');
    const $dots = $('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        $slider.css('transform', `translateX(-${index * 100 / $services.length}%)`);
        $dots.removeClass('active').eq(index).addClass('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % $services.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 7000); // Change slide every 7 seconds

    $dots.each(function(index) {
        $(this).on('click', function() {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    // Form submission handling
    $("#contactForm").submit(function(e) {
        e.preventDefault();
        $("#contact-button").css("cursor", "not-allowed");

        var action = $(this).attr("action");
        $.ajax({
            type: "POST",
            url: action,
            crossDomain: true,
            data: new FormData(this),
            dataType: "json",
            processData: false,
            contentType: false,
            headers: {
                "Accept": "application/json"
            }
        }).done(function() {
            alert('The form was submitted successfully.');
            $("#contact-button").css("cursor", "default"); // Reset cursor after success
        }).fail(function() {
            alert('An error occurred! Please try again later.');
            $("#contact-button").css("cursor", "default"); // Reset cursor after failure
        });
    });
});
