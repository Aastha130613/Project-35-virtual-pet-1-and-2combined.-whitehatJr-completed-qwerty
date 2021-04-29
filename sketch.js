//Create variables here
var dog,sadDog,happyDog;
var foodObj;
var foodS, foodStock;
var feedTime,lastFed,feed,addFood;
var sadDogImg,happyDogImg

function preload()
{
  sadDogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
	//load images here

}

function setup() {
  database= firebase.database();
	createCanvas(1000, 400);
  
  foodObj= new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDogImg);
  dog.scale=0.15;

  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
background(46,139,87);

foodObj.display();
fedTime= database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})

fill(255255,254);
textSize(15);
if(lastFed>=12){
  text("last Feed:"+ lastFed%12 +"PM",350,30);
}
else if(lastFed ==0){
  text("last Feed:12AM",350,30);
}

else{
  text("last Feed:"+lastFed+"AM",350,30);
}
 drawSprites()
  //add styles here

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    Feedtime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/') .update({
    Food:foodS
  })
} 


