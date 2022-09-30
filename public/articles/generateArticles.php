<?php

function writeArticles() {
    $url = "https://damp-atoll-27311.herokuapp.com/api/articles/getAllArticles";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $resp = curl_exec($curl);
    curl_close($curl);
    $json = json_decode($resp);

    foreach ($json as &$value) {
        
        // Process image
        $image_html = '';
        if ($value->image != "") {
            $image_html = '<div class="flex justify-center items-center" id="article-hero-section">'
                . '<img src="../img/articles/' . $value->image . '" alt="">'
                . '</div>';
        }

        // Process tags
        $tags_html = '';
        $array_tags_single = explode (",", $value->tags);
        if ($array_tags_single != "") {
            foreach($array_tags_single as &$tag) {
                $tags_html .= '<p class="button text-sm">#' . $tag . '</p>';
            }
        }

        $filename = $value->link . ".html";
        $file = fopen($filename, "w") or die("Cant open file Error");
        $articleContent = html_entity_decode($value->content);
        $fileContent = <<<EOT
        <!DOCTYPE html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="../style.css" rel="stylesheet">
            <link href="../customStyle.css" rel="stylesheet">
            <link href="../node_modules/@fortawesome/fontawesome-free/css/all.css" rel="stylesheet">
            <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
            <title>{$value->title}</title>
        </head>
        <nav class="bg-white z-40">
            <div class="navbar bg-white z-40">
                <a href="#" class="nav-branding text-xl">Manuel N. Jenni</a>
                <ul class="nav-menu">
                    <li class="nav-item"><a class="nav-link text-xl text-neutral-800" href="../">Home</a></li>
                    <li class="nav-item"><a class="nav-link text-xl text-neutral-800" href="../about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link text-xl text-neutral-800" href="../articles.html"><mark>Articles</mark></a></li>
                    <li class="nav-item"><a class="nav-link text-xl text-neutral-800" href="../travel.html">Travel</a></li>
                </ul>
                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
        <body>
            {$image_html}
            <div class="bg-white p-y-8 space-y-0 lg:gap-8 lg:justify-center mx-4 lg:mx-24">
                <!--    TAGS    -->
                <div class="my-12 space-y-4">
                    <h1 class="text-5xl text-neutral-800 text-center font-semibold mb-6 md:mb-4">{$value->title}</h1>
                    <h1 class="text-4xl text-neutral-800 text-center">{$value->subtitle}</h1>
                    <div class="basis-1/2 flex justify-center space-x-4 pt-8">
                        {$tags_html}
                    </div>
                </div>
                {$articleContent}
            </div>
            <script src="../navbar.js" type="text/babel"></script>
        </body>
        
        <footer class="bg-white flex justify-center items-center align-middle h-36">
            <div class="flex-col md:flex md:justify-between w-full px-4 md:px-12 lg:px-24 space-y-4 text-center">
                <p class="text-neutral-800">&#169; 2022 Manuel Jenni. All rights reserved.</p>
                <p class="text-neutral-800 space-x-4">
                    <span class="underlined" onclick="window.open('https://instagram.com/manuelnoahjenni')">Instagram &#8599;&#xFE0E;</span>
                    <span class="underlined" onclick="window.open('https://www.linkedin.com/in/manuel-jenni-525644183/')">LinkedIn &#8599;&#xFE0E;</span>
                </p>
            </div>
        </footer>
        EOT;


            fwrite($file, $fileContent);

        
    }
}

writeArticles();
