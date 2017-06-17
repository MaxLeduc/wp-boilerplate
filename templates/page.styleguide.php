<?php
/*
Template Name: styleguide
*/
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <?php // Load Meta ?>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php  wp_title('|', true, 'right'); ?></title>
  <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri()?>/dist/css/styleguide.css">
  <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri()?>/dist/css/style.css">
</head>

<body class="sg-body sg-body--toggled">
  <!-- Styleguide navigation -->
  <span class="sg-menu-toggler">Open Menu</span>
  <sg-nav>
    <sg-logo><img src="" alt="logo"></sg-logo>
  </sg-nav>
  <sg-section>
    <a href="#typography" class="sg-h1" id="typography">Typography</a>
    <a href="#headings" class="sg-h3" id="headings">Headings</a>
    <sg-example>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </sg-example>
    <a href="#paragraphs" class="sg-h3" id="paragraphs">Paragraphs</a>
    <sg-example>
      <p>This is paragraph text lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat. Sed vulputate fringilla felis. Aliquam ut arcu et dui feugiat scelerisque eu quis diam. Mauris placerat congue dui sit amet blandit. Phasellus condimentum libero vel velit auctor, sit amet tincidunt velit varius.</p>
      <p>Donec at hendrerit nisi, eget vestibulum nisi. Sed sit amet magna luctus, facilisis erat quis, sagittis ligula. Aenean dignissim velit quis leo consequat ultricies. Proin quis pretium justo. Vestibulum at eros nisl. Fusce lobortis erat ante, eu cursus sapien molestie at. Pellentesque placerat ante diam, et euismod lacus dictum vel. Phasellus vitae sollicitudin mi.</p>
      <p>Aenean dignissim velit quis leo consequat ultricies. Proin quis pretium justo. Vestibulum at eros nisl. Fusce lobortis erat ante, eu cursus sapien molestie at. Pellentesque placerat ante diam, et euismod lacus dictum vel. Phasellus vitae sollicitudin mi.</p>
    </sg-example>
    <a href="#blockquotes" class="sg-h3" id="blockquotes">Blockquotes</a>
    <sg-example>
      <blockquote>
        <p>Typography is the craft of endowing human language with a durable visual form.</p>
        <p>- Robert Bringhurst</p>
      </blockquote>
    </sg-example>
  </sg-section>
  <script type="text/javascript">
    (function () {
      var navElement, linkTarget
      navElement = document.querySelector('sg-nav')
      forEachHeading(function (heading) {
        if (isPrimary(heading)) createNavGroup()
        var navLink = createNavLink(heading)
        var target = linkTarget || navElement
        target.appendChild(navLink)
      })
      function isPrimary (heading) {
        return heading.className.indexOf('sg-h1') > -1
      }
      function createNavGroup () {
        var navGroup = document.createElement('div')
        navElement.appendChild(navGroup)
        linkTarget = navGroup
      }
      function createNavLink (heading) {
        var link = document.createElement('a')
        link.text = heading.text
        link.href = heading.hash
        return link
      }
      function forEachHeading (callback) {
        Array.prototype.slice.call(
          document.querySelectorAll(sgHeadingsSelector())
        ).forEach(callback)
      }
      function sgHeadingsSelector () {
        return [1, 2, 3, 4, 5, 6].map(function (headingNumber) {
          return '.sg-h' + headingNumber
        }).join(', ')
      }
      (function menuToggleInitializer () {
        var menuButton = document.querySelector('.sg-menu-toggler')
        var body = document.querySelector('body')
        menuButton.addEventListener('click', function () {
          menuToggleHander(menuButton, body)
        })
      })()
      function menuToggleHander (menuButton, body) {
        var bodyClasses = body.className
        if (bodyClasses === 'sg-body') {
          menuAppendText(menuButton, 'Open Menu')
        } else {
          menuAppendText(menuButton, 'Close Menu')
        }
        body.classList.toggle('sg-body--toggled')
      }
      function menuAppendText (menuButton, menuText) {
        var text = document.createTextNode(menuText)
        menuButton.innerHTML = ''
        menuButton.appendChild(text)
      }
    })()
  </script>
  <?php get_footer() ?>
</body>
</html>