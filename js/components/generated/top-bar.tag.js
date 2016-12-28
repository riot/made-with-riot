riot.tag2('top-bar', '<div class="top-bar__mobile-menu" ref="mobileMenu"> <div class="top-bar__search-bar"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use> </svg> <input type="text" name="inputSearch" ref="inputSearch" placeholder="Search" onkeyup="{filterCards}"> </div> <a each="{opts.menu}" href="{url}" class="top-bar__link {state--attention: isImportant}"> {text} </a> </div> <header class="top-bar" ref="mainTopBar"> <div class="container"> <div class="top-bar__mobile-trigger" onclick="{toggleMobileMenu}"> <svg class="svg-icon icon-menu" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-menu"></use> </svg> <svg class="svg-icon icon-close" role="img" title="Preview Mode" width="18"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-close"></use> </svg> </div> <div class="top-bar__search-bar"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use> </svg> <input type="text" name="inputSearch" ref="inputSearch" placeholder="Search" onkeyup="{filterCards}"> </div> <div class="top-bar__landing"> <img riot-src="{opts.logoUrl}" alt="{opts.logoAlt}" width="147"> <h1>{opts.slogan}</h1> </div> <div class="top-bar__right-menu"> <a each="{opts.menu}" href="{url}" class="top-bar__link {state--attention: isImportant}"> {text} </a> </div> </div> </header> <header class="top-bar state--compact" ref="compactTopBar"> <div class="container"> <div class="top-bar__mobile-trigger" onclick="{toggleMobileMenu}"> <svg class="svg-icon icon-menu" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-menu"></use> </svg> <svg class="svg-icon icon-close" role="img" title="Preview Mode" width="18"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-close"></use> </svg> </div> <div class="top-bar__search-bar"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use> </svg> <input type="text" name="inputSearchCompact" ref="inputSearchCompact" placeholder="Search" onkeyup="{filterCards}"> </div> <div class="top-bar__landing"> <img riot-src="{opts.logoUrl}" alt="{opts.logoAlt}" width="147"> </div> <div class="top-bar__right-menu"> <a each="{opts.menu}" href="{url}" class="top-bar__link {state--attention: isImportant}"> {text} </a> </div> </div> </header>', '', '', function(opts) {
        var self = this;
        var visibleClass = 'state--visible';
        var styleElement = document.createElement('STYLE');

        self.on('mount', function() {

            self.isMenuOpen = false;

            self.cards = document.querySelector(opts.cardSelector);

            self.refs.mainTopBar.querySelector('.top-bar__mobile-trigger .icon-menu').classList.add('active');
            self.refs.compactTopBar.querySelector('.top-bar__mobile-trigger .icon-menu').classList.add('active');

            document.addEventListener('scroll', function() {

                if(window.pageYOffset < window.innerHeight) {

                    var scaleRatio = 1 - Math.floor(pageYOffset) * 0.0003;
                    var opacityRatio = 1 - Math.floor(pageYOffset) * 0.008;
                    var moveRatio = 1 - Math.floor(pageYOffset) * 0.5;

                    var transformValue = 'scale(' + scaleRatio + ') translate3d(0, ' + moveRatio + 'px, 0)';

                    self.refs.mainTopBar.style.webkitTransform = transformValue;
                    self.refs.mainTopBar.style.transform = transformValue;
                    self.refs.mainTopBar.style.opacity = opacityRatio;
                }

                if(window.pageYOffset > window.innerHeight / 5) {
                    self.showCompactMenu();
                    self.hideMainTopBar();
                }

                if(window.pageYOffset <= window.innerHeight / 5) {
                    self.hideCompactMenu();
                }

            });
        });

        this.hideMainTopBar = function() {
            self.refs.mainTopBar.style.opacity = 0;
        }.bind(this)

        this.showCompactMenu = function() {
            console.log()
            if(!self.refs.compactTopBar.classList.contains(visibleClass)) {
                self.refs.compactTopBar.classList.add(visibleClass);
            }
        }.bind(this)

        this.hideCompactMenu = function() {
            if(self.refs.compactTopBar.classList.contains(visibleClass)) {
                self.refs.compactTopBar.classList.remove(visibleClass);
            }
        }.bind(this)

        this.filterByTag = function(event) {
            var tagText = event.item.tag;
            var filterObject = {
                target: {
                    value: tagText
                }
            };

            this.refs.inputSearch.forEach(function(el) {
                el.value = tagText;
            });

            this.refs.inputSearchCompact.value = tagText;

            this.filterCards(filterObject);

            riot.route('/');
            window.location.hash = '';

        }.bind(this)

        this.filterCards = function(e) {
            var value = e.target.value;

            if(e.target.name == 'inputSearch') {

                console.log(e.target.parentNode.parentNode === this.refs.mobileMenu);

                if(e.target.parentNode.parentNode === this.refs.mobileMenu) {

                    this.refs.inputSearch[1].value = value;
                }else {

                    this.refs.inputSearch[0].value = value;
                }

                this.refs.inputSearchCompact.value = value;

            }else {
                this.refs.inputSearch.forEach(function(input) {
                    console.log(input);
                    input.value = value;
                });
            }

            if(value == ""){
                styleElement.innerHTML = '';
                document.body.appendChild(styleElement);
            }else{
                styleElement.innerHTML =
                    opts.cardSelector + ' .card-list > :not([data-filter *= "' + value.toLowerCase() + '"]){ display: none; };' +
                    opts.cardSelector + ' .card-list{ animation: fade-in-up 0.3s ease-in-out forwards; };';
                document.body.appendChild(styleElement);
            }

            return true;
        }.bind(this)

        this.toggleMobileMenu = function() {
            if(self.isMenuOpen) {
                self.isMenuOpen = !self.isMenuOpen;
                self.closeMobileMenu();
            }else {
                self.isMenuOpen = !self.isMenuOpen;
                self.openMobileMenu();
            }
        }.bind(this)

        this.openMobileMenu = function() {

            self.clearMobileMenuClasses();

            self.refs.mainTopBar.querySelector('.top-bar__mobile-trigger .icon-menu').classList.remove('active');
            self.refs.mainTopBar.querySelector('.top-bar__mobile-trigger .icon-close').classList.add('active');

            self.refs.compactTopBar.querySelector('.top-bar__mobile-trigger .icon-menu').classList.remove('active');
            self.refs.compactTopBar.querySelector('.top-bar__mobile-trigger .icon-close').classList.add('active');

            self.cards.classList.add('animate','animate-slide-right');
            self.refs.mainTopBar.classList.add('animate','animate-slide-right');
            self.refs.compactTopBar.childNodes[1].classList.add('animate','animate-slide-right');
            self.refs.mobileMenu.classList.add('animate', 'animate-fade-in-up');
        }.bind(this)

        this.closeMobileMenu = function() {

            self.clearMobileMenuClasses();

            self.refs.mainTopBar.querySelector('.top-bar__mobile-trigger .icon-menu').classList.add('active');
            self.refs.mainTopBar.querySelector('.top-bar__mobile-trigger .icon-close').classList.remove('active');

            self.refs.compactTopBar.querySelector('.top-bar__mobile-trigger .icon-menu').classList.add('active');
            self.refs.compactTopBar.querySelector('.top-bar__mobile-trigger .icon-close').classList.remove('active');

            self.cards.classList.add('animate','animate-slide-left');
            self.refs.mainTopBar.classList.add('animate','animate-slide-left');
            self.refs.compactTopBar.childNodes[1].classList.add('animate','animate-slide-left');
            self.refs.mobileMenu.classList.add('animate', 'animate-fade-out-z');
        }.bind(this)

        this.clearMobileMenuClasses = function() {
            self.cards.classList.remove('animate', 'animate-slide-left', 'animate-slide-right');
            self.refs.mainTopBar.classList.remove('animate','animate-slide-left', 'animate-slide-right');
            self.refs.compactTopBar.childNodes[1].classList.remove('animate','animate-slide-left', 'animate-slide-right');
            self.refs.mobileMenu.classList.remove('animate', 'animate-fade-out-z', 'animate-fade-in-up');
        }.bind(this)
});