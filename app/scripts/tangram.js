Snap.plugin( function( Snap, Element, Paper, global ) {

    Element.prototype.altDrag = function() {
        this.drag( dragMove, dragStart, dragEnd );
        return this;
    }

    var dragStart = function ( x,y,ev ) {
            this.data('ot', this.transform().local );
    }


    var dragMove = function(dx, dy, ev, x, y) {
            var tdx, tdy;
            var snapInvMatrix = this.transform().diffMatrix.invert();
            snapInvMatrix.e = snapInvMatrix.f = 0;
            tdx = snapInvMatrix.x( dx,dy ); tdy = snapInvMatrix.y( dx,dy );
            this.transform( "t" + [ tdx, tdy ] + this.data('ot')  );

    }

    var dragEnd = function() {
      console.log(Snap(this).getBBox());
    }


});

Snap.plugin( function( Snap, Element, Paper, global ) {
	Element.prototype.addTransform = function( t ) {
		return this.transform( this.transform().localMatrix.toTransformString() + t );
	};
});

  var $person1 = $('#person1'),
    $person2 = $('#person2'),
    $person3 = $('#person3'),
    $person4 = $('#person4'),
    $person5 = $('#person5'),
    $person6 = $('#person6'),
    $person7 = $('#person7'),
    $person = $('#person'),
    $wrap_person = $('#wrap-person');

  $wrap_person.velocity(
  {
   translateY: '-100%',
   translateX: '100%',
   scaleX: '0',
   scaleY: '0'
  },
  {
   duration: 0
  });

  $person.velocity(
  {
    opacity: 1
  },
  {
    duration: 50,
    loop: 50
  });

  $wrap_person.velocity(
  {
    translateY: '0%',
    translateX: '0%',
    scaleX: '1',
    scaleY: '1'
  },
  {
    duration: 2000
  });

  $person1.velocity(
  {
    translateX: '100%',
    scaleX: '20%'
  },
  {
    duration: 1000
  }).velocity("reverse");

  $person2.velocity(
  {
    translateX: '-80%',
    scaleX: '20%'
  },
  {
    duration: 1000
  }).velocity("reverse");

  $person3.velocity(
  {
    translateX: '100%'
  },
  {
    duration: 1000
  }).velocity("reverse");

  $person4.velocity(
  {
    translateX: '100%'
  },
  {
    duration: 1000
  }).velocity("reverse");

  $person5.velocity(
  {
    translateX: '-100%',
    scaleX: '20%'
  },
  {
    duration: 1000
  }).velocity("reverse");

  $person6.velocity(
  {
    translateX: '-80%'
  },
  {
    duration: 1000
  }).velocity("reverse");

  $person7.velocity(
  {
    translateX: '-100%',
    scaleY: '10%'
  },
  {
    duration: 1000
  }).velocity("reverse");

//This is to Fix the drag by removing all transforms after animation
  setTimeout(function () {
    console.log("yow");
    $("#tangramSvg polygon").css('transform', '');
  }, 3000);

Snap("#person1").altDrag();
Snap("#person2").altDrag();
Snap("#person3").altDrag();
Snap("#person4").altDrag();
Snap("#person5").altDrag();
Snap("#person6").altDrag();
Snap("#person7").altDrag();

// Make blocks rotate 90 deg on each click
var angle = 45;

$('#tangramSvg .draggable').dblclick(function() {

  var shape = Snap(this);
  shape.addTransform('r'+angle);
});
