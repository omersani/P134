
status = "";
objects = [];
alarm = "";

function preload()
{
 alarm = loadSound("MV27TES-alarm.mp3");
}

function setup()
{
   canvas = createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380);
   video.hide();
}

function start()
{
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if(status != "")
{
    for(i = 0; i < objects.length; i++)
    {
        r = random(255);
        g = rndom(255);
        b = random(255);
        objectDetecter.detect(video, gotResults);
        document.getElementById("status").innerHTML = "Status: Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
        fill(r, g, b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == "person")
        {
            document.getElementById("status").innerHTML = "Baby is detected";
            alarm.stop();
        }
        else
        {
            document.getElementById("status").innerHTML = "Baby is not detected";
            alarm.play();
        }
        if(objects.length < 0)
        {
            document.getElementById("status").innerHTML = "Baby is not detected";
            alarm.play();
        }

    }

}
}

function modelLoaded()
{
    console.log("Model is Loaded!");
    status = true;
    
}

function gotResults(error, results)
{
    if(error){
        console.error(error)
    }
    console.log(results);
    objects = results;
    
}

