function setup() {
    // Write your code here.
    var target = document.getElementsByClassName("remove");
    
    target.addEventlistener("click", function(e){
        console.log(e.targetName);
    })
}
  
  // Example case. 
  document.body.innerHTML = `
  <div class="image">
    <img src="https://goo.gl/kjzfbE" alt="First">
    <button class="remove">X</button>
  </div>
  <div class="image">
    <img src="https://goo.gl/d2JncW" alt="Second">
    <button class="remove">X</button>
  </div>`;
  
  setup();
  
  document.getElementsByClassName("remove")[0].click();
  console.log(document.body.innerHTML);