/* To safeguard from unloading the page.Once the CDN loads and ready the below code executes.


$(document).ready(function(){
$("h1").css("color","red");
})

*/

$("h1").css("color","red"); 
//above one sets the color to red

// to know the color we use below thing
console.log($("h1").css("color"));

//adding a class to the element
$("h1").addClass("big-title");

//removing the class
$("h1").removeClass("big-title");

//to add multiple classes
$("h1").addClass("big-title  fonts")

//to query if a class is present or not
console.log($("h1").hasClass("fonts"));

var list = $("h1")
console.log(list,typeof(list));

//to manipulate the text and innerHTML
list.text("Bye");
$("button").html("<i>Hey</i>")

//to get and set the attributes value
console.log($("img").attr("src"))
$("a").attr("href","https://www.amazon.in")


var list2 = $("h1").attr("class");
console.log(list2,typeof(list2));


//adding event listeners
$("button").click(()=>{
    $("h1").css("color","purple")
})

$("input").keyup(()=>{
    console.log(event.key)
})
$(document).keyup(()=>{
    $("h1").text(event.key);
})

$("h1").on("mouseover",()=>{
    $("h1").text("mouseover is being Done");
})

 //before() after() prepend() append() remove()

 $("h1").before("<button>Click me</button>")

//Below code removes all the buttons in the page.
//$("button").remove()


//hiding the element

$("img").on("click",()=>{
    // $("h1").hide();
    // $("h1").show();
    //$("h1").toggle();  
    //$("h1").fadeOut()
    //  $("h1").fadeIn()
    //$("h1").fadeToggle();
    // $("h1").slideUp();
   // $("h1").slideDown();
    //$("h1").slideToggle();
    // we can only animate using the numbers
    // $("h1").animate({opacity:0.5})
    // chaining to apply one after another
    $("h1").slideUp().slideDown().animate({opacity:0.6})
    
})