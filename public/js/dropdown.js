$(document).ready(() => {

  $(document).on('click', '#removeToggleSwitch', e => {
    e.preventDefault();
    $('#removeContainer').toggle('show');
  });

  $(document).on('click', '#addToggleSwitch', e => {
    e.preventDefault();
    $('#addContainer').toggle('show');
  });

});
