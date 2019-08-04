var ifFinish=true;//定时器是否结束
var sliderFlag='-0';
var imgs=document.getElementsByClassName("imgs");  //banner中的HTMLCollection
var sliderControl=document.getElementById("imageSlider");//slider控件；
var sliderFocusItem=null;
var rePosition=function()
{
	for (let i=sliderFlag,j=0; j<imgs.length;i++)
	{
		imgs[j].style.left=i*100+'%';
		j++;
	}
};
var init=function()
	{
		for(let i=0;i<imgs.length;i++)
		{
			imgs[i].style.left=i*100+'%';
			var sliderList=document.createElement('li');
			sliderList.className="sliderList";
			sliderList.id='-'+i+'sliderItem';
			sliderControl.appendChild(sliderList);
		}
		sliderControl.style.width=26*imgs.length+'px';  //初始化每一个按键的宽度，因为是content-box所以算宽度的时候一定要加上margin跟border
		sliderFocusItem=document.getElementById('-0sliderItem');//获取到第一个页面的按键
		sliderFocusItem.className='sliderFocus';//初始化
	};

	init();//初始化


	var beforeMove=function(step)
	{
		if(step===0)
		{
			return false;
		}
		else
		{

			checkElse(step);
		}
		if (sliderFlag===0)
		{
			sliderFlag='-0';
		}
		sliderFocusItem.className='sliderList';
		sliderFocusItem=document.getElementById(sliderFlag+'sliderItem');
		console.log(sliderFlag);
		sliderFocusItem.className='sliderFocus';
		move(step);
	};


var move=function(step)
	{

		var value=0; //用于保存原先的值，然后进行累加操作
		var count=0;
		var timer=setInterval(function()
		{
			ifFinish=false;
			if(count<50)
			{
				for(i=0;i<imgs.length;i++)
					{	
						value=parseInt(imgs[i].style.left);
						imgs[i].style.left=value+2*step+'%';
					}
					count++;
			}

			else
			{
				clearInterval(timer);
				ifFinish=true;

			}
			
		},10);
	};

	var changePosition=function () {

		let maxValue=0;
		let maxElement=null;
		for (var i=0;i<imgs.length;i++)
		{
			var positionValue=parseInt(imgs[i].style.left);
				positionValue=Math.abs(positionValue);
			if (maxValue<positionValue) {
				maxValue = positionValue;
				maxElement = imgs[i];
			}
		}
		return maxElement;
	};

	var checkElse=function(step)
		{	
			if (step>0)
			{
				for(var i=0;i<imgs.length;i++)
				{
					var offset=imgs[i].style.left;
					if (parseInt(offset)<0)
					{
						return true;
					}
				}
				let ele=changePosition();
				ele.style.left="-100%";
				return false;
			}
			if (step<0)
			{
				for(var i=0;i<imgs.length;i++)
				{
					var offset=imgs[i].style.left;
					if (parseInt(offset)>90)
					{
						return true;
					}
				}
				let ele=changePosition();
				ele.style.left="100%";
				return false;
			}
		};





var buttonLeft=document.getElementById('leftButton');
var buttonRight=document.getElementById('rightButton');
var imgSlider=document.querySelector("#imageSlider");

imgSlider.addEventListener('click',function (e) {

		var event=e||window.event;

		if(event.target.tagName.toLowerCase()==='li')
		{	if (ifFinish)
			{
			var step = parseInt(event.target.id) - sliderFlag;
			if(Math.abs(step)>1)
			{
				rePosition();
			}
			sliderFlag = parseInt(event.target.id);
			beforeMove(step);
			}

		}
},true);


buttonLeft.onclick=function()
{	
	if(ifFinish)
	{


		if(sliderFlag<0)
		{
			sliderFlag++;
		}
		else
		{
			sliderFlag=-(imgs.length-1);
		}

		beforeMove(1);
	}
};

buttonRight.onclick=function()
{
	if(ifFinish)
	{


		if (sliderFlag>-(imgs.length-1))
		{
			sliderFlag--;
		}
		else
			sliderFlag=0;

		beforeMove(-1);
	}
};

var sliderAutoPLay=setInterval(function ()
			{
				if(ifFinish)
				{


					if (sliderFlag>-(imgs.length-1))
					{
						sliderFlag--;
					}
					else
						sliderFlag=0;
					beforeMove(-1);
				}

			} ,3000);





