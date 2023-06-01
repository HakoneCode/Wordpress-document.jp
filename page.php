<?php get_header(); ?>

<!-- ★アイキャッチ画像の有無を判定し条件分岐 -->
<div class="eye-catch">
  <?php if (has_post_thumbnail()) : ?>
    <?php the_post_thumbnail(); ?>
  <?php else : ?>
    <img src="<?php echo get_theme_file_uri('/img/bnr-def.jpg') ?>" alt="" />
  <?php endif; ?>
</div>

<!-- ★パンくずナビゲーション -->
<div class="breadcrumbs" typeof="BreadcrumbList">
  <?php if (function_exists('bcn_display')) {
    bcn_display();
  } ?>
</div>

<div id="content">
  <main>

    <!-- ★メインループ記述 -->
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <h2 class="section-title"><span class="ja"><?php the_title(); ?></span></h2>
        
        <article>
          
        <?php the_content(); ?>
      
        </article>

    <?php endwhile;
    endif; ?>

  </main>
</div>

<?php get_footer(); ?>