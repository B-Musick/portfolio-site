
// Used to reset the rectangle widths back to original size after stop hovering (%)
let rectWidth = {
    'about': 10,
    'courses': 12,
    'tech': 14,
    'learning': 22,
    'projects': 24
};
// Used to reset labels back to original position (%)
let labelLocation = {
    'about-label': 11,
    'courses-label': 13,
    'tech-label': 15,
    'learning-label': 23,
    'projects-label': 25
}
let infoLable = document.querySelectorAll('.info-label');
let infoRect = document.querySelectorAll('.info-rect');

// Used for mouseout to know that a label clicked so dont do its thing
let labelClicked = false;
let labelThatClick = ""; // This will hold id of the label that was clicked


/***************************** EVENT LISTENERS ********************************/
infoLable.forEach(label => {
    // Loop through all the labels and if hover over it then turn yellow 
    // and make text bigger
    // Rectangle retracts beside it as well
    /************************* HOVER MOUSE ********************************/
    label.addEventListener('mouseover', (e) => {
        mouseHoveringLabel(label, infoLable, e);
    });

    /************************* UNHOVER MOUSE ******************************/
    label.addEventListener('mouseout', (e) => {
        unhoverMouse(e, labelThatClick, infoLable, labelClicked);
    });

    /************************* CLICK LABEL ********************************/
    label.addEventListener('click', (e) => {
        clickLabel(e, label, infoLable);
    });
});

/************ THE SCREEN IS CLICKED, RETURN TO NORMAL **********/
document.addEventListener('click', (e) => {
    
    let revertPage = true;
    infoLable.forEach(label => {
        if (e.target.classList[1] !== 'description-body-shown' ||label.id === e.target.id) {
            revertPage = false;

        }
    });
    if (revertPage) {
        
        labelClicked = false;
        labelThatClick = ""; // This will hold id of the label that was clicked
        infoLable.forEach(thisLabel => {
            let labelValues = getLableRectHeadDescArr(thisLabel);
            labelValues['label'].classList.remove('label-hidden'); // Move the clicked from header to list
            labelValues['label'].style.color = 'rgb(72, 72, 66)';// Make sure if was white is grey now
            // labelValues['label'].style.fontSize = '25px';
            labelValues['rect'].classList.remove('rect-hidden'); // Make not hidded anymore
            labelValues['rect'].classList.remove('rect-folded'); // Make not hidded anymore
            labelValues['label'].classList.remove('label-smaller');


            returnRectColor(labelValues);
            unretractLabelsRect(labelValues);
            unRetractBackground();
            transistionHeadDescOffScreen(labelValues);

        })

    }
});

/***************************** LABEL LOGIC ************************************/
let getLabelSubstring = (labelID) => {
    /* Takes the label of current button and gets its label name */
    return labelID.split("").reverse().join("").substring(6).split("").reverse().join("");
}

let getLableRectHeadDescArr = (thisLabel) => {
    // Return array with associated label values
    let substring = getLabelSubstring(thisLabel.id);
    let rect = document.getElementById(substring + "-rect"); // Get rectangle of associated label
    let header = document.getElementById(substring + "-header"); // Get the header to transition
    let descriptionBody = document.getElementById(substring + "-description-container"); // Get description associated with label
    return { 'label': thisLabel, 'rect': rect, 'head': header, 'desc': descriptionBody };

}

let labelNotClicked = (labelValues) => {
    // Hide the labels not clicked
    labelValues['label'].classList.remove('label-hidden'); // Move the clicked from header to list
    labelValues['label'].classList.add('label-folded'); // Fold the lable
    labelValues['label'].classList.add('label-smaller'); // Shrink the font size
    labelValues['label'].style.color = 'rgb(72, 72, 66)';// Make sure if was white is grey now
}

let returnLabelColor = (e, labelThatClick) => {
    if (e.target.id !== labelThatClick) {
        e.target.style.color = 'rgb(72, 72, 66)'; // Return the color to grey
    }
}

retractOtherLabels = (labelValues) => {
    // Fold the rectangle and label to the side if not one being hovered
    labelValues['rect'].classList.add('rect-folded'); // Retract rectangle
    labelValues['label'].classList.add('label-folded'); // Retract label
}

/*************************** RECT LOGIC ***************************************/
let retractRectNotClicked = (labelValues) => {
    // Retract the rectangle associated with label, and make sure not hidden 
    // Rectangle of label when one is clicked but its not one clicked
    labelValues['rect'].classList.remove('rect-hidden'); // Make not hidded anymore
    labelValues['rect'].classList.add('rect-folded'); // Fold the rectangle
}

hoveredLabelRect = (labelValues) => {
    // This will change the color of the label and rectangle being hovered over
    // Change the color of the rectangle to yellow of the one hovering
    labelValues['rect'].style.backgroundColor = 'yellow';
    // Change the color of the word label if hover
    labelValues['label'].style.color = 'yellow';
}

