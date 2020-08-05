var coursepage = 1;
    var endofcourses = false;
	        var usercookie=[];
    jQuery(document).ready(function () {
        usercookie=getCookie("userQueue");
		if(usercookie.length > 0){
			 usercookie=JSON.parse(getCookie("userQueue"));
			 jQuery("#slidercontainer").append(getcoursehtml("My Queue",usercookie,'userqueue'));
		}
		getmorecourses(coursepage);

        jQuery('.slickslidercls').slick({
              dots: true,
              infinite: false,
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 3,
              responsive: [{breakpoint: 1024,settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}},{breakpoint: 980,settings: {slidesToShow: 2,slidesToScroll: 2}},{breakpoint:600,settings: {slidesToShow: 1,slidesToScroll: 1}}]
        });  
		jQuery(".fa-star").click(function(){
			var courseobj={};
			var closest=jQuery(this).closest(".slickchilds");
			courseobj.id=jQuery(closest).find(".imagetypecls").attr("courseid");
			courseobj.title=jQuery(closest).find("h3").text();
			courseobj.image=jQuery(closest).find(".imagetypecls").attr("src");
			console.log(usercookie);
			console.log(courseobj);
			if(usercookie.length  == 0){			
				var cookiedata=[];				
				cookiedata.push(courseobj);
				console.log(cookiedata);
				setCookie("userQueue",JSON.stringify(cookiedata),1);				
			}else{
				usercookie.push(courseobj);
				setCookie("userQueue","",0);
				setCookie("userQueue",JSON.stringify(usercookie),1);
			}
			usercookie=JSON.parse(getCookie("userQueue"));
			console.log(usercookie);
			jQuery('.userqueue').remove();
			jQuery("#slidercontainer").prepend(getcoursehtml("My Queue",usercookie,""));
			jQuery('.slickslidercls:first').slick({
				  dots: true,
				  infinite: false,
				  speed: 300,
				  slidesToShow: 3,
				  slidesToScroll: 3,
				  responsive: [{breakpoint: 1024,settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}},{breakpoint: 980,settings: {slidesToShow: 2,slidesToScroll: 2}},{breakpoint:600,settings: {slidesToShow: 1,slidesToScroll: 1}}]
			}); 
		jQuery(this).toggleClass("selected");
		})
		jQuery(".fa-minus-circle").click(function(){
				usercookie.map
					var childarr=usercookie.filter(function(d){ return d.id=="253"});
					usercookie.splice(childarr.indexOf(g[0]),1);
					setCookie("userQueue","",0);
					if(usercookie.length > 0){
						setCookie("userQueue",JSON.stringify(usercookie),1);
						jQuery('.userqueue').remove();
						jQuery("#slidercontainer").prepend(getcoursehtml("My Queue",usercookie,""));
						jQuery('.slickslidercls:first').slick({
							  dots: true,
							  infinite: false,
							  speed: 300,
							  slidesToShow: 3,
							  slidesToScroll: 3,
							  responsive: [{breakpoint: 1024,settings: {slidesToShow: 3,slidesToScroll: 3,infinite: true,dots: true}},{breakpoint: 980,settings: {slidesToShow: 2,slidesToScroll: 2}},{breakpoint:600,settings: {slidesToShow: 1,slidesToScroll: 1}}]
						});
					}

		})
			

    })

    
    function getmorecourses(coursepagenum) {
		var coursetypearr=[];
		var courses={};
		var tobeappended="";
		var getcoursetypes=getendpoint("https://dev.minigolf.io/wp-json/wp/v2/coursetype?_fields=id,name");
	getcoursetypes.done(function(data,status){
		jQuery.each(data,function(i,d){
			courses[d.name]=[];
		coursetypearr[d.id]=d.name;
		})
			console.log(coursetypearr);
	})
	var getcourses=getendpoint("https://dev.minigolf.io/wp-json/wp/v2/course/");
	getcourses.done(function(data,status){
		jQuery.each(data,function(i,d){
			jQuery.each(d.coursetype,function(k,l){ 
				if(courses[coursetypearr[l]].map(function(e){return e.title}).indexOf(d.image.guid) == -1){
					var newimgobj={};
					newimgobj.id=d.id;
					newimgobj.title=d.title.rendered;
					newimgobj.image=d.image.guid;
					courses[coursetypearr[l]].push(newimgobj);
				} 
			})

		})
		console.log(courses);
		jQuery.each(courses,function(i,d){
				tobeappended+=getcoursehtml(i,d,"");
        })

                    //console.log(tobeappended);
              jQuery("#slidercontainer").append(tobeappended);
		})
	

   

    }
	function getcoursehtml(i,d,type){
		var coursehtml="";
		var iconcls=type == "userqueue" ? "fa-minus-circle":"fa-star";
		
		if(d.length > 0){
			coursehtml+='<div class="courseheader '+type+'">'+i+'</div>';
		}				 
		coursehtml+='<div class="slickslidercls '+type+'">';

		jQuery.each(d,function(m,n){
			 coursehtml+= '<div class="slickchilds">'
			 							if(usercookie.length > 0){
											var cls=usercookie.map(function(e){return e.id}).indexOf(n.id) != -1 ? "selected": "";
											coursehtml+='<i class="fa '+iconcls+' '+cls+'"  aria-hidden="true"></i>'
										}else{
													coursehtml+='<i class="fa '+iconcls+'" aria-hidden="true"></i>'
										}
									  
									  coursehtml+= '<img courseid="' + n.id+ '"  src="' + n.image+ '" class="imagetypecls"  />'
									  + '<h3 class="mt-3">' + n.title + '</h3>'
									  + '<a  class="selectBtn mt-3" href="choose-action.html?Name=' + n.title + '&ID=' + n.id + '">SELECT</a>'
									  +'</div>';
		 })
		 coursehtml += '</div>';
		return coursehtml;
	}
	 function getendpoint(endpointurl) {
      return  jQuery.ajax({
            url: endpointurl,
            dataType: 'json',
            async: false,          
        });

    }
function setCookie(cname, cvalue, exdays) {

  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  	console.log(cname + "=" + cvalue + ";" + expires + ";path=/");
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
