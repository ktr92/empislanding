function initFE() {
  closeByClickOutside('[data-menu="mainmenu"]', '[data-menutoggle="mainmenu"]');
}

function closeByClickOutside(element, button) {
  $(document).click(function (event) {
    if (!$(event.target).closest(`${element},${button}`).length) {
      $(button).removeClass("active")
      $(element).removeClass("active")
    }
  })

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(button).removeClass("active")
      $(element).removeClass("active")
    }
  })
}

function lazyLoadSrc(selector) {
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const source = entry.target
      if (entry.intersectionRatio > 0) {
        if (!source.getAttribute('src')) {
            source.setAttribute('src', source.dataset.src)
            observer.unobserve(source)
        }
      }
    })
  }
  const target = document.querySelectorAll(selector)
  const options = {
    threshold: 0.4
  }
  let obs = new IntersectionObserver(callback, options)
  target.forEach(item => {
    obs.observe(item)
  }) 
}

$(document).ready(function () {
  new WOW().init();


  $('#demo').gradient({
    colors: ['#0CC4FB', '#2295F8', '#2858E4', '#193FAB']
  });

  $("[data-menutoggle]").on("click", function (e) {
    e.preventDefault();
    let menu = $(this).data("menutoggle");
    $(`[data-menu=${menu}]`).toggleClass("active");
    $(this).toggleClass("active");
    $(".jsbackdrop").toggleClass("active");
  });
  $(".jsbackdrop").on("click", function (e) {
    $(this).removeClass("active");
    $("[data-menu]").removeClass("active");
    $("[data-menutoggle]").removeClass("active");
  });


 
  $("a.scrollTo").click(function () {

    var destination = $($(this).attr("href")).offset().top - 30;
    $("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 1100);
    return false;
  });

 

  $(".jsbackdrop").on("click", function (e) {
    $(this).removeClass("active")
    $("[data-menu]").removeClass("active")
    $("[data-menutoggle]").removeClass("active")
  })

  $("input[type=tel]").mask("7 (999) 999-99-99")
 
})


window.addEventListener("load", function () {
  initFE()
})

document.addEventListener('DOMContentLoaded', function() {
  lazyLoadSrc('img');
  lazyLoadSrc('iframe');
})
