riot.tag2('right-drawer', '<div class="phantom {state}" onclick="{goHome}"></div> <div class="rightdrawer {state}"> <loader if="{!isDataLoaded}"></loader> <div if="{isDataLoaded}" class="contents"> <div class="cover"> <img class="pic-cover" riot-src="{imgUrl}" alt="{imgAlt}"> </div> <article class="details"> <div class="name">{name}</div> <a href="{link}" class="link">{link}</a> <cite if="{author}" class="author">Author: <a href="{author.url}">{author.name}</a></cite> <p class="text"> {desc} </p> <div class="tags"> <span class="tag" each="{tag in tags}" onclick="{TopBarComponent.filterByTag}">#{tag.trim()} </span> </div> </acticle> <div if="{link}" class="sitelink"> <a href="{link}" target="_blank" rel="nofollow" class="button-primary">Go To Website</a> </div> </div> </div>', '', '', function(opts) {
    var _self=this;
    _self.isDataLoaded=false;
    _self.state="closed";
    _self.tags=[];
    this.on("mount",function(){
      this.root.closeDrawer=function(){
        _self.update({
          state:"closed"
        });
      }

      this.goHome=function(){
        riot.route("/");
      }

      this.root.openDrawer=function(projectid){
        var project=null;
        getProjectData().then(function(e) {
            _self.update({
                isDataLoaded:true
            });
            var projectData=e.projects;
            for(var projectIndex=0;projectIndex<projectData.length;projectIndex++){
              if(projectData[projectIndex].id===projectid){
                project=projectData[projectIndex];
                break;
              }
            }
            if(project){
              _self.update({
                name:project.name,
                link:project.url,
                imgUrl:project.imgUrl,
                imgAlt:project.imgAlt,
                desc:project.desc,
                tags:project.tags.split(","),
                state:"opened",
                author: project.author || false
              });
            }
        });
      }
    })
});
