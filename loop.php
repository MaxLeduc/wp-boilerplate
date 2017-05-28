<?php if ( ! have_posts() ) : ?>
  <div>
    <h1>Not Found</h1>
    <p>Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.</p>
    <?php get_search_form(); ?>
  </div>
<?php endif; ?>

<?php while ( have_posts() ) : the_post(); ?>
  <div>
    <h2>
      <a href="<?php the_permalink(); ?>" title="Permalink to: <?php esc_attr(the_title_attribute()); ?>" rel="bookmark">
        <?php the_title(); ?>
      </a>
    </h2>
    <div>
      <?php the_content(); ?>
      <?php wp_link_pages( array(
        'before' => '<div class="page-link"> Pages:',
        'after' => '</div>'
      )); ?>
    </div>
  </div>

<?php endwhile; ?>

<?php if (  $wp_query->max_num_pages > 1 ) : ?>
  <p><?php next_posts_link(); ?></p>
  <p><?php previous_posts_link(); ?></p>
<?php endif; ?>
