riot.tag2('card-list', '<div class="card-list"> <loader if="{!isDataLoaded}"></loader> <div if="{isDataLoaded}" class="card-list__card" each="{project in projects}" data-filter="{project.name.toLowerCase() + project.url.toLowerCase() + project.tags.toLowerCase()}"> <a href="{project.url}" target="_blank" rel="nofollow" class="card-list__image"> <img riot-src="{project.imgUrl}" alt="{project.imgAlt}"> </a> <h2 class="card-list__name"> {project.name} </h2> <div if="{project.url}" target="_blank" rel="nofollow" class="card-list__url"> {project.url.replace(/(http|https)\\:\\/\\/(www\\.)?/, \'\')} </div> <a if="{project.url}" href="#/details/{project.id}" class="card-list__details"> View Details </a> </div> </div>', '', '', function(opts) {
        var _self = this;
        this.isDataLoaded = false;
        this.projects = [];
        this.on("mount", function() {
            getProjectData().then(function(e) {
                _self.update({
                    isDataLoaded: true,
                    projects: e.projects.reverse()
                });
            });
        });
});
