<?php
//ファイルの読み込み
function add_files()
{
  //リセットCSS
  wp_enqueue_style('reset-style', 'https://unpkg.com/destyle.css2.0.2/destyle.css');
  //メインのCSSファイル
  wp_enqueue_style('main-style', get_stylesheet_uri());
  //JavaScriptファイル
  wp_enqueue_script('main-script', get_theme_file_uri() . '/js/script.js', array(), '', true);
}
add_action('wp_enqueue_scripts', 'add_files');

function theme_setup()
{
  //ここに必要な機能を追加する
  //titleタグ
  add_theme_support('title-tag');

  //メニュー
  register_nav_menus(
    array(
      'global' => 'グローバルメニュー',
      'footer' => 'フッターメニュー',
      'main-menu' => 'メインメニュー'
    )
  );
}
add_action('after_theme_setup', 'theme_setup');



function add_template_directory_uri() {
  echo '<input type="hidden" id="templateDirectoryUri" value="' . get_template_directory_uri() . '">';
}
add_action('wp_head', 'add_template_directory_uri');