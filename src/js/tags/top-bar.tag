<top-bar>

    <header class="top-bar" name="mainTopBar">

        <div class="container">

            <div class="top-bar__search-bar">
                <svg class="svg-icon" role="img" title="Preview Mode" width="22">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use>
                </svg>
                <input type="text" name="inputSearch" placeholder="Search">
            </div>

            <div class="top-bar__landing">
                <img src="{ opts.logoUrl }" alt="{ opts.logoAlt }" width="147" />
                <h1>{ opts.slogan }</h1>
            </div>

            <div class="top-bar__right-menu">
                <a href="#" each="{ opts.menu }" class="top-bar__link { state--attention: isImportant }">
                    { text }
                </a>
            </div>

        </div>

    </header>

    <header class="top-bar state--compact" name="compactTopBar">

        <div class="container">

            <div class="top-bar__search-bar">
                <svg class="svg-icon" role="img" title="Preview Mode" width="22">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use>
                </svg>
                <input type="text" name="inputSearch" placeholder="Search">
            </div>

            <div class="top-bar__landing">
                <img src="{ opts.logoUrl }" alt="{ opts.logoAlt }" width="147" />
            </div>

            <div class="top-bar__right-menu">
                <a href="#" each="{ opts.menu }" class="top-bar__link { state--attention: isImportant }">
                    { text }
                </a>
            </div>

        </div>
    </header>

    <script>
        var self = this;

        self.on('mount', function() {
            document.addEventListener('scroll', function() {

                if(window.pageYOffset < window.innerHeight) {
                    self.hideCompactMenu();

                    var scaleRatio = 1 - Math.floor(pageYOffset) * 0.0003;
                    var opacityRatio = 1 - Math.floor(pageYOffset) * 0.008;
                    var moveRatio = 1 - Math.floor(pageYOffset) * 0.5;

                    self.mainTopBar.style.transform = 'scale(' + scaleRatio + ') translate3d(0, ' + moveRatio + 'px, 0)';
                    self.mainTopBar.style.opacity = opacityRatio;
                }

                if(window.pageYOffset > window.innerHeight / 5) {
                    self.showCompactMenu();
                }

            });
        });

        showCompactMenu() {
            self.compactTopBar.classList.add('state--visible');
        }

        hideCompactMenu() {
            self.compactTopBar.classList.remove('state--visible');
        }
    </script>

</top-bar>
