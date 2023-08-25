const TypeWriter = function(txtElement, words, wait = 2000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

//type method
TypeWriter.prototype.type = function(){
    //current index of word

    const current = this.wordIndex % this.words.length;

    

    //get full text current
    const fulltxt = this.words[current];

    //check if deleting
    if(this.isDeleting){
        //remove char
        this.txt = fulltxt.substring(0, this.txt.length - 1);


    }

    else{
         //add char
         this.txt = fulltxt.substring(0, this.txt.length + 1);
    }
    //insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    //initial type speed
    let typespeed = 2000;

    if (this.isDeleting){
        typespeed /= 2;
    }

    // if word is complete
    if(!this.isDeleting && this.txt == fulltxt){

        //make a pause if full
        typespeed = this.wait;

        //set deleting to true
        this.isDeleting = true;
    }

    else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;

        //pause before start typing
        typespeed = 500;
    }



    setTimeout(()=> this.type(), typespeed)
}



//init on dom load
document,addEventListener('DOMContentLoaded', init);

//init
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init typewriter 
    new TypeWriter(txtElement, words, wait);
}