var panels = document.getElementsByClassName("panel");

var h1flag = false;
var h1content;

function randomize()
{
  //load random animation
  document.getElementById("anim-object").setAttribute('data', 'animations/anim'+getRandomIntInclusive(1,4)+'.html');
  
  var bggradcolors = tinycolor(tinycolor.random()).triad();
  
  $('#bggrad').css({
    'background': '-webkit-linear-gradient(45deg,'+ bggradcolors[0] + ","+ bggradcolors[1] +',' + bggradcolors[2] + ')',
    'background-size': '600% 600%'
  });
  
  for (i = 0; i < panels.length; i++) 
  {
    // Pick a random color
    //var hexColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    var rgbColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' 
                          + (Math.floor(Math.random() * 256)) + ',' 
                          + (Math.floor(Math.random() * 256)) + ')';
    panels[i].style.backgroundColor = rgbColor;
  }
  
  //adjustments
  var mainclr = panels[0].style.backgroundColor; 
  panels[1].style.backgroundColor = mainclr;
  panels[2].style.backgroundColor = tinycolor(mainclr).complement();
  panels[3].style.backgroundColor = tinycolor(panels[2].style.backgroundColor).brighten();
  panels[4].style.backgroundColor = tinycolor(panels[2].style.backgroundColor).darken();
  $('#popup').css("backgroundColor", panels[4].style.backgroundColor);
    
  //font color
  for (i = 0; i < panels.length; i++) 
  {
    if(tinycolor(panels[i].style.backgroundColor).isLight())
    {
      panels[i].style.color='black';
    }
  }
  
  if(tinycolor(panels[3].style.backgroundColor).isLight())
    {
      $('a').css("color","black");
    }
  else
    {
      $('a').css("color", "white");
    }
  
  window.setInterval(changeH1, 6000);
  h1content = document.getElementById("changing_h").innerHTML;
  $(".panel").addClass("panelchanged");
}

function changeH1() {
  var h1text = document.getElementById("changing_h");
  if(!h1flag)
  {
    h1text.style.opacity = '0';
    window.setTimeout(textc1, 1000);
    h1flag = true;
  }
  else
  {
    h1text.style.opacity = '0';
    window.setTimeout(textc2, 1000);
    h1flag = false;
  }
}

function textc1() {
  var h1text = document.getElementById("changing_h");
  h1text.innerHTML = "Try refreshing the page!";
  h1text.style.opacity = '1';
}

function textc2() {
  var h1text = document.getElementById("changing_h");
  h1text.innerHTML = h1content;
  h1text.style.opacity = '1';
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


$(document).ready(function() {
  
//  $(".link").hover(function(){
//    $(this).animate({fontSize: "1.2em"},100);
//  }, function(){
//    $(this).animate({fontSize: "1em"},100);
//  });   
});

/*
    $( ".d" ).one( "click", function() {
      $( ".c" ).animate({height:0},1000);
      
      $( ".c" ).queue(function (next) { 
        $(this).css('display', 'none'); 
        next();
      });
      
      $(".wrapper").css( "grid-template-rows", "30% 0% 60% 10%" );
    });
    */

/*
function changeStuff() {
  var stuff = document.getElementsByClassName("d");
  stuff[0].classList.add("active");

  for (i = 0; i < panels.length; i++) 
  {
    if( i!= 3) {
      panels[i].style.backgroundColor = tinycolor(panels[i].style.backgroundColor).brighten(50);
    } 
  }
}
*/