let returnRectColor = (labelValues) => {
    // Return rectangle to grey
    labelValues['rect'].style.backgroundColor = 'rgb(72, 72, 66)';
}

let hideRectangle = (labelValues) => {
    // Hide the rectangle of the label clicked
    labelValues['rect'].classList.add('rect-hidden');
}
let returnLabelToOriginalSize = (labelValues) => {
    labelValues['label'].classList.remove('label-smaller'); // Remove shrink to the font size
}

/*************************** DESCRIPTION LOGIC ********************************/
let transitionHeadDescOnScreen = (labelValues) => {
    labelValues['desc'].classList.add('description-body-shown'); // Transition the new description
    labelValues['head'].classList.add('label-header'); // Transitions header from left
    labelValues['label'].classList.add('label-hidden'); // Move the clicked word to the header
};

let unretractLabelsRect = (labelValues) => {
    // If label is retracted, unretract it
    labelValues['rect'].classList.remove('rect-folded');
    labelValues['label'].classList.remove('label-folded');
    // Return label to grey
    labelValues['rect'].style.backgroundColor = 'rgb(72, 72, 66)';
}

let transistionHeadDescOffScreen = (labelValues) => {
    // Transition the header label and description off screen 
    labelValues['head'].classList.remove('label-header'); // Transitions header back out of screen
    labelValues['desc'].classList.remove('description-body-shown'); // Transition the old description out
}

/********************** BACKGROUND LOGIC **************************************/

let retractBackground = () => {
    /*** NAME HEADER/ FULL STACK HEADER ***/
    let nameLabel = document.getElementById('name-label'); // Retract name label to left
    let positionLabel = document.getElementById('position-label'); // Retract position label to right
    nameLabel.classList.add('name-label-hidden');
    positionLabel.classList.add('position-label-hidden');


    /*** BACKGROUND ***/
    let topHalf = document.getElementById('top-half-landing');

    // When click the label, all others retract
    topHalf.classList.add('top-half-landing-folded');
}

let unRetractBackground = () => {
    /*** NAME HEADER/ FULL STACK HEADER ***/
    let nameLabel = document.getElementById('name-label'); // Retract name label to left
    let positionLabel = document.getElementById('position-label'); // Retract position label to right
    nameLabel.classList.remove('name-label-hidden'); // Return name to center
    positionLabel.classList.remove('position-label-hidden'); // Full stack center

    /*** BACKGROUND ***/
    let topHalf = document.getElementById('top-half-landing');

    // When click the label, all others retract
    topHalf.classList.remove('top-half-landing-folded');
}

/*************************** MOUSE LOGIC **************************************/

mouseHoveringLabel = (label, infoLable, e) => {
    /************************* HOVER MOUSE **********************************
     * The label and associated rectangle being hovered should be yellow
     * The other rectangles should retract and lables as well (to right)
    */
    // Get the word used to attach to the rectangle
    if (label.id === e.target.id) {
        infoLable.forEach(thisLabel => {
            let labelValues = getLableRectHeadDescArr(thisLabel);

            if ((thisLabel.id !== e.target.id)) {
                // Retract labels not hovered
                retractOtherLabels(labelValues);
            } else {
                // Color label yellow
                hoveredLabelRect(labelValues);
            }
        })
    }
}

let unhoverMouse = (e, labelThatClick, infoLable, labelClicked) => {
    /************************* UNHOVER MOUSE **********************************
    * This will return the color of label to grey when mouse stops hovering label
    * Rectangle goes back to normal
    */
    returnLabelColor(e, labelThatClick);
    infoLable.forEach(thisLabel => {
        let labelValues = getLableRectHeadDescArr(thisLabel);
        returnRectColor(labelValues);

        if (!labelClicked) {
            unretractLabelsRect(labelValues);
        }
    });
};

clickLabel = (e, label, infoLable) => {

    /************************* CLICK LABEL **********************************
    * Dark grey part of background shrinks to top left
    * Lable clicked goes to top left (associated retangle completly retracts)
    * Other labels font size shrinks
    */
    labelClicked = true; // Let program know that a label was clicked
    labelThatClick = e.target.id; // Let program know what label was clicked
    retractBackground();

    // Change the color of the word label clicked
    label.style.color = 'white';

    infoLable.forEach(thisLabel => {
        // Retract all the rectangles
        // Get the substring to select associated rectangle 
        let labelValues = getLableRectHeadDescArr(thisLabel);

        if ((thisLabel.id !== e.target.id)) {
            // Hide the labels not clicked
            labelNotClicked(labelValues);
            retractRectNotClicked(labelValues);
            transistionHeadDescOffScreen(labelValues);
        } else {
            transitionHeadDescOnScreen(labelValues);
            returnLabelToOriginalSize(labelValues);
            hideRectangle(labelValues);
        }
    });
};