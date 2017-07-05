/* global $ */

function example () {
  $('.foo').on('click', function () {
    $(this).css('color', 'blue')
  })
}

module.exports = example()
