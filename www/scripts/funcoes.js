

function ativaPage() {
    $('.targetPage').click(function () {
        var target = $(this).attr('dt-page');
        $('.page').removeClass('page-active');
        $(target).addClass('page-active');
    });
}



ativaPage();




function limpaCampo() {

    document.getElementById('field-id').value = '';
    document.getElementById('field-name').value = '';
    document.getElementById('field-pass').value = '';
    document.getElementById('field-tel').value = '';
}
