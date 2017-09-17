<?php

/** Tell WordPress to run theme_setup() when the 'after_setup_theme' hook is run. */

if ( ! function_exists( 'theme_setup' ) ):
  function theme_setup() {

    /* This theme uses post thumbnails (aka "featured images")
    *  all images will be cropped to thumbnail size (below), as well as
    *  a square size (also below). You can add more of your own crop
    *  sizes with add_image_size. */
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size(120, 90, true);
    add_image_size('square', 150, 150, true);

    // Add Custom Image Sizes

    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );

    // add option to upload logo in theme customizer
    add_theme_support( 'custom-logo' );

    /* This theme uses wp_nav_menu() in one location.
    * You can allow clients to create multiple menus by
    * adding additional menus to the array. */
    register_nav_menus( array(
      'primary' => 'Primary Navigation'
    ) );

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
      'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
    ) );
  }
endif;

add_action( 'after_setup_theme', 'theme_setup' );

/* enqueues compiled style.css to the header - add new styles in gulp tasks */

function theme_styles (){
  wp_enqueue_style('style', get_template_directory_uri() . '/style.css' );
}

add_action( 'wp_enqueue_scripts', 'theme_styles');

/* enqueues compiled main.min.js to the header - add new scripts in gulp tasks */

function theme_scripts () {
  wp_enqueue_script(
    'vendors-scripts', //handle
    get_template_directory_uri() . '/dist/js/vendors.js', //source
    null, // version number
    true //load in footer
  );

  wp_enqueue_script(
    'global-scripts', //handle
    get_template_directory_uri() . '/dist/js/global.min.js', //source
    array( 'vendors-scripts' ), //dependencies
    null, // version number
    true //load in footer
  );

  wp_enqueue_script(
    'components-scripts', //handle
    get_template_directory_uri() . '/dist/js/components.min.js', //source
    array( 'vendors-scripts' ), //dependencies
    null, // version number
    true //load in footer
  );
}

add_action( 'wp_enqueue_scripts', 'theme_scripts');

/* Custom Title Tags */

function boilerplate_wp_title( $title, $sep ) {
  global $paged, $page;

  if ( is_feed() ) {
    return $title;
  }

  // Add the site name.
  $title .= get_bloginfo( 'name', 'display' );

  // Add the site description for the home/front page.
  $site_description = get_bloginfo( 'description', 'display' );
  if ( $site_description && ( is_home() || is_front_page() ) ) {
    $title = "$title $sep $site_description";
  }

  // Add a page number if necessary.
  if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
    $title = "$title $sep " . sprintf( __( 'Page %s', 'theme' ), max( $paged, $page ) );
  }

  return $title;
}

add_filter( 'wp_title', 'boilerplate_wp_title', 10, 2 );

/* Get rid of junk! - Gets rid of all the crap in the header that you dont need */

function clean_stuff_up() {
  // windows live
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  // wordpress gen tag
  remove_action('wp_head', 'wp_generator');
  // comments RSS
  remove_action( 'wp_head', 'feed_links_extra', 3 );
  remove_action( 'wp_head', 'feed_links', 3 );
}

add_action('init', 'clean_stuff_up');

/* Here are some utility helper functions for use in your templates! */

/* pre_r() - makes for easy debugging. <?php pre_r($post); ?> */
function pre_r($obj) {
  echo "<pre>";
  print_r($obj);
  echo "</pre>";
}

/* is_blog() - checks various conditionals to figure out if you are currently within a blog page */
function is_blog () {
  global  $post;
  $posttype = get_post_type($post );
  return ( ((is_archive()) || (is_author()) || (is_category()) || (is_home()) || (is_single()) || (is_tag())) && ( $posttype == 'post')  ) ? true : false ;
}

/* get_post_parent() - Returns the current posts parent, if current post if top level, returns itself */
function get_post_parent($post) {
  if ($post->post_parent) {
    return $post->post_parent;
  }
  else {
    return $post->ID;
  }
}

// allow svg files to be uploaded through the wp media library
function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

add_filter('upload_mimes', 'cc_mime_types');
