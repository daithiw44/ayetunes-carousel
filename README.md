AyeTunes-Carousel.

Library free javascript module for creating a scrolling image column with an easeout/easein large image along the lines iTunes.

See ayetunes-example for a quick example of how to create a new ayetunes class

	setUp = {
      auto: 3000,
      wrapper:'wrapper',
      randomise:true,
      mouseoverpause:true,
      pausebutton:true,
      carousel:'left',
      callbackfunc:cbFunction,
      sections:[
        {id:'at0', sm:'img/PNG_S_0.png',lg:'img/PNG0.png',link:'https://github.com/daithiw44'},
        {id:'at1', sm:'img/PNG_S_1.png',lg:'img/PNG1.png',link:'https://github.com/daithiw44'},
        {id:'at2', sm:'img/PNG_S_2.png',lg:'img/PNG2.png',link:'https://github.com/daithiw44'},
        {id:'at3', sm:'img/PNG_S_3.png',lg:'img/PNG3.png',link:'https://github.com/daithiw44'},
        {id:'at4', sm:'img/PNG_S_4.png',lg:'img/PNG4.png',link:'https://github.com/daithiw44'},
        {id:'at5', sm:'img/PNG_S_5.png',lg:'img/PNG5.png',link:'https://github.com/daithiw44'}
      ]
    },
    ayetunes = new AyeTunes ();
    ayetunes.init(setUp);

Properties of the AyeTunes class.

1.	auto: This is the time between tansitions. (milliseconds)

2.	wrapper: The id of the containing element. (string)

3.	randomise: Wether the objects in the sections array are load in a random order. (boolean)
	(The value of the first highlighted element is accessed from the "'instance'.register.first property".)

4.	mouseoverpause: Wether the carousel pauses on a mouseover. (boolean)

5	pausebutton: Wether clicking a pause button will stop and restart the carousel. (boolean)

6.	carousel: Wether the carousel is on the left or right. ('left' or 'right' ONLY)

7.	callbackfunc: Immediately after a transition occurs a callback function if provided is called.
	The callback is executed and the value of the current highlighted section is passed as a parameter.

8.	sections: An array of objects each object has 4 properties.
	
		id: identifier (supplied to the callback but is never assigned to a Dom element).
		sm: the small image for the scrolling carousel.
		lg: the large image that fades in and out as the section becomes highlighted etc.
		link: the url that wraps the sm and lg images which redirect the user when they are clicked.
