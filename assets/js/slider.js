$(".custom-carousel").owlCarousel({
    autoWidth: true,
    margin: 1,
    loop: true,
    nav: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    dots: true,
    responsive: {
        1000 : {
            items: 2
        }
    }
  });
  $(document).ready(function () {
    $(".custom-carousel .item").click(function () {
      $(".custom-carousel .item").not($(this)).removeClass("active");
      $(this).toggleClass("active");
    });
  });