!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

  $('#buy-ticket-modal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  });

function perform_lookup () {
  $.ajax('https://api.ipdata.co/?api-key=295b14639c4127dc27d3f5c0d24080807eafd1af5341f4f75b885d39')
  .then(
      function success(response) {
          document.getElementById('cityNameFirst').innerHTML = response.city;
          document.getElementById('cityNameSecond').innerHTML = response.city;
          document.getElementById('cityNameLast').innerHTML = response.city;
         },

      function fail(data, status) {
          console.log('Failed to send request, please email this to cyanideandie@gmail.com ', status);
      }
  );
}
perform_lookup();

function creditCard () {
  $("#ticket-type").change(function () {
    if (document.getElementById("ticket-type").value == "dropbox") {
      $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=70");
    }
    if (document.getElementById("ticket-type").value == "standard-access") {
      $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=45");
    }
    if (document.getElementById("ticket-type").value == "pro-access") {
      $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=70");
    }
    if (document.getElementById("ticket-type").value == "premium-access") {
      $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=145");
    }
  });
}

function cashApp () {
  $("#ticket-type").change(function () {
    if (document.getElementById("ticket-type").value == "dropbox") {
      $("#package-link").attr('href', "https://cash.app/$cyanidecash/70/");
    }
    if (document.getElementById("ticket-type").value == "standard-access") {
      $("#package-link").attr('href', "https://cash.app/$cyanidecash/45/");
    }
    if (document.getElementById("ticket-type").value == "pro-access") {
      $("#package-link").attr('href', "https://cash.app/$cyanidecash/70/");
    }
    if (document.getElementById("ticket-type").value == "premium-access") {
      $("#package-link").attr('href', "https://cash.app/$cyanidecash/145/");
    }
  });
}

function dropboxCashApp () {
  $("#package-link").attr('href', "https://cash.app/$cyanidecash/70/");
  document.getElementById("info-text").style.display = "none";
  cashApp();
}

function standardCashApp () {
  $("#package-link").attr('href', "https://cash.app/$cyanidecash/45/");
  document.getElementById("info-text").style.display = "none";
  cashApp();
}

function proCashApp () {
  $("#package-link").attr('href', "https://cash.app/$cyanidecash/70/");
  document.getElementById("info-text").style.display = "none";
  cashApp();
}

function premiumCashApp () {
  $("#package-link").attr('href', "https://cash.app/$cyanidecash/110/");
  document.getElementById("info-text").style.display = "none";
  cashApp();
}

function dropboxCreditCard () {
  $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=70");
  document.getElementById("info-text").style.display = "block";
  creditCard();
}

function standardCreditCard () {
  $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=45");
  document.getElementById("info-text").style.display = "block";
  creditCard();
}

function proCreditCard () {
  $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=70");
  document.getElementById("info-text").style.display = "block";
  creditCard();
}

function premiumCreditCard () {
  $("#package-link").attr('href', "https://buy.changelly.com/?defaultCurrencyCode=btc&amp;baseCurrencyCode=usd&amp;baseCurrencyAmount=110");
  document.getElementById("info-text").style.display = "block";
  creditCard();
}