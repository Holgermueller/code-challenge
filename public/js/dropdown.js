$(document).ready(() => {

  $(document).on('click', '#dropdown-toggle-switch', e => {
    e.preventDefault();
    console.log('click')
    $('#dropdown-container').toggle('show');
  })

});
