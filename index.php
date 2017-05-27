<?php //index.php is the last resort template, if no other templates match ?>
<?php get_header(); ?>

<div class="container">
  <?php get_template_part( 'loop', 'index' ); ?>
</div>

<?php get_footer(); ?>