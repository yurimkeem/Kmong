$(document).ready(function(){
// header 스크롤
let didScroll;
let lastScrollTop = 0;
let delta = 5;

$(window).on('scroll', function() {
    didScroll = true;
})

setInterval(function () {
    if (didScroll) {
        headerScroll();
        didScroll = false;
    }
}, 250);

function headerScroll() {
    let scrollTop = $(this).scrollTop();

    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    if (scrollTop > lastScrollTop && scrollTop > $('.header').outerHeight()) {
        // Scroll Down
        // $('.headerArea').removeClass('down').addClass('up');
        $('.btn_top').removeClass('on');

        if(scrollTop > $('.footer').offset().top - $(window).innerHeight()){
            $('.btn_top').removeClass('on');
        }

    } else {
        // Scroll Up
        if (scrollTop + $(window).height() < $(document).height()) {
            // $('.headerArea').removeClass('up').addClass('down');

            if(scrollTop < $('.footer').offset().top - $(window).innerHeight()){
                $('.btn_top').addClass('on');
            }

        }
        if (scrollTop < $('.header').outerHeight()) {
            // $('.headerArea').removeClass('down');
            $('.btn_top').removeClass('on')

        }
    }
    lastScrollTop = scrollTop;
}

// btn top
$('.btn_top').on('click', function() {
    $('html, body').stop().animate({scrollTop: 0}, 400);
})

// header PC GNB
function headerGnbDesktop() {
    const header = $('.header');
    const menuList = header.find('.gnb .menu > li');
    const subList = header.find('.submenu > li');

    menuList.on('mouseenter', function() {
        if(!header.hasClass('on')) {
            header.addClass('on');
        }
    });

    header.on('mouseleave', function() {
        if(!isMobileTablet()) {
            $(this).removeClass('on');
        }
    });
    
    subList.on('mouseenter', function() {
        subList.addClass('off').removeClass('on');
        $(this).addClass('on').removeClass('off');
    });

    subList.on('mouseleave', function() {
        subList.removeClass('on off');
        $(this).removeClass('on off');
    });
}


// header Mobile GNB
function headerGnbMobile() {
    const header = $('.header');
    const btnGnb = header.find('.btn_gnb');
    const gnb = header.find('.gnb');
    const menuList = header.find('.gnb > .menu > li');
    const btnSearch = header.find('.btn_search');
    const headerSearch = header.find('.search_wrap');
    let dimGnb = `<div class="dim_gnb"></div>`;

    btnGnb.on('click', function(e) {
        if(!$(this).hasClass('on')) {
            $('body').addClass('hidden');
            $('body').append(dimGnb);
            header.addClass('on');
            gnb.addClass('on');
        } else {
            $('body').removeClass('hidden');
            $('.dim_gnb').stop().fadeOut(function () {
                $(this).remove();
            });
            header.removeClass('on');
            gnb.removeClass('on');
        }
        if(isMobile() && headerSearch.hasClass('on')) {
            btnSearch.removeClass('on');
            headerSearch.removeClass('on');
        }

        $(this).toggleClass('on');

        e.preventDefault();
    });

    menuList.on('click', function(e) {
        if(isMobileTablet() && !$(this).hasClass('on')) {
            menuList.addClass('off').removeClass('on');
            $(this).addClass('on').removeClass('off');
            menuList.find('.submenu').stop().slideUp();
            $(this).find('.submenu').stop().slideDown();
            console.log('sjdkjsh');
        } else if(isMobileTablet() && $(this).hasClass('on')) {
            menuList.removeClass('on off');
            $(this).find('.submenu').stop().slideUp();

        }
        e.preventDefault();
    })

    $(document).on('click', '.dim_gnb', function() {
        $('body').removeClass('hidden');
        $('.dim_gnb').stop().fadeOut(function () {
            $(this).remove();
        });
        header.removeClass('on');
        gnb.removeClass('on');
        btnGnb.removeClass('on');
    });
}


// header 검색 
function headerSearch() {
    const body = $('body');
    const header = $('header');
    const gnb = header.find('.gnb');
    const btnSearch = header.find('.btn_search');
    const btnGnb = header.find('.btn_gnb');
    const headerSearch = header.find('.search_wrap');
    const inputSearch = header.find('.search_wrap .input input');
    const inputDelete = header.find('.search_wrap .input .delete');
    
    btnSearch.on('click', function(e) {
        if(!$(this).hasClass('on')) {
            if(isMobile()) {
                header.addClass('on');
            }
            btnSearch.addClass('on')
            headerSearch.addClass('on');
        } else {
            if(isMobile()) {
                header.removeClass('on');
            }
            btnSearch.removeClass('on')
            headerSearch.removeClass('on');
        }

        if(isMobile() && gnb.hasClass('on')) {
            $('.dim_gnb').stop().fadeOut(function () {
                $(this).remove();
            });
            gnb.removeClass('on');
            btnGnb.removeClass('on');
        }
        e.preventDefault();
    });

    inputSearch.on('input', function() {
        if($(this).val() === '') {
            $(this).parent('.input').removeClass('on');
        } else {
            $(this).parent('.input').addClass('on');
        }
    });

    inputDelete.on('click', function() {
        $(this).parent('.input').removeClass('on');
        inputSearch.val('');
    });

    // body.on('click', function(e) {
    //     if (headerSearch.hasClass('on') && !$(e.target).closest('.btn_search, .search_wrap').length) {
    //         headerSearch.removeClass('on');
    //     }
    // });

}

// header 언어선택
function headerLanguage() {
    const body = $('body');
    const header = $('header');
    const btnGlobal = header.find('.btn_global');
    const language = header.find('.language_list');

    btnGlobal.on('click', function(e) {
        language.toggleClass('on');
        e.preventDefault();
    });

    // body.on('click', function(e) {
    //     if (language.hasClass('on') && !$(e.target).closest('.btn_global, .language_list').length) {
    //         language.removeClass('on');
    //     }
    // });

}

function headerClose() {
    if(!isMobileTablet()) {
        $('body').removeClass('hidden');
        $('.dim_gnb').stop().fadeOut(function () {
            $(this).remove();
        });
        $('.header').removeClass('on');
        $('.gnb').removeClass('on');
        $('.btn_gnb').removeClass('on');
        $('.btn_search').removeClass('on');
        $('.search_wrap').removeClass('on');
    } 
}

$(window).on('resize', function(){
    isMobile();
    isMobileTablet();
    headerClose();
});

function isMobile() {
    return window.innerWidth <= 768;
}

function isMobileTablet() {
    return window.innerWidth <= 1180;
}



function headerInit() {
    headerGnbDesktop();
    headerGnbMobile();
    headerSearch();
    headerLanguage();
    headerClose()
    isMobile();
    isMobileTablet();
}

headerInit();

});