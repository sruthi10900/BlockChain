var progress = 0;



function step(obj)
{
    //switch to prev/next page
    if (obj.val() == "Prev")
    {
        //set new value for progress bar
        progress -= 20;
        $("#divProgress").progressbar({ value: progress });

        //do extra step for showing previous page
    }
    else if (obj.val() == "Next")
    {
        //set new value for progress bar
        progress += 20;
        $("#divProgress").progressbar({ value: progress });

        //do extra step for showing next page
    }
}