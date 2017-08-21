/* global $ */

function example () {
  $('.foo').on('click', function () {
    $(this).css('color', 'blue')
  })
  console.log('hello')
}

module.exports = example
