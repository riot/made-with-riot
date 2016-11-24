riot.tag2('card-list', '<div class="card-list"> <loader if="{!isDataLoaded}"></loader> <div if="{isDataLoaded}" class="card-list__card" each="{projects}" data-filter="{name.toLowerCase()} {url.toLowerCase()} {tags.toLowerCase()}"> <a href="{url}" target="_blank" rel="nofollow" class="card-list__image"> <img riot-src="{imgUrl}" alt="{imgAlt}"> </a> <h2 class="card-list__name"> {name} </h2> <div if="{url}" target="_blank" rel="nofollow" class="card-list__url"> {url.replace(/(http|https)\\:\\/\\/(www\\.)?/, \'\')} </div> <a if="{url}" href="#/details/{id}" class="card-list__details"> View Details </a> </div>', '', '', function(opts) {
        var _self=this;
        this.isDataLoaded=false;
        this.projects=[];
        this.on("mount", function() {
            getProjectData().then(function(e) {
                _self.update({
                    isDataLoaded:true,
                    projects: e.projects.reverse()
                });
            });
        });
});
