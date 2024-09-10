$(function() {
    $('.recent-tab li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.recent-tab li').removeClass('on');
        $('.recent-tabcont').removeClass('on');
        $(this).addClass('on');
        $('#' + activeTab).addClass('on');
    })
});

