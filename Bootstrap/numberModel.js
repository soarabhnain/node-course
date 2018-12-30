class NumberModel{
    constructor(){
        this.number = 0;
        this.color = 'red';
        this.observers = [];
    }

    increment(){
        const colors = ['orange', 'blue', 'red', 'green'];
        this.number++;

        this.color = colors[Math.floor(Math.random()*colors.length)];

        this.notifyObservers();
    }

    addObserver(o){
        this.observers.push(o);
    }

    notifyObservers(){
        for(let o of this.observers){
            o.update(this);
        }
    }
}