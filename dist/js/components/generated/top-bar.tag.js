riot.tag2('top-bar', '<header class="top-bar" name="mainTopBar"> <div class="container"> <div class="top-bar__mobile-menu"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-menu"></use> </svg> </div> <div class="top-bar__search-bar"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use> </svg> <input type="text" name="inputSearch" placeholder="Search" onkeyup="{filterCards}"> </div> <div class="top-bar__landing"> <img riot-src="{opts.logoUrl}" alt="{opts.logoAlt}" width="147"> <h1>{opts.slogan}</h1> </div> <div class="top-bar__right-menu"> <a href="#" each="{opts.menu}" class="top-bar__link {state--attention: isImportant}"> {text} </a> </div> </div> </header> <header class="top-bar state--compact" name="compactTopBar"> <div class="container"> <div class="top-bar__mobile-menu"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-menu"></use> </svg> </div> <div class="top-bar__search-bar"> <svg class="svg-icon" role="img" title="Preview Mode" width="22"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/all.min.svg#icon-search"></use> </svg> <input type="text" name="inputSearchCompact" placeholder="Search" onkeyup="{filterCards}"> </div> <div class="top-bar__landing"> <img riot-src="{opts.logoUrl}" alt="{opts.logoAlt}" width="147"> </div> <div class="top-bar__right-menu"> <a href="#" each="{opts.menu}" class="top-bar__link {state--attention: isImportant}"> {text} </a> </div> </div> </header>', '', '', function(opts) {
        var self = this;
        var visibleClass = 'state--visible';
        var styleElement = document.createElement('STYLE');

        self.on('mount', function() {
            document.addEventListener('scroll', function() {

                if(window.pageYOffset < window.innerHeight) {

                    var scaleRatio = 1 - Math.floor(pageYOffset) * 0.0003;
                    var opacityRatio = 1 - Math.floor(pageYOffset) * 0.008;
                    var moveRatio = 1 - Math.floor(pageYOffset) * 0.5;

                    var transformValue = 'scale(' + scaleRatio + ') translate3d(0, ' + moveRatio + 'px, 0)';

                    self.mainTopBar.style.webkitTransform = transformValue;
                    self.mainTopBar.style.transform = transformValue;
                    self.mainTopBar.style.opacity = opacityRatio;
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
            self.mainTopBar.style.opacity = 0;
        }.bind(this)

        this.showCompactMenu = function() {
            console.log()
            if(!self.compactTopBar.classList.contains(visibleClass)) {
                self.compactTopBar.classList.add(visibleClass);
            }
        }.bind(this)

        this.hideCompactMenu = function() {
            if(self.compactTopBar.classList.contains(visibleClass)) {
                self.compactTopBar.classList.remove(visibleClass);
            }
        }.bind(this)

        this.filterCards = function(e) {

            var value = e.target.value;

            if(e.target.name == 'inputSearch') {
                self.inputSearchCompact.value = value;
            }else {
                self.inputSearch.value = value;
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
}, '{ }');